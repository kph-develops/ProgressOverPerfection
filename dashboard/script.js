const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const backdrop = document.querySelector('.menu-backdrop');

const closeMenu = () => {
  toggle.setAttribute('aria-expanded', 'false');
  menu.classList.remove('open');
  if (backdrop) {
    backdrop.classList.remove('visible');
    backdrop.setAttribute('hidden', '');
  }
};

const openMenu = () => {
  toggle.setAttribute('aria-expanded', 'true');
  menu.classList.add('open');
  if (backdrop) {
    backdrop.removeAttribute('hidden');
    requestAnimationFrame(() => backdrop.classList.add('visible'));
  }
};

const handleToggle = () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    closeMenu();
  } else {
    openMenu();
  }
};

if (toggle && menu) {
  toggle.addEventListener('click', handleToggle);
  menu.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      closeMenu();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      if (backdrop) {
        backdrop.classList.remove('visible');
        backdrop.setAttribute('hidden', '');
      }
    }
  });
}
