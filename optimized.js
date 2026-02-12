const livesContainer = document.getElementById('lives');
const mobileImg = document.getElementById('mobile-img');
const theQuestion = document.getElementById('question');
const concertBtn = document.getElementById('concertBtn');
const cheers = new Audio('sound/funny yay.mp3');
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let lives = [];
let noCounter = 0;
let yesCounter = 0;

const heartData = {
  full: "images/heart.png",
  shattered: "images/heart_shattered.png"
};

const negQList = [
  "Maybe Reconsider?",
  "Pleasseee!!!!",
  "My hearrttt!!! <br> 😭😭😭"
];

const posQList = [
  "Wait Really???",
  "No take backs ok?",
  "💖💖💖"
];

const valImg = {
  posRes: [
    "images/excited.png",
    "images/happy.png",
    "images/peck.png"
  ],
  negRes: [
    "images/panicked.png",
    "images/sad.png",
    "images/dejected.png"
  ]
};


function preloadImages(urls) {
  urls.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function createHearts(count = 3) {
  lives = [];
  livesContainer.textContent = ""; // clears old hearts if re-called

  const frag = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const heartImg = document.createElement('img');
    heartImg.src = heartData.full;
    heartImg.className = "heart"; 
    lives.push(heartImg);
    frag.appendChild(heartImg);
  }

  livesContainer.appendChild(frag);
}



/**"Yes" button clicked */
function Hurray() {
  if (yesCounter >= 3) return;
  mobileImg.src = valImg.posRes[yesCounter];
  theQuestion.innerHTML = posQList[yesCounter];
  yesCounter++;

  if (yesCounter==1){
    yesBtn.addEventListener("click", () => {
      yesBtn.innerHTML = "Ok";
      noBtn.innerHTML = "Okn't"
    });
  }


  if (yesCounter==2) {
    yesBtn.addEventListener("click", () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
  cheers.play()
  document.getElementById("btns").remove();
});

  }

  
}

/**"No" button clicked */
function OhNo() {
  if (noCounter < 3) {
    lives[noCounter].src = heartData.shattered;
    theQuestion.innerHTML = negQList[noCounter];
    navigator.vibrate(200)
    mobileImg.src = valImg.negRes[noCounter];

    
    noCounter++;
    if (noCounter == 1){
    noBtn.addEventListener("click",()=>{
      yesBtn.innerHTML = "Ok"
      noBtn.innerHTML = "No"
    })
  }
  if (noCounter == 2){
    noBtn.addEventListener("click",()=>{
      yesBtn.innerHTML = "Fine"
      noBtn.innerHTML = "Still No"
    })
  }
    
  }else{
 alert('Meanie 😭');
  }

  
}

// Preload all images used
preloadImages([
  heartData.full,
  heartData.shattered,
  ...valImg.posRes,
  ...valImg.negRes
]);

createHearts();
