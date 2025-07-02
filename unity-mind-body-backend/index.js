import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

import authRoutes from './routes/auth.js';
import bookingsRoutes from './routes/bookings.js';
import feedbackRoutes from './routes/feedback.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use('/api/auth', authRoutes(supabase));
app.use('/api/bookings', bookingsRoutes(supabase));
app.use('/api/feedback', feedbackRoutes(supabase));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 