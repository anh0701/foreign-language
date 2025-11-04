

let writer;

function renderCharacter(char) {
    document.getElementById('character-container').innerHTML = '';
    writer = HanziWriter.create('character-container', char, {
        width: 300,
        height: 300,
        padding: 10,
        showOutline: true,
        showCharacter: false,
        strokeColor: '#000',
        showHintAfterMisses: 1
    });
    writer.showCharacter();
}

document.getElementById('loadBtn').onclick = () => {
    const char = document.getElementById('charInput').value.trim();
    if (char) renderCharacter(char);
};

document.getElementById('quizBtn').onclick = () => {
    if (!writer) return alert('Hãy nhập chữ trước!');
    writer.quiz({
        onComplete: (summaryData) => {
            alert(`Hoàn thành! Chính xác: ${summaryData.totalMistakes === 0 ? 'Tuyệt vời!' : 'Còn sai vài nét'}`);
        }
    });
};

// display default
renderCharacter('好');