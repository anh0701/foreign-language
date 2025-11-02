let words = [];
let currentWord = null;
let currentAnswer = '';

async function loadWords() {
  const res = await fetch('assets/data/words.json');
  words = await res.json();
  newRound();
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
    btn.onclick = () => chooseLetter(ch, btn);
    lettersDiv.appendChild(btn);
  });

  document.getElementById('answer').textContent = '';
}

function chooseLetter(ch, btn) {
  currentAnswer += ch;
  btn.disabled = true;
  document.getElementById('answer').textContent = currentAnswer;

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
