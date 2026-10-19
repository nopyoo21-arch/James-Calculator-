import React, { useState } from 'react';
import {
  Fraction,
  addFractions,
  subtractFractions,
  multiplyFractions,
  divideFractions,
  simplifyFraction,
  mixedToImproper,
  improperToMixed,
  decimalToFraction,
  compareFractions,
  gcd,
} from '../utils/fractions';
import { Check, ArrowRight, Divide } from 'lucide-react';

export const FractionsView: React.FC = () => {
  const [subTab, setSubTab] = useState<'calc' | 'simplify' | 'convert' | 'compare'>('calc');

  // Operation State
  const [f1Num, setF1Num] = useState<number>(3);
  const [f1Den, setF1Den] = useState<number>(4);
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+');
  const [f2Num, setF2Num] = useState<number>(2);
  const [f2Den, setF2Den] = useState<number>(5);

  // Simplify State
  const [simpNum, setSimpNum] = useState<number>(42);
  const [simpDen, setSimpDen] = useState<number>(56);

  // Convert State
  const [decInput, setDecInput] = useState<number>(0.375);
  const [mixWhole, setMixWhole] = useState<number>(2);
  const [mixNum, setMixNum] = useState<number>(3);
  const [mixDen, setMixDen] = useState<number>(4);

  // Compare State
  const [comp1Num, setComp1Num] = useState<number>(5);
  const [comp1Den, setComp1Den] = useState<number>(8);
  const [comp2Num, setComp2Num] = useState<number>(7);
  const [comp2Den, setComp2Den] = useState<number>(12);

  // Calculations
  let calcResult = null;
  let calcError = '';
  try {
    const f1: Fraction = { num: f1Num, den: f1Den };
    const f2: Fraction = { num: f2Num, den: f2Den };
    if (op === '+') calcResult = addFractions(f1, f2);
    else if (op === '-') calcResult = subtractFractions(f1, f2);
    else if (op === '*') calcResult = multiplyFractions(f1, f2);
    else calcResult = divideFractions(f1, f2);
  } catch (err: unknown) {
    calcError = err instanceof Error ? err.message : 'Erreur';
  }

  // Simplify
  let simpResult: Fraction | null = null;
  let simpGcdVal = 1;
  try {
    simpResult = simplifyFraction({ num: simpNum, den: simpDen });
    simpGcdVal = gcd(simpNum, simpDen);
  } catch {
    // Ignore denominator 0
  }

  // Convert
  const decToFrac = decimalToFraction(decInput);
  let mixedToFracResult: Fraction | null = null;
  try {
    mixedToFracResult = mixedToImproper(mixWhole, mixNum, mixDen);
  } catch {}

  // Compare
  let compareResult = null;
  try {
    compareResult = compareFractions({ num: comp1Num, den: comp1Den }, { num: comp2Num, den: comp2Den });
  } catch {}

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Sub tabs */}
      <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold overflow-x-auto scrollbar-none">
        <button
          onClick={() => setSubTab('calc')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'calc' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Opérations (+, −, ×, ÷)
        </button>
        <button
          onClick={() => setSubTab('simplify')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'simplify' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Simplifier une fraction
        </button>
        <button
          onClick={() => setSubTab('convert')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'convert' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Conversions & Nombres Mixtes
        </button>
        <button
          onClick={() => setSubTab('compare')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'compare' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Comparer 2 fractions
        </button>
      </div>

      {/* 1. Calculator Tab */}
      {subTab === 'calc' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white">Opérations sur les fractions</h2>
              <p className="text-xs text-slate-400 mt-0.5">Addition, soustraction, multiplication et division avec étapes détaillées</p>
            </div>

            {/* Fraction input formula */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-4 bg-slate-950/60 rounded-xl border border-slate-800">
              {/* Fraction 1 */}
              <div className="flex flex-col items-center gap-1 w-20">
                <input
                  type="number"
                  value={f1Num}
                  onChange={(e) => setF1Num(parseInt(e.target.value) || 0)}
                  className="w-full text-center py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-sm"
                  title="Numérateur 1"
                />
                <div className="w-full h-0.5 bg-slate-600" />
                <input
                  type="number"
                  value={f1Den}
                  onChange={(e) => setF1Den(parseInt(e.target.value) || 1)}
                  className="w-full text-center py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-sm"
                  title="Dénominateur 1"
                />
              </div>

              {/* Operator */}
              <div className="flex items-center gap-1">
                {(['+', '-', '*', '/'] as const).map((o) => (
                  <button
                    key={o}
                    onClick={() => setOp(o)}
                    className={`w-9 h-9 rounded-lg font-bold text-base transition-colors cursor-pointer ${
                      op === o ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {o === '*' ? '×' : o === '/' ? '÷' : o === '-' ? '−' : '+'}
                  </button>
                ))}
              </div>

              {/* Fraction 2 */}
              <div className="flex flex-col items-center gap-1 w-20">
                <input
                  type="number"
                  value={f2Num}
                  onChange={(e) => setF2Num(parseInt(e.target.value) || 0)}
                  className="w-full text-center py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-sm"
                  title="Numérateur 2"
                />
                <div className="w-full h-0.5 bg-slate-600" />
                <input
                  type="number"
                  value={f2Den}
                  onChange={(e) => setF2Den(parseInt(e.target.value) || 1)}
                  className="w-full text-center py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-sm"
                  title="Dénominateur 2"
                />
              </div>
            </div>
          </div>

          {/* Results Display */}
          {calcError ? (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-sm">
              {calcError}
            </div>
          ) : calcResult && (
            <div className="space-y-4">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Fraction simplifiée</div>
                    <div className="text-2xl font-mono font-bold text-sky-400 mt-1">
                      {calcResult.simplified.num} / {calcResult.simplified.den}
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-500 font-mono">
                    Brut : {calcResult.result.num}/{calcResult.result.den}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Forme décimale</div>
                  <div className="text-2xl font-mono font-bold text-white mt-1">
                    {calcResult.decimal.toLocaleString('fr-FR', { maximumFractionDigits: 6 })}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Nombre mixte</div>
                  <div className="text-xl font-mono font-bold text-slate-200 mt-1">
                    {calcResult.mixedNumber ? (
                      <span>
                        {calcResult.mixedNumber.whole} et {calcResult.mixedNumber.num}/{calcResult.mixedNumber.den}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-sm">Fraction propre</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Detailed Resolution Steps */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Détail pas à pas du calcul
                </h3>
                {calcResult.steps.map((st, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-300">
                    {st}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Simplify Tab */}
      {subTab === 'simplify' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white">Simplification par le PGCD</h2>
              <p className="text-xs text-slate-400 mt-0.5">Rendre une fraction irréductible via l'algorithme d'Euclide</p>
            </div>

            <div className="flex items-center justify-center gap-4 py-4">
              <div className="flex flex-col items-center gap-1 w-24">
                <input
                  type="number"
                  value={simpNum}
                  onChange={(e) => setSimpNum(parseInt(e.target.value) || 0)}
                  className="w-full text-center py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm"
                  title="Numérateur"
                />
                <div className="w-full h-0.5 bg-slate-600" />
                <input
                  type="number"
                  value={simpDen}
                  onChange={(e) => setSimpDen(parseInt(e.target.value) || 1)}
                  className="w-full text-center py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm"
                  title="Dénominateur"
                />
              </div>

              <ArrowRight className="w-6 h-6 text-sky-400" />

              {simpResult && (
                <div className="flex flex-col items-center gap-1 w-24">
                  <div className="w-full text-center py-2 bg-sky-950/60 border border-sky-600/40 rounded-lg text-sky-300 font-mono text-base font-bold">
                    {simpResult.num}
                  </div>
                  <div className="w-full h-0.5 bg-sky-500" />
                  <div className="w-full text-center py-2 bg-sky-950/60 border border-sky-600/40 rounded-lg text-sky-300 font-mono text-base font-bold">
                    {simpResult.den}
                  </div>
                </div>
              )}
            </div>

            <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-1 font-mono text-slate-300">
              <div>Plus Grand Commun Diviseur : <strong>PGCD({simpNum}, {simpDen}) = {simpGcdVal}</strong></div>
              <div>Division du numérateur : {simpNum} ÷ {simpGcdVal} = {simpResult?.num}</div>
              <div>Division du dénominateur : {simpDen} ÷ {simpGcdVal} = {simpResult?.den}</div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Convert Tab */}
      {subTab === 'convert' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white">Nombre décimal ⟷ Fraction exacte</h2>
              <p className="text-xs text-slate-400 mt-0.5">Conversion réciproque automatique</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Decimal to fraction */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
                <label className="block text-xs font-semibold text-slate-300">Nombre décimal</label>
                <input
                  type="number"
                  step="0.001"
                  value={decInput}
                  onChange={(e) => setDecInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-sm"
                />
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Fraction correspondante :</span>
                  <span className="font-mono text-base font-bold text-sky-400">
                    {decToFrac.num} / {decToFrac.den}
                  </span>
                </div>
              </div>

              {/* Mixed to improper */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
                <label className="block text-xs font-semibold text-slate-300">Nombre mixte (Partie entière + Fraction)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={mixWhole}
                    onChange={(e) => setMixWhole(parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs text-center"
                    placeholder="Entier"
                  />
                  <span className="text-xs text-slate-400">+</span>
                  <input
                    type="number"
                    value={mixNum}
                    onChange={(e) => setMixNum(parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs text-center"
                    placeholder="Num"
                  />
                  <span className="text-xs text-slate-400">/</span>
                  <input
                    type="number"
                    value={mixDen}
                    onChange={(e) => setMixDen(parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs text-center"
                    placeholder="Den"
                  />
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Fraction impropre :</span>
                  <span className="font-mono text-base font-bold text-emerald-400">
                    {mixedToFracResult ? `${mixedToFracResult.num} / ${mixedToFracResult.den}` : '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Compare Tab */}
      {subTab === 'compare' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white">Comparaison de deux fractions</h2>
              <p className="text-xs text-slate-400 mt-0.5">Méthode du produit en croix</p>
            </div>

            <div className="flex items-center justify-center gap-4 py-4">
              {/* F1 */}
              <div className="flex flex-col items-center gap-1 w-20">
                <input
                  type="number"
                  value={comp1Num}
                  onChange={(e) => setComp1Num(parseInt(e.target.value) || 0)}
                  className="w-full text-center py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm"
                />
                <div className="w-full h-0.5 bg-slate-600" />
                <input
                  type="number"
                  value={comp1Den}
                  onChange={(e) => setComp1Den(parseInt(e.target.value) || 1)}
                  className="w-full text-center py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm"
                />
              </div>

              {/* Symbol */}
              <div className="w-12 h-12 rounded-2xl bg-sky-600/30 border border-sky-500/50 flex items-center justify-center font-mono font-bold text-2xl text-sky-400">
                {compareResult?.symbol || '?'}
              </div>

              {/* F2 */}
              <div className="flex flex-col items-center gap-1 w-20">
                <input
                  type="number"
                  value={comp2Num}
                  onChange={(e) => setComp2Num(parseInt(e.target.value) || 0)}
                  className="w-full text-center py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm"
                />
                <div className="w-full h-0.5 bg-slate-600" />
                <input
                  type="number"
                  value={comp2Den}
                  onChange={(e) => setComp2Den(parseInt(e.target.value) || 1)}
                  className="w-full text-center py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm"
                />
              </div>
            </div>

            {compareResult && (
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 space-y-1">
                <div>{compareResult.explanation}</div>
                <div className="text-slate-400">
                  Valeurs décimales : {(comp1Num / comp1Den).toFixed(4)} vs {(comp2Num / comp2Den).toFixed(4)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
