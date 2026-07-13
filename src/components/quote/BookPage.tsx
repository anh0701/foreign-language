import { ArrowLeft } from "lucide-react";
import type { QuoteData } from "../../types/quote";

interface Props {
    quote: QuoteData;
    onBack: () => void;
}

export default function BookPage({
    quote,
    onBack,
}: Props) {

    return (
        <div
            className="
                relative
                w-[700px]
                h-[900px]
                bg-[#faf6ee]
                rounded-xl
                shadow-xl
                p-16
            "
        >
            <button
                onClick={onBack}
                className="
                    absolute
                    left-8
                    top-8
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-gray-600
                    hover:text-black
                    transition-colors
                "
            >
                <ArrowLeft size={18} />
                <span>Contents</span>
            </button>

            <div className="absolute right-10 top-8 text-sm tracking-widest uppercase text-gray-400">
                {quote.book}
            </div>

            <h1 className="mt-16 text-5xl font-serif leading-tight">
                {quote.title}
            </h1>

            <p className="mt-5 italic text-gray-500">
                ({quote.subtitle})
            </p>

            <div className="mt-16 leading-10 text-[22px] font-serif">

                {quote.paragraphs.map((paragraph, index) => (

                    <p key={index} className="mb-8">

                        {paragraph.segments.map((segment, i) => (

                            <span key={i}>

                                {segment.vi}{" "}

                                <span className="italic text-gray-500">

                                    ({segment.en})

                                </span>{" "}

                            </span>

                        ))}

                    </p>

                ))}

            </div>

            <div
                className="
                    absolute
                    bottom-8
                    left-1/2
                    -translate-x-1/2
                "
            >
                {quote.page}
            </div>

        </div>
    );
}