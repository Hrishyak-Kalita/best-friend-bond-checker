
/* =========================
   STARS
========================= */

const starsContainer =
document.getElementById("stars");

for(let i=0;i<80;i++){

  const star =
  document.createElement("div");

  star.classList.add("star");

  star.style.left =
  Math.random()*100 + "%";

  star.style.top =
  Math.random()*100 + "%";

  star.style.animationDelay =
  Math.random()*5 + "s";

  starsContainer.appendChild(star);
}

/* =========================
   CURSOR
========================= */

const cursor =
document.getElementById("cursor");

document.addEventListener("mousemove",(e)=>{

  if(window.innerWidth < 768) return;

  cursor.style.left =
  e.clientX + "px";

  cursor.style.top =
  e.clientY + "px";

});

/* =========================
   CARD TILT
========================= */

const card =
document.getElementById("card");

document.addEventListener("mousemove",(e)=>{

  if(window.innerWidth < 768) return;

  const x =
  (window.innerWidth / 2 - e.clientX) / 35;

  const y =
  (window.innerHeight / 2 - e.clientY) / 35;

  card.style.transform =
  `rotateY(${x}deg) rotateX(${-y}deg)`;

});

document.addEventListener("mouseleave",()=>{

  card.style.transform =
  "rotateY(0deg) rotateX(0deg)";

});

/* =========================
   RESPONSES
========================= */

const responses = [

"⚠️ SYSTEM OVERLOAD: Too much friendship energy detected.",

"♾️ Bond level currently expanding beyond infinity...",

"💖 Friendship stronger than emotional damage & bad decisions.",

"😂 Built entirely on memes, chaos & inside jokes.",

"🫂 Emotional support humans detected successfully.",

"🚀 This bond survived mood swings & dry replies.",

"🌌 Cosmic friendship unlocked successfully.",

"💌 Basically siblings chosen by destiny.",

"🔥 Legendary duo energy detected.",

"✨ Rare soulmate-level friendship found."

];

const auras = [

"🌌 Cosmic Duo",
"💀 Chaos Partners",
"🫂 Soul Sync",
"🔥 Emotional Damage Survivors",
"✨ Legendary Besties",
"🚀 Meme Lords",
"💖 Infinity Souls",
"🌙 Midnight Therapy Team"

];

/* =========================
   NAME BASED SCORE
========================= */

function generateBond(name1,name2){

  let total = 0;

  const combined =
  (name1 + name2).toLowerCase();

  for(let i=0;i<combined.length;i++){

    total +=
    combined.charCodeAt(i);

  }

  return (total % 31) + 70;
}

/* =========================
   HEART EFFECT
========================= */

function createHeart(){

  const heart =
  document.createElement("div");

  heart.classList.add("heart");

  heart.innerHTML = "💖";

  heart.style.left =
  Math.random() * window.innerWidth + "px";

  heart.style.bottom = "0px";

  document.body.appendChild(heart);

  setTimeout(()=>{

    heart.remove();

  },3000);
}


/* =========================
   REAL VISITOR COUNT
========================= */

async function updateVisitorCount(){

  try{

    const response =
    await fetch("/api/count");

    const data =
    await response.json();

    document.getElementById(
      "visitCount"
    ).innerText = data.visits;

  }catch(error){

    document.getElementById(
      "visitCount"
    ).innerText = "∞";

  }

}

updateVisitorCount();



/* =========================
   MAIN FUNCTION
========================= */

function checkBond(){

  const name1 =
  document.getElementById("name1")
  .value
  .trim();

  const name2 =
  document.getElementById("name2")
  .value
  .trim();

  const result =
  document.getElementById("result");

  if(name1 === "" || name2 === ""){

    result.innerHTML =
    "🥺 Please enter both names first.";

    return;
  }

  result.classList.add("loading");

  result.innerHTML = `

  <div>

    ✨ Analyzing friendship memories...<br>

    📂 Scanning emotional damage...<br>

    💀 Detecting meme compatibility...<br>

    ♾️ Calculating infinity levels...

  </div>

  `;

  setTimeout(()=>{

    result.classList.remove("loading");

    const percentage =
    generateBond(name1,name2);

    const response =
    responses[
      Math.floor(
        Math.random() * responses.length
      )
    ];

    const aura =
    auras[
      Math.floor(
        Math.random() * auras.length
      )
    ];

    result.innerHTML = `

    <div>

      <div class="bond-percent">
        ${percentage}%
      </div>

      <div class="aura">
        ${aura}
      </div>

      <strong>${name1}</strong>
      ✨
      <strong>${name2}</strong>

      <br><br>

      ${response}

      <div class="stats">

        💫 999+ inside jokes <br>

        🌙 100% late-night therapy sessions <br>

        😂 Unlimited roasting compatibility

      </div>

    </div>

    `;

    for(let i=0;i<18;i++){

      setTimeout(()=>{

        createHeart();

      },i*120);

    }

  },2500);
}

