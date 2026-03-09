const ROWS = 9;
const COLS = 9;
const MINE_TOTAL = 10;
const BEST_TIME_KEY = "minesweeper-best-time";
const LONG_PRESS_MS = 450;

const boardEl = document.getElementById("board");
const timerEl = document.getElementById("timer");
const mineCountEl = document.getElementById("mine-count");
const bestTimeEl = document.getElementById("best-time");
const statusTextEl = document.getElementById("status-text");
const restartButton = document.getElementById("restart-button");

const state = {
  board: [],
  firstClickDone: false,
  gameOver: false,
  openedCount: 0,
  flaggedCount: 0,
  timer: 0,
  timerId: null,
  bestTime: Number(localStorage.getItem(BEST_TIME_KEY)) || null,
};

function createEmptyBoard() {
  return Array.from({ length: ROWS }, (_, row) =>
    Array.from({ length: COLS }, (_, col) => ({
      row,
      col,
      isMine: false,
      isOpen: false,
      isFlagged: false,
      adjacent: 0,
      element: null,
    }))
  );
}

function getNeighbors(row, col) {
  const neighbors = [];
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) continue;
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        neighbors.push(state.board[nr][nc]);
      }
    }
  }
  return neighbors;
}

function placeMines(safeCell) {
  const excluded = new Set([`${safeCell.row}-${safeCell.col}`]);
  getNeighbors(safeCell.row, safeCell.col).forEach((n) => excluded.add(`${n.row}-${n.col}`));

  let minesPlaced = 0;
  while (minesPlaced < MINE_TOTAL) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);
    const key = `${row}-${col}`;
    const cell = state.board[row][col];
    if (excluded.has(key) || cell.isMine) continue;
    cell.isMine = true;
    minesPlaced += 1;
  }

  state.board.flat().forEach((cell) => {
    if (!cell.isMine) {
      cell.adjacent = getNeighbors(cell.row, cell.col).filter((neighbor) => neighbor.isMine).length;
    }
  });
}

function updateBestTime() {
  bestTimeEl.textContent = state.bestTime ? `${state.bestTime}s` : "-";
}

function updateHud() {
  timerEl.textContent = String(state.timer);
  mineCountEl.textContent = String(Math.max(0, MINE_TOTAL - state.flaggedCount));
}

function renderCell(cell) {
  const button = cell.element;
  button.className = "cell";
  button.textContent = "";

  if (cell.isOpen) {
    button.classList.add("open");
    button.disabled = true;

    if (cell.isMine) {
      button.classList.add("mine");
      button.textContent = "💣";
      return;
    }

    if (cell.adjacent > 0) {
      button.classList.add(`n${cell.adjacent}`);
      button.textContent = String(cell.adjacent);
    }
    return;
  }

  button.disabled = state.gameOver;

  if (cell.isFlagged) {
    button.classList.add("flagged");
    button.textContent = "🚩";
  }
}

function renderBoard() {
  state.board.flat().forEach(renderCell);
}

function revealAllMines() {
  state.board.flat().forEach((cell) => {
    if (cell.isMine) cell.isOpen = true;
  });
  renderBoard();
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function startTimer() {
  if (state.timerId) return;
  state.timerId = setInterval(() => {
    state.timer += 1;
    updateHud();
  }, 1000);
}

function endGame(isWin) {
  state.gameOver = true;
  stopTimer();

  if (isWin) {
    statusTextEl.textContent = `🎉 승리! ${state.timer}초 걸렸어요.`;
    if (!state.bestTime || state.timer < state.bestTime) {
      state.bestTime = state.timer;
      localStorage.setItem(BEST_TIME_KEY, String(state.bestTime));
      updateBestTime();
    }
  } else {
    statusTextEl.textContent = "💥 지뢰를 밟았습니다. 다시 도전해보세요!";
    revealAllMines();
  }

  renderBoard();
}

function openCell(cell) {
  if (state.gameOver || cell.isOpen || cell.isFlagged) return;

  if (!state.firstClickDone) {
    placeMines(cell);
    state.firstClickDone = true;
    startTimer();
  }

  cell.isOpen = true;
  state.openedCount += 1;

  if (cell.isMine) {
    endGame(false);
    return;
  }

  if (cell.adjacent === 0) {
    const queue = [cell];
    while (queue.length) {
      const current = queue.shift();
      getNeighbors(current.row, current.col).forEach((neighbor) => {
        if (neighbor.isOpen || neighbor.isFlagged || neighbor.isMine) return;
        neighbor.isOpen = true;
        state.openedCount += 1;
        if (neighbor.adjacent === 0) queue.push(neighbor);
      });
    }
  }

  const safeTotal = ROWS * COLS - MINE_TOTAL;
  if (state.openedCount >= safeTotal) {
    endGame(true);
    return;
  }

  renderBoard();
}

function toggleFlag(cell) {
  if (state.gameOver || cell.isOpen) return;

  cell.isFlagged = !cell.isFlagged;
  state.flaggedCount += cell.isFlagged ? 1 : -1;
  updateHud();
  renderCell(cell);
}

function createCellElement(cell) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "cell";
  button.setAttribute("role", "gridcell");
  button.dataset.row = String(cell.row);
  button.dataset.col = String(cell.col);

  let pressTimer = null;
  let longPressed = false;

  button.addEventListener("click", () => {
    if (longPressed) {
      longPressed = false;
      return;
    }
    openCell(cell);
  });

  button.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    toggleFlag(cell);
  });

  button.addEventListener("pointerdown", () => {
    pressTimer = setTimeout(() => {
      longPressed = true;
      toggleFlag(cell);
    }, LONG_PRESS_MS);
  });

  ["pointerup", "pointerleave", "pointercancel"].forEach((eventName) => {
    button.addEventListener(eventName, () => {
      clearTimeout(pressTimer);
      pressTimer = null;
    });
  });

  cell.element = button;
  return button;
}

function setupBoard() {
  boardEl.innerHTML = "";
  state.board = createEmptyBoard();
  state.board.flat().forEach((cell) => {
    boardEl.appendChild(createCellElement(cell));
  });
  renderBoard();
}

function resetGame() {
  stopTimer();
  state.firstClickDone = false;
  state.gameOver = false;
  state.openedCount = 0;
  state.flaggedCount = 0;
  state.timer = 0;

  statusTextEl.textContent = "칸을 눌러 시작하세요.";
  updateHud();
  setupBoard();
}

restartButton.addEventListener("click", resetGame);

updateBestTime();
resetGame();
