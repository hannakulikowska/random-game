const winterBooks = document.querySelectorAll('.favorites-winter');
const springBooks = document.querySelectorAll('.favorites-spring');
const summerBooks = document.querySelectorAll('.favorites-summer');
const autumnBooks = document.querySelectorAll('.favorites-autumn');
const radiobtnWinter = document.querySelector('.radiobtn-winter');
const radiobtnSpring = document.querySelector('.radiobtn-spring');
const radiobtnSummer = document.querySelector('.radiobtn-summer');
const radiobtnAutumn = document.querySelector('.radiobtn-autumn');


// Скрытие всех книг, за исключением выбранного сезона
function hideBooks(exceptBooks) {
  winterBooks.forEach((book) => book.classList.add('invisible'));
  springBooks.forEach((book) => book.classList.add('invisible'));
  summerBooks.forEach((book) => book.classList.add('invisible'));
  autumnBooks.forEach((book) => book.classList.add('invisible'));

  exceptBooks.forEach((book) => book.classList.remove('invisible'));
}

// По умолчанию показываются зимние книги, поскольку Winter радио-кнопка чекнута по умолчанию
hideBooks(winterBooks);

// Добавляем обработчики для каждой радио-кнопки
radiobtnWinter.addEventListener('click', function () {
  hideBooks(winterBooks);
});

radiobtnSpring.addEventListener('click', function () {
  hideBooks(springBooks);
});

radiobtnSummer.addEventListener('click', function () {
  hideBooks(summerBooks);
});

radiobtnAutumn.addEventListener('click', function () {
  hideBooks(autumnBooks);
});





// function hideAndShowBooks(exceptBooks) {
//     const allBooks = [...winterBooks, ...springBooks, ...summerBooks, ...autumnBooks];

//     allBooks.forEach((book) => {
//         if (!exceptBooks.includes(book)) {
//             if (!book.classList.contains('invisible')) {
//                 book.style.animation = 'fadeout 0.3s';
//                 book.addEventListener('animationend', function () {
//                     book.style.animation = '';
//                     book.classList.add('invisible');
//                 }, { once: true });
//             }
//         }
//     });

//     exceptBooks.forEach((book) => {
//         if (book.classList.contains('invisible')) {
//             book.classList.remove('invisible');
//             book.classList.add('visible');
//             book.style.animation = 'fadein 5s';
//         }
//         book.addEventListener('animationend', function () {
//             book.style.animation = '';
//             book.classList.remove('visible');
//         }, { once: true });
//     });
// }

// radiobtnWinter.addEventListener('click', function () {
//     hideAndShowBooks(winterBooks);
// });

// radiobtnSpring.addEventListener('click', function () {
//     hideAndShowBooks(springBooks);
// });

// radiobtnSummer.addEventListener('click', function () {
//     hideAndShowBooks(summerBooks);
// });

// radiobtnAutumn.addEventListener('click', function () {
//     hideAndShowBooks(autumnBooks);
// });


