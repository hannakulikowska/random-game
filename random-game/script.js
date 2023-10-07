const size = 4;
const tableCells = createTable();
const startBtn = document.getElementById('start-btn');
const soundBtn = document.getElementById('sound-btn');
const resultsBtn = document.getElementById('results-btn');
const footerBtn = document.getElementById('footer-btn');
const github = document.getElementById('github');
const rsschool = document.getElementById('rsschool');
const year = document.getElementById('year');
let values;
let emptyX, emptyY;
let left = { dx: -1, dy: 0 };
let right = { dx: 1, dy: 0 };
let up = { dx: 0, dy: -1 };
let down = { dx: 0, dy: 1 };

const hoursContainer = document.getElementById("hours");
const minutesContainer = document.getElementById("minutes");
const secondsContainer = document.getElementById("seconds");

let hours = 0;
let minutes = 0;
let seconds = 0;
let interval;

// CREATE TABLE
function createTable() {
  const cells = [];
  const table = document.getElementById('table');

  for (let y = 0; y < size; y++) {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    const rowCells = [];
    cells.push(rowCells);
    for (let x = 0; x < size; x++) {
      const td = document.createElement('td');
      td.setAttribute('class', 'cell');
      td.setAttribute('id', `cell-${y}-${x}`); // add id for each cell

      // move by clicking on a cell
      td.addEventListener('click', function () {
        const cellId = this.id;
        const coordinates = cellId.split('-');
        const clickedY = parseInt(coordinates[1]);
        const clickedX = parseInt(coordinates[2]);
        const dx = clickedX - emptyX;
        const dy = clickedY - emptyY;
        const move = { dx, dy };
        makeMove(move);
        draw();
        if (gameOver()) {
          stopTimer();
        }
      });

      tr.appendChild(td);
      rowCells.push(td);
    }
  }
  return cells;
}

// ADD VALUES FROM 1 TO 15
function reset() {
  emptyX = emptyY = size - 1;
  // create array with values from 1 to 15
  let v = [];
  let i = 1;
  for (let y = 0; y < size; y++) { 
    let rowValues = [];
    v.push(rowValues);
    for (let x = 0; x < size; x++) {
      rowValues.push(i);
      i++;
    }
  }
  v[emptyY][emptyX] = 0;
  return v;
}

// DRAW THE TABLE
function draw() {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let v = values[y][x];
      let td = tableCells[y][x];

      if (v === 0) {
        // one cell is empty
        td.innerHTML = '';
      } else {
        // set cell numbers
        td.innerHTML = String(v);
      }
    }
  }
}

// SWAP AN EMPTY CELL WITH ANOTHER CELL NEXT TO
function makeMove(move) {
  // check if startBtn is checked
  if (!startBtn.checked) {
    return false;
  }

  let newX = emptyX + move.dx, newY = emptyY + move.dy;
  if ((newX >= size) || (newX < 0) ||
    (newY >= size) || (newY < 0))
  {
    return false;
   }

  // Check that the movement only occurs to an adjacent cell
  if ((Math.abs(move.dx) === 1 && move.dy === 0) || (move.dx === 0 && Math.abs(move.dy) === 1)) {
    let c = values[newY][newX];
    values[newY][newX] = 0;
    values[emptyY][emptyX] = c;
    emptyX = newX;
    emptyY = newY;

    if (!soundBtn.checked) {
      playMoveSound();
    }

    return true;
  }

  return false; // Return false if the movement is not performed
}

// SHUFFLE CELLS USING FISHER-YATES SHUFFLE
function shuffle() {
  let valuesFlat = values.flat(); // Convert a 2D array to a 1D array
  let currentIndex = valuesFlat.length, randomIndex, tempValue;

  // While there are elements left to shuffle
  while (currentIndex !== 0) {
    // Select a random index
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap the elements
    tempValue = valuesFlat[currentIndex];
    valuesFlat[currentIndex] = valuesFlat[randomIndex];
    valuesFlat[randomIndex] = tempValue;
  }

  // Update the 2D array with shuffled values
  let currentIndexFlat = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      values[y][x] = valuesFlat[currentIndexFlat];
      currentIndexFlat++;
    }
  }

  // Find the index of the empty cell in the 1D array
  let emptyIndex = valuesFlat.indexOf(0);
  // Convert it to coordinates in the 2D array
  emptyX = emptyIndex % size;
  emptyY = Math.floor(emptyIndex / size);

  draw(); // / Redraw the table (game board)
}


// Testing
// function shuffle() {
//   const moves = [up, down, left, right];
//   const numShuffles = 20; // Количество перемешиваний

//   for (let i = 0; i < numShuffles; i++) {
//     const randomMove = moves[Math.floor(Math.random() * moves.length)];
//     makeMove(randomMove);
//   }

//   draw(); // Перерисовываем поле после перемешивания
// }


