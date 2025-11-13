type KeyboardLettersProps = {
  onSelect: (letter: string) => void;
  selectedLetter?: string | null;
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function KeyboardLetters({
  onSelect,
  selectedLetter,
}: KeyboardLettersProps) {
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9">
      {LETTERS.map((letter) => {
        const active = selectedLetter === letter;

        return (
          <button
            key={letter}
            type="button"
            onClick={() => onSelect(letter)}
            className={`rounded-2xl border-2 px-4 py-3 text-lg font-semibold transition sm:text-xl ${
              active
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-900 hover:border-slate-400"
            }`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
