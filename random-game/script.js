const size = 4;
const tableCells = createTable();
const startBtn = document.getElementById('start-btn');
let values;
let emptyX, emptyY;
let left = { dx: -1, dy: 0 };
let right = { dx: 1, dy: 0 };
let up = { dx: 0, dy: -1 };
let down = { dx: 0, dy: 1 };

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
      // td.setAttribute('draggable', 'true');
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
          setTimeout(function () {
            console.log('Game over. You won!');
          }, 1000);
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
    setTimeout(function () {
      console.log('Game over. You won!');
      // start the game again
      // init();
    }, 1000);
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
        if (x === size - 1 && y === size - 1 && values[y][x] === 0) {
          return true;
        }
        return false;
      } 
    }
  }
  return true;
}

// INITIALIZE THE GAME
function init() {
  values = reset();
  draw();
}

// START BUTTON
startBtn.addEventListener('change', function () {
  // if the checkbox is checked, then shuffle cells
  if (startBtn.checked) {
    shuffle();
  } else {
    init();
  }
});

// At the end of the code:
init(); 
