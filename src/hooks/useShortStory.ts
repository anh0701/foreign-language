import { useState, useEffect, useCallback } from 'react';
import type { StoryData } from '../types/story';

export const useShortStory = (topicSlug: string | null) => {
  const [storyList, setStoryList] = useState<{ title: string; slug: string }[]>([]);
  const [story, setStory] = useState<StoryData | null>(null);
  const [activeDialogue, setActiveDialogue] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const LEVEL_ORDER: Record<string, number> = {
    beginner: 1,
    elementary: 2,
    pre_intermediate: 3,
    intermediate: 4,
    upper_intermediate: 5,
    advanced: 6,
  };

  const loadStoryList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('assets/data/stories/index.json');
      if (!res.ok) throw new Error("Không thể tải danh sách truyện");
      const data = await res.json();
      const sortedStories = [...data].sort((a, b) => {
        return (
          (LEVEL_ORDER[a.level] ?? 999) -
          (LEVEL_ORDER[b.level] ?? 999)
        );
      });

      setStoryList(sortedStories);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadStoryDetail = useCallback(async (slug: string) => {
    try {
      setLoading(true);
      setActiveDialogue(null); 
      const res = await fetch(`assets/data/stories/${slug}.json`);
      if (!res.ok) throw new Error("Không tìm thấy nội dung truyện");
      const data = await res.json();
      setStory(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (topicSlug) {
      loadStoryDetail(topicSlug);
    } else {
      loadStoryList();
      setStory(null); 
    }
  }, [topicSlug, loadStoryList, loadStoryDetail]);

  const toggleTranslation = (index: number) => {
    setActiveDialogue(prev => (prev === index ? null : index));
  };

  return { 
    storyList, 
    story, 
    loading, 
    error, 
    activeDialogue, 
    toggleTranslation 
  };
};