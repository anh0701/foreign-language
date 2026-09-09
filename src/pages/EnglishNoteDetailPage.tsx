import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import {
  getNoteDetailBySlug,
} from '../repositories/englishNotesRepository';

import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BookOpen,
  Check,
  CircleAlert,
  Lightbulb,
  Quote,
  Tag,
} from 'lucide-react';

const EnglishNoteDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const contentRef = useRef<HTMLElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const article = slug
    ? getNoteDetailBySlug(slug)
    : undefined;

  //  việc cuộn trang trên mobile. Desktop sẽ được xử lý bằng onScroll của <main>.
   
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.innerWidth < 768) {
        setShowScrollTop(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  // mỗi khi slug thay đổi thì scroll contentRef về đầu.

  useEffect(() => {
    contentRef.current?.scrollTo({
      top: 0,
      behavior: 'auto',
    });

    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });

    setShowScrollTop(false);
  }, [slug]);

  const handleContentScroll = () => {
    if (
      window.innerWidth >= 768 &&
      contentRef.current
    ) {
      setShowScrollTop(
        contentRef.current.scrollTop > 300
      );
    }
  };

  const scrollToTop = () => {
    if (window.innerWidth >= 768) {
      contentRef.current?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

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
    <div className="min-h-screen md:h-screen bg-slate-50 md:overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-10 md:h-full md:flex md:flex-col">

        <div className="md:shrink-0">

          <button
            onClick={() => navigate('/english-notes')}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-600 mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            English Notes
          </button>

          <header className="mb-6">

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

            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              {note.title}
            </h1>

            <p className="mt-4 md:mt-5 text-base md:text-lg text-slate-500 leading-relaxed">
              {note.description}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
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
        </div>

        <main
          ref={contentRef}
          onScroll={handleContentScroll}
          className="
            space-y-8
            mt-6
            md:mt-0
            md:flex-1
            md:min-h-0
            md:overflow-y-auto
            md:pr-3
          "
        >

          {/* Sections */}
          {sections.map((section) => (
            <section
              key={section.id}
              className="bg-white rounded-2xl border border-slate-100 p-5 md:p-7"
            >
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                {section.title}
              </h2>

              <p className="text-slate-600 leading-8">
                {section.content}
              </p>
            </section>
          ))}

          {/* Examples */}
          {examples.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-100 p-5 md:p-7">

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                  <Quote size={20} />
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
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

          {mistakes.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-100 p-5 md:p-7">

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                  <CircleAlert size={20} />
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
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
                      <CircleAlert
                        size={17}
                        className="mt-0.5 shrink-0"
                      />

                      <span>
                        {mistake.wrong}
                      </span>
                    </p>

                    <p className="flex items-start gap-2 text-sm text-emerald-600 font-medium mt-2">
                      <Check
                        size={17}
                        className="mt-0.5 shrink-0"
                      />

                      <span>
                        {mistake.correct}
                      </span>
                    </p>

                    <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                      {mistake.explanation}
                    </p>
                  </div>
                ))}
              </div>

            </section>
          )}

          {tips.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-100 p-5 md:p-7">

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600">
                  <Lightbulb size={20} />
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  Tips & Tricks
                </h2>
              </div>

              <div className="space-y-5">
                {tips.map((tip) => (
                  <div key={tip.id}>
                    <h3 className="flex items-center gap-2 font-bold text-slate-800">
                      <Lightbulb
                        size={16}
                        className="text-yellow-500"
                      />

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

          {relatedNotes.length > 0 && (
            <section>

              <div className="flex items-center gap-3 mb-5">
                <BookOpen
                  size={22}
                  className="text-indigo-600"
                />

                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  Related Notes
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {relatedNotes.map((related) => (
                  <button
                    key={related.id}
                    onClick={() =>
                      navigate(
                        `/english-notes/${related.slug}`
                      )
                    }
                    className="
                      group
                      text-left
                      bg-white
                      rounded-2xl
                      border
                      border-slate-100
                      p-5
                      hover:shadow-lg
                      hover:-translate-y-0.5
                      transition-all
                    "
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
                        className="
                          shrink-0
                          text-slate-300
                          group-hover:text-indigo-600
                          group-hover:translate-x-1
                          transition-all
                        "
                      />

                    </div>
                  </button>
                ))}
              </div>

            </section>
          )}

          {/* Khoảng trống cuối khi cuộn */}
          <div className="h-4" />

        </main>

      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Lên đầu trang"
          className="
            fixed
            bottom-6
            right-6
            z-50
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-indigo-600
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:bg-indigo-700
            hover:-translate-y-1
            active:scale-95
          "
        >
          <ArrowUp size={22} />
        </button>
      )}

    </div>
  );
};

export default EnglishNoteDetailPage;