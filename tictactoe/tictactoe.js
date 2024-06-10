const board = document.getElementById("tictactoe");
const control = document.querySelector("#control span");
const winnerContainer = document.getElementById("winner");
let currentControl = "X";
let gameOver = false;
const N = 5;
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
          winnerContainer.innerHTML = "Game Over";
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
function checkWinner() {
  for (let i = 0; i < N; i++) {
    if (checkCols(i) || checkRows(i)) {
      return true;
    }
  }
  return false;
}
function checkRows(index) {
  let content = gameData[index][0];
  if (content === "") return false;
  for (let i = 1; i < N; i++) {
    if (gameData[index][i] !== content) return false;
  }
  return true;
}
function checkCols(index) {
  let content = gameData[0][index];
  if (content === "") return false;
  for (let i = 1; i < N; i++) {
    if (gameData[i][index] !== content) return false;
  }
  return true;
}
function changeControl() {
  currentControl = currentControl === "X" ? "0" : "X";
  control.innerHTML = currentControl;
}
tictactoe();
