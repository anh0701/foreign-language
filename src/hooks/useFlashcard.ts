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
      // Xóa dữ liệu cũ ngay khi bắt đầu load
      setLoading(true);
      setCards([]);
      setCurrentIndex(0);

      const res = await fetch(`assets/data/flashcards/${slug}.json`);
      const data = await res.json();

      setCards(data);
    } catch (e) {
      console.error("Lỗi tải cards", e);
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTopics();

    if (topicSlug) {
      loadCards(topicSlug);
    } else {
      // Đang ở trang chọn topic, không cần loading cards
      setLoading(false);
    }
  }, [topicSlug, loadTopics, loadCards]);

  return { 
    topics, cards, currentIndex, loading, 
    setCurrentIndex, 
    next: () => setCurrentIndex((prev) => cards.length > 0 ? (prev + 1) % cards.length : 0),
    prev: () => setCurrentIndex((prev) => cards.length > 0 ? (prev - 1 + cards.length) % cards.length : 0)
  };
};