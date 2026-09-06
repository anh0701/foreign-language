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
            <main className="w-full max-w-2xl bg-white mt-4 sm:mt-10 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 shadow-xl shadow-slate-200/50">
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

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {shuffledOptions.map((opt) => (
                            <button
                                key={opt}
                                disabled={!!selected}
                                onClick={() => handleSelect(opt)}
                                className={`
                                    w-full
                                    min-h-[58px] sm:min-h-[64px]
                                    px-3 py-3 sm:px-6 sm:py-4
                                    rounded-2xl
                                    font-bold
                                    text-sm sm:text-lg
                                    leading-tight
                                    text-center
                                    break-words
                                    transition-all
                                    active:scale-95
                                    border-2

                                    ${selected === opt
                                        ? (
                                            isCorrect
                                                ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                                                : 'bg-rose-50 border-rose-500 text-rose-700'
                                        )
                                        : 'bg-white border-slate-100 text-slate-600 hover:border-purple-300 hover:bg-purple-50'
                                    }

                                    ${selected && opt !== selected ? 'opacity-50' : ''}
                                `}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>

                    {/* Kết quả */}
                    {selected && (
                        <div
                            className={`
                                flex items-center gap-3
                                rounded-2xl
                                px-4 py-3
                                sm:px-5 sm:py-4
                                border
                                animate-in fade-in slide-in-from-top-2
                                duration-300

                                ${isCorrect
                                    ? 'bg-emerald-50/80 border-emerald-100'
                                    : 'bg-rose-50/80 border-rose-100'
                                }
                            `}
                        >
                            <div
                                className={`
                                    shrink-0
                                    w-9 h-9 sm:w-10 sm:h-10
                                    rounded-full
                                    flex items-center justify-center

                                    ${isCorrect
                                        ? 'bg-emerald-100 text-emerald-600'
                                        : 'bg-rose-100 text-rose-500'
                                    }
                                `}
                            >
                                {isCorrect
                                    ? <CheckCircle2 size={21} />
                                    : <XCircle size={21} />
                                }
                            </div>

                            <div className="min-w-0">
                                <p
                                    className={`
                                        font-bold
                                        text-sm sm:text-base

                                        ${isCorrect
                                            ? 'text-emerald-700'
                                            : 'text-rose-600'
                                        }
                                    `}
                                >
                                    {isCorrect ? 'Tuyệt vời!' : 'Chưa đúng'}
                                </p>

                                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                                    {isCorrect
                                        ? 'Bạn đã chọn đúng đáp án.'
                                        : (
                                            <>
                                                Đáp án đúng là{' '}
                                                <span className="font-bold text-slate-700">
                                                    "{current?.answer}"
                                                </span>
                                            </>
                                        )
                                    }
                                </p>
                            </div>
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