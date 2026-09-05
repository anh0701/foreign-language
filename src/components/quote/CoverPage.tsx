interface Props {
    onOpen: () => void;
}

export default function CoverPage({ onOpen }: Props) {
    return (
        <div
            className="
                w-[min(640px,calc(100vw-2rem))]
                h-[min(800px,calc(100vh-4rem))]
                bg-[#faf6ee]
                rounded-xl
                flex
                flex-col
                items-center
                justify-center
                shadow-xl
            "
        >
            <h1 className="text-5xl font-serif text-center">
                Story Learning
            </h1>

            <button
                className="
                    mt-14
                    px-7
                    py-3
                    rounded-full
                    bg-black
                    text-white
                    transition
                    hover:bg-gray-800
                "
                onClick={onOpen}
            >
                Open Book
            </button>
        </div>
    );
}
