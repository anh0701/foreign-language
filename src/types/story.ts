export interface Character {
  id: string;
  name: string;
  avatar?: string;
  chatSide: 'left' | 'right' | 'center';
}

export interface Dialogue {
  speakerId: string;
  english: string;
  translation: string;
  type?: 'dialogue' | 'narration';
}

export interface Vocabulary {
  word: string;
  meaning: string;
  example?: string;
}

export interface StoryData {
  title: string;
  level: string;
  topic: string;
  estimatedReadingTime: number;
  summary: string;
  characters: Character[];
  dialogues: Dialogue[];
  vocabulary: Vocabulary[];
}