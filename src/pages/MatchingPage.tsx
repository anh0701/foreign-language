import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchingGame } from '../hooks/useMatchingGame';
import { House, RotateCcw, Shapes, CheckCircle2 } from 'lucide-react';

const MatchingPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    enColumn, viColumn, selectedEn, selectedVi,
    matchedPairs, wrongPair, loading, handleSelect, initGame
  } = useMatchingGame('assets/data/words.json');

  if (loading) return <div className="flex justify-center items-center h-screen italic text-slate-500">Đang chuẩn bị các cặp từ...</div>;

  const getItemClass = (word: string) => {
    const isSelected = selectedEn === word || selectedVi === word;
    const isMatched = matchedPairs.includes(word);
    const isWrong =
      wrongPair && (wrongPair.en === word || wrongPair.vi === word);

    const base =
      "w-full min-h-[64px] sm:min-h-[72px] " +
      "p-2 sm:p-3 md:p-4 " +
      "mb-2 sm:mb-3 " +
      "rounded-xl sm:rounded-2xl " +
      "font-bold text-center text-sm sm:text-base " +
      "border-2 transition-all duration-200 " +
      "transform active:scale-95 " +
      "flex items-center justify-center " +
      "break-words leading-tight ";

    if (isMatched) {
      return (
        base +
        "bg-emerald-50 border-emerald-500 text-emerald-700 " +
        "opacity-60 cursor-default"
      );
    }

    if (isWrong) {
      return (
        base +
        "bg-rose-50 border-rose-500 text-rose-700 animate-shake"
      );
    }

    if (isSelected) {
      return (
        base +
        "bg-orange-50 border-orange-500 text-orange-700 " +
        "shadow-md -translate-y-1"
      );
    }

    return (
      base +
      "bg-white border-slate-100 text-slate-600 " +
      "hover:border-orange-200 hover:bg-orange-50/30"
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6">
      <main className="w-full max-w-3xl bg-white mt-10 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <Shapes className="text-orange-500" size={32} />
            Nối từ tương ứng
          </h1>
          {matchedPairs.length === 10 && (
            <div className="flex items-center gap-2 text-emerald-600 font-bold animate-bounce">
              <CheckCircle2 size={20} /> Hoàn thành!
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-x-3 sm:gap-x-5 md:gap-x-16">
          {/* Tiêu đề */}
          <h2 className="mb-6 text-center text-xs font-black uppercase tracking-widest text-slate-400">
            Word
          </h2>

          <h2 className="mb-6 text-center text-xs font-black uppercase tracking-widest text-slate-400">
            Meaning
          </h2>

          {/* Các cặp hàng hiển thị */}
          {enColumn.map((enWord, index) => {
            const viWord = viColumn[index];

            return (
              <React.Fragment key={enWord}>
                <button
                  className={getItemClass(enWord)}
                  onClick={() => handleSelect(enWord, 'en')}
                  disabled={matchedPairs.includes(enWord)}
                >
                  {enWord}
                </button>

                <button
                  className={getItemClass(viWord)}
                  onClick={() => handleSelect(viWord, 'vi')}
                  disabled={matchedPairs.includes(viWord)}
                >
                  {viWord}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </main>

      <footer className="w-full max-w-3xl mt-8 flex gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex-1 bg-white py-4 rounded-2xl font-bold text-slate-600 shadow-sm border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
        >
          <House size={20} /> Home
        </button>
        <button
          onClick={initGame}
          className="flex-[2] bg-orange-500 py-4 rounded-2xl font-bold text-white shadow-lg shadow-orange-200 flex items-center justify-center gap-2 hover:bg-orange-600 transition-all"
        >
          <RotateCcw size={20} /> Trộn lại
        </button>
      </footer>
    </div>
  );
};

export default MatchingPage;
