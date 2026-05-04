import { CircleArrowRight, House } from 'lucide-react';
import { useWordGame } from '../hooks/useWordGame';
import { useNavigate } from 'react-router-dom';

export default function WordGamePage() {
  const navigate = useNavigate();
  const {
    currentWord, shuffledLetters, selectedLetters,
    result, loading, chooseLetter, nextRound
  } = useWordGame('assets/data/words.json');

  if (loading) return <div className="text-center p-10">Đang tải...</div>;

  return (

    <div className="p-4 max-w-md mx-auto min-h-screen flex flex-col">

      <div className="pt-4 pb-2 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter italic">
          <span className="inline-block px-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
            Ghép chữ cái
          </span>
          <span className="block text-sm font-bold tracking-[0.2em] text-slate-400 not-italic mt-1">
            THÀNH TỪ VỰNG
          </span>
        </h1>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <h2 className="text-xl font-bold text-center mb-6">{currentWord?.vi}</h2>

        <div className="flex gap-2 justify-center mb-10">
          {currentWord?.en.split('').map((_, i) => (
            <div key={i} className="w-8 h-10 border-b-2 border-blue-500 flex items-center justify-center text-xl font-bold">
              {selectedLetters[i] || ""}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {shuffledLetters.map((l) => (
            <button
              key={l.id}
              disabled={l.isUsed}
              onClick={() => chooseLetter(l.id)}
              className={`w-10 h-10 rounded shadow font-bold ${l.isUsed ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {l.char.toUpperCase()}
            </button>
          ))}
        </div>

        {result && (
          <div className="mt-8 text-center">
            <p className={`mb-4 font-bold ${result.isError ? 'text-red-500' : 'text-green-500'}`}>{result.text}</p>
          </div>
        )}
      </div>

      <footer className="py-6 flex gap-4 mt-auto">
        <button
          onClick={() => navigate('/')}
          className="flex-1 py-3 px-4 bg-white border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
        >
          <div className="flex flex-col items-center justify-center text-blue-400">
            <House size={32} strokeWidth={2} />
            <span className="text-xs">Trang chủ</span>
          </div>
        </button>
        <button
          onClick={nextRound}
          className="flex-1 py-3 px-4 bg-white border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
        >
          <div className="flex flex-col items-center justify-center text-orange-500">
            <CircleArrowRight size={32} strokeWidth={2} />
            <span className="text-xs">Từ khác</span>
          </div>
        </button>
      </footer>
    </div>
  );
};