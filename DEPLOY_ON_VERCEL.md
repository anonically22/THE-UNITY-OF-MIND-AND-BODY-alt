# Deploying THE-UNITY-OF-MIND-AND-BODY-alt on Vercel

This guide will help you deploy your fullstack project (Node.js backend + static frontend) on [Vercel](https://vercel.com/).

---

## 1. Project Structure

```
THE-UNITY-OF-MIND-AND-BODY-alt/
├── frontend/           # All static HTML, CSS, JS, assets
├── unity-mind-body-backend/  # Node.js backend (Express, Supabase, etc.)
├── assets/             # (Optional) Shared assets
├── archive/            # (Optional) Unused files
├── ...
```

---

## 2. Prepare for Deployment

### a. **Backend**
- Your backend is in `unity-mind-body-backend/` (Express, Supabase, etc.).
- Make sure your backend has an `index.js` (or `server.js`) as the entry point.
- Ensure all environment variables (e.g., `SUPABASE_URL`, `SUPABASE_KEY`, `JWT_SECRET`) are in `.env` and **not committed to git**.

### b. **Frontend**
- All static files (HTML, CSS, JS, images) are in `frontend/`.
- The backend serves static files from `/frontend` (see `index.js`).

---

## 3. Vercel Setup

### a. **Sign Up / Log In**
- Go to [vercel.com](https://vercel.com/) and sign up or log in with GitHub.

### b. **Connect Your Repository**
- Import your GitHub repo into Vercel.

### c. **Configure Project**
- **Root Directory:** Set to the project root (where `unity-mind-body-backend/` and `frontend/` are).
- **Framework Preset:** Select **Other** (for custom Node.js/Express apps).
- **Build Command:** Leave blank (unless you have a build step for frontend assets).
- **Output Directory:** Leave blank (since Express serves everything).

### d. **Set Environment Variables**
- In the Vercel dashboard, go to **Project Settings > Environment Variables**.
- Add all required variables:
  - `SUPABASE_URL`
  - `SUPABASE_KEY`
  - `JWT_SECRET`
  - Any others from your `.env`

### e. **Set the Serverless Function Entry Point**
- Vercel expects an `api/` directory for serverless functions.
- **Option 1: Move/Copy your backend to `api/`**
  - Copy all files from `unity-mind-body-backend/` to a new `api/` folder at the root.
  - Rename `index.js` to `index.ts` or `index.js` (Vercel supports both).
  - Update imports/paths as needed.
- **Option 2: Use a custom server (Advanced)**
  - Vercel is optimized for serverless, but you can use [Vercel's custom server guide](https://vercel.com/docs/concepts/functions/serverless-functions) if needed.

### f. **Static Files**
- All files in `frontend/` will be served as static assets.
- Make sure your Express static middleware points to the correct path (`/frontend`).

---

## 4. Routing Tips
- All frontend links should use `/frontend/filename.html` (as you have).
- API routes should use `/api/feedback`, `/api/auth`, etc.
- If you want pretty URLs (e.g., `/` instead of `/frontend/home.html`), use Vercel's [Rewrites](https://vercel.com/docs/projects/project-configuration#rewrites) in `vercel.json`.

---

## 5. Deploy
- Push your changes to GitHub.
- Vercel will auto-deploy on every push.
- Visit your Vercel dashboard for build logs and your live site URL.

---

## 6. Troubleshooting
- **API not working?** Check your environment variables and logs in Vercel.
- **Static files 404?** Make sure they are in `frontend/` and referenced as `/frontend/filename.html`.
- **CORS issues?** Ensure your backend CORS config allows requests from your Vercel domain.

---

## 7. Resources
- [Vercel Docs: Node.js](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Vercel Docs: Static Files](https://vercel.com/docs/concepts/projects/overview#static-files)
- [Vercel Rewrites](https://vercel.com/docs/projects/project-configuration#rewrites)

---

**Need help?**
- Ask in the Vercel community or open an issue in your repo. 