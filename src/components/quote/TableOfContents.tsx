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
                w-[700px]
                h-[900px]
                bg-[#faf6ee]
                rounded-xl
                shadow-xl
                p-14
            "
        >
            <p className="uppercase tracking-[6px] text-xs text-gray-400">
                Story Learning
            </p>

            <h1 className="mt-4 text-4xl font-serif">
                Table of Contents
            </h1>

            <div className="mt-10 space-y-4">

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