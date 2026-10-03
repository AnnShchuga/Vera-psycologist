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
});
