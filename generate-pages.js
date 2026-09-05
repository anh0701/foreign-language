// node generate-pages.js 41 100

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const START = Number(process.argv[2]);
const END = Number(process.argv[3]);

if (!Number.isInteger(START) || !Number.isInteger(END)) {
  console.error("Usage: node generate-pages.js <start> <end>");
  process.exit(1);
}

const OUTPUT_DIR = path.join(__dirname, "public/assets/data/quotes");

// Tạo folder nếu chưa tồn tại
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

for (let i = START; i <= END; i++) {
  const data = {
    id: i,
    page: i,
    book: "Story Learning",
    title: "",
    subtitle: "Hope",
    paragraphs: [
      {
        segments: [
          {
            vi: "",
            en: ""
          }
        ]
      }
    ]
  };

  // 41 -> 041.json
  // 42 -> 042.json
  const fileName = `${String(i).padStart(3, "0")}.json`;

  const filePath = path.join(OUTPUT_DIR, fileName);

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2),
    "utf8"
  );

  console.log(`Created: ${fileName}`);
}