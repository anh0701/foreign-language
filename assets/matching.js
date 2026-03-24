let data = []

let selectedEn = null;
let selectedVi = null;
let matchedCount = 0;

async function loadWords() {
    const loader = document.getElementById('loader');
    try {
        if (loader) loader.style.display = 'block';
        const res = await fetch('assets/data/words.json');
        if (!res.ok) throw new Error("Không tìm thấy file data");
        data = await res.json();
        // console.log(loader)
    } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
        alert("Không thể tải danh sách từ vựng!");
    }finally{
        if (loader) loader.style.display = 'none';
    }
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

async function initGame() {
    await loadWords();
    if (data.length === 0) return;
    // console.log(data);

    matchedCount = 0;
    const randomSet = shuffle([...data]).slice(0, 5);

    document.getElementById('col-en').innerHTML = '<strong>Tiếng Anh</strong>';
    document.getElementById('col-vi').innerHTML = '<strong>Tiếng Việt</strong>';

    const enWords = shuffle(randomSet.map(item => item.en));
    const viWords = shuffle(randomSet.map(item => item.vi));

    const colEn = document.getElementById('col-en');
    const colVi = document.getElementById('col-vi');

    enWords.forEach(word => {
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = word;
        div.onclick = () => handleSelect(div, 'en');
        colEn.appendChild(div);
    });

    viWords.forEach(word => {
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = word;
        div.onclick = () => handleSelect(div, 'vi');
        colVi.appendChild(div);
    });
}

function handleSelect(element, type) {
    // Xóa class selected cũ trong cùng cột
    const parent = element.parentElement;
    parent.querySelectorAll('.item').forEach(child => child.classList.remove('selected'));

    element.classList.add('selected');

    if (type === 'en') selectedEn = element;
    if (type === 'vi') selectedVi = element;

    // Nếu đã chọn đủ cả 2 cột
    if (selectedEn && selectedVi) {
        checkMatch();
    }
}

function checkMatch() {
    const enVal = selectedEn.textContent;
    const viVal = selectedVi.textContent;

    const isCorrect = data.find(item => item.en === enVal && item.vi === viVal);

    if (isCorrect) {
        selectedEn.classList.add('matched');
        selectedVi.classList.add('matched');
        matchedCount++;
        resetSelection();
        if (matchedCount === 5) {
            setTimeout(() => {
                // alert("Xuất sắc! Bạn đã hoàn thành 5 từ. Nhấn OK để sang màn tiếp theo!");
                initGame(); 
            }, 500); 
        }
    } else {
        selectedEn.classList.add('wrong');
        selectedVi.classList.add('wrong');

        // Sau 0.5s thì xóa màu đỏ để chọn lại
        setTimeout(() => {
            selectedEn.classList.remove('wrong', 'selected');
            selectedVi.classList.remove('wrong', 'selected');
            resetSelection();
        }, 500);
    }
}

function resetSelection() {
    selectedEn = null;
    selectedVi = null;
}

initGame();