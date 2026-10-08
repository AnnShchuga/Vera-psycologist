document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var toggle = document.getElementById('navToggle');

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.querySelectorAll('.main-nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Calm scroll-reveal for cards — fade/slide up once, no loops, no neon.
  // Large rootMargin triggers the reveal well before a card reaches the
  // viewport, so fast/jump scrolling (End key, nav links, programmatic
  // scroll) never shows a half-faded or blank card.
  var revealEls = document.querySelectorAll(
    '.method-card, .testimonial-card, .project-card, .service-card, ' +
    '.course-card, .faq-item, .crisis-card, .article-card, .resource-card, ' +
    '.side-card, .quiz'
  );
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reduceMotion && revealEls.length) {
    revealEls.forEach(function (el) { el.classList.add('reveal'); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '600px 0px 600px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // Soft drifting dot/bokeh accent for dark sections — purely decorative,
  // skipped entirely under reduced motion rather than shown static.
  var particleHosts = document.querySelectorAll('.particle-bg');
  if (particleHosts.length && !reduceMotion && 'requestAnimationFrame' in window) {
    particleHosts.forEach(function (host) {
      var canvas = document.createElement('canvas');
      canvas.className = 'particle-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      host.insertBefore(canvas, host.firstChild);
      initParticles(canvas, host);
    });
  }

  function initParticles(canvas, host) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var dots = [];
    var w, h;

    function resize() {
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeDots() {
      var count = Math.max(18, Math.min(42, Math.round((w * h) / 26000)));
      dots = [];
      for (var i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1 + Math.random() * 2.6,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          a: 0.12 + Math.random() * 0.4
        });
      }
    }

    resize();
    makeDots();

    function tick() {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(function (d) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(217, 174, 73, ' + d.a + ')';
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }
    tick();

    window.addEventListener('resize', function () {
      resize();
      makeDots();
    });
  }
});
