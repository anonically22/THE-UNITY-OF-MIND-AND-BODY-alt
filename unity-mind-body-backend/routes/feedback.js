import express from 'express';
import jwt from 'jsonwebtoken';

export default function(supabase) {
  const router = express.Router();

  // Middleware to verify JWT
  function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      res.status(401).json({ error: 'Invalid token' });
    }
  }

  // Submit feedback
  router.post('/', authMiddleware, async (req, res) => {
    const { message } = req.body;
    const user_id = req.user.id;
    if (!message) return res.status(400).json({ error: 'Message required' });
    const { data, error } = await supabase
      .from('feedback')
      .insert([{ user_id, message }])
      .select();
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Feedback submitted', feedback: data[0] });
  });

  // Get all feedback (admin use)
  router.get('/', async (req, res) => {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return res.status(400).json({ error: error.message });
    res.json({ feedback: data });
  });

  return router;
} 