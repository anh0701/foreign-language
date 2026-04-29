let words = [];
let currentWord = null;
let currentAnswer = '';

async function loadWords() {
  const loader = document.getElementById('loader');
  try {
    if (loader) loader.style.display = 'block';
    const res = await fetch('assets/data/words.json');
    words = await res.json();
    newRound();
  } catch (error) {
    alert("Không thể tải dữ liệu!");
  } finally {
    if (loader) loader.style.display = 'none';
  }
}

function shuffle(word) {
  return word.split('').sort(() => Math.random() - 0.5);
}

function newRound() {
  currentAnswer = '';
  document.getElementById('result').textContent = '';

  const random = words[Math.floor(Math.random() * words.length)];
  currentWord = random.en.toLowerCase();
  document.getElementById('meaning').textContent = random.vi;

  const lettersDiv = document.getElementById('letters');
  lettersDiv.innerHTML = '';

  shuffle(currentWord).forEach(ch => {
    const btn = document.createElement('button');
    btn.textContent = ch;
    btn.style.color = 'white';
    btn.style.backgroundColor = 'royalblue';
    btn.onclick = () => chooseLetter(ch, btn);
    lettersDiv.appendChild(btn);
  });

  const answerDiv = document.getElementById('answer');
  answerDiv.innerHTML = '';

  for (let i = 0; i < currentWord.length; i++) {
    const box = document.createElement('div');
    box.className = 'answer-box';
    answerDiv.appendChild(box);
  }
}

function chooseLetter(ch, btn) {
  currentAnswer += ch;
  btn.disabled = true;

  const boxes = document.querySelectorAll('.answer-box');
  boxes[currentAnswer.length - 1].textContent = ch;

  if (currentAnswer.length === currentWord.length) {
    const result = document.getElementById('result');

    if (currentAnswer === currentWord) {
      result.textContent = '✅ Chính xác!';
      result.style.color = 'green';
      saveScore('game1', 1);
    } else {
      result.textContent = `❌ Sai! Từ đúng là "${currentWord}"`;
      result.style.color = 'red';
    }
  }
}

document.getElementById('next').onclick = newRound;
loadWords();
