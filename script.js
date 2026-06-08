
/* =========================
   IMAGE PREVIEW
========================= */

let photo1URL = "";
let photo2URL = "";

document.getElementById("photo1").addEventListener("change", (e) => {

  const file = e.target.files[0];

  if (file) {

    photo1URL = URL.createObjectURL(file);

    document.getElementById("preview1").src = photo1URL;

    document.getElementById("uploadText1").innerText =
      "Energy Added ✨";

  }

});

document.getElementById("photo2").addEventListener("change", (e) => {

  const file = e.target.files[0];

  if (file) {

    photo2URL = URL.createObjectURL(file);

    document.getElementById("preview2").src = photo2URL;

    document.getElementById("uploadText2").innerText =
      "Vibe Captured 💫";

  }

});

/* =========================
   STARS
========================= */

const starsContainer =
document.getElementById("stars");

for(let i = 0; i < 90; i++){

  const star =
  document.createElement("div");

  star.classList.add("star");

  star.style.left =
  Math.random() * 100 + "%";

  star.style.top =
  Math.random() * 100 + "%";

  star.style.animationDelay =
  Math.random() * 5 + "s";

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
   FRIENDSHIP TYPES
========================= */

const friendshipTypes = [

  "Late Night Comfort Duo 🌙",

  "Golden Retriever Energy 🐶",

  "Forever Safe Space 💖",

  "Chaotic But Caring ✨",

  "Inside Joke Specialists 😂",

  "Soft Souls Connection ☁️",

  "Long Talks & Deep Trust 💫",

  "Main Character Besties 🎬",

  "Always There Energy 🫂",

  "Childhood Memory Vibes 🪁"

];

/* =========================
   SMART RESULT
========================= */

function getResultMessage(score){

  if(score >= 96){

    return `
    Some friendships naturally become a safe place.

    The connection here feels effortless,
    comforting,
    and genuinely rare 💖
    `;

  }

  if(score >= 90){

    return `
    This friendship feels warm,
    emotionally balanced,
    and full of memories that quietly matter ✨
    `;

  }

  if(score >= 84){

    return `
    A beautiful friendship with fun energy,
    emotional comfort,
    and the kind of vibe that lasts 💫
    `;

  }

  return `
  A chaotic but lovable friendship 😂

  Built on random conversations,
  shared humour,
  and being there when it matters 💖
  `;

}

/* =========================
   SCORE
========================= */

function generateBond(name1,name2){

  let total = 0;

  const combined =
  (name1 + name2).toLowerCase();

  for(let i = 0; i < combined.length; i++){

    total +=
    combined.charCodeAt(i);

  }

  let score =
  (total % 21) + 78;

  if(

    name1[0]?.toLowerCase() ===

    name2[0]?.toLowerCase()

  ){

    score += 3;

  }

  if(score > 98){

    score = 98;

  }

  return score;

}

/* =========================
   FLOATING EMOJIS
========================= */

function createEmoji(){

  const emojis =
  ["💖","✨","🌙","🫂","😂"];

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

  }

}

updateVisitorCount();

/* =========================
   MAIN
========================= */

