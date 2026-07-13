export interface QuoteIndex {
    id: number;
    page: number;
    slug: string;
    title: string;
    subtitle: string;
}

export interface QuoteSegment {
    vi: string;
    en: string;
}

export interface QuoteParagraph {
    segments: QuoteSegment[];
}

export interface QuoteData {
    id: number;
    page: number;
    book: string;
    title: string;
    subtitle: string;
    paragraphs: QuoteParagraph[];
}