import React, { useState } from 'react';
import {
  parseDataSet,
  calculateDescriptiveStats,
  calculateLinearRegression,
} from '../utils/statistics';
import { BarChart3, LineChart, Table, AlertCircle } from 'lucide-react';

export const StatisticsView: React.FC = () => {
  const [subTab, setSubTab] = useState<'descriptive' | 'regression'>('descriptive');

  // Descriptive state
  const [dataInput, setDataInput] = useState<string>('12, 15, 14, 18, 15, 20, 22, 14, 15, 17, 19, 25');

  // Linear regression state
  const [pointsInput, setPointsInput] = useState<string>(
    '1, 2\n2, 3.8\n3, 6.1\n4, 7.9\n5, 10.2\n6, 12'
  );

  // Computations
  const parsedData = parseDataSet(dataInput);
  let statsResult = null;
  let statsError = '';
  try {
    statsResult = calculateDescriptiveStats(parsedData);
  } catch (err: unknown) {
    statsError = err instanceof Error ? err.message : 'Erreur de calcul';
  }

  // Regression points parse
  const parsedPoints: { x: number; y: number }[] = [];
  pointsInput.split('\n').forEach((line) => {
    const parts = line.replace(/;/g, ',').split(',');
    if (parts.length >= 2) {
      const x = parseFloat(parts[0].trim());
      const y = parseFloat(parts[1].trim());
      if (!isNaN(x) && !isNaN(y)) {
        parsedPoints.push({ x, y });
      }
    }
  });

  let regResult = null;
  let regError = '';
  try {
    regResult = calculateLinearRegression(parsedPoints);
  } catch (err: unknown) {
    regError = err instanceof Error ? err.message : 'Erreur';
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Sub tabs */}
      <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
        <button
          onClick={() => setSubTab('descriptive')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors cursor-pointer ${
            subTab === 'descriptive' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Statistiques Descriptives & Fréquences
        </button>
        <button
          onClick={() => setSubTab('regression')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors cursor-pointer ${
            subTab === 'regression' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Régression Linéaire (y = ax + b)
        </button>
      </div>

      {/* 1. Descriptive Stats */}
      {subTab === 'descriptive' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-sky-400" />
                <span>Saisie de la Série Statistique</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Séparez les nombres par des virgules, des points-virgules ou des espaces.
              </p>
            </div>

            <textarea
              rows={3}
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xs leading-relaxed focus:outline-none focus:border-sky-500"
              placeholder="Ex : 12, 14, 15, 18..."
            />

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400">
              <span>{parsedData.length} valeur(s) valide(s) détectée(s)</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDataInput('10, 12, 12, 14, 15, 15, 15, 16, 18, 20')}
                  className="text-sky-400 hover:underline cursor-pointer"
                >
                  Exemple Notes
                </button>
                <span>·</span>
                <button
                  onClick={() => setDataInput('165, 170, 172, 175, 175, 178, 180, 182, 185')}
                  className="text-sky-400 hover:underline cursor-pointer"
                >
                  Exemple Tailles
                </button>
              </div>
            </div>
          </div>

          {statsError ? (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{statsError}</span>
            </div>
          ) : statsResult && (
            <div className="space-y-4">
              {/* Key Indicators Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Moyenne (x̄)</div>
                  <div className="text-2xl font-mono font-bold text-sky-400 mt-1 tabular-nums">
                    {statsResult.mean.toFixed(2)}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Médiane (Q2)</div>
                  <div className="text-2xl font-mono font-bold text-emerald-400 mt-1 tabular-nums">
                    {statsResult.median}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Écart-type (σ)</div>
                  <div className="text-2xl font-mono font-bold text-amber-400 mt-1 tabular-nums">
                    {statsResult.stdDevPopulation.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Échantillon s = {statsResult.stdDevSample.toFixed(2)}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Étendue (Max - Min)</div>
                  <div className="text-2xl font-mono font-bold text-white mt-1 tabular-nums">
                    {statsResult.range}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">[{statsResult.min} à {statsResult.max}]</div>
                </div>
              </div>

              {/* Extended Summary */}
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400">Effectif total (N) :</span>
                  <div className="text-white font-bold text-base mt-0.5">{statsResult.count}</div>
                </div>
                <div>
                  <span className="text-slate-400">Somme (Σx) :</span>
                  <div className="text-white font-bold text-base mt-0.5">{statsResult.sum}</div>
                </div>
                <div>
                  <span className="text-slate-400">Premier Quartile (Q1) :</span>
                  <div className="text-white font-bold text-base mt-0.5">{statsResult.q1}</div>
                </div>
                <div>
                  <span className="text-slate-400">Troisième Quartile (Q3) :</span>
                  <div className="text-white font-bold text-base mt-0.5">{statsResult.q3}</div>
                </div>
                <div>
                  <span className="text-slate-400">Écart interquartile (IQR) :</span>
                  <div className="text-white font-bold text-base mt-0.5">{statsResult.iqr}</div>
                </div>
                <div>
                  <span className="text-slate-400">Mode(s) :</span>
                  <div className="text-white font-bold text-base mt-0.5">
                    {statsResult.modes.length > 0 ? statsResult.modes.join(', ') : 'Aucun mode unique'}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Variance pop (σ²) :</span>
                  <div className="text-white font-bold text-base mt-0.5">{statsResult.variancePopulation.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-slate-400">Variance éch (s²) :</span>
                  <div className="text-white font-bold text-base mt-0.5">{statsResult.varianceSample.toFixed(2)}</div>
                </div>
              </div>

              {/* Frequency Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Table className="w-4 h-4 text-sky-400" />
                  <span>Tableau des Fréquences et Pourcentages</span>
                </h3>
                <div className="max-h-60 overflow-y-auto border border-slate-800 rounded-xl">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="sticky top-0 bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-2 px-3">Valeur (x)</th>
                        <th className="py-2 px-3">Effectif (n)</th>
                        <th className="py-2 px-3">Fréquence (%)</th>
                        <th className="py-2 px-3 text-right">Fréquence cumulée</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-300">
                      {statsResult.frequencyTable.map((row) => (
                        <tr key={row.value} className="hover:bg-slate-800/40">
                          <td className="py-1.5 px-3 font-semibold text-white">{row.value}</td>
                          <td className="py-1.5 px-3">{row.count}</td>
                          <td className="py-1.5 px-3">{row.percentage.toFixed(1)} %</td>
                          <td className="py-1.5 px-3 text-right text-sky-400">{row.cumulativePct.toFixed(1)} %</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Linear Regression */}
      {subTab === 'regression' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <LineChart className="w-5 h-5 text-sky-400" />
                <span>Régression Linéaire par les Moindres Carrés</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Entrez chaque point sous la forme x, y (un couple par ligne).
              </p>
            </div>

            <textarea
              rows={5}
              value={pointsInput}
              onChange={(e) => setPointsInput(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xs leading-relaxed focus:outline-none focus:border-sky-500"
              placeholder="1, 2&#10;2, 4&#10;3, 5.5..."
            />
          </div>

          {regError ? (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-sm">
              {regError}
            </div>
          ) : regResult && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Équation de la droite</div>
                  <div className="text-xl font-mono font-bold text-sky-400 mt-1">
                    {regResult.equation}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Coefficient de corrélation (r)</div>
                  <div className="text-xl font-mono font-bold text-emerald-400 mt-1">
                    r = {regResult.correlationR.toFixed(4)}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {Math.abs(regResult.correlationR) > 0.9 ? 'Forte corrélation linéaire' : 'Corrélation modérée'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">Coefficient r²</div>
                  <div className="text-xl font-mono font-bold text-white mt-1">
                    r² = {(regResult.rSquared * 100).toFixed(2)} %
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Qualité de l'ajustement</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
