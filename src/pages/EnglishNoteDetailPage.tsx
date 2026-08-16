import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  getNoteDetailBySlug,
} from '../repositories/englishNotesRepository';
import { ArrowLeft, ArrowRight, BookOpen, Check, CircleAlert, Lightbulb, Quote, Tag } from 'lucide-react';

const EnglishNoteDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const article = slug
    ? getNoteDetailBySlug(slug)
    : undefined;

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/english-notes')}
            className="text-sm text-slate-400 hover:text-indigo-600 mb-8"
          >
            ← English Notes
          </button>

          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
            <h1 className="text-2xl font-bold text-slate-800">
              Không tìm thấy bài viết
            </h1>

            <p className="text-slate-500 mt-2">
              Bài viết bạn đang tìm kiếm không tồn tại.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const {
    note,
    category,
    sections,
    examples,
    mistakes,
    tips,
    tags,
    relatedNotes,
  } = article;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => navigate('/english-notes')}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          English Notes
        </button>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            {category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                <Tag size={13} />
                {category.name}
              </span>
            )}
            <span className="text-xs text-slate-400 capitalize">
              {note.level}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            {note.title}
          </h1>

          <p className="mt-5 text-lg text-slate-500 leading-relaxed">
            {note.description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <main className="space-y-8">

          {/* Sections */}
          {sections.map((section) => (
            <section
              key={section.id}
              className="bg-white rounded-2xl border border-slate-100 p-7"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                {section.title}
              </h2>

              <p className="text-slate-600 leading-8">
                {section.content}
              </p>
            </section>
          ))}

          {/* Examples */}
          {examples.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-100 p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                  <Quote size={20} />
                </div>

                <h2 className="text-2xl font-bold text-slate-800">
                  Examples
                </h2>
              </div>

              <div className="space-y-5">
                {examples.map((example) => (
                  <div
                    key={example.id}
                    className="border-l-4 border-indigo-400 pl-5"
                  >
                    <p className="text-lg font-medium text-slate-800">
                      {example.sentence}
                    </p>

                    {example.translation && (
                      <p className="text-sm text-slate-400 mt-2">
                        {example.translation}
                      </p>
                    )}

                    {example.explanation && (
                      <p className="text-sm text-slate-500 mt-2">
                        {example.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Mistakes */}
          {mistakes.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-100 p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                  <CircleAlert size={20} />
                </div>

                <h2 className="text-2xl font-bold text-slate-800">
                  Common Mistakes
                </h2>
              </div>

              <div className="space-y-5">
                {mistakes.map((mistake) => (
                  <div
                    key={mistake.id}
                    className="rounded-xl bg-slate-50 p-5"
                  >
                    <p className="flex items-start gap-2 text-sm text-red-500 font-medium">
                      <CircleAlert size={17} className="mt-0.5 shrink-0" />
                      <span>{mistake.wrong}</span>
                    </p>

                    <p className="flex items-start gap-2 text-sm text-emerald-600 font-medium mt-2">
                      <Check size={17} className="mt-0.5 shrink-0" />
                      <span>{mistake.correct}</span>
                    </p>

                    <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                      {mistake.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tips */}
          {tips.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-100 p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600">
                  <Lightbulb size={20} />
                </div>

                <h2 className="text-2xl font-bold text-slate-800">
                  Tips & Tricks
                </h2>
              </div>

              <div className="space-y-5">
                {tips.map((tip) => (
                  <div key={tip.id}>
                    <h3 className="flex items-center gap-2 font-bold text-slate-800">
                      <Lightbulb size={16} className="text-yellow-500" />
                      {tip.title}
                    </h3>

                    <p className="text-slate-500 mt-2 leading-relaxed">
                      {tip.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related */}
          {relatedNotes.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <BookOpen size={22} className="text-indigo-600" />

                <h2 className="text-2xl font-bold text-slate-800">
                  Related Notes
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {relatedNotes.map((related) => (
                  <button
                    key={related.id}
                    onClick={() =>
                      navigate(`/english-notes/${related.slug}`)
                    }
                    className="group text-left bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {related.title}
                        </h3>

                        <p className="text-sm text-slate-500 mt-2">
                          {related.description}
                        </p>
                      </div>

                      <ArrowRight
                        size={18}
                        className="shrink-0 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
};

export default EnglishNoteDetailPage;