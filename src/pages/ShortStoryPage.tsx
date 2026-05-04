import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useShortStory } from '../hooks/useShortStory';
import {
  BookOpen,
  // User, 
  Lightbulb,
  House,
  ArrowLeft,
  Clock,
  // ChevronDown,
  MessageCircle
} from 'lucide-react';

const ShortStoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const topicSlug = searchParams.get('topic');

  const {
    storyList,
    story,
    loading,
    error,
    activeDialogue,
    toggleTranslation
  } = useShortStory(topicSlug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Đang tải câu chuyện...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="bg-red-50 p-8 rounded-3xl text-center max-w-md border border-red-100">
          <p className="text-red-600 font-bold mb-4">Lỗi: {error}</p>
          <button onClick={() => navigate('/stories')} className="btn bg-red-600 text-white px-6 py-2 rounded-xl">Quay lại</button>
        </div>
      </div>
    );
  }

  if (!topicSlug) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-12 flex flex-col items-center">
        <header className="w-full max-w-2xl mb-12 text-center">
          <h1 className="text-4xl font-black text-slate-800 flex items-center justify-center gap-3 italic">
            <BookOpen className="text-sky-500" size={40} />
            READING TIME
          </h1>
          <p className="text-slate-500 mt-4 font-medium">Chọn một câu chuyện để bắt đầu hành trình ngôn ngữ của bạn</p>
        </header>

        <div className="w-full max-w-2xl grid grid-cols-1 gap-4">
          {storyList.map((s) => (
            <button
              key={s.slug}
              onClick={() => navigate(`?topic=${s.slug}`)}
              className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-sky-300 hover:-translate-y-1 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  <MessageCircle size={28} />
                </div>
                <div className="text-left">
                  <h3 className="font-black text-slate-700 text-xl">{s.title}</h3>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bấm để đọc ngay</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                <ArrowLeft className="rotate-180 text-slate-300 group-hover:text-sky-600" size={20} />
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/')}
          className="fixed bottom-8 bg-white/90 backdrop-blur-xl p-4 rounded-full shadow-2xl border border-white text-slate-800 hover:scale-110 transition-transform active:scale-95"
        >
          <House size={28} />
        </button>
      </div>
    );
  }

  //   chi tiet chuyen

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pb-24">
      <header className="w-full max-w-3xl bg-white p-8 md:p-14 shadow-sm border-b border-slate-100">
        <button
          onClick={() => navigate('/stories')}
          className="flex items-center gap-2 text-slate-400 hover:text-sky-600 mb-8 font-bold transition-colors text-sm uppercase tracking-wider"
        >
          <ArrowLeft size={16} /> Back to Library
        </button>

        <h1 className="text-4xl font-black text-slate-900 leading-tight mb-6">
          {story?.title}
        </h1>

        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-xs font-black uppercase tracking-tighter">
            {story?.level}
          </span>
          <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-black uppercase tracking-tighter">
            {story?.topic}
          </span>
          <span className="px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-xs font-bold flex items-center gap-1.5">
            <Clock size={14} /> {story?.estimatedReadingTime} min read
          </span>
        </div>

        <div className="mt-8 p-6 bg-slate-50 rounded-2xl border-l-4 border-sky-500 italic text-slate-600 leading-relaxed">
          "{story?.summary}"
        </div>
      </header>


      <section className="w-full max-w-3xl p-6 md:p-10 space-y-4">
        {story?.dialogues.map((line, index) => {
          const character = story.characters.find(c => c.id === line.speakerId);

          const side = character?.chatSide || 'center';

          return (
            <div
              key={index}
              onClick={() => toggleTranslation(index)}
              className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500"
            >

              {/*  NARRATOR  */}
              {side === 'center' ? (
                <div className="cursor-pointer mx-auto max-w-[80%] text-center italic text-slate-400 text-sm leading-relaxed px-4 py-1">
                  {line.english}

                  {activeDialogue === index && (
                    <p className="mt-3 text-sm text-slate-400">
                      {line.translation}
                    </p>
                  )}
                </div>
              ) : (

                /*  CHAT  */
                <div className={`flex ${side === 'left' ? 'justify-start' : 'justify-end'}`}>

                  <div
                    className={`max-w-[75%] px-5 py-4 rounded-3xl shadow-sm cursor-pointer transition-all
              ${side === 'left'
                        ? 'bg-white border border-slate-200 rounded-bl-sm'
                        : 'bg-sky-500 text-white rounded-br-sm'}
            `}
                  >

                    <p className={`text-xs mb-1 font-bold 
              ${side === 'left' ? 'text-sky-500' : 'text-white/80'}
            `}>
                      {character?.name || 'Unknown'}
                    </p>

                    <p className="text-base font-medium leading-relaxed">
                      {line.english}
                    </p>

                    {/* TRANSLATION */}
                    {activeDialogue === index && (
                      <p className={`mt-2 text-sm italic 
                ${side === 'left' ? 'text-slate-500' : 'text-white/80'}
              `}>
                        {line.translation}
                      </p>
                    )}
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Vocabulary Focus */}
      <section className="w-full max-w-3xl p-6">
        <div className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl text-white">
          <h2 className="text-2xl font-black flex items-center gap-3 mb-10 uppercase tracking-widest">
            <Lightbulb className="text-amber-400" size={32} />
            Vocabulary Focus
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {story?.vocabulary.map((vocab, i) => (
              <div key={i} className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <h3 className="font-black text-sky-400 text-xl mb-2">{vocab.word}</h3>
                <p className="text-slate-300 text-sm mb-3 font-medium leading-snug">{vocab.meaning}</p>
                {vocab.example && (
                  <p className="text-xs text-slate-500 italic border-t border-white/5 pt-3 group-hover:text-slate-400">
                    "{vocab.example}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <button
        onClick={() => navigate('/short-stories')}
        className="fixed bottom-8 bg-white/90 backdrop-blur-xl p-4 rounded-full shadow-2xl border border-white text-slate-800 hover:scale-110 transition-transform active:scale-95"
      >
        <BookOpen size={28} />
      </button>
    </div>
  );
};

export default ShortStoryPage;