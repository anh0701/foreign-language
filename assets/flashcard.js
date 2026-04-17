let data = [];
let currentIndex = 0;

const front = document.querySelector(".front");
const back = document.querySelector(".back");
const card = document.querySelector(".card");
const titleElement = document.getElementById("topic-title");

const urlParams = new URLSearchParams(window.location.search);
const topic = urlParams.get('topic'); // Ví dụ: 'interview-ai'
const title = urlParams.get('title'); // Ví dụ: 'Interview AI Engineer'

async function loadWords() {
    const loader = document.getElementById('loader');
    try {
        if (loader) loader.style.display = 'block';

        titleElement.innerHTML = "";

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-layer-group";

        const text = document.createTextNode(title || "Flashcards");

        titleElement.appendChild(icon);
        titleElement.appendChild(text);
        const res = await fetch(`assets/data/${topic}.json`);
        if (!res.ok) throw new Error("Không tìm thấy file data");
        data = await res.json();
        // console.log(loader)
    } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
        titleElement.textContent = "Lỗi tải dữ liệu";
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