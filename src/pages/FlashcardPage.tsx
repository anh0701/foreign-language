import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFlashcard } from '../hooks/useFlashcard';
import { Layers, House, ChevronLeft, ChevronRight, Rotate3d, Book } from 'lucide-react';

const FlashcardPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const topicSlug = searchParams.get('topic');
  const topicTitle = searchParams.get('title');
  
  const { topics, cards, currentIndex, loading, next, prev } = useFlashcard(topicSlug);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => { setIsFlipped(false); setTimeout(next, 150); };
  const handlePrev = () => { setIsFlipped(false); setTimeout(prev, 150); };

  if (!topicSlug) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
        <header className="w-full max-w-4xl mb-12">
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <Layers className="text-emerald-600" size={32} /> Flashcards
          </h1>
          <p className="text-slate-500 mt-2">Chọn chủ đề bạn muốn học hôm nay</p>
        </header>
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map(topic => (
            <button
              key={topic.slug}
              onClick={() => navigate(`?topic=${topic.slug}&title=${topic.title}`)}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex items-center gap-4 group text-left"
            >
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                <Book size={24} />
              </div>
              <span className="font-bold text-slate-700 text-lg">{topic.title}</span>
            </button>
          ))}
        </div>
        <button onClick={() => navigate('/')} className="mt-12 text-slate-400 hover:text-slate-600 flex items-center gap-2 font-medium">
          <House size={18} /> Quay lại trang chính
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6">
      <main className="w-full max-w-2xl mt-10 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-8 px-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Layers className="text-emerald-600" size={24} />
            {topicTitle}
          </h2>
          <span className="text-sm font-bold text-slate-400 bg-white px-3 py-1 rounded-full shadow-sm">
            {currentIndex + 1} / {cards.length}
          </span>
        </div>

        <div 
          className="w-full aspect-[4/3] md:aspect-[16/9] perspective-1000 cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`relative w-full h-full transition-all duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

            <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex items-center justify-center p-10 backface-hidden border border-slate-50">
              <p className="text-3xl md:text-5xl font-black text-slate-800 text-center tracking-tight">
                {cards[currentIndex]?.front}
              </p>
              <div className="absolute bottom-6 text-slate-300 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <Rotate3d size={16} /> Click để xem nghĩa
              </div>
            </div>

            <div className="absolute inset-0 bg-emerald-600 rounded-[2.5rem] shadow-xl shadow-emerald-200/50 flex items-center justify-center p-10 backface-hidden rotate-y-180">
              <p className="text-3xl md:text-5xl font-black text-white text-center tracking-tight">
                {cards[currentIndex]?.back}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex gap-4 mt-12">
          <button onClick={handlePrev} className="flex-1 bg-white py-4 rounded-2xl font-bold text-slate-600 shadow-sm border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50">
            <ChevronLeft size={20} /> Trước
          </button>
          <button onClick={() => navigate('/flashcards')} className="bg-white px-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600">
            <House size={20} />
          </button>
          <button onClick={handleNext} className="flex-1 bg-emerald-600 py-4 rounded-2xl font-bold text-white shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 hover:bg-emerald-700">
            Tiếp theo <ChevronRight size={20} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default FlashcardPage;