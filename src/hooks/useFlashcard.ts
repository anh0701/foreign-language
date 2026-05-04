import { useState, useEffect, useCallback } from 'react';

export interface Flashcard {
  front: string;
  back: string;
}

export interface Topic {
  title: string;
  slug: string;
}

export const useFlashcard = (topicSlug: string | null) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadTopics = useCallback(async () => {
    try {
      const res = await fetch('assets/data/flashcards/index.json');
      const data = await res.json();
      setTopics(data);
    } catch (e) { console.error("Lỗi tải index", e); }
  }, []);

  const loadCards = useCallback(async (slug: string) => {
    try {
      setLoading(true);
      const res = await fetch(`assets/data/flashcards/${slug}.json`);
      const data = await res.json();
      setCards(data);
      setCurrentIndex(0);
    } catch (e) { console.error("Lỗi tải cards", e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    loadTopics();
    if (topicSlug) loadCards(topicSlug);
  }, [topicSlug, loadTopics, loadCards]);

  return { 
    topics, cards, currentIndex, loading, 
    setCurrentIndex, 
    next: () => setCurrentIndex((prev) => (prev + 1) % cards.length),
    prev: () => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
  };
};