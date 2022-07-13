var size = 4;
var fieldCells = createField();
var values;
var emptyX, emptyY;
var LEFT = {dx: -1, dy: 0};
var RIGHT = {dx: 1, dy: 0};
var UP = {dx: 0, dy: -1};
var DOWN = {dx: 0, dy: 1};

  // creating fields and number of cells

function createField() {
  var cells = [];
  var table = document.getElementById('field');
  for (var y = 0; y < size; y++) {
    var tr = document.createElement('tr');
    table.appendChild(tr);
    var rowCells = [];
    cells.push(rowCells);
    for (var x = 0; x < size; x++) {
      var td = document.createElement('td');
      td.setAttribute('class', 'cell');
      tr.appendChild(td);
      rowCells.push(td);
    }
  }
  return cells;
}


// initializing values of cells


function createInitialValues() {
  emptyX = emptyY = size - 1;
  var v = [];
  var i = 1;
  for (var y = 0; y < size; y++) {
    var rowValues = [];
    v.push(rowValues);
    for (var x = 0; x < size; x++) {
      rowValues.push(i);
      i++
    }
  }
  v[emptyY][emptyX] = 0;
  return v;
}



function draw() {
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      var v = values[y][x];
      var td = fieldCells[y][x];
      td.innerHTML = v == 0 ? '': String(v);
    }
  }
}


// Moving of the tiles


function makeMove(move) {
  var newX = emptyX + move.dx, newY = emptyY + move.dy;
  if ((newX >= size) || (newX < 0) ||
    (newY >= size) || (newY < 0)
  ) {
    return false;
  }
  var c = values[newY][newX];
  values[newY][newX] = 0;
  values[emptyY][emptyX] = c;
  emptyX = newX;
  emptyY = newY;
  return true;
}


// randomised tiles

function shuffle() {
  var options = [LEFT, RIGHT, UP, DOWN];
  var iterations = 64;
  for (var i = 0; i < iterations; i++) {
    var move = options[Math.floor(Math.random() * options.length)];
    makeMove(move);
  }
}

// checking is game done

function gameOver() {
  var expectedValue = 1;
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      if (values[y][x] == expectedValue) {
        expectedValue++;
      } else {
        if (x == size - 1 && y == size - 1 && values[y][x] == 0) {
          return true;
        }
        return false;
      }
    }
  }
  return true;
}


// adding key events for moving the tiles & congrats alert when game is finished

document.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
    case 38: makeMove(DOWN); break;
    case 40: makeMove(UP); break;
    case 37: makeMove(RIGHT); break;
    case 39: makeMove(LEFT); break;
  }
  draw();
  if (gameOver()) {
    setTimeout(function() {
      alert('you won!');
      init();
    }, 1000);
  }
});

function init() {
  values = createInitialValues();
  shuffle();
  draw();
}

init();

