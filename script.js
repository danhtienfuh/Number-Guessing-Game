let secret = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let maxAttempts = 10;  // default medium
let history = [];
let lang = "en";

const texts = {
  en: {
    title: "🎯 Number Guessing Game",
    description: "I have picked a number between 1 and 100. Can you guess it?",
    guessBtn: "Guess",
    playAgain: "Play Again",
    tooLow: "↑ Try higher!",
    tooHigh: "↓ Try lower!",
    correct: num => `✅ Correct! The number was ${num}. You guessed it in ${attempts} attempts.`,
    invalid: "⚠️ Please enter a number between 1 and 100.",
    attemptsLeft: left => `Attempts left: ${left}`,
    history: nums => nums.length ? `Your guesses: ${nums.join(", ")}` : ""
  },
  vi: {
    title: "🎯 Trò chơi đoán số",
    description: "Tôi đã chọn 1 số từ 1 đến 100. Bạn có đoán được không?",
    guessBtn: "Đoán",
    playAgain: "Chơi lại",
    tooLow: "↑ Đoán số lớn hơn!",
    tooHigh: "↓ Đoán số nhỏ hơn!",
    correct: num => `✅ Chính xác! Số đúng là ${num}. Bạn đoán trong ${attempts} lần.`,
    invalid: "⚠️ Vui lòng nhập số từ 1 đến 100.",
    attemptsLeft: left => `Số lần còn lại: ${left}`,
    history: nums => nums.length ? `Các số bạn đã đoán: ${nums.join(", ")}` : ""
  }
};

function updateTexts() {
  document.getElementById("title").textContent = texts[lang].title;
  document.getElementById("description").textContent = texts[lang].description;
  document.getElementById("guess-btn").textContent = texts[lang].guessBtn;
  document.getElementById("play-again").textContent = texts[lang].playAgain;
  document.getElementById("message").textContent = "";
  document.getElementById("attempts").textContent = texts[lang].attemptsLeft(maxAttempts - attempts);
  document.getElementById("history").textContent = "";
}

function checkGuess() {
  const input = document.getElementById("guess");
  const guess = Number(input.value);
  const message = document.getElementById("message");

  if (!guess || guess < 1 || guess > 100) {
    message.textContent = texts[lang].invalid;
    return;
  }

  attempts++;
  history.push(guess);

  if (guess < secret) {
    message.textContent = texts[lang].tooLow;
  } else if (guess > secret) {
    message.textContent = texts[lang].tooHigh;
  } else {
    message.textContent = texts[lang].correct(secret);
    document.getElementById("play-again").style.display = "inline-block";
  }

  document.getElementById("attempts").textContent = texts[lang].attemptsLeft(maxAttempts - attempts);
  document.getElementById("history").textContent = texts[lang].history(history);

  input.value = "";

  if (attempts >= maxAttempts && guess !== secret) {
    message.textContent = `❌ Game Over! The number was ${secret}`;
    document.getElementById("play-again").style.display = "inline-block";
  }
}

function resetGame() {
  secret = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  history = [];
  document.getElementById("message").textContent = "";
  document.getElementById("play-again").style.display = "none";
  document.getElementById("attempts").textContent = texts[lang].attemptsLeft(maxAttempts);
  document.getElementById("history").textContent = "";
}

function changeLanguage() {
  lang = document.getElementById("lang").value;
  updateTexts();
}

function setDifficulty() {
  const level = document.getElementById("difficulty").value;
  if (level === "easy") maxAttempts = 15;
  if (level === "medium") maxAttempts = 10;
  if (level === "hard") maxAttempts = 5;
  resetGame();
}

updateTexts();
