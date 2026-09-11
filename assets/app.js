/* Static review-page interactions. No tracking, remote requests or form submission. */
(() => {
  const triggers = [...document.querySelectorAll('.landing-trigger')];
  const curriculum = [...document.querySelectorAll('#curriculum .landing-trigger')];
  const expandAll = document.getElementById('expand-curriculum');
  function setExpanded(trigger, expanded) {
    trigger.setAttribute('aria-expanded', String(expanded));
    document.getElementById(trigger.getAttribute('aria-controls')).hidden = !expanded;
  }
  function syncExpandAll() {
    const expanded = curriculum.every(trigger => trigger.getAttribute('aria-expanded') === 'true');
    expandAll.textContent = expanded ? '전체 접기' : '전체 펼치기';
    expandAll.setAttribute('aria-expanded', String(expanded));
  }
  triggers.forEach(trigger => trigger.addEventListener('click', () => {
    setExpanded(trigger, trigger.getAttribute('aria-expanded') !== 'true');
    syncExpandAll();
  }));
  expandAll.addEventListener('click', () => {
    const expanded = expandAll.getAttribute('aria-expanded') !== 'true';
    curriculum.forEach(trigger => setExpanded(trigger, expanded));
    syncExpandAll();
  });
  const bar = document.getElementById('landing-buy-bar');
  const hero = document.getElementById('offer');
  function syncBar() {
    const visible = hero.getBoundingClientRect().bottom <= 0;
    bar.classList.toggle('visible', visible);
    bar.setAttribute('aria-hidden', String(!visible));
    bar.inert = !visible;
  }
  new IntersectionObserver(syncBar, { threshold: [0, 1] }).observe(hero);
  window.addEventListener('scroll', syncBar, { passive: true });
  window.addEventListener('resize', syncBar);
  syncBar();
  const navLinks = [...document.querySelectorAll('.landing-scene-nav a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -60% 0px' });
  navLinks.forEach(link => observer.observe(document.querySelector(link.hash)));
})();
