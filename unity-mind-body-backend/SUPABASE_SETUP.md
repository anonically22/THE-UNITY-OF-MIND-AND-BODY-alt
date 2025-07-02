# Supabase Setup Guide for Unity of Mind and Body

This guide will help you set up Supabase as the backend database for your project.

---

## 1. Create a Supabase Account & Project

1. Go to [https://supabase.io](https://supabase.io) and sign up for a free account.
2. Click **New Project**.
3. Enter a project name (e.g., `unity-mind-body`), a strong password, and select a region.
4. Click **Create new project**.

---

## 2. Get Your Supabase API URL & Anon Key

1. In your Supabase project dashboard, go to **Project Settings > API**.
2. Copy the **Project URL** (this is your `SUPABASE_URL`).
3. Copy the **anon public key** (this is your `SUPABASE_KEY`).
4. Add these to your `.env` file in the backend:
   ```env
   SUPABASE_URL=your-project-url
   SUPABASE_KEY=your-anon-key
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

---

## 3. Create Database Tables

Go to the **Table Editor** in your Supabase dashboard and create the following tables:

### A. `users` Table
| Column     | Type      | Notes                        |
|------------|-----------|------------------------------|
| id         | UUID      | Primary Key, default: uuid_generate_v4() |
| name       | Text      |                              |
| email      | Text      | Unique                       |
| password   | Text      | Hashed password              |
| created_at | Timestamp | Default: now()               |

- Set `id` as the primary key.
- Set `email` as unique.

### B. `sessions` Table
| Column     | Type      | Notes                        |
|------------|-----------|------------------------------|
| id         | UUID      | Primary Key, default: uuid_generate_v4() |
| user_id    | UUID      | Foreign Key → users.id       |
| service    | Text      | e.g., Art Therapy            |
| date       | Date      |                              |
| time       | Time      |                              |
| notes      | Text      | Optional                     |
| created_at | Timestamp | Default: now()               |

- Set `id` as the primary key.
- Set `user_id` as a foreign key referencing `users.id`.

### C. `feedback` Table
| Column     | Type      | Notes                        |
|------------|-----------|------------------------------|
| id         | UUID      | Primary Key, default: uuid_generate_v4() |
| user_id    | UUID      | Foreign Key → users.id       |
| message    | Text      | Feedback content             |
| created_at | Timestamp | Default: now()               |

- Set `id` as the primary key.
- Set `user_id` as a foreign key referencing `users.id`.

---

## 4. Enable Row Level Security (RLS)

- By default, Supabase enables RLS. For development, you can disable it, but for production, set up policies to allow only authenticated users to access their own data.
- See [Supabase RLS Docs](https://supabase.com/docs/guides/auth/row-level-security) for more info.

---

## 5. Test Your Tables

- Use the **Table Editor** or **SQL Editor** in Supabase to insert and view data.
- You can also use the **API Docs** tab to test RESTful endpoints.

---

## 6. Connect Node.js Backend

- With your `.env` set, run your backend:
  ```bash
  npm start
  ```
- Your backend will now connect to Supabase and expose API endpoints for your app.

---

## 7. Useful Links
- [Supabase Docs](https://supabase.com/docs)
- [Table Editor Guide](https://supabase.com/docs/guides/database/tables)
- [API Reference](https://supabase.com/docs/reference/javascript/introduction)

---

If you have any issues, check the Supabase docs or ask for help! 