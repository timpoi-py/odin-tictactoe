const tiles = document.querySelectorAll("[data-tile]");
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

tiles.forEach((tile) => {
  tile.addEventListener(
    "click",
    (e) => {
      gameLogic(e);
    },
    {
      once: true,
    }
  );
});

function gameLogic(e) {
  placeMarker(e);
  if (checkWinner()) {
    if (xTurn) {
      console.log(" X WINS");
    } else console.log(" O WINS");
  }
  switchTurn();
  displayHover();
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
  deleteHoverDisplay();
  tiles.forEach((tile) => {
    if (xTurn) tile.classList.add("tile-x");
    else if (!xTurn) tile.classList.add("tile-o");
  });
}

function deleteHoverDisplay() {
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

function switchTurn() {
  xTurn = !xTurn;
}
