
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

/* =========================
   RESPONSES
========================= */

const responses = [

"⚠️ SYSTEM OVERLOAD: Too much friendship energy detected.",

"♾️ Bond level expanding beyond infinity...",

"💖 Friendship stronger than emotional damage.",

"😂 Built entirely on memes & inside jokes.",

"🫂 Emotional support humans detected.",

"🚀 This bond survived dry replies & mood swings.",

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
   SCORE GENERATOR
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
   FLOATING EMOJIS
========================= */

function createEmoji(){

  const emojis =
  ["💖","✨","🌌","😂","♾️"];

  const emoji =
  document.createElement("div");

  emoji.classList.add("float-emoji");

  emoji.innerHTML =
  emojis[Math.floor(Math.random()*emojis.length)];

  emoji.style.left =
  Math.random() * window.innerWidth + "px";

  emoji.style.bottom = "0px";

  document.body.appendChild(emoji);

  setTimeout(()=>{

    emoji.remove();

  },3000);
}

/* =========================
   ONLINE USERS
========================= */

function updateOnlineUsers(){

  document.getElementById(
    "onlineUsers"
  ).innerText =
  Math.floor(Math.random()*20)+8;

}

updateOnlineUsers();

setInterval(updateOnlineUsers,4000);

/* =========================
   VISITOR COUNT
========================= */

async function updateVisitorCount(){

  try{

    const response =
    await fetch("/api/count");

    const data =
    await response.json();

    document.getElementById(
      "visitCount"
    ).innerText =
    data.visits || 0;

  }catch(error){

    console.log(error);

    document.getElementById(
      "visitCount"
    ).innerText = "0";

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

  const percentageText =
  document.getElementById("percentage");

  const progressBar =
  document.getElementById("progressBar");

  if(name1 === "" || name2 === ""){

    result.querySelector(".result-text").innerHTML =
    "🥺 Please enter both names first.";

    return;
  }

  result.classList.add("loading");

  percentageText.innerHTML = "⌛";

  result.querySelector(".result-text").innerHTML = `

    ✨ Analyzing friendship memories...<br>

    📂 Scanning emotional damage...<br>

    💀 Detecting meme compatibility...<br>

    ♾️ Calculating infinity levels...

  `;

  setTimeout(()=>{

    result.classList.remove("loading");

    const percentage =
    generateBond(name1,name2);

    /* SAVE TO REDIS */

    fetch("/api/count",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        name1,
        name2,
        score:percentage

      })

    });

    const response =
    responses[
      Math.floor(
        Math.random()*responses.length
      )
    ];

    const aura =
    auras[
      Math.floor(
        Math.random()*auras.length
      )
    ];

    percentageText.innerHTML =
    `${percentage}%`;

    const radius = 65;

    const circumference =
    2 * Math.PI * radius;

    const offset =
    circumference -
    (percentage / 100) * circumference;

    progressBar.style.strokeDashoffset =
    offset;

    result.querySelector(".result-text").innerHTML = `

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

    `;

    for(let i=0;i<18;i++){

      setTimeout(()=>{

        createEmoji();

      },i*120);

    }

    /* DYNAMIC BACKGROUND */

    if(percentage >= 95){

      document.body.style.background =
      "linear-gradient(135deg,#ff0080,#7928ca,#00d4ff)";

    }else if(percentage >= 85){

      document.body.style.background =
      "linear-gradient(135deg,#7c4dff,#00d4ff,#111827)";

    }else{

      document.body.style.background =
      "linear-gradient(135deg,#111827,#0f172a,#070710)";
    }

  },2500);

}

/* =========================
   SHARE / SAVE RESULT
========================= */

async function saveResult(){

  const canvas =
  await html2canvas(
    document.querySelector(".card")
  );

  canvas.toBlob(async(blob)=>{

    const file =
    new File(
      [blob],
      "bondsync-result.png",
      { type:"image/png" }
    );

    if(
      navigator.canShare &&
      navigator.canShare({
        files:[file]
      })
    ){

      try{

        await navigator.share({

          title:"bond.sync ✨",

          text:
          "Our friendship bond broke reality ♾️",

          files:[file]

        });

      }catch(error){

        console.log(error);
      }

    }else{

      const link =
      document.createElement("a");

      link.download =
      "bondsync-result.png";

      link.href =
      URL.createObjectURL(blob);

      link.click();
    }

  });

}

