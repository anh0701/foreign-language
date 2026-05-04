import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFillInGame } from '../hooks/useFillInGame';
import { House, RotateCcw, BrainCircuit, CheckCircle2, XCircle } from 'lucide-react';

const FillInPage: React.FC = () => {
    const navigate = useNavigate();
    const { current, shuffledOptions, selected, loading, handleSelect, nextRound } =
        useFillInGame('assets/data/sentences.json');

    if (loading) return (
        <div className="flex justify-center items-center h-screen italic text-slate-500">
            Đang tải câu hỏi...
        </div>
    );

    const isCorrect = selected === current?.answer;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6">
            <main className="w-full max-w-2xl bg-white mt-10 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50">
                <h1 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                    <BrainCircuit className="text-purple-600" size={32} />
                    Điền từ vào câu
                </h1>

                <div className="space-y-8">

                    <p className="text-lg text-slate-500 italic text-center underline decoration-purple-200 underline-offset-8">
                        "{current?.translation}"
                    </p>

                    <div className="text-2xl md:text-3xl font-bold text-slate-800 text-center leading-[3rem]">
                        {current?.sentence.split("___").map((part, index, array) => {
                            return (
                                <React.Fragment key={index}>

                                    <span>{part}</span>


                                    {index < array.length - 1 && (
                                        <span className={`relative inline-flex flex-col items-center mx-2 group`}>

                                            <span className={`px-2 transition-all duration-300 min-h-[1.5rem] ${selected
                                                    ? (isCorrect ? 'text-emerald-600' : 'text-rose-500')
                                                    : 'text-transparent'
                                                }`}>
                                                {selected || "placeholder"}
                                            </span>

                                            <span className={`block w-32 border-b-4 transition-all duration-300 ${selected
                                                    ? (isCorrect ? 'border-emerald-600' : 'border-rose-500')
                                                    : 'border-purple-200'
                                                }`}></span>
                                        </span>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {shuffledOptions.map((opt) => (
                            <button
                                key={opt}
                                disabled={!!selected}
                                onClick={() => handleSelect(opt)}
                                className={`py-4 px-6 rounded-2xl font-bold text-lg transition-all transform active:scale-95 border-2 
                  ${selected === opt
                                        ? (isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-rose-50 border-rose-500 text-rose-700')
                                        : 'bg-white border-slate-100 text-slate-600 hover:border-purple-300 hover:bg-purple-50'}
                  ${selected && opt !== selected ? 'opacity-50' : ''}
                `}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>

                    {/* Kết quả */}
                    {selected && (
                        <div className={`flex items-center justify-center gap-2 font-bold text-lg animate-in fade-in slide-in-from-top-4 duration-500 ${isCorrect ? 'text-emerald-600' : 'text-rose-500'
                            }`}>
                            {isCorrect ? <CheckCircle2 /> : <XCircle />}
                            {isCorrect ? "Tuyệt vời! Bạn đã chọn đúng." : `Sai rồi! Đáp án đúng là "${current?.answer}"`}
                        </div>
                    )}
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
                    <RotateCcw size={20} /> Câu khác
                </button>
            </footer>
        </div>
    );
};

export default FillInPage;