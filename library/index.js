// Greeting

console.log(`Самопроверка:
1. Вёрстка соответствует макету. Ширина экрана 768px.
2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется.
3. На ширине экрана 768рх реализовано адаптивное меню.`);


// Burger handler

(function () {
  const burgerItem = document.querySelector('.header_burger');
  const menu = document.querySelector('.nav');
  const icon = document.querySelector('.profile-icon');
  const menuCloseItem = document.querySelector('.nav-close');
  const menuCloseTransition = document.querySelector('.nav-close-transition');
  const menuLinks = document.querySelectorAll('.nav-link');

  const openMenu = () => {
    menu.classList.add('nav-active');
    icon.classList.add('profile-icon-fixed');
    
  };

  const closeMenu = () => {
    menu.classList.remove('nav-active');
    icon.classList.remove('profile-icon-fixed');
    menu.classList.add('nav-close-transition');
  };

  burgerItem.addEventListener('click', openMenu);
  menuCloseItem.addEventListener('click', closeMenu);

  if (window.innerWidth <= 1124) {
    for (let i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', closeMenu);
    }
  }

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!menu.contains(target) && !burgerItem.contains(target) && !icon.contains(target)) {
      closeMenu();
    }
  });
})();
