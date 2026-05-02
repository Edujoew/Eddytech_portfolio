/* SHARED NAV JS */

window.addEventListener('DOMContentLoaded', () => {
  // ── NAV TOGGLE ──
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  
  if (toggle && links) {
    // Open/Close toggle
    toggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevents click from bubbling
      links.classList.toggle('open');
    });

    // Close when a link is clicked
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });

    // Close when clicking outside of the menu
    document.addEventListener('click', (e) => {
      if (!links.contains(e.target) && !toggle.contains(e.target)) {
        links.classList.remove('open');
      }
    });
  }

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => io.observe(el));

  // ── NAV ACTIVE STATE ──
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── NAV SCROLL DARKEN ──
  const nav = document.querySelector('.nav-wrap');
  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
  });
});
