const gridEl=document.getElementById('grid'); const scoreEl=document.getElementById('score');
let b,s;
const empty=()=>Array.from({length:4},()=>Array(4).fill(0));
const r=()=>Math.floor(Math.random()*4);
function add(){const e=[];for(let y=0;y<4;y++)for(let x=0;x<4;x++)if(!b[y][x])e.push([y,x]);if(!e.length)return;const [y,x]=e[Math.floor(Math.random()*e.length)];b[y][x]=Math.random()<.9?2:4;}
function init(){b=empty();s=0;add();add();draw();}
function draw(){gridEl.innerHTML=''; scoreEl.textContent=s; b.flat().forEach(v=>{const d=document.createElement('div');d.className='cell';d.textContent=v||'';d.style.background=v?`hsl(${260-Math.log2(v)*18} 55% 65%)`:'#5b4d77';gridEl.appendChild(d);});}
function slide(arr){arr=arr.filter(Boolean);for(let i=0;i<arr.length-1;i++)if(arr[i]===arr[i+1]){arr[i]*=2;s+=arr[i];arr[i+1]=0;}arr=arr.filter(Boolean);while(arr.length<4)arr.push(0);return arr;}
function move(dir){const prev=JSON.stringify(b);for(let i=0;i<4;i++){
 let line = dir==='L'||dir==='R'? b[i].slice() : [b[0][i],b[1][i],b[2][i],b[3][i]];
 if(dir==='R'||dir==='D') line.reverse(); line=slide(line); if(dir==='R'||dir==='D') line.reverse();
 if(dir==='L'||dir==='R') b[i]=line; else for(let y=0;y<4;y++) b[y][i]=line[y];
}
if(JSON.stringify(b)!==prev){add();draw();}
}
window.addEventListener('keydown',e=>{const m={ArrowLeft:'L',ArrowRight:'R',ArrowUp:'U',ArrowDown:'D'}[e.key];if(m){e.preventDefault();move(m);}});
document.getElementById('reset').onclick=init; init();
