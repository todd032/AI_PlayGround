const cv=document.getElementById('cv'),ctx=cv.getContext('2d');
let paddle={x:170,w:90,h:12},ball={x:210,y:320,vx:3,vy:-3,r:8},left=false,right=false;
const rows=5,cols=8,bw=45,bh=18,pad=6,offX=12,offY=50; let bricks=[];
for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)bricks.push({x:offX+c*(bw+pad),y:offY+r*(bh+pad),hit:false});
function draw(){ctx.fillStyle='#1c2a47';ctx.fillRect(0,0,cv.width,cv.height);ctx.fillStyle='#f3d27a';bricks.filter(b=>!b.hit).forEach(b=>ctx.fillRect(b.x,b.y,bw,bh));ctx.fillStyle='#8ee3ff';ctx.fillRect(paddle.x,cv.height-28,paddle.w,paddle.h);ctx.beginPath();ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();}
function tick(){if(left)paddle.x-=6;if(right)paddle.x+=6;paddle.x=Math.max(0,Math.min(cv.width-paddle.w,paddle.x));ball.x+=ball.vx;ball.y+=ball.vy;
if(ball.x<ball.r||ball.x>cv.width-ball.r)ball.vx*=-1;if(ball.y<ball.r)ball.vy*=-1;if(ball.y>cv.height){alert('실패');location.reload();}
if(ball.y+ball.r>=cv.height-28&&ball.x>paddle.x&&ball.x<paddle.x+paddle.w)ball.vy=-Math.abs(ball.vy);
bricks.forEach(b=>{if(!b.hit&&ball.x>b.x&&ball.x<b.x+bw&&ball.y>b.y&&ball.y<b.y+bh){b.hit=true;ball.vy*=-1;}});
if(bricks.every(b=>b.hit)){alert('클리어!');location.reload();}
draw();requestAnimationFrame(tick);} 
window.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')left=true;if(e.key==='ArrowRight')right=true;});
window.addEventListener('keyup',e=>{if(e.key==='ArrowLeft')left=false;if(e.key==='ArrowRight')right=false;});
draw();tick();
