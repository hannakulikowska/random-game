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
  profileIcon.classList.add('profile-icon_above'); // Иконка незалогиненного юзера поверх открытого бургер-меню, position:fixed
  document.body.style.overflow = "hidden"; // Блокировка скролла страницы при открытом бургер-меню
};

// Событие по клику - открытие бургер-меню
burgerItem.addEventListener('click', openMenu);


// Удаление классов и добавление транзишн для плавного закрытия меню
const closeMenu = () => {
  menu.classList.remove('nav-active');
  profileIcon.classList.remove('profile-icon_above'); // Удаление position:fixed для иконки незалогиненного юзера
  menu.classList.add('nav-close-transition');
  document.body.style.overflow = "auto"; // Отблокировка скролла после закрытия меню
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
    closeMenu();
  }
  if (profileIcon.contains(target)) {
    event.stopPropagation();
    closeMenu();
    toggleProfileMenu();
  }
});




/* ======================
Открытие/закрытие Profile menu - пользователь не залогинился
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
    МОДАЛЬНЫЕ ОКНА
====================== */
// https://www.youtube.com/watch?v=4prVdA7_6u0




/* =======================================
ОТКРЫТИЕ/ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА REGISTER
(БЕЗ ВЫПОЛНЕНИЯ РЕГИСТРАЦИИ)
======================================= */

const modalRegister = document.querySelector(".modal-register");
const openModalRegister = document.querySelector(".register-button");
const closeModalRegister = document.querySelector(".modal-register_close-button");
const openModalRegisterSignup = document.querySelector(".signup_btn");


// Открытие модального окна Register: клик на иконку юзера -> клик на Register ссылку
function openRegisterModal() {
  openModalRegister.addEventListener("click", () => {
  modalRegister.showModal();
  profileMenuLogin.classList.remove('profile-menu_visible');
  profileMenuLogin.classList.add('profile-menu_hidden');
  // Функция сброса значений инпутов
  resetModalInputs();
  // Выключение скролла страницы при открытом модальном окне
  document.body.style.overflow = "hidden";
  });
}
openRegisterModal();


// Открытие модального окна Register по клику на Sign Up в Library Cards
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


// Закрытие модального окна по клику вне модалки
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






/* ======================
Валидация формы Register
====================== */

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





/* ======================
Генерация номера карты 
пользователя библиотеки - 
случайное 9-значное 
16-ричное число (0-9 A-F)
====================== */

function getRandomCardNumber() {
  const randomNumber = Math.floor(Math.random() * 0x100000000); // Генерация случайного 32-битного числа
  const cardNumber = randomNumber.toString(16).toUpperCase(); // Преобразование в 16-ричное число
  
  // Дополнение числа нулями слева до 9 символов
  const paddedCardNumber = cardNumber.padStart(9, '0');
  
  return paddedCardNumber;
}





/* ======================
РЕГИСТРАЦИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ
====================== */

