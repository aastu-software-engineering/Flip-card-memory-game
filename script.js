const cards = document.querySelectorAll(".card"),
  timeTag = document.querySelector(".time b"),
  flipsTag = document.querySelector(".flips b"),
  refreshBtn = document.querySelector(".details button"),
  bgColorInput = document.querySelector("#bg-color-input"),
  cardColorInput = document.querySelector("#card-color-input"),
  applyColorsBtn = document.querySelector("#apply-colors"),
  bestScoreTag = document.querySelector(".best-score b");

console.log("Best score element:", bestScoreTag);

let maxTime = 20;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer, hintTimer;
let bestScore = parseInt(localStorage.getItem("bestScore")) || Infinity;

bestScoreTag.innerText = bestScore === Infinity ? "-" : bestScore;

console.log("Initial best score from localStorage:", localStorage.getItem("bestScore"));

function showModal(msgbox) {
  let modal = document.getElementById("modal");
  let message = document.getElementById(msgbox);
  modal.style.display = "block";
  message.style.display = "block";
}

function closeModal() {
  let modal = document.getElementById("modal");
  let messageBoxes = document.getElementsByClassName("message-box");
  modal.style.display = "none";
  for (let i = 0; i < messageBoxes.length; i++) {
    messageBoxes[i].style.display = "none";
  }
}
let closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", closeModal);

function initTimer() {
  if (timeLeft <= 0) {
    if (matchedCard == 6) {
      showModal("win-box");
    } else {
      showModal("lose-box");
    }
    return clearInterval(timer);
  }
  timeLeft -= 1;
  timeTag.innerText = timeLeft;
}

function flipCard({ target: clickedCard }) {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(initTimer, 1000);
    hintTimer = setInterval(showHint, 4000);
  }
  if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
    flips++;
    flipsTag.innerText = flips;
    console.log(`Flips: ${flips}`);
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    console.log(`Matched pairs: ${matchedCard}, Current flips: ${flips}`);
    
    if (matchedCard == 6 && timeLeft > 0) {
      console.log(`Game won! Flips: ${flips}, Current best: ${bestScore}`);
      
      if (bestScore === Infinity || flips < bestScore) {
        bestScore = flips;
        localStorage.setItem("bestScore", bestScore.toString());
        bestScoreTag.innerText = bestScore;
        console.log(`New best score set: ${bestScore}`);
      }
      showModal("win-box");
      clearInterval(timer);
      clearInterval(hintTimer);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }

  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function shuffleCard() {
  timeLeft = maxTime;
  flips = matchedCard = 0;
  cardOne = cardTwo = "";
  clearInterval(timer);
  clearInterval(hintTimer);
  timeTag.innerText = timeLeft;
  flipsTag.innerText = flips;
  disableDeck = isPlaying = false;

  let savedBestScore = localStorage.getItem("bestScore");
  if (savedBestScore) {
    bestScore = parseInt(savedBestScore);
    bestScoreTag.innerText = bestScore;
  } else {
    bestScore = Infinity;
    bestScoreTag.innerText = "-";
  }

  let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    setTimeout(() => {
      imgTag.src = `images/img-${arr[index]}.png`;
    }, 500);
    card.addEventListener("click", flipCard);
  });
}

function showHint() {
  let unmatchedCards = Array.from(cards).filter(
    (card) => !card.classList.contains("flip")
  );
  if (unmatchedCards.length > 0) {
    let randomCard =
      unmatchedCards[Math.floor(Math.random() * unmatchedCards.length)];
    randomCard.classList.add("flip");
    setTimeout(() => {
      randomCard.classList.remove("flip");
    }, 500);
  }
}

let timeInput = document.querySelector("#time-input"),
  timeSubmit = document.querySelector("#time-submit");

timeSubmit.addEventListener("click", function () {
  maxTime = parseInt(timeInput.value);
  timeLeft = maxTime;
  timeInput.value = "";
});
shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

applyColorsBtn.addEventListener("click", function () {
  document.body.style.backgroundColor = bgColorInput.value;
  cards.forEach((card) => {
    card.querySelector(".view").style.backgroundColor = cardColorInput.value;
  });
});

function resetBestScore() {
  bestScore = Infinity;
  localStorage.removeItem("bestScore");
  bestScoreTag.innerText = "-";
}
