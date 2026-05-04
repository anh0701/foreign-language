import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GAMES } from '../constants/games';

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
    </div>
  );
};

export default HomePage;