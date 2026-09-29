document.addEventListener('DOMContentLoaded', () => {
  const selector = '.fade-up-animation, .fade-down-animation, .fade-left-animation, .fade-right-animation';
  const faders = document.querySelectorAll(selector);

  const FADE_CLASSES = ['fade-up-animation','fade-down-animation','fade-left-animation','fade-right-animation'];
  const DELAY_CLASSES = ['delay-1','delay-2','delay-3','delay-4','delay-5'];

  const cleanup = (el) => {
    FADE_CLASSES.forEach(c => el.classList.remove(c));
    DELAY_CLASSES.forEach(c => el.classList.remove(c));
    el.classList.remove('show');

    el.style.removeProperty('transition-delay');
    el.dataset.animated = 'done';
  };

  const runOnce = (el) => {
    if (el.dataset.animated === 'done') return;

    el.classList.add('show');

    const cs = getComputedStyle(el);
    const dur = parseFloat((cs.transitionDuration || '0').split(',')[0]) || 0;
    const del = parseFloat((cs.transitionDelay || '0').split(',')[0]) || 0;
    const total = (dur + del) * 1000;

    setTimeout(() => cleanup(el), total + 50);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) runOnce(entry.target);
    });
  }, { threshold: 0.2 });

  faders.forEach(el => io.observe(el));

  faders.forEach(el => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) runOnce(el);
  });
});