// MOVE CELLS WITH KEYBOARD
document.addEventListener('keydown', function (e) {
  let moved = false; // Flag to check the success of the move

  switch (e.keyCode) {
    case 40: 
      moved = makeMove(up);
      break;
    case 38: 
      moved = makeMove(down);
      break;
    case 39:
      moved = makeMove(left);
      break;
    case 37:
      moved = makeMove(right);
      break;
  }

  if (moved) {
    draw(); // Redraw the board only if the move was successful
  }
  // After each movement check if the game over or not 
  if (gameOver()) {
    stopTimer();
    // init();
  }
});

// CHECK IF GAME IS OVER - ALL CELLS SHOULD CONTAIN CORRECT VALUES
function gameOver() {
  let expectedValue = 1;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (values[y][x] === expectedValue) {
        expectedValue++;
      } else {
        // game over
        if (x === size - 1 && y === size - 1 && values[y][x] === 0) {
          startBtn.checked = false; // !startBtn.checked
          return true;
        }
        return false;
      } 
    }
  }
  startBtn.checked = false;
  return true;
}

// START/END GAME - CHANGE START BUTTON STATE (CHECKED/UNCHECKED)
startBtn.addEventListener('change', function () {
  if (startBtn.checked) {
    init();
    shuffle(); // shuffle cells and start game
    startTimer();
  } else {
    init(); // inactive state
  }
});

// ADD EVENT LISTENER FOR EACH CELL BEFORE THE GAME WAS STARTED - SHAKE-ANIMATION
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    const td = tableCells[y][x];

    td.addEventListener('click', function () {
      if (!startBtn.checked) {
        if (!soundBtn.checked) {
          playShakeSound();
        }
        startBtn.classList.add('shake-animation');
        startBtn.classList.add('green-color'); // to change color
      }
    });
  }
}

// DELETE SHAKE-ANIMATION CLASS
startBtn.addEventListener('animationend', function () {
  startBtn.classList.remove('shake-animation');
  startBtn.classList.remove('green-color'); 
});

// PLAY MOVE-SOUND
function playMoveSound() {
  const moveSound = document.getElementById('moveSound');
  moveSound.currentTime = 0; // start playing immediately
  moveSound.play();
}

// PLAY SHAKE-SOUND
function playShakeSound() {
  const shakeSound = document.getElementById('shakeSound');
  shakeSound.currentTime = 0; // start playing immediately
  shakeSound.play();
}

// STOPWATCH
const startTimer = () => {
  clearInterval(interval);
  interval = setInterval(startWatch, 10);
}

const stopTimer = () => {
  clearInterval(interval);
}

const resetTimer = () => {
  seconds = 0;
  minutes = 0;
  hours = 0;
  secondsContainer.innerHTML = '00';
  minutesContainer.innerHTML = '00';
  hoursContainer.innerHTML = '00';
  clearInterval(interval);
}

function startWatch() {
  seconds++;
  if (seconds < 10) {
    seconds.innerHTML = `0${seconds}`;
  }
  else if (seconds > 59) {
    minutes++;
    seconds = 0;
    secondsContainer.innerHTML = '00';
  }
  else {
    secondsContainer.innerHTML = seconds;
  }

  if (minutes < 10) {
    minutesContainer.innerHTML = `0${minutes}`;
  }
  else if (minutes > 59) {
    hours++;
    minutes = 0;
    minutesContainer.innerHTML = minutes;
  }
  else {
    minutesContainer.innerHTML = minutes;
  }

  if (hours < 10) {
    hoursContainer.innerHTML = `0${hours}`;
  }
  else {
    hoursContainer.innerHTML = hours;
  }
}

// INITIALIZE THE GAME
function init() {
  values = reset();
  draw();
  resetTimer();
}



const rulesCheckbox=document.getElementById("rules-btn");
const resultsCheckbox=document.getElementById("results-btn");
const rulesContent=document.querySelector(".rules-table");
const resultsContent=document.querySelector(".results-table");

rulesCheckbox.addEventListener("change", ()=> {
  if (rulesCheckbox.checked) {
      resultsCheckbox.disabled = false; 
      rulesContent.style.transform="rotateY(0deg)";
      resultsContent.style.transform="rotateY(180deg)";
      resultsCheckbox.checked = false;      
      rulesCheckbox.disabled = true; 
  }

  else {
    if (!resultsCheckbox.checked) {
      resultsContent.style.transform = "rotateY(180deg)";
    }
  }
});

resultsCheckbox.addEventListener("change", ()=> {
  if (resultsCheckbox.checked) {
    rulesCheckbox.disabled = false; 
    resultsContent.style.transform="rotateY(0deg)";
    rulesContent.style.transform="rotateY(180deg)";
    rulesCheckbox.checked = false;
    resultsCheckbox.disabled = true; 
  }

  else {
    if (!rulesCheckbox.checked) {
      rulesContent.style.transform = "rotateY(180deg)";
    }
  }
});
  
footerBtn.addEventListener("click", () => {
  if (footerBtn.checked) {
    github.style.visibility = "visible";
    rsschool.style.visibility = "visible";
    year.style.visibility = "visible";
  }
  else {
    github.style.visibility = "hidden";
    rsschool.style.visibility = "hidden";
    year.style.visibility = "hidden";
  }
})


// At the end of the code:
init(); 
