/* ============================================================
   ZACKARY SIMMONS — Main JavaScript
   Parallax · Scroll Animations · Navigation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navigation scroll behavior ──
  const nav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // ── Generate Stars ──
  const starsContainer = document.querySelector('.hero-stars');
  if (starsContainer) {
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 2.5 + 0.5;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 70 + '%'; // keep stars in upper 70%
      star.style.setProperty('--duration', (Math.random() * 4 + 2) + 's');
      star.style.animationDelay = (Math.random() * 5) + 's';
      starsContainer.appendChild(star);
    }
  }

  // ── Parallax on scroll (Hero mountains) ──
  const parallaxLayers = document.querySelectorAll('[data-parallax-speed]');
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.dataset.parallaxSpeed);
      const yOffset = scrollY * speed;
      layer.style.transform = `translateY(${yOffset}px)`;
    });

    // Fade hero content on scroll
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      const fadeStart = 100;
      const fadeEnd = 500;
      const opacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      heroContent.style.opacity = Math.max(0, Math.min(1, opacity));
    }

    // Fade scroll indicator
    const scrollInd = document.querySelector('.scroll-indicator');
    if (scrollInd) {
      scrollInd.style.opacity = Math.max(0, 1 - scrollY / 200);
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // ── Scroll-triggered reveal animations ──
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children, .timeline-item');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── Active nav link highlighting ──
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNav() {
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*="#${id}"]`);
      
      if (navLink) {
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

});
