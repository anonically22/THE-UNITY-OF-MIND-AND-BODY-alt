import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default function(supabase) {
  const router = express.Router();

  // Register
  router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
    const userRole = role === 'admin' ? 'admin' : 'user';
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword, role: userRole }])
      .select();
    if (error) return res.status(400).json({ error: error.message });
    // Optionally, auto-login after register (return token)
    const user = data[0];
    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'User registered', user, token });
  });

  // Login
  router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'All fields required' });
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (error || !data) return res.status(400).json({ error: 'Invalid email or password' });
    if (role && data.role !== role) return res.status(403).json({ error: 'Role mismatch' });
    const validPass = bcrypt.compareSync(password, data.password);
    if (!validPass) return res.status(400).json({ error: 'Invalid email or password' });
    const token = jwt.sign({ id: data.id, name: data.name, email: data.email, role: data.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token });
  });

  return router;
} 