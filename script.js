const hearts = document.getElementById("hearts");

function createHeart(x = Math.random()*100, size = 16, duration = 5){
  const h = document.createElement("span");
  h.className = "heart-particle";
  h.textContent = Math.random() > .45 ? "♥" : "♡";
  h.style.left = x + "%";
  h.style.fontSize = size + "px";
  h.style.animationDuration = duration + "s";
  h.style.opacity = (.35 + Math.random()*.55).toFixed(2);
  h.style.transform = `translateY(0) rotate(${Math.random()*40-20}deg)`;
  hearts.appendChild(h);
  setTimeout(()=>h.remove(), duration*1000+200);
}
setInterval(()=>createHeart(), 850);

function heartBurst(count=28){
  for(let i=0;i<count;i++){
    const h=document.createElement("span");
    h.className="heart-particle";
    h.textContent="♥";
    h.style.left=(50+(Math.random()*50-25))+"%";
    h.style.bottom=(35+(Math.random()*20-10))+"%";
    h.style.fontSize=(12+Math.random()*28)+"px";
    h.style.animationDuration=(1.5+Math.random()*2)+"s";
    h.style.setProperty("--r", (Math.random()*80-40)+"deg");
    hearts.appendChild(h);
    setTimeout(()=>h.remove(),4000);
  }
}

document.querySelectorAll("[data-scroll]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelector(btn.dataset.scroll)?.scrollIntoView({behavior:"smooth"});
  });
});

const noBtn=document.getElementById("noBtn");
const yesBtn=document.getElementById("yesBtn");
const noMessage=document.getElementById("noMessage");
let noAttempts=0;
const messages=["¿Seguro? 🥺","Mmm... creo que te equivocaste 😌","Ese botón no funciona para ti 😂","Intenta con el otro ❤️","Víctor, tú sabes cuál es la respuesta...","No te voy a dejar decir que no 😌❤️"];

function moveNoButton(){
  noAttempts++;
  const pad=12;
  const maxX=Math.max(pad,window.innerWidth-noBtn.offsetWidth-pad);
  const maxY=Math.max(120,window.innerHeight-noBtn.offsetHeight-pad);
  noBtn.style.position="fixed";
  noBtn.style.left=(Math.random()*maxX)+"px";
  noBtn.style.top=(Math.random()*maxY)+"px";
  noBtn.style.zIndex=60;
  noMessage.textContent=messages[Math.min(noAttempts-1,messages.length-1)];
  yesBtn.style.transform=`scale(${1+Math.min(noAttempts*.08,.65)})`;
}
["mouseenter","touchstart","click"].forEach(ev=>noBtn.addEventListener(ev,(e)=>{
  if(ev==="click") e.preventDefault();
  moveNoButton();
}));

yesBtn.addEventListener("click",()=>{
  noBtn.style.display="none";
  yesBtn.classList.add("explode");
  heartBurst(55);
  setTimeout(()=>{
    document.getElementById("celebration").classList.remove("hidden");
    document.getElementById("celebration").scrollIntoView({behavior:"smooth"});
    heartBurst(80);
  },500);
});

document.querySelectorAll(".choice").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const feedback=document.getElementById("choiceFeedback");
    if(btn.dataset.correct==="true"){
      feedback.textContent="Exactamente. ❤️ Aunque creo que todavía te quedas corto...";
      heartBurst(22);
    }else{
      feedback.textContent="¿Poquito? No acepto esa respuesta. Intenta otra vez 😌";
    }
  });
});

document.getElementById("promiseBtn").addEventListener("click",()=>{
  const text=document.getElementById("promiseText");
  text.textContent="Entonces yo prometo seguir dándote todo el amor que pueda. ❤️";
  heartBurst(35);
});

document.getElementById("heartRainBtn").addEventListener("click",()=>{
  for(let i=0;i<70;i++){
    setTimeout(()=>createHeart(Math.random()*100,10+Math.random()*28,3+Math.random()*4),i*35);
  }
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.14});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const music=document.getElementById("music");
const musicBtn=document.getElementById("musicBtn");
let musicOn=false;
musicBtn.addEventListener("click",async()=>{
  if(!musicOn){
    try{await music.play();musicOn=true;musicBtn.textContent="♫";musicBtn.style.transform="rotate(15deg)";}
    catch(e){alert("Agrega tu archivo audio/musica.mp3 para activar la música.");}
  }else{
    music.pause();musicOn=false;musicBtn.textContent="♫";musicBtn.style.transform="";
  }
});
