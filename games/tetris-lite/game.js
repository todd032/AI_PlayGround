const cv=document.getElementById('cv'),ctx=cv.getContext('2d'),scoreEl=document.getElementById('score');
const W=10,H=20,S=20;let g=Array.from({length:H},()=>Array(W).fill(0)),score=0;
const shapes=[[[1,1,1],[0,1,0]],[[2,2],[2,2]],[[3,3,0],[0,3,3]],[[0,4,4],[4,4,0]],[[5,5,5,5]]];
let p={x:3,y:0,m:shapes[0]};
function rand(){return JSON.parse(JSON.stringify(shapes[Math.floor(Math.random()*shapes.length)]));}
function collide(nx=p.x,ny=p.y,m=p.m){for(let y=0;y<m.length;y++)for(let x=0;x<m[y].length;x++)if(m[y][x]){let gx=nx+x,gy=ny+y;if(gx<0||gx>=W||gy>=H||(gy>=0&&g[gy][gx]))return true;}return false;}
function merge(){p.m.forEach((r,y)=>r.forEach((v,x)=>{if(v&&p.y+y>=0)g[p.y+y][p.x+x]=v;}));for(let y=H-1;y>=0;y--)if(g[y].every(Boolean)){g.splice(y,1);g.unshift(Array(W).fill(0));score+=100;scoreEl.textContent=score;y++;}p={x:3,y:0,m:rand()};if(collide()){alert('게임오버');location.reload();}}
function rot(m){return m[0].map((_,i)=>m.map(r=>r[i]).reverse());}
function draw(){ctx.fillStyle='#222';ctx.fillRect(0,0,cv.width,cv.height);for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(g[y][x]){ctx.fillStyle=`hsl(${g[y][x]*55} 80% 60%)`;ctx.fillRect(x*S,y*S,S-1,S-1);}p.m.forEach((r,y)=>r.forEach((v,x)=>{if(v){ctx.fillStyle=`hsl(${v*55} 80% 60%)`;ctx.fillRect((p.x+x)*S,(p.y+y)*S,S-1,S-1);}}));}
function drop(){if(!collide(p.x,p.y+1))p.y++;else merge();draw();}
window.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'&&!collide(p.x-1,p.y))p.x--;if(e.key==='ArrowRight'&&!collide(p.x+1,p.y))p.x++;if(e.key==='ArrowDown')drop();if(e.key==='ArrowUp'){const m=rot(p.m);if(!collide(p.x,p.y,m))p.m=m;}draw();});
p.m=rand();draw();setInterval(drop,500);
