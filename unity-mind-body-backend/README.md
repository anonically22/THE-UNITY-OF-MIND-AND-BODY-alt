# Unity of Mind and Body Backend

Node.js + Express.js backend for The Unity of Mind and Body, using Supabase as the database.

## Features
- User registration & login (JWT auth)
- Book therapy/yoga sessions
- Submit and view feedback

## Tech Stack
- Node.js, Express.js
- Supabase (PostgreSQL)
- JWT, bcryptjs

## Setup
1. Clone this repo and run:
   ```bash
   npm install
   ```
2. Create a `.env` file (see `.env` sample) with your Supabase project URL and anon key.
3. Set up your Supabase tables:
   - **users**: id (UUID, PK), name, email, password, created_at
   - **sessions**: id (UUID, PK), user_id (UUID, FK), service, date, time, notes, created_at
   - **feedback**: id (UUID, PK), user_id (UUID, FK), message, created_at
4. Start the server:
   ```bash
   npm start
   ```

## API Routes
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user
- `POST /api/bookings` — Create booking (JWT required)
- `GET /api/bookings` — Get user bookings (JWT required)
- `POST /api/feedback` — Submit feedback (JWT required)
- `GET /api/feedback` — Get all feedback

## Deployment
- Deploy on Render, Vercel, or any Node.js host
- Set environment variables securely

---
MIT License 