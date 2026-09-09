import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import {
  getAllCategories,
  getAllNotes,
  getCategoryById,
} from '../repositories/englishNotesRepository';

import NoteCard from '../components/english-notes/NoteCard';

import {
  AlertCircle,
  ArrowLeft,
  ArrowUp,
  BookOpen,
  FileText,
  Lightbulb,
  Scale,
} from 'lucide-react';

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

  const [showScrollTop, setShowScrollTop] =
    useState(false);

  const notesContainerRef =
    useRef<HTMLElement>(null);

  const notes = getAllNotes();

  const filteredNotes =
    selectedCategory === 'all'
      ? notes
      : notes.filter(
          (note) =>
            note.categoryId === selectedCategory
        );

  //  Mobile: Theo dõi việc cuộn toàn bộ window.
   
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.innerWidth < 768) {
        setShowScrollTop(window.scrollY > 300);
      }
    };

    window.addEventListener(
      'scroll',
      handleWindowScroll
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleWindowScroll
      );
    };
  }, []);

  const handleNotesScroll = () => {
    if (
      window.innerWidth >= 768 &&
      notesContainerRef.current
    ) {
      setShowScrollTop(
        notesContainerRef.current.scrollTop > 300
      );
    }
  };

  /*
   * Cuộn về đầu.
   *
   * Desktop: cuộn khu vực NoteCard.
   * Mobile: cuộn toàn bộ trang.
   */
  const scrollToTop = () => {
    if (window.innerWidth >= 768) {
      notesContainerRef.current?.scrollTo({
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

  return (
    <div className="min-h-screen md:h-screen bg-slate-50 md:overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 md:h-full md:flex md:flex-col">

        <div className="md:shrink-0">

          <button
            onClick={() => navigate('/')}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-slate-400
              hover:text-indigo-600
              mb-6
              transition-colors
            "
          >
            <ArrowLeft size={16} />
            Quay lại
          </button>

          <header>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <BookOpen size={24} />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                English Notes
              </h1>
            </div>

            <p className="mt-4 text-slate-500 max-w-2xl leading-relaxed">
              Những điều dễ nhầm, những lỗi thường gặp và
              những mẹo nhỏ giúp bạn hiểu tiếng Anh tốt hơn.
            </p>

          </header>

  
          <div className="flex flex-wrap gap-3 mt-6 mb-6">

            <button
              onClick={() =>
                setSelectedCategory('all')
              }
              className={`
                inline-flex items-center gap-2
                px-4 py-2
                rounded-xl
                text-sm
                font-semibold
                transition-all
                ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : `
                      bg-white
                      text-slate-600
                      border
                      border-slate-200
                      hover:border-slate-300
                    `
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
                  onClick={() =>
                    setSelectedCategory(category.id)
                  }
                  className={`
                    inline-flex items-center gap-2
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-semibold
                    transition-all
                    ${
                      selectedCategory === category.id
                        ? 'bg-slate-900 text-white shadow-sm'
                        : `
                          bg-white
                          text-slate-600
                          border
                          border-slate-200
                          hover:border-slate-300
                        `
                    }
                  `}
                >
                  <Icon size={16} />

                  {category.name}
                </button>
              );
            })}

          </div>

        </div>

        <main
          ref={notesContainerRef}
          onScroll={handleNotesScroll}
          className="
            md:flex-1
            md:min-h-0
            md:overflow-y-auto
            md:pr-3
            pb-4
          "
        >

          {filteredNotes.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  category={getCategoryById(
                    note.categoryId
                  )}
                  onClick={() =>
                    navigate(
                      `/english-notes/${note.slug}`
                    )
                  }
                />
              ))}

            </div>

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

          {/* Khoảng trống cuối */}
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

export default EnglishNotesPage;
