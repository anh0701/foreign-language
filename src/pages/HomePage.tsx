import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GAMES } from '../constants/games';
import { ArrowRight, BookOpen } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="max-w-6xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-slate-900">Khám phá bài học</h1>
        <p className="text-slate-500">Chào mừng bạn trở lại, hôm nay học gì nào?</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GAMES.map((game) => (
          <div
            key={game.id}
            onClick={() => navigate(game.path)}
            className="group cursor-pointer bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          >
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-500 bg-current ${game.color}`}></div>

            <div className={`mb-6 p-3 rounded-xl inline-block bg-slate-50 ${game.color}`}>

              <game.Icon size={32} strokeWidth={2.5} />
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-3">{game.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              {game.description}
            </p>

            <div className={`flex items-center text-sm font-bold uppercase tracking-wider ${game.color}`}>
              Bắt đầu
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        ))}

      </main>
      <section className="max-w-6xl mx-auto mt-16">
        <div
          onClick={() => navigate('/english-notes')}
          className="group cursor-pointer bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-indigo-500/5 group-hover:scale-125 transition-transform duration-500" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600">
                  <BookOpen size={22} strokeWidth={2} />
                </div>

                <h2 className="text-2xl font-bold text-slate-800">
                  English Notes
                </h2>
              </div>

              <p className="text-slate-500 max-w-2xl leading-relaxed">
                Khám phá những điều dễ nhầm trong tiếng Anh,
                từ vựng, ngữ pháp và những mẹo học hữu ích.
              </p>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  'Comparisons',
                  'Common Mistakes',
                  'Grammar',
                  'Tips & Tricks',
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center text-sm font-bold uppercase tracking-wider text-indigo-600 shrink-0">
              Khám phá

              <ArrowRight
                size={17}
                className="ml-2 group-hover:translate-x-2 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;