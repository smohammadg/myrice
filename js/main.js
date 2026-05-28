/* =============================================
   PRIME RICE — main.js  (v3)
   FIX 4: Nav active state NEVER changes on scroll.
           "Home" is always plain white. Pills are always yellow.
           NO JS touches nav link classes based on scroll.
   ============================================= */
(function () {
  'use strict';

  /* ── DOM ─────────────────────────────────── */
  var sidenav        = document.getElementById('sidenav');
  var sidenavOverlay = document.getElementById('sidenavOverlay');
  var hamburger      = document.getElementById('hamburger');
  var header         = document.getElementById('header');
  var cartBadge      = document.getElementById('cartBadge');

  /* =============================================
     SIDE NAV open / close
     ============================================= */
  function openSidenav() {
    if (!sidenav) return;
    sidenav.classList.add('is-open');
    sidenav.setAttribute('aria-hidden', 'false');
    if (sidenavOverlay) sidenavOverlay.classList.add('is-open');
    if (hamburger) { hamburger.classList.add('is-open'); hamburger.setAttribute('aria-expanded', 'true'); }
    document.body.style.overflow = 'hidden';
  }

  function closeSidenav() {
    if (!sidenav) return;
    sidenav.classList.remove('is-open');
    sidenav.setAttribute('aria-hidden', 'true');
    if (sidenavOverlay) sidenavOverlay.classList.remove('is-open');
    if (hamburger) { hamburger.classList.remove('is-open'); hamburger.setAttribute('aria-expanded', 'false'); }
    document.body.style.overflow = '';
  }

  if (hamburger)      hamburger.addEventListener('click', openSidenav);
  if (sidenavOverlay) sidenavOverlay.addEventListener('click', closeSidenav);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidenav && sidenav.classList.contains('is-open')) closeSidenav();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 767 && sidenav && sidenav.classList.contains('is-open')) closeSidenav();
  }, { passive: true });

  /* =============================================
     SIDE NAV accordion
     ============================================= */
  if (sidenav) {
    sidenav.querySelectorAll('.sidenav__toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.sidenav__item');
        var sub  = item.querySelector('.sidenav__sub');
        var open = item.classList.contains('is-expanded');

        /* close all */
        sidenav.querySelectorAll('.sidenav__item.is-expanded').forEach(function (el) {
          el.classList.remove('is-expanded');
          var s = el.querySelector('.sidenav__sub');
          if (s) s.classList.remove('is-open');
          var b = el.querySelector('.sidenav__toggle');
          if (b) b.setAttribute('aria-expanded', 'false');
        });

        /* toggle this one */
        if (!open) {
          item.classList.add('is-expanded');
          if (sub) sub.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    sidenav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeSidenav);
    });
  }

  /* =============================================
     STICKY HEADER scroll shadow (visual only)
     ============================================= */
  window.addEventListener('scroll', function () {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 8
      ? '0 2px 16px rgba(0,0,0,.1)'
      : '0 1px 0 #e0e0e0';
  }, { passive: true });

  /* =============================================
     FIX 4 — NO scroll-based nav active changes
     The nav links have STATIC styling:
     - Home: plain white text (header__nav-link--plain)
     - About Us/Shop/Categories/Products: yellow pills (header__nav-link--pill)
     - Contact Us: plain white text
     These classes NEVER change. No JS modifies them.
     ============================================= */
  /* (intentionally empty — no updateActiveNav function) */

  /* =============================================
     SMOOTH SCROLL for anchor links
     ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      closeSidenav();
      var offsetTop = header ? header.offsetHeight + 8 : 80;
      var top = target.getBoundingClientRect().top + window.scrollY - offsetTop;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* =============================================
     SLIDER FACTORY
     ============================================= */
  function makeSlider(trackId, prevId, nextId, getCount) {
    var track = document.getElementById(trackId);
    var prev  = document.getElementById(prevId);
    var next  = document.getElementById(nextId);
    if (!track || !prev || !next) return;

    var index = 0;

    function itemW() {
      var el = track.children[0];
      if (!el) return 0;
      return el.offsetWidth + (parseFloat(getComputedStyle(track).gap) || 20);
    }
    function total()  { return track.children.length; }
    function maxIdx() { return Math.max(0, total() - Math.floor(getCount())); }

    function go(n) {
      index = Math.max(0, Math.min(n, maxIdx()));
      track.style.transform = 'translateX(-' + (index * itemW()) + 'px)';
      prev.disabled = index === 0;
      next.disabled = index >= maxIdx();
      prev.style.opacity = index === 0 ? '.3' : '1';
      next.style.opacity = index >= maxIdx() ? '.3' : '1';
    }

    prev.addEventListener('click', function () { go(index - 1); });
    next.addEventListener('click', function () { go(index + 1); });
    window.addEventListener('resize', function () { go(index); }, { passive: true });
    go(0);
  }

  function visCat() {
    var w = window.innerWidth;
    if (w <= 480)  return 2;
    if (w <= 767)  return 2.5;
    if (w <= 1024) return 3;
    return 5;
  }
  function visProd() {
    var w = window.innerWidth;
    if (w <= 480)  return 1.2;
    if (w <= 767)  return 1.5;
    if (w <= 1024) return 2;
    return 4;
  }

  makeSlider('catTrack', 'catPrev', 'catNext', visCat);
  makeSlider('fpTrack',  'fpPrev',  'fpNext',  visProd);

  /* Best selling arrows — basic state */
  (function () {
    var bp = document.getElementById('bsPrev');
    var bn = document.getElementById('bsNext');
    if (!bp || !bn) return;
    bp.disabled = true; bp.style.opacity = '.3';
    bn.addEventListener('click', function () { bp.disabled = false; bp.style.opacity = '1'; });
    bp.addEventListener('click', function () { bp.disabled = true;  bp.style.opacity = '.3'; });
  })();

  /* =============================================
     QTY CONTROLS
     ============================================= */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.qty__btn');
    if (!btn) return;
    var wrap  = btn.closest('.qty');
    var valEl = wrap && wrap.querySelector('.qty__val');
    if (!valEl) return;
    var v = parseInt(valEl.textContent, 10) || 1;
    if (btn.classList.contains('qty__btn--plus'))  v = Math.min(v + 1, 99);
    if (btn.classList.contains('qty__btn--minus')) v = Math.max(v - 1, 1);
    valEl.textContent = v;
    valEl.style.transform = 'scale(1.3)';
    setTimeout(function () { valEl.style.transform = ''; }, 140);
  });

  /* =============================================
     ADD TO CART feedback
     ============================================= */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.btn--add, .btn--outline-sm');
    if (!btn || btn.tagName === 'A' || btn.disabled) return;
    var orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    btn.style.cssText += 'background:#4caf50;border-color:#4caf50;color:#fff;';
    btn.disabled = true;
    setTimeout(function () {
      btn.innerHTML = orig;
      btn.style.cssText = btn.style.cssText.replace(/background[^;]+;|border-color[^;]+;|color[^;]+;/g, '');
      btn.disabled = false;
    }, 1500);
    if (cartBadge) {
      cartBadge.textContent = (parseInt(cartBadge.textContent, 10) || 0) + 1;
      cartBadge.style.transform = 'scale(1.5)';
      setTimeout(function () { cartBadge.style.transform = ''; }, 220);
    }
  });

  /* =============================================
     HERO SLIDER — full working slider
     4 slides, auto-play 5s, arrows, dots, swipe/drag
     ============================================= */
  (function () {
    var track      = document.getElementById('heroTrack');
    var prevBtn    = document.getElementById('heroSliderPrev');
    var nextBtn    = document.getElementById('heroSliderNext');
    var dotsWrap   = document.getElementById('heroSliderDots');
    var currentEl  = document.getElementById('heroCurrentSlide');
    var totalEl    = document.getElementById('heroTotalSlides');

    if (!track) return;   /* hero not on this page */

    var slides     = track.querySelectorAll('.hero__slide');
    var dots       = dotsWrap ? dotsWrap.querySelectorAll('.hero-slider__dot') : [];
    var total      = slides.length;
    var current    = 0;
    var autoTimer  = null;
    var AUTOPLAY   = 5000;   /* 5 seconds per slide */
    var PAUSE_AFTER_INTERACT = 8000;

    /* Update total counter */
    if (totalEl) totalEl.textContent = total < 10 ? '0' + total : String(total);

    /* ---- Go to slide n ---- */
    function goTo(n) {
      /* Wrap around */
      n = (n + total) % total;

      /* Remove active from current */
      slides[current].classList.remove('hero__slide--active');
      if (dots[current]) {
        dots[current].classList.remove('hero-slider__dot--active');
        dots[current].setAttribute('aria-selected', 'false');
      }

      /* Move track */
      track.style.transform = 'translateX(-' + n * 100 + '%)';

      /* Set new active */
      current = n;
      slides[current].classList.add('hero__slide--active');
      if (dots[current]) {
        dots[current].classList.add('hero-slider__dot--active');
        dots[current].setAttribute('aria-selected', 'true');
      }

      /* Update counter */
      if (currentEl) currentEl.textContent = current + 1 < 10 ? '0' + (current + 1) : String(current + 1);
    }

    /* ---- Auto-play ---- */
    function startAuto() {
      stopAuto();
      autoTimer = setInterval(function () { goTo(current + 1); }, AUTOPLAY);
    }
    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }
    function pauseThenResume() {
      stopAuto();
      setTimeout(startAuto, PAUSE_AFTER_INTERACT);
    }

    /* ---- Arrow buttons ---- */
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); pauseThenResume(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); pauseThenResume(); });

    /* ---- Dot buttons ---- */
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); pauseThenResume(); });
    });

    /* ---- Keyboard arrows ---- */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { goTo(current - 1); pauseThenResume(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); pauseThenResume(); }
    });

    /* ---- Touch / Mouse swipe ---- */
    var dragStartX = null;
    var isDragging = false;
    var MIN_SWIPE  = 50;   /* px to count as swipe */

    function dragStart(x) { dragStartX = x; isDragging = true; track.classList.add('is-dragging'); }
    function dragEnd(x) {
      if (!isDragging || dragStartX === null) return;
      track.classList.remove('is-dragging');
      var diff = dragStartX - x;
      if (Math.abs(diff) >= MIN_SWIPE) {
        goTo(diff > 0 ? current + 1 : current - 1);
        pauseThenResume();
      }
      dragStartX = null; isDragging = false;
    }

    /* Touch events */
    track.addEventListener('touchstart', function (e) { dragStart(e.touches[0].clientX); }, { passive: true });
    track.addEventListener('touchend',   function (e) { dragEnd(e.changedTouches[0].clientX); }, { passive: true });

    /* Mouse drag events */
    track.addEventListener('mousedown',  function (e) { dragStart(e.clientX); e.preventDefault(); });
    document.addEventListener('mouseup', function (e) { if (isDragging) dragEnd(e.clientX); });

    /* ---- Pause on hover ---- */
    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);

    /* ---- Init ---- */
    goTo(0);
    startAuto();

  })();

  /* =============================================
     FEATURED BRANDS DOTS
     ============================================= */
  var fbDots = document.querySelectorAll('.fb-dot');
  var fbIdx  = 0;
  function setFbDot(i) {
    fbDots.forEach(function (d) { d.classList.remove('fb-dot--active'); });
    if (fbDots[i]) fbDots[i].classList.add('fb-dot--active');
    fbIdx = i;
  }
  fbDots.forEach(function (d, i) { d.addEventListener('click', function () { setFbDot(i); }); });
  setInterval(function () {
    if (!fbDots.length) return;
    setFbDot((fbIdx + 1) % fbDots.length);
  }, 3000);

  /* =============================================
     NEWSLETTER
     ============================================= */
  var nlForm = document.querySelector('.footer__newsletter-form');
  if (nlForm) {
    var nlInput = nlForm.querySelector('input');
    var nlBtn   = nlForm.querySelector('button');
    if (nlBtn) {
      nlBtn.addEventListener('click', function () {
        var val = nlInput ? nlInput.value.trim() : '';
        if (!val || !val.includes('@')) {
          if (nlInput) { nlInput.style.outline = '2px solid #e53935'; nlInput.focus(); }
          setTimeout(function () { if (nlInput) nlInput.style.outline = ''; }, 2000);
          return;
        }
        nlBtn.innerHTML = '<i class="fas fa-check"></i>';
        nlBtn.style.background = '#4caf50';
        if (nlInput) nlInput.value = '';
        setTimeout(function () { nlBtn.innerHTML = '<i class="fas fa-paper-plane"></i>'; nlBtn.style.background = ''; }, 2500);
      });
    }
  }

  /* =============================================
     SCROLL FADE-IN (IntersectionObserver)
     ============================================= */
  if ('IntersectionObserver' in window) {
    var els = document.querySelectorAll('.cat-card, .prod-card, .bs-grid-card, .agri-step');
    els.forEach(function (el) {
      el.style.opacity = '0'; el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .4s ease, transform .4s ease';
    });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.style.opacity = '1'; en.target.style.transform = 'translateY(0)'; obs.unobserve(en.target); }
      });
    }, { threshold: .08 });
    els.forEach(function (el) { obs.observe(el); });
  }

  console.log('[Prime Rice] v3 loaded ✓');
})();
