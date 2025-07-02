# Supabase Admin Setup Guide for Unity of Mind and Body

This guide explains how to update your Supabase project to support admin users and admin management features.

---

## 1. Add a `role` Column to the `users` Table

1. Go to your Supabase project dashboard.
2. Open the `users` table in the Table Editor.
3. Click **+ New Column**:
   - Name: `role`
   - Type: `text`
   - Default value: `user`
   - Add to existing rows: `user`
4. Save changes.

---

## 2. Allow Values: 'user' and 'admin'
- You can optionally add a check constraint to only allow 'user' or 'admin'.
- In the SQL editor, run:
  ```sql
  ALTER TABLE users ADD CONSTRAINT role_check CHECK (role IN ('user', 'admin'));
  ```

---

## 3. Create an Admin User
- Use your app's admin signup page, or insert directly in Supabase:
  ```sql
  INSERT INTO users (name, email, password, role) VALUES ('Admin Name', 'admin@email.com', 'hashedpassword', 'admin');
  ```
- (Hash the password using bcrypt before inserting manually.)

---

## 4. Update Row Level Security (RLS) Policies
- Make sure your RLS policies allow admins to read all data.
- Example policy for users table:
  - Policy: "Admins can read all users"
  - Expression: `auth.role() = 'admin'`
- For bookings and feedback, add similar policies for admin access.

---

## 5. Test Admin Features
- Register or insert an admin user.
- Log in as admin and access the admin dashboard.
- You should be able to view all users, bookings, and feedback.

---

## 6. Useful Links
- [Supabase Table Editor](https://supabase.com/docs/guides/database/tables)
- [Supabase RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)

---

If you have any issues, check the Supabase docs or ask for help! 