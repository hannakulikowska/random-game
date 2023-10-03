const size = 4;
const fieldCells = createField();
let values;
let emptyX, emptyY;
let left = { dx: -1, dy: 0 };
let right = { dx: 1, dy: 0 };
let up = { dx: 0, dy: -1 };
let down = { dx: 0, dy: 1 };

function createField() {
  const cells = [];
  const table = document.getElementById('field');

  for (let y = 0; y < size; y++) {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    const rowCells = [];
    cells.push(rowCells);
    for (let x = 0; x < size; x++) {
      const td = document.createElement('td');
      td.setAttribute('class', 'cell');
      tr.appendChild(td);
      rowCells.push(td);
    }
  }
  return cells;
}

// FILL FIELD WITH 1 TO 15
function createInitialValues() {
  emptyX = emptyY = size - 1;
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

// DRAW THE FIELD
function draw() {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let v = values[y][x];
      let td = fieldCells[y][x];

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

  draw(); // / Redraw the field (game board)
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
});

// CHECK IF GAME IS OVER - ALL CELLS SHOULD CONTAIN CORRECT VALUES

// INITIALIZE THE GAME
function init() {
  values = createInitialValues();
  shuffle();
  draw();
}

// At the end of the code:
init(); 
