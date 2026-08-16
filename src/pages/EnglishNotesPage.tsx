import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getAllCategories,
  getAllNotes,
  getCategoryById,
} from '../repositories/englishNotesRepository';

import NoteCard from '../components/english-notes/NoteCard';
import { AlertCircle, ArrowLeft, BookOpen, FileText, Lightbulb, Scale } from 'lucide-react';

const categories = getAllCategories();

const categoryIcons = {
  scale: Scale,
  alert: AlertCircle,
  book: FileText,
  lightbulb: Lightbulb,
};

const EnglishNotesPage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] =
    useState<string>('all');

  const notes = getAllNotes();

  const filteredNotes =
    selectedCategory === 'all'
      ? notes
      : notes.filter(
        (note) => note.categoryId === selectedCategory
      );

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="mb-10">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-600 mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Quay lại
          </button>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <BookOpen size={24} />
            </div>

            <h1 className="text-4xl font-bold text-slate-900">
              English Notes
            </h1>
          </div>

          <p className="mt-4 text-slate-500 max-w-2xl leading-relaxed">
            Những điều dễ nhầm, những lỗi thường gặp và
            những mẹo nhỏ giúp bạn hiểu tiếng Anh tốt hơn.
          </p>
        </header>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`
    inline-flex items-center gap-2
    px-4 py-2 rounded-xl text-sm font-semibold
    transition-all
    ${selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }
  `}
          >
            <BookOpen size={16} />
            Tất cả
          </button>

          {categories.map((category) => {
            const Icon =
              categoryIcons[
              category.icon as keyof typeof categoryIcons
              ];

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
        inline-flex items-center gap-2
        px-4 py-2 rounded-xl text-sm font-semibold
        transition-all
        ${selectedCategory === category.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }
      `}
              >
                <Icon size={16} />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Notes */}
        {filteredNotes.length > 0 ? (
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                category={getCategoryById(note.categoryId)}
                onClick={() =>
                  navigate(`/english-notes/${note.slug}`)
                }
              />
            ))}
          </main>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-xl bg-slate-100 text-slate-400">
                <FileText size={24} />
              </div>
            </div>

            <p className="text-slate-500">
              Chưa có bài viết trong danh mục này.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default EnglishNotesPage;