async function formSend(e) {
  e.preventDefault();

  let error = formValidate(formRegister);


  // Отправка и сохранение в Local Storage данных регистрируемых пользователей
  if (error === 0) {
    
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cardNumber = getRandomCardNumber();

    // Получение данных из Local Storage (если они есть)
    let usersData = JSON.parse(localStorage.getItem("users")) || [];

    // Добавление новых данных в массив
    usersData.push({ firstname, lastname, email, password, cardNumber });

    // Сохранение массива данных в Local Storage
    localStorage.setItem("users", JSON.stringify(usersData));

    modalRegister.close();
    document.body.style.overflow = "auto";
       

    /* ======================
    Пользователь внесен в базу Local Storage
    Cтандартная иконка пользователя заменена на иконку с инициалами нового пользователя
    ====================== */
          
    const profile = document.querySelector('.profile'); // Родительский контейнер
    // const profileIcon = document.querySelector('.profile-icon'); // Стандартная иконка юзера
    const initialsContainer = document.createElement('div'); // Создание блока для иконки с инициалами
    initialsContainer.classList.add('initials-icon'); // Добавление класса созданному блоку
    initialsContainer.textContent = `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`; // Вставка инициалов в блок
    profileIcon.style.display = 'none'; // Скрытие стандартной иконки юзера
    initialsContainer.style.title = `${firstname} ${lastname}`;
    profile.appendChild(initialsContainer); // Добавление блока с инициалами в родительский контейнер
    console.log('User registered and logged in successfully');


    
    // Показ номера карты пользователя в заголовке меню Logout & My profile после первого входа в систему - после регистрации 
    // Эта часть кода работает

    const menuLogoutTitle = document.querySelector(".menu-logout_title");
    menuLogoutTitle.textContent = `${cardNumber}`;


    // Замена классов для открытия и закрытия меню Logout & My profile
    const menuLogout = document.querySelector(".profile-menu_logout");
    const toggleMenuLogout = () => {
      menuLogout.classList.toggle('menu-logout_hidden');
      menuLogout.classList.toggle('menu-logout_visible');
    };

    // Событие по клику по иконке юзера с инициалами:
    const initialsIcon = document.querySelector('.initials-icon'); 
    initialsIcon.addEventListener('click', (event) => {
      event.stopPropagation(); //останавливает срабатывание следующего обработчика на документе, который сразу закрывает меню
      closeMenu(); // закрытие бургер-меню
      toggleMenuLogout(); // функция открытия/закрытия меню Logout & My profile
    });

    // Событие по клику - клик вне области меню приводит к закрытию меню
    document.addEventListener('click', (event) => {
      const target = event.target;
      if (menuLogout.classList.contains('menu-logout_visible') && !menuLogout.contains(target)) {
        menuLogout.classList.remove('menu-logout_visible');
        menuLogout.classList.add('menu-logout_hidden');
      }
    });
    
    
    /* ======================
    ОТКРЫТИЕ/ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА "My profile" (ТАМ ГДЕ СОДЕРЖАТСЯ ВСЕ ДАННЫЕ О ПРОФАЙЛЕ ЮЗЕРА)
    Эта часть кода работает
    ====================== */

    const modalMyProfile = document.querySelector(".modal-profile");
    const openModalMyProfile = document.querySelector(".myprofile-button");
    const closeModalMyProfile = document.querySelector(".modal-profile_close-button");
    const cardNumberMyProfile = document.querySelector(".card-number");
    const copyBtn = document.querySelector('.copy-btn');
    // const openModalRegisterSignup = document.querySelector(".signup_btn");


    // Открытие модального окна My Profile по клику на иконку юзера c инициалами и клику на ссылку меню My Profile
    openModalMyProfile.addEventListener("click", () => {
      modalMyProfile.showModal();
      // Закрытие менюшки "My profile - Log Out"
      menuLogout.classList.remove('menu-logout_visible');
      menuLogout.classList.add('menu-logout_hidden');
      // Показ номера карты пользователя в My Profile
      cardNumberMyProfile.textContent = `${cardNumber}`;
      // Блокировка скролла страницы при открытом модальном окне
      document.body.style.overflow = "hidden";
    });

    // Открытие модального окна по клику на Sign Up в Library Cards
    // openModalRegisterSignup.addEventListener("click", () => {
    //   modalMyProfile.showModal();
    //   profileMenuLogin.classList.remove('profile-menu_visible');
    //   profileMenuLogin.classList.add('profile-menu_hidden');
    //   // Функция сброса значений инпутов
    //   resetModalInputs();
    // });

    // Закрытие модального окна по клику на кнопку закрытия
    closeModalMyProfile.addEventListener("click", () => {

      modalMyProfile.setAttribute("closing", "");

      // Добавление анимации на закрытие
      modalMyProfile.classList.add("closing-animation");

      modalMyProfile.addEventListener('animationend', () => {
        modalMyProfile.removeAttribute("closing");
        modalMyProfile.close();
        // Удаление класса анимации после закрытия
        modalMyProfile.classList.remove("closing-animation");
        // Включение скролла страницы при закрытии модального окна
        document.body.style.overflow = "auto";
      }, { once: true });
    });

    modalMyProfile.addEventListener("click", (e) => {
      if (e.target.nodeName === "DIALOG") {
        modalMyProfile.close();
        document.body.style.overflow = "auto";
      }
    });
    
    // Копирование номера карты кликом по иконке "copy"
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(cardNumberMyProfile.textContent)
        // отчет о копировании в консоль
        .then(() => {
          console.log('Card number copied to clipboard');
        })
        .catch((err) => {
          console.error('Failed to copy card number: ', err);
        });
    });

  }
}

