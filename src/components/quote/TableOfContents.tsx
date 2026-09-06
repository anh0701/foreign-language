import type { QuoteIndex } from "../../types/quote";

interface Props {
    quotes: QuoteIndex[];
    onSelect: (slug: string) => void;
}

export default function TableOfContents({
    quotes,
    onSelect,
}: Props) {
    return (
        <div
            className="
                w-[min(640px,calc(100vw-2rem))]
                h-[min(800px,calc(100vh-4rem))]
                bg-[#faf6ee]
                rounded-xl
                shadow-xl
                p-12
                flex
                flex-col
            "
        >
            <p className="uppercase tracking-[6px] text-xs text-gray-400">
                Story Learning
            </p>

            <h1 className="mt-4 text-4xl font-serif">
                Table of Contents
            </h1>

            <div className="mt-10 flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-1">
                {quotes.map((quote) => (
                    <button
                        key={quote.id}
                        onClick={() => onSelect(quote.slug)}
                        className="w-full flex items-center text-left group"
                    >
                        <div>
                            <div className="font-serif text-lg group-hover:text-blue-600">
                                {quote.subtitle}
                            </div>

                            <div className="text-sm text-gray-500">
                                {quote.title}
                            </div>
                        </div>

                        <div className="flex-1 border-b border-dotted mx-4" />

                        <div>{quote.page}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}
