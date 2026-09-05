import { House, Target, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { useWordGame } from '../hooks/useWordGame';
import { useNavigate } from 'react-router-dom';

export default function WordGamePage() {
  const navigate = useNavigate();
  const {
    currentWord, shuffledLetters, selectedLetters,
    result, loading, chooseLetter, nextRound
  } = useWordGame('assets/data/words-with-id.json');

  if (loading) return (
    <div className="flex justify-center items-center h-screen italic text-slate-500">
      Đang tải dữ liệu...
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6">

      <main className="w-full max-w-2xl bg-white mt-10 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 flex flex-col">

        <div className="mb-10">
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <Target className="text-blue-600" size={32} />
            Ghép chữ cái
          </h1>
          <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mt-1 ml-[44px]">
            Thành từ vựng đúng
          </p>
        </div>

        <div className="flex-grow flex flex-col items-center">

          <h2 className="text-xl text-slate-500 italic mb-8 text-center underline decoration-blue-200 underline-offset-8">
            "{currentWord?.vi}"
          </h2>

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {(() => {
              let letterIndex = 0;

              return currentWord?.en.split('').map((char, i) => {
                // nếu là space → chỉ render khoảng cách
                if (char === ' ') {
                  return <div key={i} className="w-4 md:w-6" />;
                }

                const selected = selectedLetters[letterIndex];
                letterIndex++;

                return (
                  <div
                    key={i}
                    className={`w-10 h-12 md:w-12 md:h-14 border-b-4 flex items-center justify-center text-2xl font-black transition-all duration-300
                      ${selected
                        ? 'border-blue-500 text-slate-800'
                        : 'border-slate-100 bg-slate-50/50 text-transparent'
                      }`}
                  >
                    {selected || ""}
                  </div>
                );
              });
            })()}
          </div>

          <div className="flex flex-wrap gap-3 justify-center max-w-md">
            {shuffledLetters.map((l) => (
              <button
                key={l.id}
                disabled={l.isUsed || !!result}
                onClick={() => chooseLetter(l.id)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl font-bold text-xl transition-all transform active:scale-90 border-2
                  ${l.isUsed
                    ? 'bg-slate-100 border-transparent text-slate-300 opacity-50 scale-95'
                    : 'bg-white border-slate-100 text-blue-600 shadow-sm hover:border-blue-400 hover:shadow-md hover:-translate-y-1'
                  }`}
              >
                {l.char.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="h-16 mt-8 flex items-center justify-center w-full">
            {result && (
              <div className={`flex items-center gap-2 font-bold text-lg animate-in fade-in slide-in-from-top-4 duration-500 ${result.isError ? 'text-rose-500' : 'text-emerald-600'
                }`}>
                {result.isError ? <XCircle /> : <CheckCircle2 />}
                {result.text}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full max-w-2xl mt-8 flex gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex-1 bg-white py-4 rounded-2xl font-bold text-slate-600 shadow-sm border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
        >
          <House size={20} /> Home
        </button>
        <button
          onClick={nextRound}
          className="flex-[2] bg-purple-600 py-4 rounded-2xl font-bold text-white shadow-lg shadow-purple-200 flex items-center justify-center gap-2 hover:bg-purple-700 transition-all"
        >
          <RotateCcw size={20} /> Từ khác
        </button>
      </footer>
    </div>
  );
}