import { useState, useEffect, useCallback } from "react";
import type { QuoteData, QuoteIndex } from "../types/quote";

export const useQuoteBook = (slug: string | null) => {

    const [quotes, setQuotes] = useState<QuoteIndex[]>([]);
    const [currentQuote, setCurrentQuote] = useState<QuoteData | null>(null);
    const [loading, setLoading] = useState(true);

    const loadIndex = useCallback(async () => {
        try {
            const res = await fetch("assets/data/quotes/index.json");
            console.log(res);
            const data = await res.json();
            setQuotes(data);
        } catch (e) {
            console.error(e);
        }
    }, []);

    const loadQuote = useCallback(async (slug: string) => {
        try {
            setLoading(true);

            const res = await fetch(`assets/data/quotes/${slug}.json`);
            const data = await res.json();

            setCurrentQuote(data);

        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadIndex();
    }, [loadIndex]);

    useEffect(() => {
        if (slug) {
            loadQuote(slug);
        }
    }, [slug, loadQuote]);

    return {
        quotes,
        currentQuote,
        loading,
    };
};