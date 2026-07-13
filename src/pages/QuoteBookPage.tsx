import { useState } from "react";

import CoverPage from "../components/quote/CoverPage";
import TableOfContents from "../components/quote/TableOfContents";
import BookPage from "../components/quote/BookPage";

import { useQuoteBook } from "../hooks/useQuoteBook";

export default function QuoteBookPage() {

    const [cover, setCover] = useState(true);
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

    const {
        quotes,
        currentQuote,
        loading,
    } = useQuoteBook(selectedSlug);

    if (cover) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-stone-200">
                <CoverPage onOpen={() => setCover(false)} />
            </div>
        );
    }

    if (selectedSlug === null) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-stone-200">
                <TableOfContents
                    quotes={quotes}
                    onSelect={setSelectedSlug}
                />
            </div>
        );
    }

    if (loading || !currentQuote) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-stone-200">
            <BookPage
                quote={currentQuote}
                onBack={() => setSelectedSlug(null)}
            />
        </div>
    );
}