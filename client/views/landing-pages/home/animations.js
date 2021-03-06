!(function () {
  const e = document,
    t = e.documentElement,
    i = e.body,
    n = (window.sr = ScrollReveal({
      mobile: !1,
    }));
  t.classList.remove('no-js'),
    t.classList.add('js'),
    window.addEventListener('load', function () {
      document.querySelector('.animate').classList.add('is-loaded');
    }),
    document.querySelector('.animate').classList.contains('has-animations') &&
      window.addEventListener('load', function () {
        n.reveal('.features .section-title, .features-illustration, .feature', {
          delay: 300,
          duration: 600,
          distance: '60px',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          origin: 'bottom',
          viewFactor: 0.2,
          interval: 150,
        }),
          n.reveal(
            '.feature-extended:nth-child(odd) .feature-extended-body, .feature-extended:nth-child(even) .feature-extended-image',
            {
              duration: 600,
              distance: '40px',
              easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
              origin: 'right',
              viewFactor: 0.5,
            }
          ),
          n.reveal(
            '.feature-extended:nth-child(even) .feature-extended-body, .feature-extended:nth-child(odd) .feature-extended-image',
            {
              duration: 600,
              distance: '40px',
              easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
              origin: 'left',
              viewFactor: 0.5,
            }
          ),
          n.reveal('.pricing-table, .testimonial, .cta-inner', {
            duration: 600,
            distance: '60px',
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            origin: 'bottom',
            viewFactor: 0.5,
            interval: 150,
          });
      });
})();
