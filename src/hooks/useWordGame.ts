import { useState, useEffect, useCallback } from 'react';

export interface WordData {
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

export const useWordGame = (jsonPath: string) => {
    const [words, setWords] = useState<WordData[]>([]);
    const [currentWord, setCurrentWord] = useState<WordData | null>(null);
    const [shuffledLetters, setShuffledLetters] = useState<LetterState[]>([]);
    const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
    const [result, setResult] = useState<GameResult | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(jsonPath);

            if (!res.ok) {
                throw new Error(`Server trả về lỗi ${res.status}: Không tìm thấy file tại ${jsonPath}`);
            }
            const data: WordData[] = await res.json();
            setWords(data);
            if (data.length > 0) {
                generateRound(data);
            }
        } catch (error) {
            console.error("Failed to load words:", error);
        } finally {
            setLoading(false);
        }
    }, [jsonPath]);


    const generateRound = (wordList: WordData[]) => {
        const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        const wordEn = randomWord.en.toLowerCase();

        const letters: LetterState[] = wordEn
            .replace(/\s/g, '') // Xóa dấu cách
            .split('')
            .map((char, index) => ({
                id: `${char}-${index}-${Math.random()}`,
                char,
                isUsed: false,
            }))
            .sort(() => Math.random() - 0.5);

        setCurrentWord(randomWord);
        setShuffledLetters(letters);
        setSelectedLetters([]);
        setResult(null);
    };

    const chooseLetter = (letterId: string) => {
        if (result || !currentWord) return;

        const letterIndex = shuffledLetters.findIndex(l => l.id === letterId);
        if (letterIndex === -1 || shuffledLetters[letterIndex].isUsed) return;

        const newShuffled = [...shuffledLetters];
        newShuffled[letterIndex].isUsed = true;
        setShuffledLetters(newShuffled);

        const char = newShuffled[letterIndex].char;
        const newSelected = [...selectedLetters, char];
        setSelectedLetters(newSelected);

        if (newSelected.length === currentWord.en.length) {
            const isCorrect = newSelected.join('') === currentWord.en.toLowerCase();
            setResult({
                text: isCorrect ? "Chính xác!" : `Sai rồi! Đáp án là: ${currentWord.en.toUpperCase()}`,
                isError: !isCorrect,
            });
        }
    };


    const nextRound = () => generateRound(words);

    const resetRound = () => {
        if (words.length > 0) generateRound(words);
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
        resetRound
    };
};