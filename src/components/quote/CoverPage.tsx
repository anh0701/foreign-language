interface Props {
    onOpen: () => void;
}

export default function CoverPage({ onOpen }: Props) {
    return (
        <div className="w-[700px] h-[900px] bg-[#faf6ee] rounded-xl flex flex-col items-center justify-center shadow-xl">

            <h1 className="text-6xl font-serif text-center">
                Story Learning
            </h1>

            <button
                className="mt-16 px-8 py-3 rounded-full bg-black text-white"
                onClick={onOpen}
            >
                Open Book
            </button>

        </div>
    );
}