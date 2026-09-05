import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeIcon } from "lucide-react";

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

    useEffect(() => {
        if (!location.search) {
            navigate("/quote-book?page=cover", { replace: true });
        }
    }, [location.search, navigate]);

    return (
        <div className="relative min-h-screen bg-stone-200">

            {/* Home */}
            <button
                onClick={() => navigate("/")}
                className="
                    fixed
                    left-20
                    top-5
                    z-[9999]
                    hidden
                    md:flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-white/80
                    text-stone-500
                    shadow-sm
                    backdrop-blur
                    transition
                    hover:bg-white
                    hover:text-stone-900
                "
                aria-label="Home"
            >
                <HomeIcon size={18} />
            </button>

            {/* Cover */}
            {page === "cover" && (
                <div className="flex min-h-screen items-center justify-center">
                    <CoverPage onOpen={openContents} />
                </div>
            )}

            {/* Contents */}
            {page === "contents" && (
                <div className="flex min-h-screen items-center justify-center">
                    <TableOfContents
                        quotes={quotes}
                        onSelect={openQuote}
                    />
                </div>
            )}

            {/* Book */}
            {page === "book" && (
                <>
                    {loading || !currentQuote ? (
                        <div className="flex min-h-screen items-center justify-center">
                            Loading...
                        </div>
                    ) : (
                        <div className="min-h-screen overflow-hidden bg-stone-200 flex items-center justify-center">
                            <BookPage
                                quote={currentQuote}
                                onBack={backToContents}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}