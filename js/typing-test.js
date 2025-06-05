const timeSelect = document.getElementById('time-select');
const textDisplay = document.getElementById('text-display');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timeDisplay = document.getElementById('time');
const stopBtn = document.getElementById('stop-btn');
const restartBtn = document.getElementById('restart-btn');

const summaryOverlay = document.getElementById('summary-overlay');
const summaryClose = document.getElementById('summary-close');
const summaryWPM = document.getElementById('summary-wpm');
const summaryAccuracy = document.getElementById('summary-accuracy');
const summaryTime = document.getElementById('summary-time');

const sampleText = `The quick brown fox jumps over the lazy dog. Practice makes perfect! The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet. Typing is an essential skill in today's digital world.
Practice makes perfect when it comes to typing. Regular practice can significantly improve your speed and accuracy over time. Set aside a few minutes each day to practice.
The most important aspect of typing is accuracy, not just speed. Focus on hitting the right keys first, and the speed will come naturally with practice and muscle memory.
Proper typing posture can help prevent strain and injury. Keep your wrists straight, your shoulders relaxed, and your fingers curved over the home row keys for best results.
The home row keys are the foundation of touch typing. Your fingers should rest on ASDF for the left hand and JKL; for the right hand. From here you can reach all other keys.`;

let timer = null;
let totalTime = parseInt(timeSelect.value, 10);
let timeLeft = totalTime;
let started = false;
let currentIndex = 0;
let correctCount = 0;
let totalTyped = 0;
let startTime = 0;

function resetTest() {
    started = false;
    clearInterval(timer);
    timer = null;
    currentIndex = 0;
    correctCount = 0;
    totalTyped = 0;
    totalTime = parseInt(timeSelect.value, 10);
    timeLeft = totalTime;

    stopBtn.disabled = true;
    restartBtn.disabled = false;

    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '100%';
    timeDisplay.textContent = totalTime;

    renderText();
    textDisplay.focus();
}

function renderText() {
  textDisplay.innerHTML = '';
  for (let i = 0; i < sampleText.length; i++) {
    const span = document.createElement('span');
    span.textContent = sampleText[i];
    if (i === currentIndex) {
      span.classList.add('current');
    }
    textDisplay.appendChild(span);
  }
}

function startTimer() {
    if (started) return;
    started = true;
    stopBtn.disabled = false;
    restartBtn.disabled = false;
    startTime = Date.now();

    timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        timeLeft = Math.max(0, totalTime - elapsed);
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endTest();
        }
    }, 100);
}

function endTest() {
  clearInterval(timer);
  timer = null;
  stopBtn.disabled = true;
  restartBtn.disabled = false;
  started = false;

  const elapsedMinutes = (totalTime - timeLeft) / 60;
  const wpm = Math.round((correctCount / 5) / (elapsedMinutes || 1));
  const accuracy = totalTyped === 0 ? 100 : Math.round((correctCount / totalTyped) * 100);

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy + '%';

  // --- Save history for logged-in user ---
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    const allHistory = JSON.parse(localStorage.getItem('history')) || {};
    if (!allHistory[currentUser.username]) allHistory[currentUser.username] = [];
    allHistory[currentUser.username].push({
      wpm,
      accuracy,
      time: totalTime,
      date: new Date().toLocaleString()
    });
    localStorage.setItem('history', JSON.stringify(allHistory));
  }
  // --- End save history ---

  summaryWPM.textContent = 'WPM: ' + wpm;
  summaryAccuracy.textContent = 'Accuracy: ' + accuracy + '%';
  summaryTime.textContent = 'Time: ' + totalTime + 's';

  summaryOverlay.style.display = 'flex';
}

textDisplay.addEventListener('keydown', (e) => {
  e.preventDefault();

  if (!started) {
    startTimer();
  }

  if (e.key.length === 1) {
    totalTyped++;
    const currentChar = sampleText[currentIndex];

    if (e.key === currentChar) {
      correctCount++;
      updateCharClass(currentIndex, 'correct');
    } else {
      updateCharClass(currentIndex, 'incorrect');
    }

    currentIndex++;
    if (currentIndex >= sampleText.length) {
      endTest();
      return;
    }
    updateCurrentChar(currentIndex);
    updateStats();
  } else if (e.key === 'Backspace') {
    if (currentIndex > 0) {
      if (textDisplay.children[currentIndex - 1].classList.contains('correct')) {
        correctCount--;
      }
      totalTyped = Math.max(0, totalTyped - 1);

      updateCharClass(currentIndex - 1, '');
      currentIndex--;
      updateCurrentChar(currentIndex);
      updateStats();
    }
  }
});

function updateCharClass(index, className) {
  if (index < textDisplay.children.length) {
    textDisplay.children[index].classList.remove('correct', 'incorrect');
    if (className) {
      textDisplay.children[index].classList.add(className);
    }
  }
}

function updateCurrentChar(index) {
  for (let i = 0; i < textDisplay.children.length; i++) {
    textDisplay.children[i].classList.remove('current');
  }
  if (index < textDisplay.children.length) {
    textDisplay.children[index].classList.add('current');
  }
}

function updateStats() {
  const elapsedMinutes = (totalTime - timeLeft) / 60;
  const wpm = Math.round((correctCount / 5) / (elapsedMinutes || 1));
  const accuracy = totalTyped === 0 ? 100 : Math.round((correctCount / totalTyped) * 100);
  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy + '%';
}

timeSelect.addEventListener('change', () => {
  if (!started) {
    totalTime = parseInt(timeSelect.value, 10);
    resetTest();
  }
});

stopBtn.addEventListener('click', () => {
  if (started) {
    endTest();
  }
});

document.getElementById('back-btn').addEventListener('click', () => {
  window.location.href = 'index.html';
});

restartBtn.addEventListener('click', () => {
  resetTest();
  textDisplay.focus();
});

summaryClose.addEventListener('click', () => {
  summaryOverlay.style.display = 'none';
  resetTest();
  textDisplay.focus();
});

resetTest();
textDisplay.setAttribute('tabindex', '0');
