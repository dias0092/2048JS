import Grid from "./Grid.js";
import Tile from "./Tile.js";

const gameBoard = document.getElementById("game-board");
const scoreValue = document.getElementById("score");
const grid = new Grid(gameBoard);


const gameOverModal = document.getElementById("game-over-modal");
const finalScoreSpan = document.getElementById("final-score");
const closeModalBtn = document.getElementById("close-modal-btn");

let highScore = localStorage.getItem('highScore') || 0;
let highScoreTime = localStorage.getItem('highScoreTime') || 0;
let startTime = Date.now();
let endTime;
let totalTime;

let difficulty = 'easy';
let fourProbability = 0.2;
document.getElementById('difficulty').addEventListener('change', function(e) {
  difficulty = e.target.value;
    if (difficulty === 'easy') {
    fourProbability = 0.2;
  } else if (difficulty === 'medium') {
    fourProbability = 0.3;
  } else if (difficulty === 'hard') {
    fourProbability = 0.5;
  }
});

document.getElementById("new-game").addEventListener("click", newGame);

grid.randomEmptyCell().tile = new Tile(gameBoard, fourProbability);
grid.randomEmptyCell().tile = new Tile(gameBoard , fourProbability);
setupInput();

closeModalBtn.onclick = function () {
  gameOverModal.style.display = "none";
};

function gameOver() {
  endTime = Date.now();
  
  finalScoreSpan.textContent = grid.score;
  gameOverModal.style.display = "block";
  totalTime = (endTime - startTime) / 1000; 
if (grid.score > highScore || (grid.score === highScore && totalTime < highScoreTime)) {
  highScore = grid.score;
  highScoreTime = totalTime;
  localStorage.setItem('highScore', highScore);
  localStorage.setItem('highScoreTime', highScoreTime);
  document.getElementById('high-score').textContent = `High Score: ${highScore}`;
  document.getElementById('high-score-time').textContent = `Time: ${highScoreTime}s`;
}
}

function setupInput() {
  window.addEventListener("keydown", handleInput, { once: true });
}

async function handleInput(e) {
  switch (e.key) {
    case "ArrowUp":
      if (!canMoveUp()) {
        setupInput();
        return;
      }
      await moveUp();
      break;
    case "ArrowDown":
      if (!canMoveDown()) {
        setupInput();
        return;
      }
      await moveDown();
      break;
    case "ArrowLeft":
      if (!canMoveLeft()) {
        setupInput();
        return;
      }
      await moveLeft();
      break;
    case "ArrowRight":
      if (!canMoveRight()) {
        setupInput();
        return;
      }
      await moveRight();
      break;
    default:
      setupInput();
      return;
  }

  grid.cells.forEach((cell) => cell.mergeTiles());
  scoreValue.textContent = `Score: ${grid.score}`;
  const newTile = new Tile(gameBoard , fourProbability);
  grid.randomEmptyCell().tile = newTile;
  
  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
    newTile.waitForTransition(true).then(() => {
      clearInterval(botInterval);
      gameOver();
    });
    return;
  }

  setupInput();
}

const botButton = document.createElement("button");
botButton.textContent = "Bot";
botButton.classList.add("btn");
botButton.addEventListener("click", runBot);
document.body.appendChild(botButton);

let botInterval;

function runBot() {
  botButton.disabled = true;
  botInterval = setInterval(() => {
    const directions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];
    const event = new KeyboardEvent("keydown", { key: randomDirection });
    handleInput(event);

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
      clearInterval(botInterval);
      botButton.disabled = false;
      gameOver();
    }
  }, 500);
}

function moveUp() {
  return slideTiles(grid.cellsByColumn);
}

function moveDown() {
  return slideTiles(grid.cellsByColumn.map((column) => [...column].reverse()));
}

function moveLeft() {
  return slideTiles(grid.cellsByRow);
}

function moveRight() {
  return slideTiles(grid.cellsByRow.map((row) => [...row].reverse()));
}

function slideTiles(cells) {
  return Promise.all(
    cells.flatMap((group) => {
      const promises = [];
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];
        if (cell.tile == null) continue;
        let lastValidCell;
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j];
          if (!moveToCell.canAccept(cell.tile)) break;
          lastValidCell = moveToCell;
        }

        if (lastValidCell != null) {
          promises.push(cell.tile.waitForTransition());
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = cell.tile;
          } else {
            lastValidCell.tile = cell.tile;
          }
          cell.tile = null;
        }
      }
      return promises;
    })
  );
}

function canMoveUp() {
  return canMove(grid.cellsByColumn);
}

function canMoveDown() {
  return canMove(grid.cellsByColumn.map((column) => [...column].reverse()));
}

function canMoveLeft() {
  return canMove(grid.cellsByRow);
}

function canMoveRight() {
  return canMove(grid.cellsByRow.map((row) => [...row].reverse()));
}

function canMove(cells) {
  return cells.some((group) => {
    return group.some((cell, index) => {
      if (index === 0) return false;
      if (cell.tile == null) return false;
      const moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    });
  });
}

function newGame() {
  startTime = Date.now();
  
  grid.cells.forEach((cell) => {
    if (cell.tile) {
      cell.tile.remove();
      cell.tile = null;
    }
  });
  document.getElementById('high-score').textContent = `High Score: ${highScore}`;
  document.getElementById('high-score-time').textContent = `Time: ${highScoreTime}ms`;
  grid.randomEmptyCell().tile = new Tile(gameBoard);
  grid.randomEmptyCell().tile = new Tile(gameBoard);
  grid.score = 0;
  scoreValue.textContent = `Score: ${grid.score}`;

  clearInterval(botInterval);
  botButton.disabled = false;

  setupInput();
}
