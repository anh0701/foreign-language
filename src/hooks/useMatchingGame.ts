import { useState, useEffect, useCallback } from 'react';

export interface WordPair {
  id: string;
  en: string;
  vi: string;
}

export const useMatchingGame = (jsonPath: string) => {

  // Giữ nguyên WordPair thay vì chỉ giữ string
  const [enColumn, setEnColumn] = useState<WordPair[]>([]);
  const [viColumn, setViColumn] = useState<WordPair[]>([]);

  const [selectedEn, setSelectedEn] =
    useState<WordPair | null>(null);

  const [selectedVi, setSelectedVi] =
    useState<WordPair | null>(null);

  // Chỉ lưu ID của những cặp đã match
  const [matchedPairs, setMatchedPairs] =
    useState<string[]>([]);

  // Lưu ID của word đang sai
  const [wrongPair, setWrongPair] = useState<{
    enId: string;
    viId: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

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

  const initGame = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(jsonPath);

      if (!res.ok) {
        throw new Error(
          `Không thể tải file ${jsonPath}`
        );
      }

      const data: WordPair[] = await res.json();

      // Chọn 5 cặp cho round.
      // Mỗi WordPair giữ nguyên id.

      const shuffled = shuffle(data).slice(0, 5);

      //  Hai column chứa cùng 5 WordPair, nhưng thứ tự khác nhau.

      setEnColumn(shuffle(shuffled));
      setViColumn(shuffle(shuffled));

      setMatchedPairs([]);
      setSelectedEn(null);
      setSelectedVi(null);
      setWrongPair(null);
    } catch (error) {
      console.error(
        'Lỗi tải dữ và khởi tạo game:',
        error
      );
    } finally {
      setLoading(false);
    }
  }, [jsonPath]);

  useEffect(() => {
    initGame();
  }, [initGame]);


  const handleSelect = (
    word: WordPair,
    type: 'en' | 'vi'
  ) => {

    if (matchedPairs.includes(word.id)) {
      return;
    }

    if (
      wrongPair &&
      (
        wrongPair.enId === word.id ||
        wrongPair.viId === word.id
      )
    ) {
      return;
    }

    if (type === 'en') {
      setSelectedEn(word);
    } else {
      setSelectedVi(word);
    }
  };

  useEffect(() => {
    if (!selectedEn || !selectedVi) {
      return;
    }

    const isMatch =
      selectedEn.id === selectedVi.id;

    if (isMatch) {

      // Chỉ lưu 1 ID cho 1 cặp.

      setMatchedPairs(prev => [
        ...prev,
        selectedEn.id,
      ]);

      setSelectedEn(null);
      setSelectedVi(null);
    } else {

      // Sai → lưu ID của hai item.

      setWrongPair({
        enId: selectedEn.id,
        viId: selectedVi.id,
      });

      const timer = setTimeout(() => {
        setWrongPair(null);
        setSelectedEn(null);
        setSelectedVi(null);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [selectedEn, selectedVi]);

  useEffect(() => {

    if (
      matchedPairs.length === 5 &&
      matchedPairs.length > 0
    ) {
      const timer = setTimeout(() => {
        initGame();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [matchedPairs, initGame]);

  return {
    enColumn,
    viColumn,

    selectedEn,
    selectedVi,

    matchedPairs,
    wrongPair,

    loading,

    handleSelect,
    initGame,
  };
};
