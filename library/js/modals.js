/* ======================
    Modals
====================== */

/* MODAL LOG IN */


const modalLogin = document.querySelector(".modal_login");
const openModalLogin = document.querySelector(".login-button");
const closeModalLogin = document.querySelector(".modal_login_close-button");

// // Открытие модального окна по клику на иконку юзера
openModalLogin.addEventListener("click", () => {
  modalLogin.showModal();

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
  }, { once: true });
});

modalLogin.addEventListener("click", (e) => {
  if (e.target.nodeName === "DIALOG") {
    modalLogin.close();
  }
});









/* MODAL REGISTER */

const modalRegister = document.querySelector(".modal_register");
const openModalRegister = document.querySelector(".register-button");
const closeModalRegister = document.querySelector(".modal_register_close-button");


// // Открытие модального окна по клику на иконку юзера
openModalRegister.addEventListener("click", () => {
  modalRegister.showModal();
  
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
  }, { once: true });
});

modalRegister.addEventListener("click", (e) => {
  if (e.target.nodeName === "DIALOG") {
    modalRegister.close();
  }
});








// // Без анимации на закрытии модального окна:

// const modalLogin = document.querySelector(".modal_login");
// const openModalLogin = document.querySelector(".login-button");
// const closeModalLogin = document.querySelector(".modal_login_close-button");

// // Открытие модального окна по клику
// openModalLogin.addEventListener("click", () => {
//   modalLogin.showModal();
// });

// // Закрытие модального окна по клику на кнопку закрытия
// closeModalLogin.addEventListener("click", () => {
//   modalLogin.close();
// });

// // Закрытие модального окна по клику вне этого окна
// modalLogin.addEventListener("click", (e) => {
//   if (e.target.nodeName === "DIALOG") {
//     modalLogin.close();
//   }
// });



// const modal = document.querySelector("#modal");
// const openModal = document.querySelector(".open-button");
// const closeModal = document.querySelector(".close-button");


// // Открытие модального окна по клику
// openModal.addEventListener('click', () => {
//   modal.showModal();
// });


// // Закрытие модального окна по клику
// closeModal.addEventListener('click', () => {
//   modal.setAttribute('closing', "");

//   modal.addEventListener('animationend', () => {
//     modal.removeAttribute('closing');
//     modal.close();
//   }, { once: true})
// });


// // Закрытие модального окна при переходе по ссылке



// // Закрытие модального окна по клику вне этого окна
// modal.addEventListener('click', (e) => {
//   if (e.target.nodeName === "DIALOG") {
//     modal.close();
//   }
// })

