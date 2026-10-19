import React, { useState } from 'react';
import {
  Matrix,
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  scaleMatrix,
  analyzeSquareMatrix,
} from '../utils/matrices';
import { Grid, ArrowRight, RotateCcw } from 'lucide-react';

export const MatricesView: React.FC = () => {
  const [dim, setDim] = useState<2 | 3>(2);
  const [operation, setOperation] = useState<'+' | '-' | '*' | 'analyze'>('analyze');
  const [scalarK, setScalarK] = useState<number>(2);

  // Matrix A (default 2x2 or 3x3)
  const [matA, setMatA] = useState<Matrix>([
    [2, 3],
    [1, 4],
  ]);

  // Matrix B
  const [matB, setMatB] = useState<Matrix>([
    [5, -1],
    [0, 2],
  ]);

  // Switch dimension handler
  const handleDimChange = (newDim: 2 | 3) => {
    setDim(newDim);
    if (newDim === 2) {
      setMatA([
        [2, 3],
        [1, 4],
      ]);
      setMatB([
        [5, -1],
        [0, 2],
      ]);
    } else {
      setMatA([
        [1, 2, 3],
        [0, 1, 4],
        [5, 6, 0],
      ]);
      setMatB([
        [2, 0, -1],
        [1, 3, 2],
        [0, -2, 1],
      ]);
    }
  };

  const handleUpdateA = (row: number, col: number, val: number) => {
    setMatA((prev) => {
      const copy = prev.map((r) => [...r]);
      copy[row][col] = val;
      return copy;
    });
  };

  const handleUpdateB = (row: number, col: number, val: number) => {
    setMatB((prev) => {
      const copy = prev.map((r) => [...r]);
      copy[row][col] = val;
      return copy;
    });
  };

  // Computations
  let opResult = null;
  let opError = '';
  try {
    if (operation === '+') opResult = addMatrices(matA, matB);
    else if (operation === '-') opResult = subtractMatrices(matA, matB);
    else if (operation === '*') opResult = multiplyMatrices(matA, matB);
  } catch (err: unknown) {
    opError = err instanceof Error ? err.message : 'Erreur';
  }

  let analysisA = null;
  let analysisError = '';
  try {
    analysisA = analyzeSquareMatrix(matA);
  } catch (err: unknown) {
    analysisError = err instanceof Error ? err.message : 'Erreur';
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header and Dimensions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Grid className="w-5 h-5 text-sky-400" />
              <span>Calcul Matriciel (Matrices 2×2 & 3×3)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Addition, soustraction, produit matriciel, déterminant, inverse et transposée
            </p>
          </div>

          <div className="flex items-center p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => handleDimChange(2)}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                dim === 2 ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Matrice 2×2
            </button>
            <button
              onClick={() => handleDimChange(3)}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                dim === 3 ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Matrice 3×3
            </button>
          </div>
        </div>

        {/* Operation choice buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800 text-xs font-semibold">
          {[
            { id: 'analyze', label: 'Propriétés de A (Déterminant, Inverse...)' },
            { id: '+', label: 'Addition (A + B)' },
            { id: '-', label: 'Soustraction (A − B)' },
            { id: '*', label: 'Multiplication (A × B)' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setOperation(btn.id as typeof operation)}
              className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                operation === btn.id
                  ? 'bg-sky-600 border-sky-500 text-white shadow-xs'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Matrices Input Grids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Matrix A */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center justify-between">
            <span>Matrice A ({dim}×{dim})</span>
          </div>

          <div
            className="grid gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800"
            style={{ gridTemplateColumns: `repeat(${dim}, minmax(0, 1fr))` }}
          >
            {matA.map((row, rIdx) =>
              row.map((val, cIdx) => (
                <input
                  key={`a-${rIdx}-${cIdx}`}
                  type="number"
                  value={val}
                  onChange={(e) => handleUpdateA(rIdx, cIdx, parseFloat(e.target.value) || 0)}
                  className="w-full py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-center text-sm focus:outline-none focus:border-sky-500"
                />
              ))
            )}
          </div>
        </div>

        {/* Matrix B (only when binary operation selected) */}
        {operation !== 'analyze' ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
              <span>Matrice B ({dim}×{dim})</span>
            </div>

            <div
              className="grid gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800"
              style={{ gridTemplateColumns: `repeat(${dim}, minmax(0, 1fr))` }}
            >
              {matB.map((row, rIdx) =>
                row.map((val, cIdx) => (
                  <input
                    key={`b-${rIdx}-${cIdx}`}
                    type="number"
                    value={val}
                    onChange={(e) => handleUpdateB(rIdx, cIdx, parseFloat(e.target.value) || 0)}
                    className="w-full py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-center text-sm focus:outline-none focus:border-amber-500"
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          /* Single matrix A summary when in analyze mode */
          analysisA && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Indicateurs Clés de A
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-slate-400">Déterminant det(A) :</div>
                  <div className="text-xl font-bold text-sky-400 mt-1">{analysisA.determinant}</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-slate-400">Trace Tr(A) :</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">{analysisA.trace}</div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Inversibilité : </span>
                <strong className={analysisA.isInvertible ? 'text-emerald-400' : 'text-rose-400'}>
                  {analysisA.isInvertible ? 'Oui (det ≠ 0)' : 'Non (det = 0, matrice singulière)'}
                </strong>
              </div>
            </div>
          )
        )}
      </div>

      {/* Results Section */}
      {operation !== 'analyze' && opResult && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Matrice Résultat ({operation === '+' ? 'A + B' : operation === '-' ? 'A − B' : 'A × B'})
          </h3>

          <div className="flex justify-center py-2">
            <div
              className="grid gap-2 p-4 bg-slate-950 rounded-xl border-2 border-sky-600/40 max-w-xs"
              style={{ gridTemplateColumns: `repeat(${dim}, minmax(0, 1fr))` }}
            >
              {opResult.result.map((row, rIdx) =>
                row.map((val, cIdx) => (
                  <div
                    key={`res-${rIdx}-${cIdx}`}
                    className="py-2.5 px-3 bg-sky-950/60 border border-sky-800 rounded-lg text-sky-300 font-mono font-bold text-center text-base"
                  >
                    {val}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Étapes détaillées</div>
            {opResult.steps.map((st, i) => (
              <div key={i} className="text-xs font-mono text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                {st}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Details (Transpose & Inverse) */}
      {operation === 'analyze' && analysisA && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Transpose */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Transposée (Aᵀ)
            </h3>
            <div
              className="grid gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800"
              style={{ gridTemplateColumns: `repeat(${dim}, minmax(0, 1fr))` }}
            >
              {analysisA.transpose.map((row, rIdx) =>
                row.map((val, cIdx) => (
                  <div
                    key={`tr-${rIdx}-${cIdx}`}
                    className="py-2 bg-slate-900 rounded text-center font-mono text-white text-sm"
                  >
                    {val}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Inverse */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Matrice Inverse (A⁻¹)
            </h3>
            {analysisA.inverse ? (
              <div
                className="grid gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800"
                style={{ gridTemplateColumns: `repeat(${dim}, minmax(0, 1fr))` }}
              >
                {analysisA.inverse.map((row, rIdx) =>
                  row.map((val, cIdx) => (
                    <div
                      key={`inv-${rIdx}-${cIdx}`}
                      className="py-2 bg-slate-900 rounded text-center font-mono text-sky-400 text-sm font-bold"
                    >
                      {Number.isInteger(val) ? val : val.toFixed(3)}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="h-24 flex items-center justify-center text-xs text-rose-400 bg-slate-950 rounded-xl border border-slate-800">
                Non inversible car det(A) = 0
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
