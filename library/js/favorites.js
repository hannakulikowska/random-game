// ВАРИАНТ 1
// const winterBooks = document.querySelector('.winter-books');
// const springBooks = document.querySelector('.spring-books');
// const summerBooks = document.querySelector('.summer-books');
// const autumnBooks = document.querySelector('.autumn-books');

// const radiobtnWinter = document.querySelector('.radiobtn-winter');
// const radiobtnSpring = document.querySelector('.radiobtn-spring');
// const radiobtnSummer = document.querySelector('.radiobtn-summer');
// const radiobtnAutumn = document.querySelector('.radiobtn-autumn');

// // Скрытие всех книг
// function hideBooks() {
//   winterBooks.classList.add('invisible');
//   springBooks.classList.add('invisible');
//   summerBooks.classList.add('invisible');
//   autumnBooks.classList.add('invisible');
// }


// function showBooks(books) {
//   hideBooks();
//   books.classList.remove('invisible');
// }

// // По умолчанию показываются зимние книги, поскольку Winter радио-кнопка чекнута по умолчанию
// showBooks(winterBooks);


// // Добавление обработчика для каждой радио-кнопки
// radiobtnWinter.addEventListener('click', function () {
//   // if (this.checked) {
//     console.log("Winter books selected");
//     showBooks(winterBooks);
//   // }
// });

// radiobtnSpring.addEventListener('click', function () {
//   console.log("Spring books selected");
//   showBooks(springBooks);
// });

// radiobtnSummer.addEventListener('click', function () {
//   console.log("Summer books selected");
//   showBooks(summerBooks);
// });

// radiobtnAutumn.addEventListener('click', function () {
//   console.log("Autumn books selected");
//   showBooks(autumnBooks);
// });






// ВАРИАНТ 2 - работает
const winterBooks = document.querySelector(".winter-books");
const springBooks = document.querySelector(".spring-books");
const summerBooks = document.querySelector(".summer-books");
const autumnBooks = document.querySelector(".autumn-books");

const radiobtnWinter = document.querySelector(".winter-btn");
const radiobtnSpring = document.querySelector(".spring-btn");
const radiobtnSummer = document.querySelector(".summer-btn");
const radiobtnAutumn = document.querySelector(".autumn-btn");


// Скрытие всех книг
function hideBooks() {
  winterBooks.classList.remove("visible-books");
  springBooks.classList.remove("visible-books");
  summerBooks.classList.remove("visible-books");
  autumnBooks.classList.remove("visible-books");
}


function showBooks(books) {
  hideBooks();
  books.classList.add("visible-books");
}

// По умолчанию показываются зимние книги, поскольку Winter радио-кнопка чекнута по умолчанию
showBooks(winterBooks);

radiobtnWinter.addEventListener('click', function () {
  console.log("Winter radio-button is clicked");
  hideBooks();
  showBooks(winterBooks);
});

radiobtnSpring.addEventListener('click', function () {
  console.log("Spring radio-button is clicked");
  hideBooks();
  showBooks(springBooks);
});

radiobtnSummer.addEventListener('click', function () {
  console.log("Summer radio-button is clicked");
  hideBooks();
  showBooks(summerBooks);
});

radiobtnAutumn.addEventListener('click', function () {
  console.log(" radio-button is clicked");
    hideBooks();
    showBooks(autumnBooks);
});





// ВАРИАНТ 3
// const winterBooks = document.querySelector(".winter-books");
// const springBooks = document.querySelector(".spring-books");
// const summerBooks = document.querySelector(".summer-books");
// const autumnBooks = document.querySelector(".autumn-books");

// const radiobtnWinter = document.querySelector(".winter-btn");
// const radiobtnSpring = document.querySelector(".spring-btn");
// const radiobtnSummer = document.querySelector(".summer-btn");
// const radiobtnAutumn = document.querySelector(".autumn-btn");


// // Скрытие всех книг
// function hideBooks(books) {
//   books.style.opacity = 0; // Устанавливаем непрозрачность на 0
//   setTimeout(() => {
//     books.classList.remove("visible-books");
//   }, 1000); // После смены непрозрачности, через 1 секунду убираем класс
// }


// function showBooks(books) {
//   hideBooks(books); // Сначала скрываем предыдущие книги
//   setTimeout(() => {
//     books.style.opacity = 1; // Постепенно увеличиваем непрозрачность
//     books.classList.add("visible-books");
//   }, 1000); // После скрытия, через 1 секунду делаем блок видимым
// }

// // По умолчанию показываются зимние книги, поскольку Winter радио-кнопка чекнута по умолчанию
// showBooks(winterBooks);

