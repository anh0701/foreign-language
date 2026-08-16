import React from 'react';
import {
  ArrowRight,
  BookOpen,
} from 'lucide-react';

import type {
  EnglishNote,
  NoteCategory,
} from '../../types/english-notes';

interface NoteCardProps {
  note: EnglishNote;
  category?: NoteCategory;
  onClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  category,
  onClick,
}) => {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-5">
        {category && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
            <BookOpen size={13} />
            {category.name}
          </span>
        )}

        <span className="text-xs text-slate-400 capitalize">
          {note.level}
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
        {note.title}
      </h3>

      <p className="text-sm text-slate-500 leading-relaxed mb-6">
        {note.description}
      </p>

      <div className="flex items-center text-sm font-bold text-indigo-600">
        Đọc bài

        <ArrowRight
          size={16}
          className="ml-2 group-hover:translate-x-2 transition-transform"
        />
      </div>
    </article>
  );
};

export default NoteCard;