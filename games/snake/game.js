const c=document.getElementById('c'),x=c.getContext('2d'),sEl=document.getElementById('score');
const n=18,sz=20; let snake=[[9,9]],dir=[1,0],food=[4,4],score=0,alive=true;
function spawn(){food=[Math.floor(Math.random()*n),Math.floor(Math.random()*n)];}
function step(){if(!alive)return;const h=[snake[0][0]+dir[0],snake[0][1]+dir[1]];if(h[0]<0||h[1]<0||h[0]>=n||h[1]>=n||snake.some(([a,b])=>a===h[0]&&b===h[1])){alive=false;return alert('게임오버');}
snake.unshift(h);if(h[0]===food[0]&&h[1]===food[1]){score++;sEl.textContent=score;spawn();}else snake.pop();draw();}
function draw(){x.fillStyle='#1f3b28';x.fillRect(0,0,c.width,c.height);x.fillStyle='#ff7b7b';x.fillRect(food[0]*sz,food[1]*sz,sz-1,sz-1);x.fillStyle='#9cffad';snake.forEach(([a,b])=>x.fillRect(a*sz,b*sz,sz-1,sz-1));}
window.addEventListener('keydown',e=>{const d={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.key];if(d&&!(d[0]===-dir[0]&&d[1]===-dir[1]))dir=d;});
spawn();draw();setInterval(step,120);
