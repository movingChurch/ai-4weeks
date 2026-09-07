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

(()=>{let next=false;const button=document.getElementById('db-switch');button.onclick=()=>{next=!next;document.getElementById('db-round').textContent=next?'다음 제작 · 같은 디자인 기준':'첫 번째 제작';document.getElementById('db-input').textContent=next?'내용: 내 일을 맡기는 실습':'내용: 인공지능 비서 만들기';document.querySelectorAll('.db-title').forEach(e=>e.innerHTML=next?'내 일도,<br>함께 맡겨보세요.':'내 컴퓨터에<br>인공지능 비서를.');document.querySelectorAll('.db-desc').forEach(e=>e.textContent=next?'내 파일로 직접 실습합니다.':'설치부터 함께합니다.');button.textContent=next?'첫 번째 제작으로 돌아가기 ↺':'다음 홍보물에도 적용해 보기 →'}})();