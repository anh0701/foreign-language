import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CoverPage from "../components/quote/CoverPage";
import TableOfContents from "../components/quote/TableOfContents";
import BookPage from "../components/quote/BookPage";

import { useQuoteBook } from "../hooks/useQuoteBook";

export default function QuoteBookPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const page = searchParams.get("page") || "cover";
    const selectedSlug = searchParams.get("quote");

    const {
        quotes,
        currentQuote,
        loading,
    } = useQuoteBook(selectedSlug);

    const openContents = () => {
        navigate("/quote-book?page=contents");
    };

    const openQuote = (slug: string) => {
        navigate(`/quote-book?page=book&quote=${slug}`);
    };

    const backToContents = () => {
        navigate("/quote-book?page=contents");
    };

    // Nếu người dùng truy cập /quote-book trực tiếp
    // thì mặc định là Cover.
    useEffect(() => {
        if (!location.search) {
            navigate("/quote-book?page=cover", { replace: true });
        }
    }, [location.search, navigate]);

    if (page === "cover") {
        return (
            <div className="min-h-screen flex justify-center items-center bg-stone-200">
                <CoverPage onOpen={openContents} />
            </div>
        );
    }

    if (page === "contents") {
        return (
            <div className="min-h-screen flex justify-center items-center bg-stone-200">
                <TableOfContents
                    quotes={quotes}
                    onSelect={openQuote}
                />
            </div>
        );
    }

    if (page === "book") {
        if (loading || !currentQuote) {
            return (
                <div className="min-h-screen flex justify-center items-center bg-stone-200">
                    Loading...
                </div>
            );
        }

        return (
            <div className="min-h-screen flex justify-center items-center bg-stone-200">
                <BookPage
                    quote={currentQuote}
                    onBack={backToContents}
                />
            </div>
        );
    }

    return null;
}
