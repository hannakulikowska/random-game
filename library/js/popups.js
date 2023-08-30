// (function () {

/* ======================
      Burger menu
====================== */

  const burgerItem = document.querySelector('.header_burger');
  const menu = document.querySelector('.nav');
  const profileIcon = document.querySelector('.profile-icon');
  const menuCloseItem = document.querySelector('.nav-close');
  const menuLinks = document.querySelectorAll('.nav-link');

  // Добавление классов с транзишн и смещения иконки пользователя левее
  const openMenu = () => {
    menu.classList.add('nav-active');
    // icon.classList.add('profile-icon-fixed');
  };

  // Событие по клику - открытие бургер-меню
  burgerItem.addEventListener('click', openMenu);


  // Удаление классов и добавление транзишн для плавного закрытия меню
  const closeMenu = () => {
    menu.classList.remove('nav-active');
    // icon.classList.remove('profile-icon-fixed');

    menu.classList.add('nav-close-transition');
  };

  // Событие по клику - закрытие бургер-меню
  menuCloseItem.addEventListener('click', closeMenu);
  

  // Закрытие меню при переходе по ссылкам
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', closeMenu);
  }
  
  // Событие по клику - клик вне области меню
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!menu.contains(target) && !burgerItem.contains(target)) {
    // if (!menu.contains(target) && !burgerItem.contains(target)) {
      closeMenu();
    }
    if (profileIcon.contains(target)) {
      event.stopPropagation();
      closeMenu();
      toggleProfileMenu();
    }
  });




/* ======================
      Profile menu
====================== */

  // Поиск элемента (иконки юзера) по классу
  // const userButton = document.querySelector('.profile-icon'); 
  // Поиск элемента (меню) по классу
  const profileMenuLogin = document.querySelector(".profile-menu_login");

  // Замена классов для работы открытия и закрытия меню
  const toggleProfileMenu = () => {
    profileMenuLogin.classList.toggle('profile-menu_hidden');
    profileMenuLogin.classList.toggle('profile-menu_visible');
  };

  /* Событие по клику по иконке юзера:
  1. останавливает срабатывание следующего обработчика на документе, который сразу закрывает меню
  2. закрывает бургер-меню
  3. запускает функцию добавления-удаления классов */
  profileIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    closeMenu();
    toggleProfileMenu();
  });

  // Событие по клику - клик вне области меню приводит к закрытию меню
  document.addEventListener('click', (event) => {
    console.log("Document clicked");
    const target = event.target;
    if (profileMenuLogin.classList.contains('profile-menu_visible') && !profileMenuLogin.contains(target)) {
      console.log("Closing menu due to click outside");
      profileMenuLogin.classList.remove('profile-menu_visible');
      profileMenuLogin.classList.add('profile-menu_hidden');
    }
  });




/* ======================
      Modals
====================== */
// https://www.youtube.com/watch?v=4prVdA7_6u0



/* MODAL LOG IN */


const modalLogin = document.querySelector(".modal-login");
const openModalLogin = document.querySelector(".login-button");
const closeModalLogin = document.querySelector(".modal-login_close-button");
const openModalLoginLogin = document.querySelector(".login_btn");


// Открытие модального окна по клику на иконку юзера
openModalLogin.addEventListener("click", () => {
  modalLogin.showModal();
  profileMenuLogin.classList.remove('profile-menu_visible');
  profileMenuLogin.classList.add('profile-menu_hidden');
  // Отмена скролла страницы при открытом модальном окне
  document.body.style.overflow = "hidden";
});

// Открытие модального окна по клику на Log In в Library Cards
openModalLoginLogin.addEventListener("click", () => {
  modalLogin.showModal();
  profileMenuLogin.classList.remove('profile-menu_visible');
  profileMenuLogin.classList.add('profile-menu_hidden');
  // Отмена скролла страницы при открытом модальном окне
  document.body.style.overflow = "hidden";
});

