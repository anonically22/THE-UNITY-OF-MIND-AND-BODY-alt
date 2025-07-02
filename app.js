// SPA navigation logic
const sections = {
  home: document.getElementById('home-section'),
  login: document.getElementById('login-section'),
  dashboard: document.getElementById('dashboard-section'),
  services: document.getElementById('services-section'),
  booking: document.getElementById('booking-section'),
  resources: document.getElementById('resources-section'),
  contact: document.getElementById('contact-section'),
};

function showSection(page) {
  Object.keys(sections).forEach(key => {
    if (key === page) {
      sections[key].classList.add('active');
      sections[key].style.display = 'block';
    } else {
      sections[key].classList.remove('active');
      sections[key].style.display = 'none';
    }
  });
  // Highlight nav link
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
}

// Nav link event listeners
const navLinks = document.querySelectorAll('.nav-links a[data-page]');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;
    if (page === 'login') {
      showSection('login');
    } else {
      showSection(page);
    }
  });
});

// Auth state
let loggedIn = false;
function updateNavAuth() {
  document.getElementById('nav-auth').style.display = loggedIn ? 'none' : 'inline';
  document.getElementById('nav-logout').style.display = loggedIn ? 'inline' : 'none';
}

document.getElementById('logout-btn').addEventListener('click', e => {
  e.preventDefault();
  loggedIn = false;
  updateNavAuth();
  showSection('home');
});

// Initial load
showSection('home');
updateNavAuth();

// Export for later use
window._unityApp = { showSection, updateNavAuth, sections };

// --- Section Content Population ---

// Home Page
sections.home.innerHTML = `
  <div class="hero">
    <h1>Your health journey, our shared mission</h1>
    <p class="subtitle">Holistic wellness for students: mind and body in harmony.</p>
    <div class="service-highlights">
      <div class="card">
        <h3>Art Therapy</h3>
        <p>Express your emotions through art</p>
      </div>
      <div class="card">
        <h3>Group Therapy</h3>
        <p>Find support in a safe space</p>
      </div>
      <div class="card">
        <h3>Yoga/Meditation</h3>
        <p>Relax and rejuvenate your mind and body</p>
      </div>
    </div>
    <div class="hero-ctas">
      <button class="btn" id="home-book-btn">Book a Session</button>
      <button class="btn" id="home-resources-btn">Explore Resources</button>
    </div>
  </div>
`;

// Register/Login Page
sections.login.innerHTML = `
  <div class="auth-container">
    <h2>Register</h2>
    <form id="register-form">
      <input type="text" name="name" value="Alex Roy" required placeholder="Name" />
      <input type="email" name="email" value="alex.roy@example.com" required placeholder="Email" />
      <input type="password" name="password" value="password123" required placeholder="Password" />
      <button type="submit" class="btn">Register</button>
    </form>
    <hr />
    <h2>Login</h2>
    <form id="login-form">
      <input type="email" name="email" value="alex.roy@example.com" required placeholder="Email" />
      <input type="password" name="password" value="password123" required placeholder="Password" />
      <button type="submit" class="btn">Login</button>
    </form>
  </div>
`;

// Dashboard
sections.dashboard.innerHTML = `
  <div class="dashboard-welcome">
    <h2>Hi, Alex!</h2>
    <div class="card upcoming-sessions">
      <h3>Upcoming Sessions</h3>
      <ul>
        <li><b>Art Therapy:</b> 5th July, 2:00 PM</li>
        <li><b>Group Therapy:</b> 7th July, 11:00 AM</li>
      </ul>
    </div>
    <div class="dashboard-links">
      <button class="btn" id="dashboard-book-btn">Book New Session</button>
      <button class="btn" id="dashboard-resources-btn">View Resources</button>
      <button class="btn" id="dashboard-feedback-btn">Submit Feedback</button>
    </div>
  </div>
`;

// Services Page
sections.services.innerHTML = `
  <h2>Our Services</h2>
  <div class="services-list">
    <div class="card service-card">
      <h3>Art Therapy</h3>
      <p>Explore your emotions through creative expression.</p>
      <div class="service-price">₹1000/session</div>
      <button class="btn book-now-btn" data-service="Art Therapy">Book Now</button>
    </div>
    <div class="card service-card">
      <h3>Group Therapy</h3>
      <p>Share and connect in a supportive environment.</p>
      <div class="service-price">₹1100/session</div>
      <button class="btn book-now-btn" data-service="Group Therapy">Book Now</button>
    </div>
    <div class="card service-card">
      <h3>Yoga/Meditation</h3>
      <p>Calm your mind and strengthen your body.</p>
      <div class="service-price">₹750/session</div>
      <button class="btn book-now-btn" data-service="Yoga/Meditation">Book Now</button>
    </div>
  </div>
`;

// Booking Form
sections.booking.innerHTML = `
  <h2>Book a Session</h2>
  <form id="booking-form">
    <input type="text" name="name" value="Alex Roy" required placeholder="Name" />
    <input type="email" name="email" value="alex.roy@example.com" required placeholder="Email" />
    <select name="service" id="booking-service">
      <option value="Art Therapy">Art Therapy</option>
      <option value="Group Therapy">Group Therapy</option>
      <option value="Yoga/Meditation">Yoga/Meditation</option>
    </select>
    <input type="date" name="date" value="2025-07-05" required />
    <input type="time" name="time" value="14:00" required />
    <textarea name="notes" placeholder="Notes">Looking forward to the session!</textarea>
    <button type="submit" class="btn">Book Session</button>
  </form>
  <div id="booking-confirmation" style="display:none;"></div>
`;

