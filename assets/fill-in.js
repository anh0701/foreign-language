let sentences = [];
let current = null;

async function loadSentences() {
  const res = await fetch('assets/data/sentences.json');
  sentences = await res.json();
  newRound();
  console.debug(sentences);
}

function newRound() {
  document.getElementById('result').textContent = '';

  current = sentences[Math.floor(Math.random() * sentences.length)];
  document.getElementById('translation').textContent = current.translation;
  document.getElementById('sentence').textContent = current.sentence;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  current.options.sort(() => Math.random() - 0.5).forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt, btn);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(choice, btn) {
  const result = document.getElementById('result');
  if (choice === current.answer) {
    result.textContent = '✅ Chính xác!';
    result.style.color = 'green';
    saveScore('game2', 1);
  } else {
    result.textContent = `❌ Sai! Đáp án đúng là "${current.answer}"`;
    result.style.color = 'red';
  }
  document.querySelectorAll('#options button').forEach(b => b.disabled = true);
}

document.getElementById('next').onclick = newRound;
loadSentences();
