import { useState, useEffect, useCallback, useRef } from "react";

export interface WordData {
    id: string;
    en: string;
    vi: string;
}

export interface LetterState {
    id: string;
    char: string;
    isUsed: boolean;
}

export interface GameResult {
    text: string;
    isError: boolean;
}

const shuffle = <T,>(array: T[]): T[] => {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [
            result[j],
            result[i],
        ];
    }

    return result;
};

export const useWordGame = (jsonPath: string) => {
    const [words, setWords] = useState<WordData[]>([]);
    const [currentWord, setCurrentWord] =
        useState<WordData | null>(null);

    const [shuffledLetters, setShuffledLetters] =
        useState<LetterState[]>([]);

    const [selectedLetters, setSelectedLetters] =
        useState<string[]>([]);

    const [result, setResult] =
        useState<GameResult | null>(null);

    const [loading, setLoading] =
        useState<boolean>(true);

    //  Các word chưa được chơi trong cycle hiện tại.
  
    const wordQueue = useRef<WordData[]>([]);

    //  ID của word vừa chơi.
    //  Dùng để tránh word này xuất hiện ngay khi bắt đầu cycle mới.

    const lastWordId = useRef<string | null>(null);

    //    Tạo queue mới.
    // Ưu tiên những word khác với word vừa chơi.
   
    const createQueue = useCallback(
        (wordList: WordData[]) => {
            if (wordList.length === 0) {
                wordQueue.current = [];
                return;
            }

            const previousId = lastWordId.current;

            const otherWords = wordList.filter(
                word => word.id !== previousId
            );

            const previousWord = wordList.filter(
                word => word.id === previousId
            );

          
            //  Word vừa chơi được đưa xuống cuối queue.
             
            wordQueue.current = [
                ...shuffle(otherWords),
                ...shuffle(previousWord),
            ];
        },
        []
    );

    //  Tạo một round mới từ queue.
    
    const generateRound = useCallback(() => {
        if (wordQueue.current.length === 0) {
            return;
        }

        //  Lấy word đầu tiên ra khỏi queue.
        
        const [randomWord] =
            wordQueue.current.splice(0, 1);

        lastWordId.current = randomWord.id;

        const wordEn = randomWord.en.toLowerCase();

        /*
         * Mỗi character có ID riêng.
         *
         * Ví dụ:
         * "book"
         *
         * b → word-id-0
         * o → word-id-1
         * o → word-id-2
         * k → word-id-3
         *
         * Hai chữ "o" vẫn phân biệt được.
         */
        const letters: LetterState[] = wordEn
            .replace(/\s/g, "")
            .split("")
            .map((char, index) => ({
                id: `${randomWord.id}-letter-${index}`,
                char,
                isUsed: false,
            }));

        setCurrentWord(randomWord);
        setShuffledLetters(shuffle(letters));
        setSelectedLetters([]);
        setResult(null);
    }, []);

    
    const loadData = useCallback(async () => {
        try {
            setLoading(true);

            const res = await fetch(jsonPath);

            if (!res.ok) {
                throw new Error(
                    `Server trả về lỗi ${res.status}: ` +
                    `Không tìm thấy file tại ${jsonPath}`
                );
            }

            const data: WordData[] =
                await res.json();

            /*
             * Kiểm tra ID bị trùng.
             */
            const ids = new Set<string>();

            const duplicateIds: string[] = [];

            for (const word of data) {
                if (ids.has(word.id)) {
                    duplicateIds.push(word.id);
                }

                ids.add(word.id);
            }

            if (duplicateIds.length > 0) {
                console.warn(
                    "JSON có ID bị trùng:",
                    duplicateIds
                );
            }

            setWords(data);

            if (data.length > 0) {
                lastWordId.current = null;
            
                //  Shuffle toàn bộ dataset và tạo queue.
                 
                wordQueue.current = shuffle(data);

                //  Bắt đầu round đầu tiên.
                 
                generateRound();
            }
        } catch (error) {
            console.error(
                "Failed to load words:",
                error
            );
        } finally {
            setLoading(false);
        }
    }, [jsonPath, generateRound]);
    
    //  Chọn một chữ cái.
     
    const chooseLetter = (letterId: string) => {
        if (result || !currentWord) {
            return;
        }

        const letterIndex =
            shuffledLetters.findIndex(
                letter => letter.id === letterId
            );

        if (letterIndex === -1) {
            return;
        }

        if (
            shuffledLetters[letterIndex].isUsed
        ) {
            return;
        }

        const newShuffled = [
            ...shuffledLetters,
        ];

        newShuffled[letterIndex] = {
            ...newShuffled[letterIndex],
            isUsed: true,
        };

        setShuffledLetters(newShuffled);

        const char =
            newShuffled[letterIndex].char;

        const newSelected = [
            ...selectedLetters,
            char,
        ];

        setSelectedLetters(newSelected);

        const cleanWord =
            currentWord.en
                .replace(/\s/g, "")
                .toLowerCase();

        /*
         * Đã chọn đủ chữ.
         */
        if (
            newSelected.length ===
            cleanWord.length
        ) {
            const isCorrect =
                newSelected.join("") ===
                cleanWord;

            setResult({
                text: isCorrect
                    ? "Chính xác!"
                    : `Sai rồi! Đáp án là: ${currentWord.en.toUpperCase()}`,
                isError: !isCorrect,
            });
        }
    };

    
    const nextRound = () => {
        
        if (wordQueue.current.length > 0) {
            generateRound();
            return;
        }

        /*
         * Đã chơi hết toàn bộ dataset.
         *
         * Tạo cycle mới.
         */
        createQueue(words);

        generateRound();
    };

    /**
     * Chơi lại word hiện tại.
     *
     * Không lấy word mới.
     */
    const resetRound = () => {
        if (!currentWord) {
            return;
        }

        const wordEn =
            currentWord.en.toLowerCase();

        const letters: LetterState[] =
            wordEn
                .replace(/\s/g, "")
                .split("")
                .map((char, index) => ({
                    id: `${currentWord.id}-letter-${index}`,
                    char,
                    isUsed: false,
                }));

        setShuffledLetters(
            shuffle(letters)
        );

        setSelectedLetters([]);
        setResult(null);
    };

    useEffect(() => {
        loadData();
    }, [loadData]);

    return {
        currentWord,
        shuffledLetters,
        selectedLetters,
        result,
        loading,

        chooseLetter,
        nextRound,
        resetRound,
    };
};

