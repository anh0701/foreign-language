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
                w-[min(640px,calc(100vw-2rem))]
                h-[min(800px,calc(100vh-4rem))]
                bg-[#faf6ee]
                rounded-xl
                shadow-xl
                p-12
            "
        >
            <button
                onClick={onBack}
                className="
                    absolute
                    left-6
                    top-6
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-gray-600
                    hover:text-black
                    transition-colors
                    z-10
                "
            >
                <ArrowLeft size={18} />
                <span>Contents</span>
            </button>

            <div
                className="
                    absolute
                    right-8
                    top-6
                    text-sm
                    tracking-widest
                    uppercase
                    text-gray-400
                    z-10
                "
            >
                {quote.book}
            </div>

            <div
                className="
                    absolute
                    left-12
                    right-12
                    top-24
                    bottom-16
                    overflow-y-auto
                    pr-3
                "
            >
                <h1 className="text-4xl font-serif leading-tight">
                    {quote.title}
                </h1>

                <p className="mt-4 italic text-gray-500">
                    ({quote.subtitle})
                </p>

                <div className="mt-12 leading-9 text-[20px] font-serif">
                    {quote.paragraphs.map((paragraph, index) => (
                        <p key={index} className="mb-7">
                            {paragraph.segments.map((segment, i) => {
                                if ("type" in segment && segment.type === "newline") {
                                    return <br key={i} />;
                                }

                                if ("vi" in segment) {
                                    return (
                                        <span key={i}>
                                            {segment.vi}{" "}
                                            <span className="italic text-gray-500">
                                                ({segment.en})
                                            </span>{" "}
                                        </span>
                                    );
                                }

                                return null;
                            })}
                        </p>
                    ))}

                    <div className="h-8" />
                </div>
            </div>

            <div
                className="
                    absolute
                    bottom-6
                    left-1/2
                    -translate-x-1/2
                    text-sm
                    text-gray-500
                    font-serif
                "
            >
                {quote.page}
            </div>
        </div>
    );
}
