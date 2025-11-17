const riddles = [
  {
    question: "Bagaimana cara menyembuhkan penyakit turunan?",
    answer: "Integral",
    hint: "Lawan dari turunan",
  },
  {
    question: "Ular apa yang panjangnya gak rasional?",
    answer: "Piton",
    hint: "Ada di lingkaran",
  },
  {
    question: "Kalau mobil nabrak pohon, yang turun apanya dulu?",
    answer: "Kecepatannya",
    hint: "Butuh mikir ekstra ini, mending langsung lihat jawabannya deh",
  },
];

const startScreen = document.getElementById("start-screen");
const riddleScreen = document.getElementById("riddle-screen");
const unlockScreen = document.getElementById("unlock-screen");
const messageScreen = document.getElementById("message-screen");
const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const showAnswerBtn = document.getElementById("show-answer-btn");
const unlockBtn = document.getElementById("unlock-btn");
const restartBtn = document.getElementById("restart-btn");
const riddleText = document.getElementById("riddle-text");
const answerInput = document.getElementById("answer-input");
const feedback = document.getElementById("feedback");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

let currentRiddle = 0;
let solvedRiddles = 0;
let currentRiddleSolved = false;

startBtn.addEventListener("click", startRiddles);
submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);
showAnswerBtn.addEventListener("click", showAnswer);
unlockBtn.addEventListener("click", showMessage);
restartBtn.addEventListener("click", restartGame);

answerInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (!currentRiddleSolved) {
      checkAnswer();
    } else {
      nextQuestion();
    }
  }
});

function startRiddles() {
  startScreen.classList.add("hidden");
  riddleScreen.classList.remove("hidden");
  currentRiddle = 0;
  solvedRiddles = 0;
  currentRiddleSolved = false;
  showRiddle();
  updateProgress();
}

function showRiddle() {
  const riddle = riddles[currentRiddle];
  riddleText.textContent = riddle.question;
  answerInput.value = "";
  feedback.classList.add("hidden");
  answerInput.disabled = false;
  submitBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  showAnswerBtn.classList.add("hidden");
  answerInput.focus();
  currentRiddleSolved = false;

  const existingReveal = document.querySelector(".answer-reveal");
  if (existingReveal) {
    existingReveal.remove();
  }
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = riddles[currentRiddle].answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    feedback.textContent = "Jawaban Benar 🥳🥳🥳";
    feedback.className = "feedback correct-feedback";
    solvedRiddles++;
    currentRiddleSolved = true;

    answerInput.disabled = true;
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  } else {
    feedback.textContent = "Salah wkwkwk. Coba lagi atau klik Lihat Jawaban!";
    feedback.className = "feedback incorrect-feedback";

    const hint = document.createElement("div");
    hint.className = "hint";
    hint.textContent = `Hint: ${riddles[currentRiddle].hint}`;
    feedback.appendChild(hint);

    showAnswerBtn.classList.remove("hidden");
  }

  feedback.classList.remove("hidden");
}

function showAnswer() {
  const correctAnswer = riddles[currentRiddle].answer;

  const answerReveal = document.createElement("div");
  answerReveal.className = "answer-reveal";
  answerReveal.innerHTML = `
        <strong>Jawabannya:</strong> "${correctAnswer}"
    `;

  feedback.parentNode.insertBefore(answerReveal, feedback.nextSibling);

  feedback.textContent = "Coba lagi hehe";
  feedback.className = "feedback incorrect-feedback";

  answerInput.disabled = true;
  submitBtn.classList.add("hidden");
  showAnswerBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");

  currentRiddleSolved = true;
}

function nextQuestion() {
  currentRiddle++;
  if (currentRiddle < riddles.length) {
    showRiddle();
    updateProgress();
  } else {
    riddleScreen.classList.add("hidden");
    unlockScreen.classList.remove("hidden");
    updateProgress();
  }
}

function updateProgress() {
  step1.className = "progress-step";
  step2.className = "progress-step";
  step3.className = "progress-step";

  for (let i = 0; i < currentRiddle; i++) {
    const step = document.getElementById(`step${i + 1}`);
    if (i < solvedRiddles) {
      step.className = "progress-step completed";
    } else {
      step.className = "progress-step skipped";
    }
  }

  if (currentRiddle < riddles.length) {
    document.getElementById(`step${currentRiddle + 1}`).className =
      "progress-step active";
  }
}

function showMessage() {
  unlockScreen.classList.add("hidden");
  messageScreen.classList.remove("hidden");
  createConfetti();
}

function restartGame() {
  messageScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

function createConfetti() {
  const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#6c5ce7", "#a29bfe"];
  const container = document.querySelector(".container");

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    confetti.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(confetti);

    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.remove();
      }
    }, 7000);
  }
}