// radiobtnWinter.addEventListener('click', function () {
//   console.log("Winter radio-button is clicked");
//   hideBooks(springBooks);
//   hideBooks(summerBooks);
//   hideBooks(autumnBooks);

//   showBooks(winterBooks);
// });

// radiobtnSpring.addEventListener('click', function () {
//   console.log("Spring radio-button is clicked");
//   hideBooks(winterBooks);
//   hideBooks(summerBooks);
//   hideBooks(autumnBooks);

//   showBooks(springBooks);
// });

// radiobtnSummer.addEventListener('click', function () {
//   console.log("Summer radio-button is clicked");
//   hideBooks(springBooks);
//   hideBooks(winterBooks);
//   hideBooks(autumnBooks);

//   showBooks(summerBooks);
// });

// radiobtnAutumn.addEventListener('click', function () {
//   console.log(" radio-button is clicked");
//   hideBooks(summerBooks);
//   hideBooks(springBooks);
//   hideBooks(winterBooks);

//   showBooks(autumnBooks);
// });







// Вариант4

// const winterBooks = document.querySelector(".winter-books");
// const springBooks = document.querySelector(".spring-books");
// const summerBooks = document.querySelector(".summer-books");
// const autumnBooks = document.querySelector(".autumn-books");

// const radiobtnWinter = document.querySelector(".winter-btn");
// const radiobtnSpring = document.querySelector(".spring-btn");
// const radiobtnSummer = document.querySelector(".summer-btn");
// const radiobtnAutumn = document.querySelector(".autumn-btn");

// const animationDuration = 1000; // Длительность анимации в миллисекундах

// let currentAnimationId; // Идентификатор текущей анимации

// function hideBooks(books) {
//   cancelAnimationFrame(currentAnimationId); // Отменяем текущую анимацию
//   const start = performance.now(); // Время начала анимации
//   const initialOpacity = parseFloat(getComputedStyle(books).opacity); // Начальная непрозрачность
//   function animateHide(time) {
//     const elapsed = time - start;
//     if (elapsed < animationDuration) {
//       const opacity = 1 - (elapsed / animationDuration);
//       books.style.opacity = initialOpacity * opacity;
//       currentAnimationId = requestAnimationFrame(animateHide);
//     } else {
//       books.style.opacity = 0;
//       books.classList.remove("visible-books");
//     }
//   }
//   currentAnimationId = requestAnimationFrame(animateHide);
// }

// function showBooks(books) {
//   cancelAnimationFrame(currentAnimationId); // Отменяем текущую анимацию
//   const start = performance.now(); // Время начала анимации
//   const initialOpacity = parseFloat(getComputedStyle(books).opacity); // Начальная непрозрачность
//   function animateShow(time) {
//     const elapsed = time - start;
//     if (elapsed < animationDuration) {
//       const opacity = elapsed / animationDuration;
//       books.style.opacity = initialOpacity + (1 - initialOpacity) * opacity;
//       currentAnimationId = requestAnimationFrame(animateShow);
//     } else {
//       books.style.opacity = 1;
//       books.classList.add("visible-books");
//     }
//   }
//   currentAnimationId = requestAnimationFrame(animateShow);
// }

// // По умолчанию показываются зимние книги, поскольку Winter радио-кнопка чекнута по умолчанию
// showBooks(winterBooks);

// radiobtnWinter.addEventListener("click", function () {
//   console.log("Winter radio-button is clicked");
//   hideBooks(springBooks);
//   hideBooks(summerBooks);
//   hideBooks(autumnBooks);

//   showBooks(winterBooks);
// });

// radiobtnSpring.addEventListener("click", function () {
//   console.log("Spring radio-button is clicked");
//   hideBooks(winterBooks);
//   hideBooks(summerBooks);
//   hideBooks(autumnBooks);

//   showBooks(springBooks);
// });

// radiobtnSummer.addEventListener("click", function () {
//   console.log("Summer radio-button is clicked");
//   hideBooks(springBooks);
//   hideBooks(winterBooks);
//   hideBooks(autumnBooks);

//   showBooks(summerBooks);
// });

// radiobtnAutumn.addEventListener("click", function () {
//   console.log(" radio-button is clicked");
//   hideBooks(summerBooks);
//   hideBooks(springBooks);
//   hideBooks(winterBooks);

//   showBooks(autumnBooks);
// });





// Вариант 5

// const winterBooks = document.querySelector(".winter-books");
// const springBooks = document.querySelector(".spring-books");
// const summerBooks = document.querySelector(".summer-books");
// const autumnBooks = document.querySelector(".autumn-books");