// Инициализация функции отправки данных формы для регистрации пользователя в Local Storage по клику на кнопку submit
const formRegister = document.getElementById("register");
// при отправке формы (submit), осуществляется переход к функции formSend
formRegister.addEventListener("submit", formSend);




/* ============================
ОТКРЫТИЕ/ЗАКРЫТИЕ МОДАЛКИ LOGIN
============================ */

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

// Закрытие модального окна Login по клику на кнопку закрытия
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


/* ====================
ЗАЛОГИНИТЬСЯ В СИСТЕМУ
Номер карты: 0E5D125F4
==================== */

const users = JSON.parse(localStorage.getItem('users'));

function login() {
  const emailOrCardNumber = document.querySelector('.input-login').value;
  const password = document.querySelector('.input-password').value;
  
  const user = users.find((u) => {
    if (emailOrCardNumber.includes('@')) {
      return u.email === emailOrCardNumber;
    }
    return u.cardNumber === emailOrCardNumber;
  });
  
  if (user && user.password === password) {
    console.log('User logged in successfully');
    
    // code to allow the user to access the system here
    modalLogin.close();
    document.body.style.overflow = "auto";

    // Замена стандартной иконки пользователя на иконку с инициалами зарегистрированного ранее пользователя
    const profile = document.querySelector('.profile'); // Родительский контейнер
    const profileIcon = document.querySelector('.profile-icon'); // Стандартная иконка юзера
    const initialsContainer = document.createElement('div'); // Создание блока для иконки с инициалами

    initialsContainer.classList.add('initials-icon'); // Добавление класса созданному блоку
    initialsContainer.textContent = `${user.firstname[0].toUpperCase()}${user.lastname[0].toUpperCase()}`; // Вставка инициалов в блок
    profileIcon.style.display = 'none'; // Скрытие стандартной иконки юзера
    initialsContainer.style.title = `${user.firstname} ${user.lastname}`;
    profile.appendChild(initialsContainer); // Добавление блока с инициалами в родительский контейнер


    // Открытие меню My profile & Logout после успешного входа в систему ранее зарегистрированного пользователя
    // НАЧАЛО КОДА
    // Показ номера карты пользователя в заголовке меню My profile & Logout
    const menuLogoutTitle = document.querySelector(".menu-logout_title");
    menuLogoutTitle.textContent = `${user.cardNumber}`;
    
    // Замена классов для открытия и закрытия меню Logout & My profile
    const menuLogout = document.querySelector(".profile-menu_logout");
    const toggleMenuLogout = () => {
      menuLogout.classList.toggle('menu-logout_hidden');
      menuLogout.classList.toggle('menu-logout_visible');
    };

    // Событие по клику по иконке юзера с инициалами:
    const initialsIcon = document.querySelector('.initials-icon'); 
    initialsIcon.addEventListener('click', (event) => {
      event.stopPropagation(); //останавливает срабатывание следующего обработчика на документе, который сразу закрывает меню
      closeMenu(); // закрытие бургер-меню
      toggleMenuLogout(); // функция открытия/закрытия меню Logout & My profile
    });

    // Событие по клику - клик вне области меню приводит к закрытию меню
    document.addEventListener('click', (event) => {
      const target = event.target;
      if (menuLogout.classList.contains('menu-logout_visible') && !menuLogout.contains(target)) {
        menuLogout.classList.remove('menu-logout_visible');
        menuLogout.classList.add('menu-logout_hidden');
      }
    });
    // КОНЕЦ КОДА

    /* ======================
    ОТКРЫТИЕ/ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА "My profile" (ТАМ ГДЕ СОДЕРЖАТСЯ ВСЕ ДАННЫЕ О ПРОФАЙЛЕ ЮЗЕРА).
    ПОЛЬЗОВАТЕЛЬ ЗАЛОГИНЕН
    ====================== */

    // НАЧАЛО КОДА
    const modalMyProfile = document.querySelector(".modal-profile");
    const openModalMyProfile = document.querySelector(".myprofile-button");
    const closeModalMyProfile = document.querySelector(".modal-profile_close-button");
    const cardNumberMyProfile = document.querySelector(".card-number");
    const copyBtn = document.querySelector('.copy-btn');
    // const openModalRegisterSignup = document.querySelector(".signup_btn");


    // Открытие модального окна My Profile по клику на иконку юзера c инициалами и клику на ссылку меню My Profile
    openModalMyProfile.addEventListener("click", () => {
      modalMyProfile.showModal();
      // Закрытие менюшки "My profile - Log Out"
      menuLogout.classList.remove('menu-logout_visible');
      menuLogout.classList.add('menu-logout_hidden');
      // Показ номера карты пользователя в My Profile
      cardNumberMyProfile.textContent = `${user.cardNumber}`;
      // Блокировка скролла страницы при открытом модальном окне
      document.body.style.overflow = "hidden";
    });

    // Открытие модального окна по клику на Sign Up в Library Cards
    // openModalRegisterSignup.addEventListener("click", () => {
    //   modalMyProfile.showModal();
    //   profileMenuLogin.classList.remove('profile-menu_visible');
    //   profileMenuLogin.classList.add('profile-menu_hidden');
    //   // Функция сброса значений инпутов
    //   resetModalInputs();
    // });

    // Закрытие модального окна по клику на кнопку закрытия
    closeModalMyProfile.addEventListener("click", () => {

      modalMyProfile.setAttribute("closing", "");

      // Добавление анимации на закрытие
      modalMyProfile.classList.add("closing-animation");

      modalMyProfile.addEventListener('animationend', () => {
        modalMyProfile.removeAttribute("closing");
        modalMyProfile.close();
        // Удаление класса анимации после закрытия
        modalMyProfile.classList.remove("closing-animation");
        // Включение скролла страницы при закрытии модального окна
        document.body.style.overflow = "auto";
      }, { once: true });
    });

    modalMyProfile.addEventListener("click", (e) => {
      if (e.target.nodeName === "DIALOG") {
        modalMyProfile.close();
        document.body.style.overflow = "auto";
      }
    });
    
    // Копирование номера карты кликом по иконке "copy"
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(cardNumberMyProfile.textContent)
        // отчет о копировании в консоль
        .then(() => {
          console.log('Card number copied to clipboard');
        })
        .catch((err) => {
          console.error('Failed to copy card number: ', err);
        });
    });
    // КОНЕЦ КОДА

    

  } else {
    console.error('Invalid email/readers card or password');
    alert("Invalid \"Email or readers card\" or \"Password\"");
  }
}

document.querySelector('.modal-login_login-button').addEventListener('click', login);


/* ====================
ВЫЛОГИНИТЬСЯ ИЗ СИСТЕМЫ
==================== */
// НАЧАЛО КОДА
function logout() {
  const profileIcon = document.querySelector(".profile-icon");
  const initialsIcon = document.querySelector(".initials-icon");
  const menuLogout = document.querySelector(".profile-menu_logout");
  initialsIcon.parentNode.removeChild(initialsIcon);
  profileIcon.style.display = 'block'; 
  menuLogout.classList.remove('menu-logout_visible');
  menuLogout.classList.add('menu-logout_hidden');
}

document.querySelector('.logout-button').addEventListener('click', logout);
// КОНЕЦ КОДА














    















// })();

// Greeting

// console.log(`Library Часть 3:
// Done!
// `);

