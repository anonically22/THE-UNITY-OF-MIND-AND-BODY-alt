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

  // Create a booking
  router.post('/', authMiddleware, async (req, res) => {
    const { service, date, time, notes } = req.body;
    const user_id = req.user.id;
    if (!service || !date || !time) return res.status(400).json({ error: 'Missing fields' });
    const { data, error } = await supabase
      .from('sessions')
      .insert([{ user_id, service, date, time, notes }])
      .select();
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Booking created', booking: data[0] });
  });

  // Get bookings for logged-in user
  router.get('/', authMiddleware, async (req, res) => {
    const user_id = req.user.id;
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', user_id)
      .order('date', { ascending: true });
    if (error) return res.status(400).json({ error: error.message });
    res.json({ bookings: data });
  });

  return router;
} 