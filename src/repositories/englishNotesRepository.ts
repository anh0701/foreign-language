import categoriesData from '../assets/data/english-notes/categories.json';
import notesData from '../assets/data/english-notes/notes.json';
import sectionsData from '../assets/data/english-notes/sections.json';
import examplesData from '../assets/data/english-notes/examples.json';
import mistakesData from '../assets/data/english-notes/mistakes.json';
import tipsData from '../assets/data/english-notes/tips.json';
import tagsData from '../assets/data/english-notes/tags.json';
import noteTagsData from '../assets/data/english-notes/note-tags.json';
import relatedNotesData from '../assets/data/english-notes/related-notes.json';

import type {
  EnglishNote,
  NoteCategory,
  NoteSection,
  NoteExample,
  NoteMistake,
  NoteTip,
  NoteTag,
  NoteTagRelation,
  RelatedNote,
  EnglishNoteDetail,
} from '../types/english-notes';

const categories = categoriesData as NoteCategory[];
const notes = notesData as EnglishNote[];
const sections = sectionsData as NoteSection[];
const examples = examplesData as NoteExample[];
const mistakes = mistakesData as NoteMistake[];
const tips = tipsData as NoteTip[];
const tags = tagsData as NoteTag[];
const noteTags = noteTagsData as NoteTagRelation[];
const relatedNotes = relatedNotesData as RelatedNote[];

export const getAllNotes = (): EnglishNote[] => {
  return notes.filter((note) => note.published);
};

export const getNoteBySlug = (
  slug: string
): EnglishNote | undefined => {
  return notes.find(
    (note) => note.slug === slug && note.published
  );
};

export const getCategoryById = (
  categoryId: string
): NoteCategory | undefined => {
  return categories.find(
    (category) => category.id === categoryId
  );
};

export const getNotesByCategory = (
  categoryId: string
): EnglishNote[] => {
  return notes.filter(
    (note) =>
      note.categoryId === categoryId &&
      note.published
  );
};

export const getSectionsByNoteId = (
  noteId: string
): NoteSection[] => {
  return sections
    .filter((section) => section.noteId === noteId)
    .sort((a, b) => a.order - b.order);
};

export const getExamplesByNoteId = (
  noteId: string
): NoteExample[] => {
  return examples.filter(
    (example) => example.noteId === noteId
  );
};

export const getMistakesByNoteId = (
  noteId: string
): NoteMistake[] => {
  return mistakes.filter(
    (mistake) => mistake.noteId === noteId
  );
};

export const getTipsByNoteId = (
  noteId: string
): NoteTip[] => {
  return tips.filter(
    (tip) => tip.noteId === noteId
  );
};

export const getTagsByNoteId = (
  noteId: string
): NoteTag[] => {
  const tagIds = noteTags
    .filter((relation) => relation.noteId === noteId)
    .map((relation) => relation.tagId);

  return tags.filter((tag) => tagIds.includes(tag.id));
};

export const getRelatedNotes = (
  noteId: string
): EnglishNote[] => {
  const relatedIds = relatedNotes
    .filter((relation) => relation.noteId === noteId)
    .map((relation) => relation.relatedNoteId);

  return notes.filter(
    (note) =>
      relatedIds.includes(note.id) &&
      note.published
  );
};

export const getNoteDetailBySlug = (
  slug: string
): EnglishNoteDetail | undefined => {
  const note = getNoteBySlug(slug);

  if (!note) {
    return undefined;
  }

  return {
    note,
    category: getCategoryById(note.categoryId),
    sections: getSectionsByNoteId(note.id),
    examples: getExamplesByNoteId(note.id),
    mistakes: getMistakesByNoteId(note.id),
    tips: getTipsByNoteId(note.id),
    tags: getTagsByNoteId(note.id),
    relatedNotes: getRelatedNotes(note.id),
  };
};

export const getAllCategories = (): NoteCategory[] => {
  return categories;
};
