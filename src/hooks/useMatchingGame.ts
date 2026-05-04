import { useState, useEffect, useCallback } from 'react';

interface WordPair {
  en: string;
  vi: string;
}

export const useMatchingGame = (jsonPath: string) => {
  const [allWords, setAllWords] = useState<WordPair[]>([]);
  const [enColumn, setEnColumn] = useState<string[]>([]);
  const [viColumn, setViColumn] = useState<string[]>([]);
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [selectedVi, setSelectedVi] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]); 
  const [wrongPair, setWrongPair] = useState<{en: string, vi: string} | null>(null);
  const [loading, setLoading] = useState(true);

  const initGame = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(jsonPath);
      const data: WordPair[] = await res.json();
      setAllWords(data);

      const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 5);
      
      setEnColumn(shuffled.map(item => item.en).sort(() => Math.random() - 0.5));
      setViColumn(shuffled.map(item => item.vi).sort(() => Math.random() - 0.5));
      setMatchedPairs([]);
      setSelectedEn(null);
      setSelectedVi(null);
    } catch (error) {
      console.error("Lỗi tải dữ và khởi tạo game:", error);
    } finally {
      setLoading(false);
    }
  }, [jsonPath]);

  useEffect(() => { initGame(); }, [initGame]);

  const handleSelect = (word: string, type: 'en' | 'vi') => {
    if (matchedPairs.includes(word) || (wrongPair && (wrongPair.en === word || wrongPair.vi === word))) return;

    if (type === 'en') setSelectedEn(word);
    else setSelectedVi(word);
  };

  useEffect(() => {
    if (selectedEn && selectedVi) {
      const isMatch = allWords.some(item => item.en === selectedEn && item.vi === selectedVi);

      if (isMatch) {
        setMatchedPairs(prev => [...prev, selectedEn, selectedVi]);
        setSelectedEn(null);
        setSelectedVi(null);
      } else {
        setWrongPair({ en: selectedEn, vi: selectedVi });
        setTimeout(() => {
          setWrongPair(null);
          setSelectedEn(null);
          setSelectedVi(null);
        }, 500);
      }
    }
  }, [selectedEn, selectedVi, allWords]);

  useEffect(() => {
    if (matchedPairs.length === 10 && matchedPairs.length > 0) {
      setTimeout(() => initGame(), 1000);
    }
  }, [matchedPairs, initGame]);

  return { enColumn, viColumn, selectedEn, selectedVi, matchedPairs, wrongPair, loading, handleSelect, initGame };
};