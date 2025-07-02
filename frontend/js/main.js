// Hamburger menu toggle for mobile
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
  });
  // Close nav on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
  // Keyboard accessibility
  hamburger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
  });
}

// Fade-in animation on page load
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 0;
  document.body.style.transition = 'opacity 0.7s';
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 50);
});

// Profile dropdown logic for dashboard
window.addEventListener('DOMContentLoaded', () => {
  const profileIcon = document.getElementById('profile-icon');
  const profileDropdown = document.getElementById('profile-dropdown');
  if (profileIcon && profileDropdown) {
    profileIcon.onclick = (e) => {
      e.stopPropagation();
      profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
    };
    document.addEventListener('click', (e) => {
      if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.style.display = 'none';
      }
    });
    document.getElementById('logout-option').onclick = (e) => {
      e.preventDefault();
      handleLogout();
    };
    document.getElementById('settings-option').onclick = (e) => {
      e.preventDefault();
      alert('Settings page coming soon!');
    };
  }
});

// Update logout logic to redirect to home.html and set thank you flag
function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  localStorage.removeItem('role');
  localStorage.setItem('showThankYou', '1');
  window.location.href = 'home.html';
}

// Attach to all logout buttons if present
window.addEventListener('DOMContentLoaded', () => {
  const logoutOption = document.getElementById('logout-option');
  if (logoutOption) {
    logoutOption.onclick = (e) => {
      e.preventDefault();
      handleLogout();
    };
  }
  // Show thank you message on home.html if flag is set
  if (window.location.pathname.endsWith('home.html') && localStorage.getItem('showThankYou')) {
    const thankYouDiv = document.createElement('div');
    thankYouDiv.textContent = 'Thank you for using our services!';
    thankYouDiv.style.cssText = 'background:#A4CCD9;color:#222;font-size:1.2rem;padding:1.2rem 2rem;border-radius:1.2rem;box-shadow:0 2px 12px rgba(34,34,34,0.07);text-align:center;max-width:400px;margin:2rem auto 0 auto;z-index:1000;position:relative;';
    document.body.insertBefore(thankYouDiv, document.body.firstChild);
    localStorage.removeItem('showThankYou');
  }
});

// Dynamically populate resources page from resources.json
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('resources.html')) {
    // List all doodles
    const allDoodles = [
      'BalletDoodle.svg', 'ReadingDoodle.svg', 'MeditatingDoodle.svg', 'PlantDoodle.svg', 'SwingingDoodle.svg',
      'MoshingDoodle.svg', 'SprintingDoodle.svg', 'GroovySittingDoodle.svg', 'UnboxingDoodle.svg', 'ZombieingDoodle.svg',
      'DancingDoodle.svg', 'StrollingDoodle.svg', 'RollingDoodle.svg', 'RollerSkatingDoodle.svg', 'DumpingDoodle.svg',
      'SelfieDoodle.svg', 'SittingDoodle.svg', 'IceCreamDoodle.svg', 'RunningDoodle.svg', 'LovingDoodle.svg',
      'PettingDoodle.svg', 'MessyDoodle.svg', 'FloatDoodle.svg', 'SleekDoodle.svg', 'GroovyDoodle.svg',
      'LayingDoodle.svg', 'ReadingSideDoodle.svg', 'DoogieDoodle.svg', 'DogJumpDoodle.svg', 'SitReadingDoodle.svg', 'CoffeeDoddle.svg'
    ];
    // Shuffle doodles
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    // Cycle colors: green, orange, blue
    const cardColors = ['#CFFF8D', '#FFE6D1', '#A4CCD9'];
    // Rotate colors on each load for variety
    const colorOffset = Math.floor(Math.random() * cardColors.length);
    const rotatedColors = cardColors.slice(colorOffset).concat(cardColors.slice(0, colorOffset));
    fetch('../../unity-mind-body-backend/resources.json')
      .then(res => res.json())
      .then(data => {
        const resourcesList = document.getElementById('resources-list');
        if (!resourcesList) return;
        const doodles = shuffle([...allDoodles]);
        resourcesList.innerHTML = '';
        for (let i = 0; i < data.articles.length; i += 2) {
          const row = document.createElement('div');
          row.className = 'card-row';
          for (let j = 0; j < 2; j++) {
            const idx = i + j;
            if (idx >= data.articles.length) break;
            const article = data.articles[idx];
            const card = document.createElement('div');
            card.className = 'card resource-card';
            card.style.background = rotatedColors[(idx) % rotatedColors.length];
            card.innerHTML = `
              <h3 style=\"font-family:'Forum',serif;font-size:1.25rem;color:#222;margin-bottom:0.5rem;\">${article.title}</h3>
              <img src=\"assets/doodles/${doodles[idx%doodles.length]}\" alt=\"Resource Doodle\" class=\"resource-img\" style=\"border-radius:0.7rem;margin-bottom:0.7rem;width:90px;height:90px;object-fit:contain;background:#fff;box-shadow:0 1px 6px rgba(34,34,34,0.04);\" />
              <p style=\"color:#222;font-size:1.01rem;margin:0 0 0.5rem 0;\">${article.description}</p>
            `;
            row.appendChild(card);
          }
          resourcesList.appendChild(row);
        }
      });
  }
}); 