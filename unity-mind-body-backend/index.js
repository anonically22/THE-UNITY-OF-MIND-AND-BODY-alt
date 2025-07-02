import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';

import authRoutes from './routes/auth.js';
import bookingsRoutes from './routes/bookings.js';
import feedbackRoutes from './routes/feedback.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the frontend directory
const __dirname = path.resolve();
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use('/api/auth', authRoutes(supabase));
app.use('/api/bookings', bookingsRoutes(supabase));
app.use('/api/feedback', feedbackRoutes(supabase));

// Admin middleware
function adminMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const user = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    if (user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Admin endpoints
app.get('/api/admin/users', adminMiddleware, async (req, res) => {
  const { data, error } = await supabase.from('users').select('id, name, email, role');
  if (error) return res.status(400).json({ error: error.message });
  res.json({ users: data });
});

// User/admin stats
app.get('/api/admin/userstats', adminMiddleware, async (req, res) => {
  const { data, error } = await supabase.from('users').select('role');
  if (error) return res.status(400).json({ error: error.message });
  const userCount = data.filter(u => u.role === 'user').length;
  const adminCount = data.filter(u => u.role === 'admin').length;
  res.json({ userCount, adminCount });
});

app.get('/api/admin/bookings', adminMiddleware, async (req, res) => {
  const { data, error } = await supabase.from('sessions').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json({ bookings: data });
});

app.get('/api/admin/feedback', adminMiddleware, async (req, res) => {
  const { data, error } = await supabase.from('feedback').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json({ feedback: data });
});

// Resources CRUD
app.get('/api/admin/resources', adminMiddleware, async (req, res) => {
  const { data, error } = await supabase.from('resources').select('*').order('created_at', { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ resources: data });
});

app.post('/api/admin/resources', adminMiddleware, async (req, res) => {
  const { title, description, image_url } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const { data, error } = await supabase.from('resources').insert([{ title, description, image_url }]).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ resource: data[0] });
});

app.put('/api/admin/resources/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, image_url } = req.body;
  const { data, error } = await supabase.from('resources').update({ title, description, image_url }).eq('id', id).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ resource: data[0] });
});

app.delete('/api/admin/resources/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('resources').delete().eq('id', id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Resource deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 