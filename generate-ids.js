// node generate-ids.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Lấy __dirname trong ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File đầu vào và đầu ra
const inputFile = path.join(__dirname, "public/assets/data/words.json");
const outputFile = path.join(__dirname, "public/assets/data/words-with-id.json");

// Tạo slug từ chuỗi tiếng Anh
function generateId(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

try {
    // Đọc file JSON
    const rawData = fs.readFileSync(inputFile, "utf-8");
    const data = JSON.parse(rawData);

    // Kiểm tra dữ liệu có phải mảng không
    if (!Array.isArray(data)) {
        throw new Error("JSON phải có cấu trúc là một mảng []");
    }

    // Theo dõi ID để tránh trùng lặp
    const usedIds = new Map();

    // Thêm ID cho từng object
    const processedData = data.map((item, index) => {
        if (!item.en || typeof item.en !== "string") {
            console.warn(
                ` Item tại index ${index} không có trường "en" hợp lệ.`
            );

            return item;
        }

        const baseId = generateId(item.en);

        // Xử lý trường hợp nhiều từ/câu tạo ra cùng một slug
        const count = usedIds.get(baseId) || 0;
        usedIds.set(baseId, count + 1);

        const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

        return {
            id,
            ...item,
        };

    });

    // Ghi ra file mới
    fs.writeFileSync(
    outputFile,
    `[\n${processedData.map(item => JSON.stringify(item)).join(",\n")}\n]`,
    "utf-8"
    );

    console.log(" Hoàn thành!");
    console.log(` Input: ${inputFile}`);
    console.log(` Output: ${outputFile}`);
    console.log(` Đã xử lý ${processedData.length} items`);
} catch (error) {
    console.error(" Có lỗi xảy ra:", error.message);
    process.exit(1);
}
