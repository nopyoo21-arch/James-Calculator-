import React, { useState } from 'react';
import { UNIT_CATEGORIES, UnitCategory, convertUnit } from '../utils/converter';
import { ArrowRightLeft, Copy, Check } from 'lucide-react';

export const ConverterView: React.FC = () => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [inputValue, setInputValue] = useState<number>(100);
  const [fromUnitId, setFromUnitId] = useState<string>('cm');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeCategory = UNIT_CATEGORIES.find((c) => c.id === category) || UNIT_CATEGORIES[0];

  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const catDef = UNIT_CATEGORIES.find((c) => c.id === newCat);
    if (catDef && catDef.units.length > 0) {
      setFromUnitId(catDef.units[0].id);
    }
  };

  const copyVal = (valStr: string, id: string) => {
    navigator.clipboard.writeText(valStr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Category selector */}
      <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold overflow-x-auto scrollbar-none">
        {UNIT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              category === cat.id ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-sky-400" />
            <span>Conversion universelle : {activeCategory.name}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Saisissez une valeur pour voir la conversion instantanée dans toutes les unités du système international et impérial
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Valeur à convertir</label>
            <input
              type="number"
              step="any"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Unité source</label>
            <select
              value={fromUnitId}
              onChange={(e) => setFromUnitId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-sky-500"
            >
              {activeCategory.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {category === 'currency' && (
          <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs space-y-1">
            <div className="font-semibold text-amber-300 flex items-center gap-1.5">
              <span>💱</span> Taux de change indicatifs & Personnalisables
            </div>
            <p className="text-slate-400">
              Taux éducatifs et indicatifs intégrés (USD, EUR, Gourde Haïtienne HTG, CAD, GBP, CHF, DOP, JPY). Entièrement utilisable hors ligne.
            </p>
          </div>
        )}
      </div>

      {/* All conversions table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Équivalences simultanées
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {activeCategory.units.map((unit) => {
            let converted = 0;
            try {
              converted = convertUnit(inputValue, category, fromUnitId, unit.id);
            } catch {}

            const formattedVal = Math.abs(converted) >= 1e12 || (Math.abs(converted) < 1e-5 && converted !== 0)
              ? converted.toExponential(6)
              : converted.toLocaleString('fr-FR', { maximumFractionDigits: 8 });

            const isSelected = unit.id === fromUnitId;

            return (
              <div
                key={unit.id}
                onClick={() => setFromUnitId(unit.id)}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer group ${
                  isSelected
                    ? 'bg-sky-950/40 border-sky-600/60'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50'
                }`}
              >
                <div>
                  <div className="text-xs font-medium text-slate-400">
                    {unit.name} <span className="text-slate-500">({unit.symbol})</span>
                  </div>
                  <div className="text-base sm:text-lg font-mono font-bold text-white mt-0.5 tabular-nums">
                    {formattedVal}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyVal(formattedVal, unit.id);
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Copier la valeur"
                >
                  {copiedId === unit.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
