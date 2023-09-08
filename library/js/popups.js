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
  // document.body.style.overflow = "hidden"; // Блокировка скролла страницы при открытом бургер-меню
};

// Событие по клику - открытие бургер-меню
burgerItem.addEventListener('click', openMenu);


// Удаление классов и добавление транзишн для плавного закрытия меню
const closeMenu = () => {
  menu.classList.remove('nav-active');
  profileIcon.classList.remove('profile-icon_above'); // Удаление position:fixed для иконки незалогиненного юзера
  menu.classList.add('nav-close-transition');
  // document.body.style.overflow = "auto"; // Отблокировка скролла после закрытия меню - отключает блокировку скролла при открытом модальном окне
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
const registerLink = document.querySelector(".modal-login_link");
const registerInputs = document.querySelectorAll(".modal-register_form_input");


// Открытие модального окна Register: клик на иконку юзера -> клик на Register ссылку
function openRegisterModal() {
  openModalRegister.addEventListener("click", () => {
  modalRegister.showModal();
  profileMenuLogin.classList.remove('profile-menu_visible');
  profileMenuLogin.classList.add('profile-menu_hidden');
  resetModalInputs(); // Функция сброса значений инпутов
  document.body.style.overflow = "hidden"; // Выключение скролла страницы при открытом модальном окне
  });
}
openRegisterModal();


// Открытие модального окна Register по клику на Sign Up в Library Cards
openModalRegisterSignup.addEventListener("click", () => {
  modalRegister.showModal();
  profileMenuLogin.classList.remove('profile-menu_visible');
  profileMenuLogin.classList.add('profile-menu_hidden');
  resetModalInputs(); // Функция сброса значений инпутов
  document.body.style.overflow = "hidden"; // Выключение скролла страницы при открытом модальном окне
});


// Открытие модального окна Register по клику на линк Register в модалке Login
registerLink.addEventListener("click", () => {
  modalLogin.close();
  modalRegister.showModal();
  resetModalInputs(); // Функция сброса значений инпутов
  document.body.style.overflow = "hidden"; // Выключение скролла страницы при открытом модальном окне
});


// Закрытие модального окна по клику на кнопку закрытия
closeModalRegister.addEventListener("click", () => {
  // Удаление красного бордера с инпутов
  registerInputs.forEach((input) => {
    input.classList.remove("_error");
  });

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
    // Удаление красного бордера с инпутов
    registerInputs.forEach((input) => {
      input.classList.remove("_error");
    });
    
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
ВАЛИДАЦИЯ ФОРМЫ REGISTER
====================== */

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
        error++;
      }
    }

  }
  return error;
}


/* ============================
РЕГИСТРАЦИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ
============================ */

// Инициализация функции отправки данных формы для регистрации пользователя в Local Storage по клику на кнопку submit
const formRegister = document.getElementById("register");
// при отправке формы (submit), осуществляется переход к функции formSend
formRegister.addEventListener("submit", formSend);

let registeredUserEmail; // Объявление переменной для хранения email зарегистрированного пользователя


