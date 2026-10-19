import React, { useState } from 'react';
import {
  solveQuadraticEquation,
  solveLinearEquation,
  solveLinearSystem,
  expandExpression,
} from '../utils/algebra';
import { CheckCircle2, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';

export const AlgebraView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quadratic' | 'linear' | 'system' | 'expand'>('quadratic');

  // Quadratic State (ax² + bx + c = 0)
  const [quadA, setQuadA] = useState<number>(1);
  const [quadB, setQuadB] = useState<number>(-5);
  const [quadC, setQuadC] = useState<number>(6);

  // Linear State (ax + b = cx + d)
  const [linA, setLinA] = useState<number>(3);
  const [linB, setLinB] = useState<number>(7);
  const [linC, setLinC] = useState<number>(1);
  const [linD, setLinD] = useState<number>(15);

  // System 2x2 State
  const [sysA1, setSysA1] = useState<number>(2);
  const [sysB1, setSysB1] = useState<number>(3);
  const [sysC1, setSysC1] = useState<number>(12);
  const [sysA2, setSysA2] = useState<number>(5);
  const [sysB2, setSysB2] = useState<number>(-2);
  const [sysC2, setSysC2] = useState<number>(11);

  // Expand State
  const [expType, setExpType] = useState<'sum_sq' | 'diff_sq' | 'diff_prod' | 'distrib'>('sum_sq');
  const [expA, setExpA] = useState<number>(2);
  const [expB, setExpB] = useState<number>(3);

  // Computations
  let quadResult = null;
  let quadError = '';
  try {
    quadResult = solveQuadraticEquation(quadA, quadB, quadC);
  } catch (err: unknown) {
    quadError = err instanceof Error ? err.message : 'Erreur de calcul';
  }

  const linResult = solveLinearEquation(linA, linB, linC, linD);
  const sysResult = solveLinearSystem(sysA1, sysB1, sysC1, sysA2, sysB2, sysC2);
  const expResult = expandExpression(expType, expA, expB);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Sub-navigation tabs */}
      <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('quadratic')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'quadratic' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Second Degré (ax² + bx + c = 0)
        </button>
        <button
          onClick={() => setActiveTab('linear')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'linear' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Premier Degré (ax + b = cx + d)
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'system' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Système Linéaire 2×2
        </button>
        <button
          onClick={() => setActiveTab('expand')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'expand' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Développements
        </button>
      </div>

      {/* 1. Quadratic Tab */}
      {activeTab === 'quadratic' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white">Résolution d'équation du second degré</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Calcul automatique du discriminant Δ, des racines réelles ou complexes et du sommet de la parabole.
              </p>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Coefficient a (≠ 0)</label>
                <input
                  type="number"
                  value={quadA}
                  onChange={(e) => setQuadA(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Coefficient b</label>
                <input
                  type="number"
                  value={quadB}
                  onChange={(e) => setQuadB(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Coefficient c</label>
                <input
                  type="number"
                  value={quadC}
                  onChange={(e) => setQuadC(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400">Exemples types :</span>
              <button
                onClick={() => { setQuadA(1); setQuadB(-5); setQuadC(6); }}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-sky-400 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                x² - 5x + 6 = 0 (Δ &gt; 0)
              </button>
              <button
                onClick={() => { setQuadA(1); setQuadB(4); setQuadC(4); }}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-sky-400 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                x² + 4x + 4 = 0 (Δ = 0)
              </button>
              <button
                onClick={() => { setQuadA(1); setQuadB(2); setQuadC(5); }}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-sky-400 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                x² + 2x + 5 = 0 (Δ &lt; 0)
              </button>
            </div>
          </div>

          {/* Results & Steps */}
          {quadError ? (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-sm flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{quadError}</span>
            </div>
          ) : quadResult && (
            <div className="space-y-4">
              {/* Highlight summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Discriminant (Δ)</div>
                  <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
                    {quadResult.delta}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {quadResult.deltaSign === 'positive' && 'Δ > 0 (2 racines réelles)'}
                    {quadResult.deltaSign === 'zero' && 'Δ = 0 (1 racine double)'}
                    {quadResult.deltaSign === 'negative' && 'Δ < 0 (2 racines complexes)'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 sm:col-span-2">
                  <div className="text-xs text-slate-400 font-medium">Racines de l'équation</div>
                  <div className="text-lg font-bold font-mono text-sky-400 mt-1 tabular-nums space-x-4">
                    <span>x₁ = {quadResult.roots.x1}</span>
                    {quadResult.roots.x2 && <span>x₂ = {quadResult.roots.x2}</span>}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Sommet de la parabole : S({quadResult.vertex.x.toFixed(2)} ; {quadResult.vertex.y.toFixed(2)})
                  </div>
                </div>
              </div>

              {/* Detailed steps list */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Étapes détaillées de résolution
                </h3>
                <div className="space-y-3">
                  {quadResult.steps.map((s, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                      <div className="text-xs font-bold text-sky-400">{s.title}</div>
                      <div className="font-mono text-sm text-white whitespace-pre-line bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                        {s.expression}
                      </div>
                      <div className="text-xs text-slate-400">{s.explanation}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Linear Tab */}
      {activeTab === 'linear' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white">Équation du premier degré</h2>
              <p className="text-xs text-slate-400 mt-0.5">Forme générale : ax + b = cx + d</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">a</label>
                <input
                  type="number"
                  value={linA}
                  onChange={(e) => setLinA(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">b</label>
                <input
                  type="number"
                  value={linB}
                  onChange={(e) => setLinB(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">c</label>
                <input
                  type="number"
                  value={linC}
                  onChange={(e) => setLinC(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">d</label>
                <input
                  type="number"
                  value={linD}
                  onChange={(e) => setLinD(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Étapes de résolution
            </h3>
            <div className="space-y-3">
              {linResult.steps.map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <div className="text-xs font-bold text-sky-400">{s.title}</div>
                  <div className="font-mono text-sm text-white whitespace-pre-line bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    {s.expression}
                  </div>
                  <div className="text-xs text-slate-400">{s.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. System 2x2 Tab */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white">Système linéaire 2×2 (Méthode de Cramer)</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                (E1) : a₁x + b₁y = c₁ &nbsp;|&nbsp; (E2) : a₂x + b₂y = c₂
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-sky-400 w-8">E1 :</span>
                <input
                  type="number"
                  value={sysA1}
                  onChange={(e) => setSysA1(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                />
                <span className="text-xs font-mono text-slate-400">x +</span>
                <input
                  type="number"
                  value={sysB1}
                  onChange={(e) => setSysB1(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                />
                <span className="text-xs font-mono text-slate-400">y =</span>
                <input
                  type="number"
                  value={sysC1}
                  onChange={(e) => setSysC1(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-sky-400 w-8">E2 :</span>
                <input
                  type="number"
                  value={sysA2}
                  onChange={(e) => setSysA2(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                />
                <span className="text-xs font-mono text-slate-400">x +</span>
                <input
                  type="number"
                  value={sysB2}
                  onChange={(e) => setSysB2(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                />
                <span className="text-xs font-mono text-slate-400">y =</span>
                <input
                  type="number"
                  value={sysC2}
                  onChange={(e) => setSysC2(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Solution & Cramer steps */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Résolution par déterminants
            </h3>
            <div className="space-y-3">
              {sysResult.steps.map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <div className="text-xs font-bold text-sky-400">{s.title}</div>
                  <div className="font-mono text-sm text-white whitespace-pre-line bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    {s.expression}
                  </div>
                  <div className="text-xs text-slate-400">{s.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Expansions Tab */}
      {activeTab === 'expand' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white">Développement d'expressions remarquables</h2>
              <p className="text-xs text-slate-400 mt-0.5">Identités remarquables et distributivité</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
              <button
                onClick={() => setExpType('sum_sq')}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  expType === 'sum_sq' ? 'bg-sky-600 border-sky-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                (ax + b)²
              </button>
              <button
                onClick={() => setExpType('diff_sq')}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  expType === 'diff_sq' ? 'bg-sky-600 border-sky-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                (ax - b)²
              </button>
              <button
                onClick={() => setExpType('diff_prod')}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  expType === 'diff_prod' ? 'bg-sky-600 border-sky-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                (ax + b)(ax - b)
              </button>
              <button
                onClick={() => setExpType('distrib')}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  expType === 'distrib' ? 'bg-sky-600 border-sky-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                k(x + b)
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Paramètre a (ou k)</label>
                <input
                  type="number"
                  value={expA}
                  onChange={(e) => setExpA(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Paramètre b</label>
                <input
                  type="number"
                  value={expB}
                  onChange={(e) => setExpB(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Expansion Result */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-mono text-base text-slate-300">{expResult.formula}</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
              <span className="font-mono text-base font-bold text-sky-400">{expResult.expanded}</span>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Détail du calcul</div>
              {expResult.steps.map((st, i) => (
                <div key={i} className="text-xs font-mono text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                  {st}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
