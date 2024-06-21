const N = 10;
const bombProbability = 0.1;
let gameBoard = [];
let totalBombCount = 0;
let correctBombCount = 0;
const STATUS = {
  Hidden: "hidden",
  Number: "number",
  Marked: "marked",
  Mine: "mine",
};
const xN = [-1, -1, -1, 0, 0, 1, 1, 1];
const yN = [-1, 0, 1, -1, 1, -1, 0, 1];

let board = document.getElementById("board");
const winner = document.getElementById("winner");

function resetBoard() {
  board.innerHTML = "";
  winner.innerHTML = "";
  gameBoard = [];
  totalBombCount = 0;
  correctBombCount = 0;
}
function createBoard() {
  for (let x = 0; x < N; x++) {
    const row = [];
    for (let y = 0; y < N; y++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      // initially all cells are hidden
      cell.setAttribute("data-status", STATUS.Hidden);
      cell.setAttribute("data-row", x);
      cell.setAttribute("data-col", y);

      const isBomb = Math.random() < bombProbability;
      if (isBomb) totalBombCount++;
      const cellData = {
        x,
        y,
        cell,
        isBomb,
        status: STATUS.Hidden,
        number: isBomb ? -1 : 0, //other than bomb, all cell will have some number (initially 0)
      };
      row.push(cellData);
    }
    gameBoard.push(row);
  }
  gameBoard.forEach((row) => {
    const rowEle = document.createElement("row");
    rowEle.classList.add("row");
    row.forEach((cell) => {
      rowEle.appendChild(cell.cell);
    });
    board.appendChild(rowEle);
  });
}

function floodFill(row, col) {
  if (
    gameBoard[row][col].number !== 0 &&
    gameBoard[row][col].status === STATUS.Number
  )
    return;
  changeStatus(row, col, STATUS.Number);

  for (let cordIndex = 0; cordIndex < xN.length; cordIndex++) {
    const newRow = +row + xN[cordIndex];
    const newCol = +col + yN[cordIndex];
    if (
      isValid(newRow, newCol) &&
      gameBoard[newRow][newCol].status === STATUS.Hidden
    ) {
      changeStatus(newRow, newCol, STATUS.Number);
      floodFill(newRow, newCol, false);
    }
  }
}
function reveal() {
  gameBoard.forEach((row, rIndex) => {
    row.forEach((cell, cIndex) => {
      if (cell.isBomb) {
        changeStatus(rIndex, cIndex, STATUS.Mine);
      } else {
        changeStatus(rIndex, cIndex, STATUS.Number);
      }
    });
  });
}
function gameOver(isWon) {
  const button = document.createElement("button");
  button.textContent = "Play again";
  button.addEventListener("click", () => minesweeper());
  if (isWon) {
    winner.textContent = "😎";
    reveal();
  } else {
    winner.textContent = "😑 game over";
  }
  winner.appendChild(button);
}
function checkWinner() {
  if (totalBombCount === correctBombCount) {
    gameOver(true);
  }
}
function changeStatus(row, col, status) {
  if (status === STATUS.Number) {
    gameBoard[row][col].status = status;
    gameBoard[row][col].cell.setAttribute("data-status", status);
    if (gameBoard[row][col].number === 0) {
      gameBoard[row][col].cell.textContent = "";
    } else {
      gameBoard[row][col].cell.textContent = gameBoard[row][col].number;
    }
  } else if (status === STATUS.Mine) {
    gameBoard[row][col].status = status;
    gameBoard[row][col].cell.setAttribute("data-status", status);
  } else if (status === STATUS.Marked) {
    gameBoard[row][col].status = status;
    gameBoard[row][col].cell.dataset["status"] = status;
  } else if (status === STATUS.Hidden) {
    gameBoard[row][col].status = status;
    gameBoard[row][col].cell.dataset["status"] = status;
  }
}
function openCell(ele) {
  if (ele instanceof HTMLElement) {
    const row = ele.dataset.row;
    const col = ele.dataset.col;
    if (gameBoard[row][col].number === 0) {
      floodFill(row, col);
    } else if (gameBoard[row][col].number > 0) {
      changeStatus(row, col, STATUS.Number);
    } else {
      reveal();
      gameOver();
    }
  }
}
function markCell(ele) {
  if (ele instanceof HTMLElement) {
    const row = ele.dataset.row;
    const col = ele.dataset.col;

    if (gameBoard[row][col].status === STATUS.Hidden) {
      // if hidden then mark as marked
      // gameBoard[row][col].status = STATUS.Marked;
      // gameBoard[row][col].cell.dataset["status"] = STATUS.Marked;
      changeStatus(row, col, STATUS.Marked);
      if (gameBoard[row][col].isBomb) correctBombCount++;
    } else if (gameBoard[row][col].status === STATUS.Marked) {
      // if marked then mark as hidden
      // gameBoard[row][col].status = STATUS.Hidden;
      // gameBoard[row][col].cell.dataset["status"] = STATUS.Hidden;
      changeStatus(row, col, STATUS.Hidden);
      if (gameBoard[row][col].isBomb) correctBombCount--;
    }
    checkWinner();
  }
}

function addListeners() {
  // left click to open cell & right click to mark cell
  board.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      //left click
      openCell(e.target);
    } else if (e.button === 2) {
      //right click
      markCell(e.target);
    }
  });
  board.addEventListener("contextmenu", (e) => e.preventDefault());
  // to allow right click we have to disable contextmenu. otherwise on right click context menu will open
}
function fillNumbers() {
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      if (gameBoard[x][y].isBomb) {
        // if cell is bomb then we increment number of all 8 adjacent cells.
        for (let cordIndex = 0; cordIndex < xN.length; cordIndex++) {
          const newRow = x + xN[cordIndex];
          const newCol = y + yN[cordIndex];

          if (isValid(newRow, newCol) && !gameBoard[newRow][newCol].isBomb) {
            // if row,col is valid & row,col don't contain bomb then increment number
            gameBoard[newRow][newCol].number++;
          }
        }
      }
    }
  }
}

function isValid(x, y) {
  return x >= 0 && x < N && y >= 0 && y < N;
}

function minesweeper() {
  resetBoard();
  createBoard();
  fillNumbers();
  console.log(gameBoard.map((row) => row.map((cell) => cell.isBomb)));
  addListeners();
}
minesweeper();
