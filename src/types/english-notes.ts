export type NoteLevel = 'beginner' | 'intermediate' | 'advanced';

export type NoteSectionType =
  | 'quick-answer'
  | 'explanation'
  | 'comparison'
  | 'tip';

export type ExampleType = 'correct' | 'incorrect';

export interface EnglishNote {
  id: string;
  slug: string;
  title: string;
  description: string;
  categoryId: string;
  level: NoteLevel;
  published: boolean;
}

export interface NoteCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface NoteSection {
  id: string;
  noteId: string;
  type: NoteSectionType;
  title: string;
  content: string;
  order: number;
}

export interface NoteExample {
  id: string;
  noteId: string;
  word: string;
  type: ExampleType;
  sentence: string;
  translation?: string;
  explanation?: string;
}

export interface NoteMistake {
  id: string;
  noteId: string;
  wrong: string;
  correct: string;
  explanation: string;
}

export interface NoteTip {
  id: string;
  noteId: string;
  title: string;
  content: string;
}

export interface NoteTag {
  id: string;
  name: string;
}

export interface NoteTagRelation {
  noteId: string;
  tagId: string;
}

export interface RelatedNote {
  noteId: string;
  relatedNoteId: string;
}

export interface EnglishNoteDetail {
  note: EnglishNote;
  category?: NoteCategory;
  sections: NoteSection[];
  examples: NoteExample[];
  mistakes: NoteMistake[];
  tips: NoteTip[];
  tags: NoteTag[];
  relatedNotes: EnglishNote[];
}

