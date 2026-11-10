/* =============================================
   THE SIDEBAR — LAW WEEK 2026
   Magazine JS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── Intersection Observer for page animations ──
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Update active nav link
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.2 });

  pages.forEach(page => observer.observe(page));

  // ── Mobile nav toggle ──
  const navToggle = document.getElementById('nav-toggle');
  const navPagesEl = document.querySelector('.nav-pages');

  if (navToggle && navPagesEl) {
    navToggle.addEventListener('click', () => {
      const isOpen = navPagesEl.style.display === 'flex';
      navPagesEl.style.display = isOpen ? 'none' : 'flex';
      navPagesEl.style.flexDirection = 'column';
      navPagesEl.style.position = 'fixed';
      navPagesEl.style.top = '60px';
      navPagesEl.style.left = '0';
      navPagesEl.style.right = '0';
      navPagesEl.style.background = 'rgba(10,5,2,0.97)';
      navPagesEl.style.padding = '1rem 2rem';
      navPagesEl.style.gap = '1.2rem';
      if (isOpen) navPagesEl.removeAttribute('style');
    });

    // Close mobile nav on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navPagesEl.removeAttribute('style');
      });
    });
  }

  // ── Nav shadow on scroll ──
  const nav = document.getElementById('mag-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });

  // ── Smooth page-to-page navigation ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Page turn sound effect visual cue (subtle flash) ──
  let lastPage = '';
  const pageFlash = document.createElement('div');
  pageFlash.style.cssText = `
    position: fixed; inset: 0; background: white;
    pointer-events: none; z-index: 9999;
    opacity: 0; transition: opacity 0.1s;
  `;
  document.body.appendChild(pageFlash);

  // ── Keyboard navigation ──
  const pageIds = ['cover', 'editor', 'president', 'itinerary', 'more'];
  let currentPageIndex = 0;

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      currentPageIndex = Math.min(currentPageIndex + 1, pageIds.length - 1);
      document.getElementById(pageIds[currentPageIndex])
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      currentPageIndex = Math.max(currentPageIndex - 1, 0);
      document.getElementById(pageIds[currentPageIndex])
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Track current page via intersection
  const pageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = pageIds.indexOf(entry.target.id);
        if (idx !== -1) currentPageIndex = idx;
      }
    });
  }, { threshold: 0.5 });

  pageIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) pageObserver.observe(el);
  });

});
