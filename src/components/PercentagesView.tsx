import React, { useState } from 'react';
import { ArrowRight, Percent, Tag, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export const PercentagesView: React.FC = () => {
  // Mode 1: X% de Y
  const [p1Rate, setP1Rate] = useState<number>(20);
  const [p1Base, setP1Base] = useState<number>(150);

  // Mode 2: X représente quel % de Y ?
  const [p2Part, setP2Part] = useState<number>(45);
  const [p2Total, setP2Total] = useState<number>(180);

  // Mode 3: Augmentation / Réduction en %
  const [p3Initial, setP3Initial] = useState<number>(80);
  const [p3Pct, setP3Pct] = useState<number>(15);
  const [p3Type, setP3Type] = useState<'increase' | 'decrease'>('decrease');

  // Mode 4: Variation en pourcentage entre V1 et V2
  const [p4V1, setP4V1] = useState<number>(120);
  const [p4V2, setP4V2] = useState<number>(150);

  // Mode 5: Retrouver la valeur initiale (valeur finale connue)
  const [p5Final, setP5Final] = useState<number>(120);
  const [p5Rate, setP5Rate] = useState<number>(20);
  const [p5Type, setP5Type] = useState<'after_increase' | 'after_decrease'>('after_increase');

  // Calculations
  // 1
  const res1 = (p1Rate / 100) * p1Base;
  const f1 = `${p1Rate}% × ${p1Base} = (${p1Rate} / 100) × ${p1Base} = ${res1.toFixed(2)}`;

  // 2
  const res2 = p2Total !== 0 ? (p2Part / p2Total) * 100 : 0;
  const f2 = `(${p2Part} / ${p2Total}) × 100 = ${res2.toFixed(2)}%`;

  // 3
  const delta3 = (p3Pct / 100) * p3Initial;
  const res3 = p3Type === 'increase' ? p3Initial + delta3 : p3Initial - delta3;
  const f3 = p3Type === 'increase'
    ? `${p3Initial} × (1 + ${p3Pct}/100) = ${p3Initial} + ${delta3.toFixed(2)} = ${res3.toFixed(2)}`
    : `${p3Initial} × (1 - ${p3Pct}/100) = ${p3Initial} - ${delta3.toFixed(2)} = ${res3.toFixed(2)}`;

  // 4
  const diff4 = p4V2 - p4V1;
  const res4 = p4V1 !== 0 ? (diff4 / Math.abs(p4V1)) * 100 : 0;
  const f4 = `((${p4V2} - ${p4V1}) / |${p4V1}|) × 100 = (${diff4} / ${Math.abs(p4V1)}) × 100 = ${res4.toFixed(2)}%`;

  // 5
  const mult5 = p5Type === 'after_increase' ? 1 + p5Rate / 100 : 1 - p5Rate / 100;
  const res5 = mult5 !== 0 ? p5Final / mult5 : 0;
  const f5 = p5Type === 'after_increase'
    ? `Valeur initiale = ${p5Final} / (1 + ${p5Rate}/100) = ${p5Final} / ${(1 + p5Rate / 100).toFixed(2)} = ${res5.toFixed(2)}`
    : `Valeur initiale = ${p5Final} / (1 - ${p5Rate}/100) = ${p5Final} / ${(1 - p5Rate / 100).toFixed(2)} = ${res5.toFixed(2)}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 1. X% of Y */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
          <Percent className="w-4 h-4" />
          <span>Calculer un pourcentage d'une valeur</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-300">Combien vaut</span>
          <div className="flex items-center gap-1 w-28">
            <input
              type="number"
              value={p1Rate}
              onChange={(e) => setP1Rate(parseFloat(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm text-center"
            />
            <span className="text-slate-400 font-mono">%</span>
          </div>
          <span className="text-xs text-slate-300">de</span>
          <div className="w-32">
            <input
              type="number"
              value={p1Base}
              onChange={(e) => setP1Base(parseFloat(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm text-center"
            />
          </div>
          <span className="text-xs text-slate-300">?</span>
        </div>

        <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">{f1}</span>
          <span className="font-mono text-xl font-bold text-sky-400 tabular-nums">
            {res1.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* 2. Ratio in % */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
          <Tag className="w-4 h-4" />
          <span>Trouver le pourcentage entre deux nombres</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="w-28">
            <input
              type="number"
              value={p2Part}
              onChange={(e) => setP2Part(parseFloat(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm text-center"
            />
          </div>
          <span className="text-xs text-slate-300">représente quel pourcentage de</span>
          <div className="w-28">
            <input
              type="number"
              value={p2Total}
              onChange={(e) => setP2Total(parseFloat(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm text-center"
            />
          </div>
          <span className="text-xs text-slate-300">?</span>
        </div>

        <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">{f2}</span>
          <span className="font-mono text-xl font-bold text-emerald-400 tabular-nums">
            {res2.toFixed(2)} %
          </span>
        </div>
      </div>

      {/* 3. Increase / Discount (Soldes) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
            {p3Type === 'increase' ? <TrendingUp className="w-4 h-4 text-emerald-400" /> : <TrendingDown className="w-4 h-4 text-amber-400" />}
            <span>Augmentation ou Remise commerciale (Soldes)</span>
          </div>

          <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setP3Type('increase')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                p3Type === 'increase' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              + Hausse
            </button>
            <button
              onClick={() => setP3Type('decrease')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                p3Type === 'decrease' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              − Remise / Solde
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-300">Valeur initiale :</span>
          <div className="w-32">
            <input
              type="number"
              value={p3Initial}
              onChange={(e) => setP3Initial(parseFloat(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm text-center"
            />
          </div>
          <span className="text-xs text-slate-300">{p3Type === 'increase' ? '+ Augmentation de' : '− Remise de'}</span>
          <div className="flex items-center gap-1 w-24">
            <input
              type="number"
              value={p3Pct}
              onChange={(e) => setP3Pct(parseFloat(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm text-center"
            />
            <span className="text-slate-400 font-mono">%</span>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="text-xs font-mono text-slate-400">{f3}</div>
            <div className="text-[11px] text-slate-500">
              {p3Type === 'decrease' ? `Économie réalisée : ${delta3.toFixed(2)}` : `Montant de la hausse : ${delta3.toFixed(2)}`}
            </div>
          </div>
          <span className="font-mono text-2xl font-bold text-white tabular-nums">
            {res3.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* 4. Percentage Variation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>Variation en pourcentage entre 2 valeurs (V₁ ➔ V₂)</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-300">Valeur initiale V₁ :</span>
          <div className="w-28">
            <input
              type="number"
              value={p4V1}
              onChange={(e) => setP4V1(parseFloat(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm text-center"
            />
          </div>
          <span className="text-xs text-slate-300">➔ Valeur finale V₂ :</span>
          <div className="w-28">
            <input
              type="number"
              value={p4V2}
              onChange={(e) => setP4V2(parseFloat(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm text-center"
            />
          </div>
        </div>

        <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">{f4}</span>
          <span className={`font-mono text-xl font-bold tabular-nums ${res4 >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {res4 >= 0 ? `+${res4.toFixed(2)} %` : `${res4.toFixed(2)} %`}
          </span>
        </div>
      </div>

      {/* 5. Reverse Percentage */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
            <RefreshCw className="w-4 h-4" />
            <span>Retrouver la valeur initiale (Pourcentage inversé)</span>
          </div>

          <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setP5Type('after_increase')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                p5Type === 'after_increase' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Après hausse (+%)
            </button>
            <button
              onClick={() => setP5Type('after_decrease')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                p5Type === 'after_decrease' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Après baisse (−%)
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-300">Valeur finale obtenue :</span>
          <div className="w-28">
            <input
              type="number"
              value={p5Final}
              onChange={(e) => setP5Final(parseFloat(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm text-center"
            />
          </div>
          <span className="text-xs text-slate-300">après une {p5Type === 'after_increase' ? 'augmentation' : 'réduction'} de</span>
          <div className="flex items-center gap-1 w-24">
            <input
              type="number"
              value={p5Rate}
              onChange={(e) => setP5Rate(parseFloat(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm text-center"
            />
            <span className="text-slate-400 font-mono">%</span>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">{f5}</span>
          <span className="font-mono text-xl font-bold text-sky-400 tabular-nums">
            {res5.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};
