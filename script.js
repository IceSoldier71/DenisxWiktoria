const SITE_PIN = "1707"; // ZMIEŃ TUTAJ PIN (4 cyfry)
let enteredPin = "";
document.body.classList.add("locked");

const pinDots = [...document.querySelectorAll("#pinDots i")];
const pinError = document.querySelector("#pinError");
const pinDotsBox = document.querySelector("#pinDots");

function drawPin(){
  pinDots.forEach((dot,i)=>dot.classList.toggle("filled", i < enteredPin.length));
}
function wrongPin(){
  pinError.textContent = "Nieprawidłowy PIN";
  pinDotsBox.classList.remove("shake");
  void pinDotsBox.offsetWidth;
  pinDotsBox.classList.add("shake");
  setTimeout(()=>{ enteredPin=""; drawPin(); pinError.textContent=""; },650);
}
function unlockSite(){
  document.querySelector("#mainSite").style.display="";
  document.body.classList.remove("locked");
  document.querySelector("#lockScreen").classList.add("unlocked");
  setTimeout(()=>document.querySelector("#lockScreen").remove(),700);
}
document.querySelectorAll(".keypad button[data-key]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const key=btn.dataset.key;
    if(key==="del"){ enteredPin=enteredPin.slice(0,-1); drawPin(); return; }
    if(enteredPin.length>=4) return;
    enteredPin+=key; drawPin();
    if(enteredPin.length===4){
      setTimeout(()=> enteredPin===SITE_PIN ? unlockSite() : wrongPin(),160);
    }
  });
});

const CONFIG = {
  relationshipStart: "2025-07-17T20:00:00",
  messages: [
    ["me","Cześć piękna"],
    ["them","Cześć"],
    ["me","Co ktoś tak ładny jak ty robi w takim miejscu."],
    ["them","Szukam ciekawych osób"],
    ["me","czyli jestem ciekawy ;)"],
    ["them","haha"],
    ["me","Co robisz"],
    ["them","Oglądam serial"],
    ["me","jaki"],
    ["them","Chucky"],
    ["me","O kurde naprawde? oglądałem go ostatnio"],
    ["me","Mam coś dla Ciebie. Zeskanuj to."]
  ]
};

const scenes=[...document.querySelectorAll(".scene")];
function showScene(id){
  scenes.forEach(s=>s.classList.remove("active"));
  document.querySelector(id).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}

function heart(){
  const h=document.createElement("div");
  h.className="heart";
  h.textContent=Math.random()>.25?"♥":"♡";
  h.style.left=Math.random()*100+"vw";
  h.style.fontSize=(14+Math.random()*38)+"px";
  h.style.animationDuration=(4+Math.random()*6)+"s";
  h.style.color=Math.random()>.5?"#ff287d":"#b62eae";
  document.querySelector("#hearts").appendChild(h);
  setTimeout(()=>h.remove(),10000);
}
setInterval(heart,450);

const box=document.querySelector("#messages");
const typing=document.querySelector("#typing");
let idx=0,timer;

function showTimeTransition(){
  clearTimeout(timer);
  showScene("#scene-qr");
  timer=setTimeout(()=>showScene("#scene-story"),2500);
}

function nextMessage(){
  if(idx>=CONFIG.messages.length){
    typing.classList.remove("show");
    timer=setTimeout(showTimeTransition,500);
    return;
  }
  typing.classList.add("show");
  timer=setTimeout(()=>{
    typing.classList.remove("show");
    const [who,text]=CONFIG.messages[idx++];
    const b=document.createElement("div");
    b.className="bubble "+who;
    b.textContent=text;
    box.appendChild(b);
    box.scrollTop=box.scrollHeight;
    nextMessage();
  },650+Math.random()*700);
}
setTimeout(nextMessage,700);

document.querySelector("#skipBtn").onclick=showTimeTransition;

function updateCounter(){
  const d=Math.max(0,Date.now()-new Date(CONFIG.relationshipStart).getTime());
  document.querySelector("#days").textContent=String(Math.floor(d/86400000)).padStart(3,"0");
  document.querySelector("#hours").textContent=String(Math.floor(d/3600000)%24).padStart(2,"0");
  document.querySelector("#minutes").textContent=String(Math.floor(d/60000)%60).padStart(2,"0");
}
updateCounter();
setInterval(updateCounter,30000);
// ===== MUZYKA =====

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const songBtn = document.getElementById("songBtn");

async function toggleMusic() {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();

      // Muzyka gra
      musicBtn.textContent = "🔊";
      songBtn.textContent = "⏸";
      musicBtn.classList.add("playing");
      songBtn.classList.add("playing");

    } catch (error) {
      console.log("Nie udało się uruchomić muzyki:", error);
    }
  } else {
    bgMusic.pause();

    // Muzyka zatrzymana
    musicBtn.textContent = "♫";
    songBtn.textContent = "▶";
    musicBtn.classList.remove("playing");
    songBtn.classList.remove("playing");
  }
}

musicBtn.addEventListener("click", toggleMusic);
songBtn.addEventListener("click", toggleMusic);

// Gdy piosenka się skończy / zatrzyma
bgMusic.addEventListener("pause", () => {
  musicBtn.textContent = "♫";
  songBtn.textContent = "▶";
  musicBtn.classList.remove("playing");
  songBtn.classList.remove("playing");
});

bgMusic.addEventListener("play", () => {
  musicBtn.textContent = "🔊";
  songBtn.textContent = "⏸";
  musicBtn.classList.add("playing");
  songBtn.classList.add("playing");
});
