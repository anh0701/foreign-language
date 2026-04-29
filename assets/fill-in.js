let sentences = [];
let current = null;

async function loadSentences() {
  const loader = document.getElementById('loader');
  try {
    if (loader) loader.style.display = 'block';
    const res = await fetch('assets/data/sentences.json');
    sentences = await res.json();
    newRound();
    // console.debug(sentences);
  } catch (error) {
    alert("Không thể tải dữ liệu!");
  } finally {
    if (loader) loader.style.display = 'none';
  }
}

function newRound() {
  document.getElementById('result').textContent = '';

  current = sentences[Math.floor(Math.random() * sentences.length)];
  document.getElementById('translation').textContent = current.translation;
  // document.getElementById('sentence').textContent = current.sentence;

  document.getElementById('sentence').innerHTML =
    current.sentence.replace(
      "___",
      `<span id="blank" class="blank">_____</span>`
    );

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  current.options.sort(() => Math.random() - 0.5).forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => fillBlank(opt, btn);
    optionsDiv.appendChild(btn);
  });
}

function fillBlank(choice, btn) {
  const blank = document.getElementById('blank');
  const result = document.getElementById('result');

  // điền từ vào chỗ trống
  blank.textContent = choice;

  if (choice === current.answer) {
    result.textContent = '✅ Chính xác!';
    result.style.color = 'green';
    saveScore('game2', 1);
  } else {
    result.textContent = `❌ Sai! Đáp án đúng là "${current.answer}"`;
    result.style.color = 'red';
  }

  document.querySelectorAll('#options button')
    .forEach(b => b.disabled = true);
}

document.getElementById('next').onclick = newRound;
loadSentences();
