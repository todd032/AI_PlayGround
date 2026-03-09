const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("best-score");
const startButton = document.getElementById("start-button");

const gameState = {
  running: false,
  score: 0,
  bestScore: Number(localStorage.getItem("meteor-best-score")) || 0,
  player: {
    x: canvas.width / 2 - 20,
    y: canvas.height - 60,
    width: 40,
    height: 20,
    speed: 6,
  },
  meteors: [],
  keys: new Set(),
  spawnCooldown: 0,
  frame: 0,
};

bestScoreEl.textContent = gameState.bestScore;

function resetGame() {
  gameState.score = 0;
  gameState.player.x = canvas.width / 2 - gameState.player.width / 2;
  gameState.meteors = [];
  gameState.spawnCooldown = 0;
  gameState.frame = 0;
  scoreEl.textContent = "0";
}

function spawnMeteor() {
  const size = 18 + Math.random() * 26;
  gameState.meteors.push({
    x: Math.random() * (canvas.width - size),
    y: -size,
    size,
    speed: 2 + Math.random() * 3 + gameState.score / 120,
  });
}

function update() {
  gameState.frame += 1;
  if (gameState.keys.has("ArrowLeft") || gameState.keys.has("a")) {
    gameState.player.x -= gameState.player.speed;
  }
  if (gameState.keys.has("ArrowRight") || gameState.keys.has("d")) {
    gameState.player.x += gameState.player.speed;
  }

  gameState.player.x = Math.max(
    0,
    Math.min(canvas.width - gameState.player.width, gameState.player.x)
  );

  gameState.spawnCooldown -= 1;
  if (gameState.spawnCooldown <= 0) {
    spawnMeteor();
    gameState.spawnCooldown = Math.max(14, 46 - Math.floor(gameState.score / 20));
  }

  gameState.meteors.forEach((meteor) => {
    meteor.y += meteor.speed;
  });

  gameState.meteors = gameState.meteors.filter((meteor) => meteor.y < canvas.height + meteor.size);

  const player = gameState.player;
  const collision = gameState.meteors.some((meteor) => {
    return (
      meteor.x < player.x + player.width &&
      meteor.x + meteor.size > player.x &&
      meteor.y < player.y + player.height &&
      meteor.y + meteor.size > player.y
    );
  });

  if (collision) {
    endGame();
    return;
  }

  gameState.score += 1;
  scoreEl.textContent = gameState.score;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#0a1238");
  gradient.addColorStop(1, "#02050f");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255,255,255,0.1)";
  for (let i = 0; i < 30; i += 1) {
    const y = (i * 87 + gameState.frame * 2) % canvas.height;
    const x = (i * 53) % canvas.width;
    ctx.fillRect(x, y, 2, 2);
  }

  ctx.fillStyle = "#77f0ff";
  ctx.fillRect(
    gameState.player.x,
    gameState.player.y,
    gameState.player.width,
    gameState.player.height
  );

  gameState.meteors.forEach((meteor) => {
    ctx.beginPath();
    ctx.fillStyle = "#ff8d66";
    ctx.arc(meteor.x + meteor.size / 2, meteor.y + meteor.size / 2, meteor.size / 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

function gameLoop() {
  if (!gameState.running) {
    draw();
    return;
  }

  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function endGame() {
  gameState.running = false;
  if (gameState.score > gameState.bestScore) {
    gameState.bestScore = gameState.score;
    localStorage.setItem("meteor-best-score", String(gameState.bestScore));
    bestScoreEl.textContent = gameState.bestScore;
  }
  startButton.textContent = "다시 시작";
}

startButton.addEventListener("click", () => {
  resetGame();
  gameState.running = true;
  startButton.textContent = "플레이 중";
  requestAnimationFrame(gameLoop);
});

window.addEventListener("keydown", (event) => {
  gameState.keys.add(event.key);
});

window.addEventListener("keyup", (event) => {
  gameState.keys.delete(event.key);
});

let dragging = false;
canvas.addEventListener("pointerdown", () => {
  dragging = true;
});

canvas.addEventListener("pointerup", () => {
  dragging = false;
});

canvas.addEventListener("pointermove", (event) => {
  if (!dragging || !gameState.running) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const relativeX = ((event.clientX - rect.left) / rect.width) * canvas.width;
  gameState.player.x = relativeX - gameState.player.width / 2;
});

draw();
