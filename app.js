const tiles = document.querySelectorAll("[data-tile]");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const gameOverModal = document.querySelector(".game-over");
const gameOverBg = document.querySelector(".game-over-bg");
const announceWinner = document.querySelector(".announce");
const playAgainBtn = document.querySelector(
  ".game-over input[value='Play Again']"
);
const turnParag = document.querySelector(".game p");

const WIN_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;

startBtn.onpointerdown = () => {
  removeStartBtn();
  displayHover();
  startGame();
};

playAgainBtn.onpointerdown = () => {
  hideGameOverModal();
  removeXOClasses();
  displayHover();
  startGame();
};

function hideGameOverModal() {
  gameOverBg.style.display = "none";
  gameOverModal.style.scale = "0";
}

function removeXOClasses() {
  tiles.forEach((tile) => {
    tile.classList.remove("x");
    tile.classList.remove("o");
  });
}

function removeStartBtn() {
  startBtn.style.display = "none";
}

function showRestartBtn() {
  restartBtn.style.display = "inline";
}

function startGame() {
  tellTurns();
  tiles.forEach((tile) => {
    tile.addEventListener(
      "pointerdown",
      (e) => {
        gameLogic(e);
      },
      {
        once: true,
      }
    );
  });
}

function switchTurn() {
  xTurn = !xTurn;
}

function gameLogic(e) {
  placeMarker(e);
  isGameOver();
  switchTurn();
  tellTurns();
  displayHover();
}

function tellTurns() {
  if (xTurn) {
    turnParag.textContent = "X Turn";
  } else if (!xTurn) {
    turnParag.textContent = "O Turn";
  }
}

function isGameOver() {
  if (checkWinner()) {
    if (xTurn) {
      announceWinner.textContent = "X Wins!";
      console.log(" X WINS");
      showGameOverModal();
    } else if (!xTurn) {
      announceWinner.textContent = "O Wins!";
      console.log(" O WINS");
      showGameOverModal();
    }
  } else if (checkDraw()) {
    announceWinner.textContent = "DRAW!";
    console.log("DRAW");
    showGameOverModal();
  }
}

function checkDraw() {
  return [...tiles].every((tile) => {
    if (tile.classList.contains("x") | tile.classList.contains("o")) {
      return true;
    }
  });
}

window.onpointerdown = () => {
  console.log(checkDraw());
};

function showGameOverModal() {
  gameOverBg.style.display = "flex";
  gameOverModal.style.scale = "1";
}

function checkWinner() {
  if (xTurn) {
    return WIN_COMBINATION.some((combination) => {
      return combination.every((num) => {
        return tiles[num].classList.contains("x");
      });
    });
  } else if (!xTurn) {
    return WIN_COMBINATION.some((combination) => {
      return combination.every((num) => {
        return tiles[num].classList.contains("o");
      });
    });
  }
}

function displayHover() {
  removeHoverDisplay();
  tiles.forEach((tile) => {
    if (xTurn) tile.classList.add("tile-x");
    else if (!xTurn) tile.classList.add("tile-o");
  });
}

function removeHoverDisplay() {
  tiles.forEach((tile) => {
    tile.classList.remove("tile-x");
    tile.classList.remove("tile-o");
  });
}

function placeMarker(e) {
  if (!(e.target.classList.contains("x") || e.target.classList.contains("o"))) {
    xTurn ? e.target.classList.add("x") : e.target.classList.add("o");
  }
}
