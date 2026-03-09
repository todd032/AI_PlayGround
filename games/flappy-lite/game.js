const cv=document.getElementById('cv'),ctx=cv.getContext('2d'),sEl=document.getElementById('score');
let bird={x:80,y:200,vy:0,r:12},pipes=[],frame=0,score=0,dead=false;
function jump(){bird.vy=-6;}
function spawn(){const gap=120,top=50+Math.random()*260;pipes.push({x:360,top,gap,passed:false});}
function draw(){ctx.fillStyle='#b4e3ff';ctx.fillRect(0,0,360,520);ctx.fillStyle='#3a9d3a';pipes.forEach(p=>{ctx.fillRect(p.x,0,44,p.top);ctx.fillRect(p.x,p.top+p.gap,44,520);});ctx.beginPath();ctx.arc(bird.x,bird.y,bird.r,0,Math.PI*2);ctx.fillStyle='#ffdf57';ctx.fill();}
function tick(){if(dead)return;frame++;if(frame%90===0)spawn();bird.vy+=0.35;bird.y+=bird.vy;pipes.forEach(p=>{p.x-=2.2;if(!p.passed&&p.x+44<bird.x){p.passed=true;score++;sEl.textContent=score;}});pipes=pipes.filter(p=>p.x>-50);
if(bird.y<0||bird.y>520){dead=true;return alert('게임오버');}
for(const p of pipes){const hitX=bird.x+bird.r>p.x&&bird.x-bird.r<p.x+44;const hitY=bird.y-bird.r<p.top||bird.y+bird.r>p.top+p.gap;if(hitX&&hitY){dead=true;alert('게임오버');}}
draw();requestAnimationFrame(tick);} 
window.addEventListener('keydown',e=>{if(e.code==='Space')jump();});cv.addEventListener('click',jump);draw();tick();
