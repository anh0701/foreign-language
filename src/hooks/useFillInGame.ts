import { useState, useEffect, useCallback } from 'react';

export interface FillInData {
  sentence: string;      
  translation: string;   
  answer: string;        
  options: string[];     
}

export const useFillInGame = (jsonPath: string) => {
  const [data, setData] = useState<FillInData[]>([]);
  const [current, setCurrent] = useState<FillInData | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(jsonPath);
      const json: FillInData[] = await res.json();
      setData(json);
      if (json.length > 0) generateRound(json);
    } catch (error) {
      console.error("Lỗi tải câu hỏi:", error);
    } finally {
      setLoading(false);
    }
  }, [jsonPath]);

  const generateRound = (list: FillInData[]) => {
    const random = list[Math.floor(Math.random() * list.length)];
    setCurrent(random);
    setShuffledOptions([...random.options].sort(() => Math.random() - 0.5));
    setSelected(null);
  };

  useEffect(() => { loadData(); }, [loadData]);

  const handleSelect = (choice: string) => {
    if (selected) return; 
    setSelected(choice);
  };

  return {
    current,
    shuffledOptions,
    selected,
    loading,
    handleSelect,
    nextRound: () => generateRound(data)
  };
};