// Функция отправки данных формы регистрации 
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
    let visitCount = 1;
    let bookCount = 0;
    let libraryCardPurchased = false;

    // Сохранение email зарегистрированного пользователя в переменной
    registeredUserEmail = email;

    // Получение данных из Local Storage (если они есть)
    let user = JSON.parse(localStorage.getItem("users")) || [];

    // Добавление новых данных в массив
    user.push({ firstname, lastname, email, password, cardNumber, visitCount, bookCount, libraryCardPurchased });

    // Сохранение/обновление массива данных в Local Storage
    localStorage.setItem("users", JSON.stringify(user));
    
    // Обновление счетчика Visits в модалке My Profile
    document.querySelector(".visits_count").textContent = visitCount;

    modalRegister.close();
    document.body.style.overflow = "auto";

    console.log('User registered and logged in successfully');
       

    /* ======================
    Пользователь уже внесен в базу Local Storage:
    Cтандартная иконка пользователя заменяется на иконку с инициалами пользователя
    ====================== */
          
    const profile = document.querySelector('.profile'); // Родительский контейнер
    // const profileIcon = document.querySelector('.profile-icon'); // Стандартная иконка юзера
    const initialsContainer = document.createElement('div'); // Создание блока для иконки с инициалами
    initialsContainer.classList.add('initials-icon'); // Добавление класса созданному блоку
    initialsContainer.textContent = `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`; // Вставка инициалов в блок
    profileIcon.style.display = 'none'; // Скрытие стандартной иконки юзера
    initialsContainer.style.title = `${firstname} ${lastname}`;
    profile.appendChild(initialsContainer); // Добавление блока с инициалами в родительский контейнер
    


    // Вставка номера карты пользователя в заголовке меню Logout & My profile после первого входа в систему - после регистрации 

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
    ПЕРВЫЙ ВХОД ПОЛЬЗОВАТЕЛЯ (РЕГИСТРАЦИЯ)
    ====================== */

    const modalMyProfile = document.querySelector(".modal-profile");
    const openModalMyProfile = document.querySelector(".myprofile-button");
    const closeModalMyProfile = document.querySelector(".modal-profile_close-button");
    const cardNumberMyProfile = document.querySelector(".card-number");
    const initialsMyProfile = document.querySelector(".aside_initials");
    const fullnameMyProfile = document.querySelector(".aside_full-name");
    const copyBtn = document.querySelector('.copy-btn');
    // const openModalRegisterSignup = document.querySelector(".signup_btn");


    // Открытие модального окна My Profile по клику на иконку юзера c инициалами и клику на ссылку меню My Profile
    openModalMyProfile.addEventListener("click", () => {
      modalMyProfile.showModal();
      // Закрытие менюшки "My profile - Log Out"
      menuLogout.classList.remove('menu-logout_visible');
      menuLogout.classList.add('menu-logout_hidden');
      // Вставка инициалов юзера в модальное окно My Profile
      initialsMyProfile.textContent = `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
      // Вставка полного имени юзера в модальное окно My Profile
      fullnameMyProfile.textContent = `${firstname} ${lastname}`;
      // Вставка номера карты пользователя в My Profile
      cardNumberMyProfile.textContent = `${cardNumber}`;
      // Блокировка скролла страницы при открытом модальном окне
      document.body.style.overflow = "hidden";
    });


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


    /* ====================================
    ЛОГИКА КНОПКИ `BUY` В FAVORITES - ПЕРВЫЙ ВХОД ПОЛЬЗОВАТЕЛЯ (РЕГИСТРАЦИЯ)
    1. `BUY` => `OWN` + счетчик bookCount
    2. `BUY` => `BUY A LIBRARY CARD` MODAL
    ==================================== */

    buyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(user => user.email === registeredUserEmail);
        // Проверка, что Library Card куплена пользователем
        if (users[userIndex].libraryCardPurchased === true) {
          // Проверка, что кнопка не имеет атрибута disabled (не была нажата ранее)
          if (!button.hasAttribute("disabled")) {

            // Получение информации о книге из DOM
            const bookTitle = button.parentElement.querySelector(".book-title").textContent;
            const bookAuthor = button.parentElement.querySelector(".book-author").textContent;

            // Создание объекта (выбранная книга)
            const selectedBook = {
              title: bookTitle,
              author: bookAuthor
            };

            // Добавление выбранной книги в массив книг пользователя
            users[userIndex].rentedBooks = users[userIndex].rentedBooks || [];
            users[userIndex].rentedBooks.push(selectedBook);
                
            // Добавление +1 в счетчике bookCount
            users[userIndex].bookCount += 1;
            // Обновление данных пользователя в Local Storage
            localStorage.setItem("users", JSON.stringify(users));
            
            // Обновление счетчика Books в модалке My Profile
            document.querySelector(".books_count").textContent = users[userIndex].bookCount;


            // Закрытие модалки
            modalBuyCard.close();
            modalLogin.close();
            document.body.style.overflow = "auto";
            // Замена кнопки Buy на Own
            button.textContent = "Own";
            button.classList.remove("buy_btn");
            button.classList.add("own_btn");
            button.setAttribute("disabled", "");


            // ВСТАВКА RENTED BOOKS LIST В MY PROFILE (РЕГИСТРАЦИЯ)

            // Получение ul, куда надо вставить список выбранных книг
            const rentedBooksList = document.querySelector(".rented-books_list");
            // Получение списка выбранных книг пользователя из массива, полученного из Local Storage
            const rentedBooks = users[userIndex].rentedBooks || [];
            // Очистка текущего списка книг в html, если он уже существует (список обновляется при каждом клике на кнопку Buy)
            rentedBooksList.innerHTML = "";
            // Создание списка на основе данных из Local Storage и вставка их в DOM
            rentedBooks.forEach(book => {
              const listItem = document.createElement("li");
              listItem.classList.add("rented-books_book");
              listItem.textContent = `${book.title}, ${book.author}`;
              rentedBooksList.appendChild(listItem);
            });

          }
        }
        // Если Library Card не куплена
        else {
          modalBuyCard.showModal();
          modalLogin.close();
          document.body.style.overflow = "hidden";
        }
      });
    });


    // "ПОКУПКА" КАРТЫ
    // ПЕРВЫЙ ВХОД ПОЛЬЗОВАТЕЛЯ (РЕГИСТРАЦИЯ)

    buyCardBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Предотвращение отправки формы
      let error = validateFormBuyCard(formBuyCard); // Обязательна предварительная валидация формы

      //Если валидация формы прошла успешно
      if (error === 0) {
        // Закрытие модального окна `Buy A Library Card`
        closeBuyCardModal();
        console.log('User bought a library card');
        
        // Получение всех данных из Local Storage
        const users = JSON.parse(localStorage.getItem('users'));
        
        // Поиск индекса юзера в полученных данных массива users по емэилу
        const userIndex = users.findIndex(user => user.email === registeredUserEmail);

        // userIndex содержит индекс зарегистрированного пользователя в массиве users. Если индекс существует, то выполняется код
        if (userIndex !== -1) {
          console.log(`Индекс пользователя: ${userIndex}`);
          // Присвоение нового значения libraryCardPurchased
          users[userIndex].libraryCardPurchased = true;
          // Обновление данных в Local Storage
          localStorage.setItem("users", JSON.stringify(users));
      
        } else {
          console.log('Пользователь не найден');
        }
      }
    });

  }
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




/* ============================
ОТКРЫТИЕ/ЗАКРЫТИЕ МОДАЛКИ LOGIN
============================ */

const modalLogin = document.querySelector(".modal-login");
const openModalLogin = document.querySelector(".login-button");
const closeModalLogin = document.querySelector(".modal-login_close-button");
const openModalLoginLogin = document.querySelector(".login_btn");
const loginLink = document.querySelector(".modal-register_link");

/* =================================
ЛОГИКА КНОПКИ BUY В FAVORITES ДЛЯ 
НЕАВТОРИЗОВАННОГО ПОЛЬЗОВАТЕЛЯ
1. `BUY` => `LOGIN` MODAL
2. `BUY` => `BUY A LIBRARY CARD` MODAL
================================= */

const buyButtons = document.querySelectorAll(".buy_btn");
const modalBuyCard = document.querySelector(".modal-buycard");
const closeModalBuyCard = document.querySelector(".modal-buycard_close-button");
const buycardInputs = document.querySelectorAll(".modal-buycard_form_input");

// Открытие модального окна Login по клику на кнопку Buy в Favorites    
buyButtons.forEach((button) => {
  if (profileIcon.style.display !== "none") {
    button.addEventListener("click", () => {
      modalLogin.showModal();
      document.body.style.overflow = "hidden";
    });
  }
  // else if (profileIcon.style.display === "none") {
  //   modalLogin.close();
  //   modalBuyCard.showModal();
  //   document.body.style.overflow = "hidden";
  // }
});

// Открытие модального окна Login по клику на иконку юзера
openModalLogin.addEventListener("click", () => {
  modalLogin.showModal();
  profileMenuLogin.classList.remove('profile-menu_visible');
  profileMenuLogin.classList.add('profile-menu_hidden');
  // Отмена скролла страницы при открытом модальном окне
  document.body.style.overflow = "hidden";
});


// Открытие модального окна Login по клику на Log In в Library Cards
openModalLoginLogin.addEventListener("click", () => {
  modalLogin.showModal();
  profileMenuLogin.classList.remove('profile-menu_visible');
  profileMenuLogin.classList.add('profile-menu_hidden');
  // Отмена скролла страницы при открытом модальном окне
  document.body.style.overflow = "hidden";
});


// Открытие модального окна Login по клику на линк Login в модалке Register
loginLink.addEventListener("click", () => {
  modalRegister.close();
  modalLogin.showModal();
  resetModalInputs(); // Функция сброса значений инпутов
  document.body.style.overflow = "hidden"; // Выключение скролла страницы при открытом модальном окне
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
==================== */

const users = JSON.parse(localStorage.getItem('users'));

function login() {
  const emailOrCardNumber = document.querySelector('.input-login').value;
  const password = document.querySelector('.input-password').value;
  
  // Аутентификация пользователя - проверка есть ли в Local Storage такие емэил или номер карты
  const user = users.find((u) => {
    if (emailOrCardNumber.includes('@')) {
      return u.email === emailOrCardNumber;
    }
    return u.cardNumber === emailOrCardNumber;
  });
  
  // Если, введенные в форме Login, логин и пароль совпадают с данными с базы Local Storage, то пользователь будет залогинен в системе
  if (user && user.password === password) {

    // ПОЛЬЗОВАТЕЛЬ ПОЛУЧИЛ ДОСТУП К СИСТЕМЕ

    console.log('User logged in successfully');

    // Увеличение счетчика на 1 по конкретному пользователю при каждом входе в систему
    user.visitCount++;
    console.log(user.visitCount);
    // Сохранение обновленного массива users в Local Storage
    localStorage.setItem('users', JSON.stringify(users));
    // Обновление счетчика Visits в модалке My Profile
    document.querySelector(".visits_count").textContent = user.visitCount;
    // Обновление счетчика Books в модалке My Profile
    document.querySelector(".books_count").textContent = user.bookCount;


    // СОЗДАНИЕ СПИСКА РАНЕЕ ЗАРЕЗЕРВИРОВАННЫХ КНИГ, ХРАНЯЩИХСЯ В LOCAL STORAGE и ЗАМЕНА КНОПКИ НА OWN
    // Получение ul, куда надо вставить список выбранных книг
    const rentedBooksList = document.querySelector(".rented-books_list");
    // Получение списка выбранных книг пользователя из массива, полученного из Local Storage
    const rentedBooks = user.rentedBooks || [];

    // Перебор книг в HTML и последующая проверка есть ли книга в rentedBooks (зарезервирована ли она ранее)
    buyButtons.forEach(button => {
      const bookTitle = button.parentElement.querySelector(".book-title").textContent;
      const bookAuthor = button.parentElement.querySelector(".book-author").textContent;
      // Проверка есть ли книга в списке rentedBooks
      const isBookOwned = rentedBooks.some(book => {
        return book.title === bookTitle && book.author === bookAuthor;
      });
      // Если книга найдена, то кнопка Buy меняется на Оwn
      if (isBookOwned) {
        button.textContent = "Own";
        button.classList.remove("buy_btn");
        button.classList.add("own_btn");
        button.setAttribute("disabled", "");
      }
    });
    
    // Очистка текущего списка книг в html, если он уже существует (список обновляется при каждом клике на кнопку Buy)
    rentedBooksList.innerHTML = "";
    // Создание списка на основе данных из Local Storage и вставка их в DOM
    rentedBooks.forEach(book => {
      const listItem = document.createElement("li");
      listItem.classList.add("rented-books_book");
      listItem.textContent = `${book.title}, ${book.author}`;
      rentedBooksList.appendChild(listItem);
    });


    // Закрытие модалки Login и возвращение скролла для body
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
    const initialsMyProfile = document.querySelector(".aside_initials");
    const fullnameMyProfile = document.querySelector(".aside_full-name");
    const copyBtn = document.querySelector(".copy-btn");
    // const openModalRegisterSignup = document.querySelector(".signup_btn");


    // Открытие модального окна My Profile по клику на иконку юзера c инициалами и клику на ссылку меню My Profile
    openModalMyProfile.addEventListener("click", () => {
      modalMyProfile.showModal();
      // Закрытие менюшки "My profile - Log Out"
      menuLogout.classList.remove('menu-logout_visible');
      menuLogout.classList.add('menu-logout_hidden');
      // Вставка инициалов юзера в модальное окно My Profile
      initialsMyProfile.textContent = `${user.firstname[0].toUpperCase()}${user.lastname[0].toUpperCase()}`;
      // Вставка полного имени юзера в модальное окно My Profile
      fullnameMyProfile.textContent = `${user.firstname} ${user.lastname}`;
      // Вставка номера карты пользователя в My Profile
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

    /* ====================================================
    "ПОКУПКА" КАРТЫ И ЗАКРЫТИЕ ФОРМЫ BUY A LIBRARY CARD
    (ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН)
    ==================================================== */
    buyCardBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Предотвращение отправки формы
      let error = validateFormBuyCard(formBuyCard); // Обязательна предварительная валидация формы

      if (error === 0) {
        
        closeBuyCardModal();
        console.log('User bought a library card');
        
        user.libraryCardPurchased = true;
        // Обновление данных в Local Storage
        localStorage.setItem("users", JSON.stringify(users));
        
        console.log('Purchase data for the card by the user has been entered into Local Storage'); 
      }
    });


    /* ====================================================
    ЛОГИКА КНОПКИ `BUY` В FAVORITES (ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН)
    1. `BUY` => `OWN`
    2. `BUY` => `BUY A LIBRARY CARD` MODAL
    ==================================================== */
    
    buyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Проверка, что Library Card куплена пользователем
        if (user.libraryCardPurchased === true) {
          // Проверка, что кнопка не имеет атрибута disabled (не была нажата ранее)
          if (!button.hasAttribute("disabled")) {
            
            // Получение информации о книге из DOM
            const bookTitle = button.parentElement.querySelector(".book-title").textContent;
            const bookAuthor = button.parentElement.querySelector(".book-author").textContent;

            // Создание объекта (выбранная книга)
            const selectedBook = {
              title: bookTitle,
              author: bookAuthor
            };

            // Добавление выбранной книги в массив книг пользователя
            user.rentedBooks = user.rentedBooks || [];
            user.rentedBooks.push(selectedBook);

      
            // Добавление 1 в счетчике bookCount
            user.bookCount += 1;
            localStorage.setItem("users", JSON.stringify(users));

            // // Получение обновленных данных из Local Storage
            // const users = JSON.parse(localStorage.getItem('users'));
            // Обновление счетчика Books в модалке My Profile
            document.querySelector(".books_count").textContent = user.bookCount;

            // Закрытие модалки
            modalLogin.close();
            document.body.style.overflow = "auto";
            // Замена кнопки Buy на Own
            button.textContent = "Own";
            button.classList.remove("buy_btn");
            button.classList.add("own_btn");
            button.setAttribute("disabled", "");

            // Создание списка ранее зарезервированных книг, хранящихся в Local Storage
            // Очистка текущего списка книг в html, если он уже существует (список обновляется при каждом клике на кнопку Buy)
            rentedBooksList.innerHTML = "";
            // Создание списка на основе данных из Local Storage и вставка их в DOM
            rentedBooks.forEach(book => {
              const listItem = document.createElement("li");
              listItem.classList.add("rented-books_book");
              listItem.textContent = `${book.title}, ${book.author}`;
              rentedBooksList.appendChild(listItem);
            });

          }
        }
        // Если Library Card не куплена
        else {
          modalBuyCard.showModal();
          modalLogin.close();
          document.body.style.overflow = "hidden";
        }
      });
    });

  }
  // Если логин и пароль, введенные в форме Login, НЕ совпадают с данными с базы Local Storage, то пользователь залогинен в системе НЕ будет
  else {
    console.error('Invalid email/readers card or password');
    alert("Invalid \"Email or readers card\" or \"Password\"");
    document.body.style.overflow = "auto";
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
  window.location.reload(); // Перезагрузка текущей страницы сайта
}

document.querySelector('.logout-button').addEventListener('click', logout);
// КОНЕЦ КОДА






/* =================================
ЗАКРЫТИЕ `BUY A LIBRARY CARD` MODAL
(ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН)
================================= */

// Функция закрытия модального окна `Buy A Library Card` с плавным исчезновением
function closeBuyCardModal() {
  modalBuyCard.setAttribute("closing", "");

  // Добавление анимации на закрытие
  modalBuyCard.classList.add("closing-animation");

  modalBuyCard.addEventListener('animationend', () => {
    modalBuyCard.removeAttribute("closing");
    modalBuyCard.close();
    // Удаление класса анимации после закрытия
    modalBuyCard.classList.remove("closing-animation");
    // Включение скролла страницы при закрытии модального окна
    document.body.style.overflow = "auto";
  }, { once: true });
}


// Закрытие модального окна Buy Card по клику на крестик
closeModalBuyCard.addEventListener("click", () => {
  buycardInputs.forEach((input) => {
    input.classList.remove("_error");
  });

  closeBuyCardModal(); // Вызов функции закрытия модалки
})


// Закрытие модального окна по клику вне модалки
modalBuyCard.addEventListener("click", (e) => {
  if (e.target.nodeName === "DIALOG") {
    // Удаление красного бордера с инпутов
    buycardInputs.forEach((input) => {
      input.classList.remove("_error");
    });

    closeBuyCardModal(); // Вызов функции закрытия модалки
  }
});



/* =================================
ВАЛИДАЦИЯ ФОРМЫ `BUY A LIBRARY CARD`
(ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН)
================================= */

const formBuyCard = document.getElementById("modal-buycard_form");
const buyCardBtn = document.querySelector(".modal-buycard_buy-button");

// Функция для проверки, должна ли кнопка быть активной
function checkButtonState() {
  const inputs = formBuyCard.querySelectorAll("._required");
  let validateFormBuyCard = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      validateFormBuyCard = false;
    }
  });

  // Если форма валидна - кнопка активна
  if (validateFormBuyCard) {
    buyCardBtn.removeAttribute("disabled");
  } else {
    // Если форма не валидна - кнопка не активна
    buyCardBtn.setAttribute("disabled", "");
  }
}

// Функция для ограничения ввода только цифрами
function allowOnlyNumbers(event) {
  const input = event.target;
  input.value = input.value.replace(/\D/g, ""); // Всё, что не является цифрами, не вводится в поле
}

// Добавление обработчика на изменение полей формы
formBuyCard.addEventListener("input", checkButtonState);

// Добавление обработчика для ограничения ввода только цифрами
const numInputs = formBuyCard.querySelectorAll("._num");

numInputs.forEach((input) => {
  input.addEventListener("input", allowOnlyNumbers);
});

// Инициализация состояния кнопки при загрузке модального окна
checkButtonState();



function cvcTest(input) {
  return input.value.length === 3;
}
function bankcardTest(input) {
  return input.value.replace(/\s/g, "").length === 16; // удаление введенных пробелов
}
function expTest(input) {
  return input.value.length === 2;
}


function validateFormBuyCard(formBuyCard) {
  let error = 0;
  let formReq = document.querySelectorAll("._required");

  for (let index = 0; index < formReq.length; index++) {
    const input = formReq[index];
    formRemoveError(input);

    if (input.classList.contains("_cvc")) {
      if (!cvcTest(input)) {
        formAddError(input);
        error++;
      }
    } else if (input.classList.contains("_bankcard")) {
      if (!bankcardTest(input)) {
        formAddError(input);
        error++;
      }
    } else if (input.classList.contains("_exp1") || input.classList.contains("_exp2")) {
      if (!expTest(input)) {
        formAddError(input);
        error++;
      }
    } else {
      if (input.value.trim() === "") {
        formAddError(input);
        error++;
      }
    }
  }

  // Если успешная валидация, удаляются классы _error
  if (error === 0) {
    let inputs = formBuyCard.querySelectorAll("._required");
    // const buyCardBtn = document.querySelector(".modal-buycard_buy-button");
    
    // Удаление класса _error
    inputs.forEach((input) => {
      formRemoveError(input);
    });
  }

  return error;
}







//  N   // После покупки карты библиотеки:
//  1   // кнопки Buy меняются на Own при клике если у пользователя libraryCardPurchased = true в Local Storage
//  2   // купленные книги добавляются в список Rented books
//  3   // включается счетчик bookCount (данные сохраняются в Local Storage и выводятся в модалке My Profile)







    















// })();

// Greeting

// console.log(`Library Часть 3:
// Done!
// `);

