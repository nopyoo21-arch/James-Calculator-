import React, { useState } from 'react';
import { AngleMode } from '../types/calculator';

interface KeypadScientificProps {
  onInput: (char: string) => void;
  angleMode: AngleMode;
  onToggleAngleMode: () => void;
  onFactorial: () => void;
  onSquare: () => void;
  onCube: () => void;
  onPower: () => void;
  onSquareRoot: () => void;
  onCubeRoot: () => void;
  onNthRoot: () => void;
  onAbsolute: () => void;
  onExpNotation: () => void;
}

export const KeypadScientific: React.FC<KeypadScientificProps> = ({
  onInput,
  angleMode,
  onToggleAngleMode,
  onFactorial,
  onSquare,
  onCube,
  onPower,
  onSquareRoot,
  onCubeRoot,
  onNthRoot,
  onAbsolute,
  onExpNotation,
}) => {
  const [isSecondMode, setIsSecondMode] = useState(false);
  const [isHyperbolic, setIsHyperbolic] = useState(false);

  return (
    <div className="w-full space-y-2 select-none">
      {/* Function Toggle Strip */}
      <div className="flex items-center justify-between gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setIsSecondMode(!isSecondMode)}
          className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
            isSecondMode ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-300 hover:bg-slate-800'
          }`}
          title="Deuxième jeu de fonctions (arcsin, 10^x...)"
        >
          2nd {isSecondMode ? 'ON' : ''}
        </button>

        <button
          onClick={() => setIsHyperbolic(!isHyperbolic)}
          className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
            isHyperbolic ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:bg-slate-800'
          }`}
          title="Fonctions hyperboliques (sinh, cosh, tanh)"
        >
          HYP {isHyperbolic ? 'ON' : ''}
        </button>

        <button
          onClick={onToggleAngleMode}
          className="flex-1 py-1.5 rounded-lg font-mono text-sky-400 hover:bg-slate-800 transition-colors cursor-pointer"
          title="Basculer Degrés / Radians"
        >
          {angleMode}
        </button>
      </div>

      {/* Scientific Function Grid (5 columns on phone/tablet) */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-xs font-mono font-medium">
        {/* Row 1: Trigonometry / Inverses / Hyperbolics */}
        <button
          onClick={() => {
            if (isHyperbolic) {
              onInput(isSecondMode ? 'asinh(' : 'sinh(');
            } else {
              onInput(isSecondMode ? 'asin(' : 'sin(');
            }
          }}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
        >
          {isHyperbolic ? (isSecondMode ? 'asinh' : 'sinh') : isSecondMode ? 'sin⁻¹' : 'sin'}
        </button>

        <button
          onClick={() => {
            if (isHyperbolic) {
              onInput(isSecondMode ? 'acosh(' : 'cosh(');
            } else {
              onInput(isSecondMode ? 'acos(' : 'cos(');
            }
          }}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
        >
          {isHyperbolic ? (isSecondMode ? 'acosh' : 'cosh') : isSecondMode ? 'cos⁻¹' : 'cos'}
        </button>

        <button
          onClick={() => {
            if (isHyperbolic) {
              onInput(isSecondMode ? 'atanh(' : 'tanh(');
            } else {
              onInput(isSecondMode ? 'atan(' : 'tan(');
            }
          }}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
        >
          {isHyperbolic ? (isSecondMode ? 'atanh' : 'tanh') : isSecondMode ? 'tan⁻¹' : 'tan'}
        </button>

        <button
          onClick={() => onInput(isSecondMode ? '10^(' : 'log(')}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
        >
          {isSecondMode ? '10ˣ' : 'log'}
        </button>

        <button
          onClick={() => onInput(isSecondMode ? 'exp(' : 'ln(')}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
        >
          {isSecondMode ? 'eˣ' : 'ln'}
        </button>

        {/* Row 2: Powers, Roots, Absolute */}
        <button
          onClick={onSquare}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
        >
          x²
        </button>

        <button
          onClick={onCube}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
        >
          x³
        </button>

        <button
          onClick={onPower}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
        >
          xʸ
        </button>

        <button
          onClick={onSquareRoot}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
        >
          √x
        </button>

        <button
          onClick={onCubeRoot}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
        >
          ∛x
        </button>

        {/* Row 3: nRoot, Factorial, Combinations, Permutations, Absolute */}
        <button
          onClick={onNthRoot}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
          title="Racine n-ième"
        >
          ⁿ√x
        </button>

        <button
          onClick={onFactorial}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
          title="Factorielle (n!)"
        >
          n!
        </button>

        <button
          onClick={() => onInput('nCr(')}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
          title="Combinaisons nCr"
        >
          nCr
        </button>

        <button
          onClick={() => onInput('nPr(')}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
          title="Permutations nPr"
        >
          nPr
        </button>

        <button
          onClick={onAbsolute}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
          title="Valeur absolue (|x|)"
        >
          |x|
        </button>

        {/* Row 4: Constants, Scientific Notation */}
        <button
          onClick={() => onInput('π')}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-sky-400 font-bold transition-transform active:scale-95 cursor-pointer"
          title="Constante Pi (3.14159...)"
        >
          π
        </button>

        <button
          onClick={() => onInput('e')}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-sky-400 font-bold transition-transform active:scale-95 cursor-pointer"
          title="Constante d'Euler (2.71828...)"
        >
          e
        </button>

        <button
          onClick={onExpNotation}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
          title="Notation scientifique (×10^)"
        >
          EXP
        </button>

        <button
          onClick={() => onInput('^')}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
          title="Puissance (^)"
        >
          ^
        </button>

        <button
          onClick={() => onInput(',')}
          className="py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 transition-transform active:scale-95 cursor-pointer"
          title="Séparateur d'arguments"
        >
          ,
        </button>
      </div>
    </div>
  );
};
