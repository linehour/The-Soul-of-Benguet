/* =========================================
   BENGUET TOURISM — MAIN.JS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- PAGE LOADER ---- */
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 400);
    });
  }

  /* ---- MOBILE NAV ---- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  /* ---- AOS (Simple Intersection Observer) ---- */
  const aosEls = document.querySelectorAll('[data-aos]');
  if (aosEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = e.target.dataset.aosDelay || 0;
          setTimeout(() => e.target.classList.add('aos-animate'), parseInt(delay));
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    aosEls.forEach(el => observer.observe(el));
  }

  /* ---- TYPED WORDS (Home Hero) ---- */
  const typedEl = document.querySelector('.typed-words');
  if (typedEl) {
    const words = ['the Clouds.', 'the Mountains.', 'Our Heritage.', 'the Adventure.', 'Our Culture.', 'our Warmth.'];
    let wi = 0, ci = 0, deleting = false;
    const type = () => {
      const word = words[wi];
      typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1400); return; }
      if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; setTimeout(type, 400); return; }
      setTimeout(type, deleting ? 45 : 75);
    };
    type();
  }

  /* ---- CHIPS FILTER (Festivals & Food) ---- */
  window.filterByChip = (muni, element) => {
    document.querySelectorAll('.btn-chip').forEach(c => c.classList.remove('active'));
    element.classList.add('active');
    if (window.__renderFestivals) window.__renderFestivals(muni);
    if (window.__renderFood) window.__renderFood(muni);
  };

  /* ---- MODAL ---- */
  const modal = document.getElementById('destModal');
  if (modal) {
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.classList.remove('open'); });
  }
  window.openModal = (html) => {
    const overlay = document.querySelector('#destModal .modal-overlay');
    const body = document.querySelector('#destModal .modal-body');
    if (body) body.innerHTML = html;
    if (overlay) overlay.classList.add('open');
  };

  /* ---- INQUIRY FORM ---- */
  const inquiryForm = document.getElementById('inquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = inquiryForm.querySelector('button[type=submit]');
      btn.textContent = '✓ Inquiry Sent!';
      btn.disabled = true;
      btn.style.background = '#2d6a2d';
      setTimeout(() => {
        inquiryForm.reset();
        btn.textContent = 'Submit Inquiry';
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    });
  }

  /* ---- SEARCH & FILTER (Index) ---- */
  const searchInput = document.getElementById('searchInput');
  const catFilter = document.getElementById('categoryFilter');
  if (searchInput && catFilter) {
    const rerender = () => {
      const q = searchInput.value.toLowerCase();
      const c = catFilter.value;
      if (window.__places && window.__renderDest) {
        const filtered = window.__places.filter(p =>
          (c === 'All' || p.cat === c) &&
          (p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q))
        );
        window.__renderDest(filtered);
      }
    };
    searchInput.addEventListener('input', rerender);
    catFilter.addEventListener('change', rerender);
  }

  /* ---- GALLERY LIGHTBOX ---- */
  const galContainer = document.getElementById('galleryContainer');
  if (galContainer) {
    galContainer.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (!item) return;
      const src = item.dataset.src;
      if (!src) return;
      const lb = document.createElement('div');
      lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;';
      const img = document.createElement('img');
      img.src = src;
      img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:16px;';
      lb.appendChild(img);
      lb.addEventListener('click', () => lb.remove());
      document.body.appendChild(lb);
    });
  }

  /* ---- IDENTITY TABS (Index) ---- */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById(target);
      if (pane) pane.classList.add('active');
    });
  });

});
