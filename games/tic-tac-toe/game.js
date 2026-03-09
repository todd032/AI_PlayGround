const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');
let board = Array(9).fill('');
let turn = 'X';
let over = false;

function render() {
  boardEl.innerHTML = '';
  board.forEach((v, i) => {
    const btn = document.createElement('button');
    btn.className = 'cell';
    btn.textContent = v;
    btn.disabled = over || Boolean(v);
    btn.addEventListener('click', () => play(i));
    boardEl.appendChild(btn);
  });
}

function winner() {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  return lines.find(([a,b,c]) => board[a] && board[a]===board[b] && board[b]===board[c]);
}

function play(i) {
  if (over || board[i]) return;
  board[i] = turn;
  const win = winner();
  if (win) { over = true; statusEl.textContent = `${turn} 승리!`; }
  else if (board.every(Boolean)) { over = true; statusEl.textContent = '무승부'; }
  else { turn = turn === 'X' ? 'O' : 'X'; statusEl.textContent = `${turn} 차례`; }
  render();
}

resetBtn.addEventListener('click', () => {
  board = Array(9).fill(''); turn='X'; over=false; statusEl.textContent='X 차례'; render();
});

render();
