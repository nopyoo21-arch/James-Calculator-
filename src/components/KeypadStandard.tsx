import React from 'react';

interface KeypadStandardProps {
  onInput: (char: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  onCalculate: () => void;
  onNegate: () => void;
  onPercent: () => void;
  onSquare: () => void;
  onSquareRoot: () => void;
  onInvert: () => void;
  onMemoryClear: () => void;
  onMemoryRecall: () => void;
  onMemoryAdd: () => void;
  onMemorySubtract: () => void;
  onMemoryStore: () => void;
  hasMemory: boolean;
}

export const KeypadStandard: React.FC<KeypadStandardProps> = ({
  onInput,
  onClear,
  onBackspace,
  onCalculate,
  onNegate,
  onPercent,
  onSquare,
  onSquareRoot,
  onInvert,
  onMemoryClear,
  onMemoryRecall,
  onMemoryAdd,
  onMemorySubtract,
  onMemoryStore,
  hasMemory,
}) => {
  return (
    <div className="w-full space-y-2 select-none">
      {/* Memory Function Bar */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-xs font-mono font-medium text-slate-400">
        <button
          onClick={onMemoryClear}
          disabled={!hasMemory}
          className="py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
          title="Effacer la mémoire"
        >
          MC
        </button>
        <button
          onClick={onMemoryRecall}
          disabled={!hasMemory}
          className="py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
          title="Rappeler la mémoire"
        >
          MR
        </button>
        <button
          onClick={onMemoryAdd}
          className="py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
          title="Ajouter à la mémoire"
        >
          M+
        </button>
        <button
          onClick={onMemorySubtract}
          className="py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
          title="Soustraire de la mémoire"
        >
          M−
        </button>
        <button
          onClick={onMemoryStore}
          className="py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer text-sky-400 font-semibold"
          title="Enregistrer dans la mémoire"
        >
          MS
        </button>
      </div>

      {/* Quick Scientific Helpers Bar */}
      <div className="grid grid-cols-4 gap-2 text-xs font-medium">
        <button
          onClick={onPercent}
          className="py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono transition-colors cursor-pointer"
          title="Pourcentage"
        >
          %
        </button>
        <button
          onClick={onSquareRoot}
          className="py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono transition-colors cursor-pointer"
          title="Racine carrée"
        >
          √x
        </button>
        <button
          onClick={onSquare}
          className="py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono transition-colors cursor-pointer"
          title="Carré (x²)"
        >
          x²
        </button>
        <button
          onClick={onInvert}
          className="py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono transition-colors cursor-pointer"
          title="Inverse (1/x)"
        >
          1/x
        </button>
      </div>

      {/* Main Standard Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {/* Row 1 */}
        <button
          onClick={onClear}
          className="py-3.5 sm:py-4 rounded-xl bg-rose-950/40 border border-rose-800/50 hover:bg-rose-900/60 text-rose-300 font-bold text-base transition-transform active:scale-95 cursor-pointer"
          title="Effacer tout (AC)"
        >
          C
        </button>
        <button
          onClick={() => onInput('(')}
          className="py-3.5 sm:py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-base transition-transform active:scale-95 cursor-pointer"
        >
          (
        </button>
        <button
          onClick={() => onInput(')')}
          className="py-3.5 sm:py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-base transition-transform active:scale-95 cursor-pointer"
        >
          )
        </button>
        <button
          onClick={() => onInput('÷')}
          className="py-3.5 sm:py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xl transition-transform active:scale-95 cursor-pointer shadow-xs shadow-amber-600/20"
        >
          ÷
        </button>

        {/* Row 2: 7, 8, 9, × */}
        <button
          onClick={() => onInput('7')}
          className="py-3.5 sm:py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/90 text-slate-100 font-mono font-medium text-xl transition-transform active:scale-95 cursor-pointer"
        >
          7
        </button>
        <button
          onClick={() => onInput('8')}
          className="py-3.5 sm:py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/90 text-slate-100 font-mono font-medium text-xl transition-transform active:scale-95 cursor-pointer"
        >
          8
        </button>
        <button
          onClick={() => onInput('9')}
          className="py-3.5 sm:py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/90 text-slate-100 font-mono font-medium text-xl transition-transform active:scale-95 cursor-pointer"
        >
          9
        </button>
        <button
          onClick={() => onInput('×')}
          className="py-3.5 sm:py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xl transition-transform active:scale-95 cursor-pointer shadow-xs shadow-amber-600/20"
        >
          ×
        </button>

        {/* Row 3: 4, 5, 6, − */}
        <button
          onClick={() => onInput('4')}
          className="py-3.5 sm:py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/90 text-slate-100 font-mono font-medium text-xl transition-transform active:scale-95 cursor-pointer"
        >
          4
        </button>
        <button
          onClick={() => onInput('5')}
          className="py-3.5 sm:py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/90 text-slate-100 font-mono font-medium text-xl transition-transform active:scale-95 cursor-pointer"
        >
          5
        </button>
        <button
          onClick={() => onInput('6')}
          className="py-3.5 sm:py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/90 text-slate-100 font-mono font-medium text-xl transition-transform active:scale-95 cursor-pointer"
        >
          6
        </button>
        <button
          onClick={() => onInput('−')}
          className="py-3.5 sm:py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xl transition-transform active:scale-95 cursor-pointer shadow-xs shadow-amber-600/20"
        >
          −
        </button>

        {/* Row 4: 1, 2, 3, + */}
        <button
          onClick={() => onInput('1')}
          className="py-3.5 sm:py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/90 text-slate-100 font-mono font-medium text-xl transition-transform active:scale-95 cursor-pointer"
        >
          1
        </button>
        <button
          onClick={() => onInput('2')}
          className="py-3.5 sm:py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/90 text-slate-100 font-mono font-medium text-xl transition-transform active:scale-95 cursor-pointer"
        >
          2
        </button>
        <button
          onClick={() => onInput('3')}
          className="py-3.5 sm:py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/90 text-slate-100 font-mono font-medium text-xl transition-transform active:scale-95 cursor-pointer"
        >
          3
        </button>
        <button
          onClick={() => onInput('+')}
          className="py-3.5 sm:py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xl transition-transform active:scale-95 cursor-pointer shadow-xs shadow-amber-600/20"
        >
          +
        </button>

        {/* Row 5: ±, 0, ,, = */}
        <button
          onClick={onNegate}
          className="py-3.5 sm:py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-lg transition-transform active:scale-95 cursor-pointer"
          title="Changer de signe (positif/négatif)"
        >
          ±
        </button>
        <button
          onClick={() => onInput('0')}
          className="py-3.5 sm:py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/90 text-slate-100 font-mono font-medium text-xl transition-transform active:scale-95 cursor-pointer"
        >
          0
        </button>
        <button
          onClick={() => onInput(',')}
          className="py-3.5 sm:py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xl transition-transform active:scale-95 cursor-pointer"
        >
          ,
        </button>
        <button
          onClick={onCalculate}
          className="py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-2xl transition-transform active:scale-95 cursor-pointer shadow-md shadow-sky-600/30"
          title="Calculer le résultat"
        >
          =
        </button>
      </div>
    </div>
  );
};
