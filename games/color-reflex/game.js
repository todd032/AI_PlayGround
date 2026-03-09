const colors=['빨강','파랑','초록','노랑']; const map={빨강:'red',파랑:'blue',초록:'green',노랑:'gold'};
const wordEl=document.getElementById('word'),btnsEl=document.getElementById('buttons'),scoreEl=document.getElementById('score'),timeEl=document.getElementById('time');
let answer='',score=0,time=30,timer=null;
btnsEl.innerHTML=colors.map(c=>`<button data-c="${c}">${c}</button>`).join('');
btnsEl.onclick=e=>{if(!e.target.dataset.c||time<=0)return;if(e.target.dataset.c===answer)score++;else score=Math.max(0,score-1);scoreEl.textContent=score;next();};
function next(){const text=colors[Math.floor(Math.random()*4)],color=colors[Math.floor(Math.random()*4)];answer=color;wordEl.textContent=text;wordEl.style.color=map[color];}
function start(){score=0;time=30;scoreEl.textContent=0;timeEl.textContent=30;next();clearInterval(timer);timer=setInterval(()=>{time--;timeEl.textContent=time;if(time<=0){clearInterval(timer);alert(`종료! 점수 ${score}`);}},1000);} 
document.getElementById('start').onclick=start;
