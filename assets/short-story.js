const params = new URLSearchParams(window.location.search);
const topic = params.get("topic"); // vd: the-lost-cat

async function loadStory() {
    try {
        if (!topic) {
            showError("Story not found");
            return;
        }

        const response = await fetch(`assets/data/stories/${topic}.json`);

        if (!response.ok) {
            throw new Error("Cannot load JSON file");
        }

        const data = await response.json();

        renderStory(data);

    } catch (error) {
        console.error(error);
        showError("Cannot load story");
    }
}

function renderStory(data) {
    renderHeader(data);
    renderDialogues(data);
    renderVocabulary(data);
}

function renderHeader(data) {
    const titleEl = document.getElementById("topic-title");
    const metaEl = document.getElementById("story-meta");
    const summaryEl = document.getElementById("story-summary");

    titleEl.innerHTML = `
        <i class="fas fa-book"></i>
        ${data.title}
    `;

    metaEl.innerHTML = `
        <span class="meta-item">${data.level}</span>
        <span class="meta-item">${data.topic}</span>
        <span class="meta-item">${data.estimatedReadingTime} min read</span>
    `;

    summaryEl.textContent = data.summary || "";
}

function renderDialogues(data) {
    const container = document.getElementById("story-container");
    container.innerHTML = "";

    data.dialogues.forEach(dialogue => {
        // tìm nhân vật theo speakerId
        const character = data.characters.find(
            item => item.id === dialogue.speakerId
        );

        const speakerName = character
            ? character.name
            : "Unknown";

        const dialogueEl = document.createElement("div");
        dialogueEl.className = "dialogue-line";

        dialogueEl.innerHTML = `
            <div class="speaker">
                <i class="fa-solid fa-user"></i>
                ${speakerName}
            </div>

            <div class="english">
                ${dialogue.english}
            </div>

            <div class="translation-popup">
                ${dialogue.translation}
            </div>
        `;

        // mobile tap show translation
        if (window.matchMedia("(max-width: 768px)").matches) {
            container.addEventListener("click", (e) => {
                const clicked = e.target.closest(".dialogue-line");

                if (!clicked) return;

                document.querySelectorAll(".dialogue-line").forEach(item => {
                    item.classList.remove("show-translation");
                });

                clicked.classList.add("show-translation");
            });
        }

        container.appendChild(dialogueEl);
    });
}

function renderVocabulary(data) {
    const container = document.getElementById("vocab-container");
    container.innerHTML = "";

    data.vocabulary.forEach(vocab => {
        const vocabEl = document.createElement("div");
        vocabEl.className = "vocab-card";

        vocabEl.innerHTML = `
            <div class="word">
                ${vocab.word}
            </div>

            <div class="meaning">
                ${vocab.meaning}
            </div>

            <div class="example">
                ${vocab.example || ""}
            </div>
        `;

        container.appendChild(vocabEl);
    });
}

function showError(message) {
    document.getElementById("topic-title").innerHTML = `
        <i class="fas fa-book"></i>
        ${message}
    `;
}

function goBackToList() {
    window.location.href = "short-stories.html";
}

loadStory();