async function checkBond(){

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

  const button =
  document.querySelector(".main-btn");

  /* =========================
     VALIDATION
  ========================= */

  if(name1 === "" || name2 === ""){

    result.classList.add("show");

    result.scrollIntoView({

      behavior:"smooth",

      block:"start"

    });

    result.querySelector(".result-text").innerHTML =

    "🥺 Add both names to discover your friendship vibe.";

    return;

  }

  /* =========================
     SHOW RESULT SECTION
  ========================= */

  result.classList.add("show");

  result.scrollIntoView({

    behavior:"smooth",

    block:"start"

  });

  /* =========================
     BUTTON LOADING
  ========================= */

  button.innerHTML =
  "Syncing Your Vibe... ✨";

  button.disabled = true;

  /* =========================
     RESET UI
  ========================= */

  percentageText.innerHTML =
  "⌛";

  progressBar.style.strokeDashoffset =
  408;

  /* =========================
     LOADING UI
  ========================= */

  result.querySelector(".result-text").innerHTML = `

    ✨ Syncing friendship energy...<br><br>

    💭 Reading your connection vibe...<br><br>

    🌙 Finding your friendship aura...<br><br>

    💖 Creating your bond story...

  `;

  /* =========================
     RESULT DELAY
  ========================= */

  setTimeout(async()=>{

    const percentage =
    generateBond(name1,name2);

    try{

      await fetch("/api/count",{

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

    }catch(error){

      console.log(error);

    }

    const friendshipType =

    friendshipTypes[
      Math.floor(
        Math.random() *
        friendshipTypes.length
      )
    ];

    const resultMessage =
    getResultMessage(percentage);

    /* =========================
       PERCENTAGE UI
    ========================= */

    percentageText.innerHTML =
    `${percentage}%`;

    const radius = 65;

    const circumference =
    2 * Math.PI * radius;

    const offset =

      circumference -

      (percentage / 100) *

      circumference;

    progressBar.style.strokeDashoffset =
    offset;

    /* =========================
       DYNAMIC BACKGROUND
    ========================= */

    if(percentage >= 95){

      document.body.style.background =

      `

      radial-gradient(circle at top left,#ff00aa33,transparent 30%),

      radial-gradient(circle at bottom right,#00d4ff33,transparent 30%),

      linear-gradient(135deg,#120018,#0f172a,#000)

      `;

    }else if(percentage >= 88){

      document.body.style.background =

      `

      radial-gradient(circle at top left,#7c3aed33,transparent 30%),

      radial-gradient(circle at bottom right,#06b6d433,transparent 30%),

      linear-gradient(135deg,#0f172a,#020617,#000)

      `;

    }else{

      document.body.style.background =

      `

      radial-gradient(circle at top left,#33415533,transparent 30%),

      radial-gradient(circle at bottom right,#06b6d422,transparent 30%),

      linear-gradient(135deg,#111827,#020617,#000)

      `;

    }

    /* =========================
       RESULT UI
    ========================= */

    result.querySelector(".result-text").innerHTML = `

      <div class="friendship-badge">

        ${friendshipType}

      </div>

      <div class="bond-quote">

        "${resultMessage}"

      </div>

      <div class="mini-divider"></div>

      <div class="memory-line">

        💫 Some people quietly become
        a part of your comfort,
        your chaos,
        and your favorite memories.

      </div>

      <div class="stats">

        💬 Comfort Level:
        ${Math.floor(percentage-5)}%

        <br><br>

        🌙 Emotional Sync:
        ${Math.floor(percentage-2)}%

        <br><br>

        😂 Inside Joke Energy:
        100%

      </div>

    `;

    /* =========================
       STORY CARD UPDATE
    ========================= */

    document.getElementById(
      "storyImg1"
    ).src = photo1URL;

    document.getElementById(
      "storyImg2"
    ).src = photo2URL;

    document.getElementById(
      "storyScore"
    ).innerText =
    `${percentage}%`;

    document.getElementById(
      "storyType"
    ).innerText =
    friendshipType;

    document.getElementById(
      "storyQuote"
    ).innerText =
    resultMessage;

    document.getElementById(
      "storyComfort"
    ).innerText =
    `${Math.floor(percentage-5)}%`;

    document.getElementById(
      "storySync"
    ).innerText =
    `${Math.floor(percentage-2)}%`;

    /* =========================
       SHOW SHARE BUTTON
    ========================= */

    document.getElementById(
      "shareActions"
    ).classList.add("show");

    /* =========================
       FLOATING EMOJIS
    ========================= */

    for(let i = 0; i < 18; i++){

      setTimeout(()=>{

        createEmoji();

      },i*120);

    }

    /* =========================
       RESTORE BUTTON
    ========================= */

    button.innerHTML =
    "Sync Our Bond ✨";

    button.disabled = false;

  },2200);

}

/* =========================
   SHARE RESULT
========================= */

async function saveResult(){

  const storyCard =
  document.getElementById("storyCard");

  const canvas =
  await html2canvas(storyCard,{

    scale:2,

    useCORS:true,

    backgroundColor:null

  });

  canvas.toBlob(async(blob)=>{

    const file =
    new File(

      [blob],

      "bondsync-story.png",

      {
        type:"image/png"
      }

    );

    if(

      navigator.share &&

      navigator.canShare({

        files:[file]

      })

    ){

      try{

        await navigator.share({

          title:"bond.sync ✨",

          text:"Our friendship vibe 💖",

          files:[file]

        });

      }catch(error){

        console.log(error);

      }

    }else{

      const link =
      document.createElement("a");

      link.download =
      "bondsync-story.png";

      link.href =
      URL.createObjectURL(blob);

      link.click();

    }

  });

}
