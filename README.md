# The Unity of Mind and Body

A comprehensive mental and physical wellness platform designed for campus communities, providing therapy sessions, wellness resources, and support systems to help students lead healthier, happier lives.

## 🎯 Project Idea

### The Problem
Students often struggle silently with stress, anxiety, and physical health issues due to:
- Academic pressure and deadlines
- Social stigma around mental health
- Lack of accessible wellness resources
- Busy lifestyles neglecting self-care
- Limited awareness of mental health solutions

### Our Solution
**The Unity of Mind and Body** bridges this gap by offering:
- **Integrated Therapy Sessions**: Art Therapy, Group Therapy, and Yoga/Meditation
- **Wellness Resources**: Curated articles, tips, and mental health guidance
- **Support System**: Easy booking, feedback mechanisms, and team support
- **Campus Integration**: Practical, affordable solutions that fit student lifestyles

### Vision
To create a world where mental and physical wellness are equally prioritized, starting with campus communities and expanding to every corner where support is needed.

## 🏗️ Project Structure

### Frontend Files (`frontend/`)

#### Core Pages
- **`index.html`** - Landing page with hero section and project overview
- **`services.html`** - Service listings with modal details (fetches from `services.json`)
- **`resources.html`** - Wellness articles and resources (fetches from `resources.json`)

#### Authentication & User Management
- **`user-login.html`** - User login page
- **`user-signup.html`** - User registration page
- **`dashboard.html`** - User dashboard with booking history and quick actions

#### Booking System
- **`book-session.html`** - Service selection and booking form for logged-in users
- **`booking.html`** - Legacy booking page (redirects to book-session.html)

#### Support & Information Pages
- **`team.html`** - Team member profiles (fetches from `team.json`)
- **`about-us.html`** - Organization information (fetches from `about_us.json`)
- **`get-support.html`** - Support options and contact form (fetches from `get_support.json`)
- **`contact.html`** - Contact information page
- **`feedback.html`** - User feedback form

#### Admin System
- **`admin-login.html`** - Admin authentication
- **`admin-signup.html`** - Admin registration
- **`admin-dashboard.html`** - Admin management interface

#### Assets
- **`css/style.css`** - Main stylesheet with responsive design
- **`js/main.js`** - Core JavaScript functionality (navigation, modals, data fetching)
- **`assets/doodles/`** - SVG illustrations for visual appeal
- **`assets/lotus-flower.png`** - Logo image
- **`assets/user (1).png`** - Default user avatar

### Backend Files (`unity-mind-body-backend/`)

#### Server & API
- **`index.js`** - Main server file with Express.js setup
- **`package.json`** - Node.js dependencies and scripts
- **`package-lock.json`** - Dependency lock file

#### API Routes
- **`routes/auth.js`** - User authentication endpoints
- **`routes/bookings.js`** - Booking management endpoints
- **`routes/feedback.js`** - Feedback submission endpoints

#### Data Files (JSON)
- **`services.json`** - Service definitions with pricing and descriptions
- **`resources.json`** - Wellness articles and educational content
- **`team.json`** - Team member information and roles
- **`about_us.json`** - Organization vision, mission, and background
- **`get_support.json`** - Support options and contact information

#### Documentation
- **`README.md`** - Backend-specific documentation
- **`SUPABASE_ADMIN_SETUP.md`** - Database setup instructions

### Root Files
- **`app.js`** - Main application entry point
- **`main.js`** - Additional JavaScript functionality
- **`style.css`** - Root-level styles
- **`index.html`** - Main entry point
- **`DEPLOY_ON_VERCEL.md`** - Deployment instructions

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser
- Git (for version control)

### Installation Steps

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd THE-UNITY-OF-MIND-AND-BODY-alt
```

#### 2. Install Backend Dependencies
```bash
cd unity-mind-body-backend
npm install
```

#### 3. Configure Environment Variables
Create a `.env` file in the `unity-mind-body-backend/` directory:
```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
DATABASE_URL=your_database_url_here
```

#### 4. Start the Backend Server
```bash
# From unity-mind-body-backend directory
npm start
# or
node index.js
```

The backend will start on `http://localhost:5000`

#### 5. Serve the Frontend
You can serve the frontend using any static file server:

**Option A: Using Node.js serve**
```bash
# Install serve globally
npm install -g serve

# Serve the frontend
cd frontend
serve -p 8000
```

**Option B: Using Live Server (VS Code extension)**
- Install the "Live Server" extension in VS Code
- Right-click on `frontend/index.html` and select "Open with Live Server"

The frontend will be available at `http://localhost:8000`

### Database Setup

#### Using Supabase (Recommended)
1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Set up the required tables (users, bookings, feedback)
4. Update the `DATABASE_URL` in your `.env` file
5. Follow the instructions in `SUPABASE_ADMIN_SETUP.md`

#### Using Local Database
You can also use a local database like SQLite or PostgreSQL. Update the database configuration in `unity-mind-body-backend/index.js` accordingly.

## 🔧 Key Features

### User Features
- **Service Booking**: Easy booking system for therapy sessions
- **Resource Access**: Curated wellness articles and tips
- **Feedback System**: Submit feedback and suggestions
- **Profile Management**: View booking history and manage account

### Admin Features
- **User Management**: View and manage user accounts
- **Booking Oversight**: Monitor and manage session bookings
- **Feedback Review**: Review and respond to user feedback
- **Content Management**: Update services and resources

### Technical Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dynamic Content**: Data-driven pages from JSON files
- **Authentication**: Secure user login and session management
- **API Integration**: RESTful API for data management
- **Modal Interactions**: Rich service details and booking flows

## 🎨 Design Philosophy

### Visual Identity
- **Color Palette**: Soft, calming colors (greens, blues, peaches)
- **Typography**: Clean, readable fonts with 'Forum' serif for headings
- **Illustrations**: Custom doodles for friendly, approachable feel
- **Layout**: Card-based design with rounded corners and subtle shadows

### User Experience
- **Accessibility**: Keyboard navigation and screen reader support
- **Mobile-First**: Responsive design optimized for mobile devices
- **Intuitive Navigation**: Clear menu structure and breadcrumbs
- **Loading States**: Smooth transitions and loading indicators

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all user inputs
- **CORS Protection**: Cross-origin request protection
- **Environment Variables**: Sensitive data stored in environment variables
- **HTTPS Ready**: Prepared for secure deployment

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

### Backend Deployment
The backend can be deployed to:
- Heroku
- Railway
- DigitalOcean
- AWS EC2

See `DEPLOY_ON_VERCEL.md` for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Rajeev Singh** - Research & Outreach Lead
- **Ankita Chanda** - Research & Data Analyst
- **Soumen Koley** - Content & Data Collection
- **Suhani Kataria** - Content Writer & Legal Advisor
- **Debalina Paul** - Research & Outreach

## 📞 Support

For support and questions:
- Visit our [Get Support page](frontend/get-support.html)
- Contact the team through the contact form
- Check our [About Us page](frontend/about-us.html) for more information

---

**The Unity of Mind and Body** - Making wellness accessible, one campus at a time. 🌱

---

**Developed by:** [Anonically22](https://github.com/Anonically22) 🚀