// Закрытие модального окна по клику на кнопку закрытия
closeModalLogin.addEventListener("click", () => {

  modalLogin.setAttribute("closing", "");

  // Добавление анимации на закрытие
  modalLogin.classList.add("closing-animation");

  modalLogin.addEventListener('animationend', () => {
    modalLogin.removeAttribute("closing");
    modalLogin.close();
    // Удаление класса анимации после закрытия
    modalLogin.classList.remove("closing-animation");
    // Включение скролла страницы при закрытии модального окна
    document.body.style.overflow = "auto";
  }, { once: true });
});

modalLogin.addEventListener("click", (e) => {
  if (e.target.nodeName === "DIALOG") {
    modalLogin.close();
    // Включение скролла страницы при закрытии модального окна
    document.body.style.overflow = "auto";
  }
});



/* MODAL REGISTER */

const modalRegister = document.querySelector(".modal-register");
const openModalRegister = document.querySelector(".register-button");
const closeModalRegister = document.querySelector(".modal-register_close-button");
const openModalRegisterSignup = document.querySelector(".signup_btn");


// Открытие модального окна по клику на иконку юзера
openModalRegister.addEventListener("click", () => {
  modalRegister.showModal();
  profileMenuLogin.classList.remove('profile-menu_visible');
  profileMenuLogin.classList.add('profile-menu_hidden');
  // Функция сброса значений инпутов
  resetModalInputs();
  // Отмена скролла страницы при открытом модальном окне
  document.body.style.overflow = "hidden";
});

// Открытие модального окна по клику на Sign Up в Library Cards
openModalRegisterSignup.addEventListener("click", () => {
  modalRegister.showModal();
  profileMenuLogin.classList.remove('profile-menu_visible');
  profileMenuLogin.classList.add('profile-menu_hidden');
  // Функция сброса значений инпутов
  resetModalInputs();
});

// Закрытие модального окна по клику на кнопку закрытия
closeModalRegister.addEventListener("click", () => {

  modalRegister.setAttribute("closing", "");

  // Добавление анимации на закрытие
  modalRegister.classList.add("closing-animation");

  modalRegister.addEventListener('animationend', () => {
    modalRegister.removeAttribute("closing");
    modalRegister.close();
    // Удаление класса анимации после закрытия
    modalRegister.classList.remove("closing-animation");
    // Включение скролла страницы при закрытии модального окна
    document.body.style.overflow = "auto";
  }, { once: true });
});

modalRegister.addEventListener("click", (e) => {
  if (e.target.nodeName === "DIALOG") {
    modalRegister.close();
    document.body.style.overflow = "auto";
  }
});


// Reset - сброс заполненных полей модального окна регистрации
function resetModalInputs() {
    const inputsRegister = modalRegister.querySelectorAll("input");
    inputsRegister.forEach((input) => {
        input.value = '';
    });
}


// REGISTER FORM VALIDATION

const formRegister = document.getElementById("register");
// при отправке формы (submit), осуществляется переход к функции formSend
formRegister.addEventListener("submit", formSend);

// функция отправки формы
async function formSend(e) {
  e.preventDefault();

  let error = formValidate(formRegister);

  let registerFormData = new registerFormData(formRegister);
  // здесь написать код для отправки данных
  // if (error === 0) {

  // } else {
    
  // }
}


function formValidate(formRegister) {
  let error = 0;
  let formReq = document.querySelectorAll("._req");
  

  for (let index = 0; index < formReq.length; index++) {
    const input = formReq[index];
    formRemoveError(input);

    if (input.classList.contains("_email")) {
      if (emailTest(input)) {
        formAddError(input);
        error++;
      }
    } else if (input.classList.contains("_password")) {
      if (passwordTest(input)) {
        formAddError(input);
        error++;
      }
    } else {
      if (input.value.trim() === "") {
        formAddError(input);
        error++
      }
    }

  }
  return error;
}

function formAddError(input) {
  input.classList.add("_error");
}

function formRemoveError(input) {
  input.classList.remove("_error");
}

function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value.trim());
}

function passwordTest(input) {
  return input.value.length < 8;
}







// })();

// Greeting

// console.log(`Library Часть 3:
// Done!
// `);