// Resources Page
sections.resources.innerHTML = `
  <h2>Resources</h2>
  <div class="resources-list">
    <div class="card resource-card">
      <h3>5 Ways Art Therapy Improves Mental Health</h3>
      <img src="https://picsum.photos/200/300?random=1" alt="Infographic 1" class="resource-img" />
      <button class="btn download-btn">Download</button>
    </div>
    <div class="card resource-card">
      <h3>Beginner's Guide to Meditation</h3>
      <img src="https://picsum.photos/200/300?random=2" alt="Infographic 2" class="resource-img" />
      <button class="btn download-btn">Download</button>
    </div>
    <div class="card resource-card">
      <h3>The Science of Mind-Body Connection</h3>
      <img src="https://picsum.photos/200/300?random=3" alt="Infographic 3" class="resource-img" />
      <button class="btn download-btn">Download</button>
    </div>
  </div>
`;

// Feedback/Contact Page
sections.contact.innerHTML = `
  <h2>Feedback / Contact</h2>
  <form id="feedback-form">
    <input type="text" name="name" value="Alex Roy" required placeholder="Name" />
    <input type="email" name="email" value="alex.roy@example.com" required placeholder="Email" />
    <textarea name="message" required placeholder="Message">Great website. Would love more meditation sessions.</textarea>
    <button type="submit" class="btn">Submit Feedback</button>
  </form>
  <div id="feedback-confirmation" style="display:none;"></div>
`;

// --- Interactivity & SPA Logic ---

// Home CTA buttons
sections.home.querySelector('#home-book-btn').onclick = () => showSection('services');
sections.home.querySelector('#home-resources-btn').onclick = () => showSection('resources');

// Register/Login logic
const registerForm = sections.login.querySelector('#register-form');
const loginForm = sections.login.querySelector('#login-form');
registerForm.onsubmit = e => {
  e.preventDefault();
  loggedIn = true;
  updateNavAuth();
  showSection('dashboard');
};
loginForm.onsubmit = e => {
  e.preventDefault();
  loggedIn = true;
  updateNavAuth();
  showSection('dashboard');
};

// Dashboard quick links
sections.dashboard.querySelector('#dashboard-book-btn').onclick = () => showSection('services');
sections.dashboard.querySelector('#dashboard-resources-btn').onclick = () => showSection('resources');
sections.dashboard.querySelector('#dashboard-feedback-btn').onclick = () => showSection('contact');

// Services Book Now buttons
sections.services.querySelectorAll('.book-now-btn').forEach(btn => {
  btn.onclick = () => {
    // Set booking form service
    const service = btn.dataset.service;
    const serviceSelect = sections.booking.querySelector('#booking-service');
    serviceSelect.value = service;
    // Set date/time defaults for demo
    if (service === 'Art Therapy') {
      sections.booking.querySelector('input[name="date"]').value = '2025-07-05';
      sections.booking.querySelector('input[name="time"]').value = '14:00';
    } else if (service === 'Group Therapy') {
      sections.booking.querySelector('input[name="date"]').value = '2025-07-07';
      sections.booking.querySelector('input[name="time"]').value = '11:00';
    } else {
      sections.booking.querySelector('input[name="date"]').value = '2025-07-08';
      sections.booking.querySelector('input[name="time"]').value = '09:00';
    }
    showSection('booking');
  };
});

// Booking form logic
const bookingForm = sections.booking.querySelector('#booking-form');
const bookingConfirmation = sections.booking.querySelector('#booking-confirmation');
bookingForm.onsubmit = e => {
  e.preventDefault();
  const service = bookingForm.service.value;
  const date = bookingForm.date.value;
  const time = bookingForm.time.value;
  bookingForm.style.display = 'none';
  bookingConfirmation.style.display = 'block';
  bookingConfirmation.innerHTML = `Thank you for booking <b>${service}</b> on <b>${new Date(date).toLocaleDateString('en-GB')}</b> at <b>${time.replace(':00', ':00')}</b>.`;
  setTimeout(() => {
    bookingForm.style.display = 'block';
    bookingConfirmation.style.display = 'none';
    showSection('dashboard');
  }, 2500);
};

// Resources download buttons (dummy)
sections.resources.querySelectorAll('.download-btn').forEach(btn => {
  btn.onclick = () => {
    btn.innerText = 'Downloaded!';
    setTimeout(() => { btn.innerText = 'Download'; }, 1500);
  };
});

// Feedback form logic
const feedbackForm = sections.contact.querySelector('#feedback-form');
const feedbackConfirmation = sections.contact.querySelector('#feedback-confirmation');
feedbackForm.onsubmit = e => {
  e.preventDefault();
  feedbackForm.style.display = 'none';
  feedbackConfirmation.style.display = 'block';
  feedbackConfirmation.innerHTML = 'Thank you for your feedback. We will get back to you soon.';
  setTimeout(() => {
    feedbackForm.style.display = 'block';
    feedbackConfirmation.style.display = 'none';
    showSection('dashboard');
  }, 2500);
}; 