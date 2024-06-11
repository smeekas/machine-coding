const board = document.getElementById("tictactoe");
const control = document.querySelector("#control span");
const winnerContainer = document.getElementById("winner");
let currentControl = "X";
let gameOver = false;
const N = 4;
const M = 3;
let gameData = [];
function createBoard() {
  board.innerHTML = "";
  gameData = [];
  gameOver = false;
  for (let j = 0; j < N; j++) {
    const row = document.createElement("div");
    const dataRow = [];
    row.className = "row";
    for (let i = 0; i < N; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = j;
      cell.dataset.col = i;
      dataRow.push("");
      row.appendChild(cell);
    }
    gameData.push(dataRow);
    board.appendChild(row);
  }
}
function tictactoe() {
  createBoard();
  board.addEventListener("click", (e) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.dataset.row !== undefined &&
      e.target.dataset.col !== undefined &&
      !gameOver
    ) {
      if (e.target.textContent === "") {
        e.target.innerHTML = currentControl;
        gameData[e.target.dataset.row][e.target.dataset.col] = currentControl;
        const isWinner = checkWinner();
        if (isWinner) {
          gameOver = isWinner;
          winnerContainer.innerHTML = "Game Over" + currentControl + " Won";
          const button = document.createElement("button");
          button.innerHTML = "replay";
          button.addEventListener("click", () => {
            createBoard();
          });
          winnerContainer.appendChild(button);
        } else {
          changeControl();
        }
      }
    }
  });
}
function checkArray(arr) {
  if (Array.isArray(arr)) {
    let content = arr[0];
    let count = 1;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] === content && content !== "") {
        count++;
      } else {
        content = arr[i];
        count = 1;
      }

      if (count === M) return true;
    }
  }
}
function checkWinner() {
  checkDiagonal();
  if (checkRows() || checkCols() || checkDiagonal()) return true;
  return false;
}
function checkRows() {
  for (let i = 0; i < N; i++) {
    if (checkArray[i]) return true;
  }
  return false;
}

function checkDiagonal() {
  const diagonals = [];
  // i=>row, j=>column
  //back dia upper
  for (let k = 0; k < N; k++) {
    // upper to right with (top row)
    let i = 0;
    let j = k;
    const arr = [];
    while (i < N && j < N) {
      arr.push(gameData[i][j]);
      i++;
      j++;
    }
    diagonals.push(arr);
  }
  //back dia left
  for (let k = 1; k < N; k++) {
    // upper to right with (first  column)

    let i = k;
    let j = 0;
    const arr = [];
    while (i < N && j < N) {
      arr.push(gameData[i][j]);
      i++;
      j++;
    }
    diagonals.push(arr);
  }

  //front dia right
  for (let k = 0; k < N; k++) {
    // upper to left with (last  column)

    let i = k;
    let j = N - 1;
    const arr = [];
    while (i < N && j >= 0) {
      arr.push(gameData[i][j]);
      i++;
      j--;
    }
    diagonals.push(arr);
  }

  //front dia upper
  for (let k = 0; k < N; k++) {
    // upper to left with (first  row)

    let i = 0;
    let j = k;
    const arr = [];
    while (i < N && j >= 0) {
      arr.push(gameData[i][j]);
      i++;
      j--;
    }
    diagonals.push(arr);
  }
  for (let i = 0; i < diagonals.length; i++) {
    if (checkArray(diagonals[i])) return true;
  }
  return false;
}

function checkCols() {
  const colData = gameData.reduce((acc, curr, index) => {
    if (Array.isArray(curr)) {
      curr.forEach((colItem, colIndex) => {
        if (acc[colIndex] === undefined) acc[colIndex] = [];
        acc[colIndex][index] = colItem;
      });
    }
    return acc;
  }, []);
  for (let i = 0; i < N; i++) {
    if (checkArray(colData[i])) return true;
  }
  return false;
}

function changeControl() {
  currentControl = currentControl === "X" ? "0" : "X";
  control.innerHTML = currentControl;
}

tictactoe();
