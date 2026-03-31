let data = [];
let currentIndex = 0;

const front = document.querySelector(".front");
const back = document.querySelector(".back");
const card = document.querySelector(".card");

async function loadWords() {
    const loader = document.getElementById('loader');
    try {
        if (loader) loader.style.display = 'block';
        const res = await fetch('../assets/data/interview-ai.json');
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

function renderCard() {
  front.textContent = data[currentIndex].front;
  back.textContent = data[currentIndex].back;
  card.classList.remove("flip");
}

card.addEventListener("click", () => {
  card.classList.toggle("flip");
});

document.getElementById("next").onclick = () => {
  currentIndex = (currentIndex + 1) % data.length;
  renderCard();
};

document.getElementById("prev").onclick = () => {
  currentIndex = (currentIndex - 1 + data.length) % data.length;
  renderCard();
};

// document.getElementById("flip").onclick = () => {
//   card.classList.toggle("flip");
// };

// init
async function init() {
  await loadWords();
  renderCard();
}

init();