// const radiobtnWinter = document.querySelector(".winter-btn");
// const radiobtnSpring = document.querySelector(".spring-btn");
// const radiobtnSummer = document.querySelector(".summer-btn");
// const radiobtnAutumn = document.querySelector(".autumn-btn");

// // Создать флаг для каждого блока книг
// let winterBooksTransition = false;
// let springBooksTransition = false;
// let summerBooksTransition = false;
// let autumnBooksTransition = false;


// // Добавить обработчик события transitionend к каждому блоку книг
// winterBooks.addEventListener('transitionend', function() {
//   winterBooksTransition = false; // Сбросить флаг, когда анимация завершена
// });
// springBooks.addEventListener('transitionend', function() {
//   springBooksTransition = false;
// });
// summerBooks.addEventListener('transitionend', function() {
//   summerBooksTransition = false;
// });
// autumnBooks.addEventListener('transitionend', function() {
//   autumnBooksTransition = false;
// });


// function hideBooks(books){
//   if (books.style.opacity == 1) { // Проверить, что блок книг видим
//     books.style.transition = 'none'; // Отменить анимацию
//     books.style.opacity = 0; // Установить прозрачность в 0
//     books.classList.remove("visible-books")
//     books.style.zIndex = 1; // Установить z-index в 1 для невидимого блока
//   }
// }

// function showBooks(books){
//   hideBooks(books); // Скрыть другие блоки книг
//   setTimeout(()=>{
//     books.style.transition = 'opacity 1s ease-in-out'; // Включить анимацию появления
//     books.style.opacity = 1; // Установить прозрачность в 1
//     books.classList.add("visible-books")
//   },1000)
//   books.style.zIndex = 4; // Установить z-index в 4 для видимого блока
// }


// // По умолчанию показываются зимние книги, поскольку Winter радио-кнопка чекнута по умолчанию
// showBooks(winterBooks);

// radiobtnWinter.addEventListener('click', function () {
//   console.log("Winter radio-button is clicked");
//   hideBooks(springBooks);
//   hideBooks(summerBooks);
//   hideBooks(autumnBooks);
//   springBooks.style.animationPlayState = 'paused';
//   summerBooks.style.animationPlayState = 'paused';
//   autumnBooks.style.animationPlayState = 'paused';

//   showBooks(winterBooks);
// });

// radiobtnSpring.addEventListener('click', function () {
//   console.log("Spring radio-button is clicked");
//   hideBooks(winterBooks);
//   hideBooks(summerBooks);
//   hideBooks(autumnBooks);
//   winterBooks.style.animationPlayState = 'paused';
//   summerBooks.style.animationPlayState = 'paused';
//   autumnBooks.style.animationPlayState = 'paused';

//   showBooks(springBooks);
// });

// radiobtnSummer.addEventListener('click', function () {
//   console.log("Summer radio-button is clicked");
//   hideBooks(springBooks);
//   hideBooks(winterBooks);
//   hideBooks(autumnBooks);

//   showBooks(summerBooks);
// });

// radiobtnAutumn.addEventListener('click', function () {
//   console.log(" radio-button is clicked");
//   hideBooks(summerBooks);
//   hideBooks(springBooks);
//   hideBooks(winterBooks);

//   showBooks(autumnBooks);
// });


// ВАРИАНТ 6

// const winterBooks = document.querySelector(".winter-books");
// const springBooks = document.querySelector(".spring-books");
// const summerBooks = document.querySelector(".summer-books");
// const autumnBooks = document.querySelector(".autumn-books");

// const radiobtnWinter = document.querySelector(".winter-btn");
// const radiobtnSpring = document.querySelector(".spring-btn");
// const radiobtnSummer = document.querySelector(".summer-btn");
// const radiobtnAutumn = document.querySelector(".autumn-btn");


// const booksContainers = document.querySelectorAll(".books-wrapper");
// const radioButtons = document.querySelectorAll(".radio");

// function hideBooks() {
//   booksContainers.forEach((books) => {
//     books.style.opacity = 0;
//     books.classList.remove("visible-books");
//   });
// }

// function showBooks(books) {
//   books.style.opacity = 1;
//   books.classList.add("visible-books");
// }

// function handleRadioClick(event) {
//   hideBooks();
//   const targetClass = event.target.getAttribute("data-target");
//   const targetBooks = document.querySelector("." + targetClass);
//   showBooks(targetBooks);
// }

// // По умолчанию показываем зимние книги
// showBooks(booksContainers[0]);

// radioButtons.forEach((radio) => {
//   radio.addEventListener("click", handleRadioClick);
// });
