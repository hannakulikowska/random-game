// Slider

// https://www.youtube.com/watch?v=UsLpqTXd5vs




let position = 0; // смещение от левого края (offset)
const sliderLine = document.querySelector('.about-img_flex');
const carretLeft = document.querySelector('.carret-left');
const carretRight = document.querySelector('.carret-right');
const paginationDots = document.querySelectorAll('.pagination-inner');


// Pagination

function updatePagination() {
    paginationDots.forEach((dot, index) => {
        if (index * 475 === position) {
            dot.classList.add('pagination-active');
        } else {
            dot.classList.remove('pagination-active');
        }
    });
}


paginationDots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
        position = index * 475;
        sliderLine.style.left = -position + 'px';
        updatePagination();

      if (position < 1900 || position > 0) {
        carretLeft.style.opacity = 1;
        carretLeft.style.pointerEvents = 'auto';
        carretRight.style.opacity = 1;
        carretRight.style.pointerEvents = 'auto';
      }
    });
});


// Carrets

// Right carret

document.querySelector('.about-carret-right').addEventListener('click', function () {
  position = position + 475;
  if (position > 1900) {
    position = 1900;
  }
  sliderLine.style.left = -position + 'px';


  // Включение кнопки влево после сдвига вправо
  carretLeft.style.opacity = 1;
  carretLeft.style.pointerEvents = 'auto';

  // Отключение кнопки вправо при достижении конечной позиции
  if (position === 1900) {
    carretRight.style.opacity = 0.4;
    carretRight.style.pointerEvents = 'none';
  }

  // Вызов функции пагинации по клику на стрелки
  updatePagination();
  
});


// Left carret

document.querySelector('.about-carret-left').addEventListener('click', function () {
  position = position - 475;
  if (position < 0) {
    position = 0;
  }
  sliderLine.style.left = -position + 'px';


  // Включение кнопки вправо после сдвига влево
  carretRight.style.opacity = 1;
  carretRight.style.pointerEvents = 'auto';

  // Отключение кнопки влево при достижении начальной позиции
  if (position === 0) {
    carretLeft.style.opacity = 0.4;
    carretLeft.style.pointerEvents = 'none';
  }

  // Вызов функции пагинации по клику на стрелки
  updatePagination();
 
});


// Вызов функции пагинации при загрузке страницы
updatePagination();
