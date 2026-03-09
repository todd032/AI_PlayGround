const emojis=['🍎','🍌','🍇','🍒','🍋','🥝','🍉','🍑'];
const board=document.getElementById('board'),turnEl=document.getElementById('turn'); let cards=[],opened=[],lock=false,turn=0;
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function init(){cards=shuffle([...emojis,...emojis]).map(v=>({v,open:false,done:false}));opened=[];lock=false;turn=0;turnEl.textContent=0;render();}
function clickCard(i){if(lock||cards[i].open||cards[i].done)return;cards[i].open=true;opened.push(i);render();if(opened.length===2){turn++;turnEl.textContent=turn;const [a,b]=opened;if(cards[a].v===cards[b].v){cards[a].done=cards[b].done=true;opened=[];if(cards.every(c=>c.done))setTimeout(()=>alert('클리어!'),50);}else{lock=true;setTimeout(()=>{cards[a].open=cards[b].open=false;opened=[];lock=false;render();},650);}}}
function render(){board.innerHTML='';cards.forEach((c,i)=>{const b=document.createElement('button');b.className='card';b.textContent=c.open||c.done?c.v:'?';b.onclick=()=>clickCard(i);board.appendChild(b);});}
document.getElementById('reset').onclick=init;init();
