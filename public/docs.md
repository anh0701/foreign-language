# Kỹ thuật "Tải nối đuôi" (Infinite Scrolling / Lazy Loading)

- bạn chia file theo số thứ tự: part1.json, part2.json, part3.json... mỗi file khoảng 50-100 từ.
- Cách hoạt động: Khi người dùng vừa mở app, bạn chỉ tải part1.json. Khi họ học gần hết 50 từ đó (hoặc kéo xuống cuối danh sách), code sẽ tự động âm thầm fetch part2.json và nối vào danh sách cũ.
- Ưu điểm: Người dùng thấy dữ liệu xuất hiện liên tục, không cảm giác phải chờ đợi hay chọn lựa gì cả.

```javascript
// File config.json nhỏ xíu chứa danh sách các file cần tải
const dataFiles = ['part1.json', 'part2.json', 'part3.json', 'part4.json'];

async function smartLoad() {
    // 1. Tải ngay Part 1 để người dùng chơi luôn
    await loadFile('part1.json'); 
    
    // 2. Sau khi Part 1 hiện lên rồi, âm thầm tải các part còn lại 
    // mà không làm hiện cái Loading Spinner (không làm phiền người dùng)
    for (let i = 1; i < dataFiles.length; i++) {
        fetch(`assets/data/${dataFiles[i]}`).then(res => res.json()).then(newData => {
            allData = [...allData, ...newData]; 
            console.log(`Đã tải ngầm xong ${dataFiles[i]}`);
        });
    }
}
```

```javascript
let gameData = [];
const MAX_WORDS_IN_MEMORY = 500; // Giới hạn chỉ giữ 500 từ trong máy

async function loadNextPart(partNumber) {
    const newData = await fetch(`data/part${partNumber}.json`).then(r => r.json());
    
    gameData = [...gameData, ...newData];

    // Nếu dữ liệu quá nhiều, cắt bớt những từ cũ nhất để nhẹ máy
    if (gameData.length > MAX_WORDS_IN_MEMORY) {
        gameData.splice(0, newData.length); 
        console.log("Đã dọn dẹp bộ nhớ cho nhẹ máy!");
    }
    
    renderUI(gameData);
}
```
