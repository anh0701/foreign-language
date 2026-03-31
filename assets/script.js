function goHome() {
  window.location.href = 'index.html';
}

function saveScore(game, delta) {
  const key = `score_${game}`;
  let score = parseInt(localStorage.getItem(key) || '0', 10);
  score += delta;
  localStorage.setItem(key, score);
}

function getScore(game) {
  return parseInt(localStorage.getItem(`score_${game}`) || '0', 10);
}
