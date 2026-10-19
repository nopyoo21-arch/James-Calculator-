import React, { useState } from 'react';
import { Copy, Check, Search, Atom, Zap, Flame, Compass, RefreshCw } from 'lucide-react';

interface ElementInfo {
  z: number;
  symbol: string;
  name: string;
  mass: number;
  category: 'nonmetal' | 'noble' | 'alkali' | 'alkaline' | 'transition' | 'metalloid' | 'halogen' | 'post-transition';
  group: number;
  period: number;
}

const PERIODIC_TABLE: ElementInfo[] = [
  { z: 1, symbol: 'H', name: 'Hydrogène', mass: 1.008, category: 'nonmetal', group: 1, period: 1 },
  { z: 2, symbol: 'He', name: 'Hélium', mass: 4.0026, category: 'noble', group: 18, period: 1 },
  { z: 3, symbol: 'Li', name: 'Lithium', mass: 6.94, category: 'alkali', group: 1, period: 2 },
  { z: 4, symbol: 'Be', name: 'Béryllium', mass: 9.0122, category: 'alkaline', group: 2, period: 2 },
  { z: 5, symbol: 'B', name: 'Bore', mass: 10.81, category: 'metalloid', group: 13, period: 2 },
  { z: 6, symbol: 'C', name: 'Carbone', mass: 12.011, category: 'nonmetal', group: 14, period: 2 },
  { z: 7, symbol: 'N', name: 'Azote', mass: 14.007, category: 'nonmetal', group: 15, period: 2 },
  { z: 8, symbol: 'O', name: 'Oxygène', mass: 15.999, category: 'nonmetal', group: 16, period: 2 },
  { z: 9, symbol: 'F', name: 'Fluor', mass: 18.998, category: 'halogen', group: 17, period: 2 },
  { z: 10, symbol: 'Ne', name: 'Néon', mass: 20.180, category: 'noble', group: 18, period: 2 },
  { z: 11, symbol: 'Na', name: 'Sodium', mass: 22.990, category: 'alkali', group: 1, period: 3 },
  { z: 12, symbol: 'Mg', name: 'Magnésium', mass: 24.305, category: 'alkaline', group: 2, period: 3 },
  { z: 13, symbol: 'Al', name: 'Aluminium', mass: 26.982, category: 'post-transition', group: 13, period: 3 },
  { z: 14, symbol: 'Si', name: 'Silicium', mass: 28.085, category: 'metalloid', group: 14, period: 3 },
  { z: 15, symbol: 'P', name: 'Phosphore', mass: 30.974, category: 'nonmetal', group: 15, period: 3 },
  { z: 16, symbol: 'S', name: 'Soufre', mass: 32.06, category: 'nonmetal', group: 16, period: 3 },
  { z: 17, symbol: 'Cl', name: 'Chlore', mass: 35.45, category: 'halogen', group: 17, period: 3 },
  { z: 18, symbol: 'Ar', name: 'Argon', mass: 39.948, category: 'noble', group: 18, period: 3 },
  { z: 19, symbol: 'K', name: 'Potassium', mass: 39.098, category: 'alkali', group: 1, period: 4 },
  { z: 20, symbol: 'Ca', name: 'Calcium', mass: 40.078, category: 'alkaline', group: 2, period: 4 },
  { z: 22, symbol: 'Ti', name: 'Titane', mass: 47.867, category: 'transition', group: 4, period: 4 },
  { z: 24, symbol: 'Cr', name: 'Chrome', mass: 51.996, category: 'transition', group: 6, period: 4 },
  { z: 25, symbol: 'Mn', name: 'Manganèse', mass: 54.938, category: 'transition', group: 7, period: 4 },
  { z: 26, symbol: 'Fe', name: 'Fer', mass: 55.845, category: 'transition', group: 8, period: 4 },
  { z: 27, symbol: 'Co', name: 'Cobalt', mass: 58.933, category: 'transition', group: 9, period: 4 },
  { z: 28, symbol: 'Ni', name: 'Nickel', mass: 58.693, category: 'transition', group: 10, period: 4 },
  { z: 29, symbol: 'Cu', name: 'Cuivre', mass: 63.546, category: 'transition', group: 11, period: 4 },
  { z: 30, symbol: 'Zn', name: 'Zinc', mass: 65.38, category: 'transition', group: 12, period: 4 },
  { z: 35, symbol: 'Br', name: 'Brome', mass: 79.904, category: 'halogen', group: 17, period: 4 },
  { z: 47, symbol: 'Ag', name: 'Argent', mass: 107.87, category: 'transition', group: 11, period: 5 },
  { z: 53, symbol: 'I', name: 'Iode', mass: 126.90, category: 'halogen', group: 17, period: 5 },
  { z: 79, symbol: 'Au', name: 'Or', mass: 196.97, category: 'transition', group: 11, period: 6 },
  { z: 80, symbol: 'Hg', name: 'Mercure', mass: 200.59, category: 'transition', group: 12, period: 6 },
  { z: 82, symbol: 'Pb', name: 'Plomb', mass: 207.2, category: 'post-transition', group: 14, period: 6 },
  { z: 92, symbol: 'U', name: 'Uranium', mass: 238.03, category: 'transition', group: 3, period: 7 },
];

const PHYSICAL_CONSTANTS = [
  { name: 'Vitesse de la lumière dans le vide', symbol: 'c', value: '299 792 458', unit: 'm / s', num: 299792458 },
  { name: 'Constante de Planck', symbol: 'h', value: '6.62607015 × 10⁻³⁴', unit: 'J · s', num: 6.62607015e-34 },
  { name: 'Constante gravitationnelle', symbol: 'G', value: '6.67430 × 10⁻¹¹', unit: 'N · m² / kg²', num: 6.6743e-11 },
  { name: 'Accélération normale de pesanteur', symbol: 'g₀', value: '9.80665', unit: 'm / s²', num: 9.80665 },
  { name: 'Nombre d’Avogadro', symbol: 'N_A', value: '6.02214076 × 10²³', unit: 'mol⁻¹', num: 6.02214076e23 },
  { name: 'Constante des gaz parfaits', symbol: 'R', value: '8.314462618', unit: 'J / (mol · K)', num: 8.314462618 },
  { name: 'Constante de Boltzmann', symbol: 'k_B', value: '1.380649 × 10⁻²³', unit: 'J / K', num: 1.380649e-23 },
  { name: 'Charge élémentaire', symbol: 'e', value: '1.602176634 × 10⁻¹⁹', unit: 'C', num: 1.602176634e-19 },
  { name: 'Masse au repos de l’électron', symbol: 'm_e', value: '9.1093837 × 10⁻³¹', unit: 'kg', num: 9.1093837e-31 },
  { name: 'Masse au repos du proton', symbol: 'm_p', value: '1.6726219 × 10⁻²⁷', unit: 'kg', num: 1.6726219e-27 },
  { name: 'Masse au repos du neutron', symbol: 'm_n', value: '1.6749275 × 10⁻²⁷', unit: 'kg', num: 1.6749275e-27 },
  { name: 'Permittivité du vide', symbol: 'ε₀', value: '8.8541878 × 10⁻¹²', unit: 'F / m', num: 8.8541878e-12 },
];

export const ScienceToolsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'physics' | 'chemistry' | 'constants' | 'periodic'>('physics');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Physics states
  // 1. Ohm
  const [voltage, setVoltage] = useState('12');
  const [resistance, setResistance] = useState('100');
  const [current, setCurrent] = useState('');
  const [power, setPower] = useState('');

  // 2. Kinetic & Potential Energy
  const [mass, setMass] = useState('10');
  const [velocity, setVelocity] = useState('20');
  const [height, setHeight] = useState('5');

  // Chemistry states
  // 1. Gas Law PV = nRT
  const [gasP, setGasP] = useState('101325'); // Pa
  const [gasV, setGasV] = useState('0.0224'); // m^3 (22.4 L)
  const [gasN, setGasN] = useState('1'); // mol
  const [gasT, setGasT] = useState('273.15'); // K
  const [gasSolveFor, setGasSolveFor] = useState<'P' | 'V' | 'n' | 'T'>('P');

  // 2. Concentration & Dilution
  const [c1, setC1] = useState('1.0');
  const [v1, setV1] = useState('');
  const [c2, setC2] = useState('0.1');
  const [v2, setV2] = useState('0.5');

  // 3. pH
  const [h3o, setH3o] = useState('0.001');

  // Periodic table search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<ElementInfo | null>(PERIODIC_TABLE[0]);

  // Common Molecules
  const COMMON_MOLECULES = [
    { formula: 'H₂O', name: 'Eau', mass: 18.015 },
    { formula: 'CO₂', name: 'Dioxyde de carbone', mass: 44.01 },
    { formula: 'NaCl', name: 'Chlorure de sodium (Sel)', mass: 58.44 },
    { formula: 'C₆H₁₂O₆', name: 'Glucose', mass: 180.16 },
    { formula: 'CH₄', name: 'Méthane', mass: 16.04 },
    { formula: 'NH₃', name: 'Ammoniac', mass: 17.031 },
    { formula: 'H₂SO₄', name: 'Acide sulfurique', mass: 98.079 },
    { formula: 'C₂H₅OH', name: 'Éthanol', mass: 46.07 },
    { formula: 'CaCO₃', name: 'Carbonate de calcium', mass: 100.086 },
    { formula: 'O₂', name: 'Dioxygène', mass: 31.998 },
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Ohm Calculations
  const computeOhm = () => {
    const v = parseFloat(voltage);
    const r = parseFloat(resistance);
    if (!isNaN(v) && !isNaN(r) && r > 0) {
      const i = v / r;
      const p = v * i;
      return { i: i.toFixed(4), p: p.toFixed(4) };
    }
    return { i: '0', p: '0' };
  };

  // Kinetic & Mech Energy
  const computeEnergies = () => {
    const m = parseFloat(mass) || 0;
    const v = parseFloat(velocity) || 0;
    const h = parseFloat(height) || 0;
    const ec = 0.5 * m * v * v;
    const ep = m * 9.80665 * h;
    const em = ec + ep;
    return {
      ec: ec.toFixed(2),
      ep: ep.toFixed(2),
      em: em.toFixed(2),
    };
  };

  // Gas law compute
  const computeGas = () => {
    const R = 8.314462618;
    const P = parseFloat(gasP);
    const V = parseFloat(gasV);
    const n = parseFloat(gasN);
    const T = parseFloat(gasT);

    try {
      if (gasSolveFor === 'P') {
        if (V > 0) return ((n * R * T) / V).toFixed(2) + ' Pa';
      } else if (gasSolveFor === 'V') {
        if (P > 0) return (((n * R * T) / P) * 1000).toFixed(3) + ' L (' + ((n * R * T) / P).toFixed(5) + ' m³)';
      } else if (gasSolveFor === 'n') {
        if (T > 0) return ((P * V) / (R * T)).toFixed(4) + ' mol';
      } else if (gasSolveFor === 'T') {
        if (n > 0) return ((P * V) / (n * R)).toFixed(2) + ' K (' + (((P * V) / (n * R)) - 273.15).toFixed(2) + ' °C)';
      }
    } catch {
      return 'Erreur de calcul';
    }
    return 'Entrées invalides';
  };

  // Dilution compute: C1 * V1 = C2 * V2 -> V1 = (C2 * V2) / C1
  const computeDilution = () => {
    const conc1 = parseFloat(c1);
    const conc2 = parseFloat(c2);
    const vol2 = parseFloat(v2);
    if (conc1 > 0 && conc2 > 0 && vol2 > 0) {
      const neededV1 = (conc2 * vol2) / conc1;
      const waterToAdd = vol2 - neededV1;
      return {
        v1L: neededV1.toFixed(4),
        v1mL: (neededV1 * 1000).toFixed(1),
        watermL: (waterToAdd * 1000).toFixed(1),
      };
    }
    return null;
  };

  // pH compute
  const computePh = () => {
    const conc = parseFloat(h3o);
    if (conc > 0) {
      const ph = -Math.log10(conc);
      return ph.toFixed(2);
    }
    return '0.00';
  };

  const filteredElements = PERIODIC_TABLE.filter(
    (el) =>
      el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.z.toString() === searchQuery.trim()
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 animate-in fade-in duration-200">
      {/* Sub-tabs header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex flex-wrap gap-1 shadow-sm">
        <button
          onClick={() => setActiveTab('physics')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'physics'
              ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Zap className="w-4 h-4" />
          Physique & Énergies
        </button>
        <button
          onClick={() => setActiveTab('chemistry')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'chemistry'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Flame className="w-4 h-4" />
          Chimie & Solutions
        </button>
        <button
          onClick={() => setActiveTab('periodic')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'periodic'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Atom className="w-4 h-4" />
          Tableau Périodique
        </button>
        <button
          onClick={() => setActiveTab('constants')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'constants'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Compass className="w-4 h-4" />
          Constantes Physiques
        </button>
      </div>

      {/* 1. PHYSIQUE */}
      {activeTab === 'physics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Loi d'Ohm */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 font-bold">⚡</span>
                <div>
                  <h3 className="text-sm font-bold text-white">Loi d’Ohm & Électricité</h3>
                  <p className="text-xs text-slate-400">Formule : U = R × I et P = U × I</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Tension U (Volts)</label>
                <input
                  type="number"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono text-sm focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Résistance R (Ohms Ω)</label>
                <input
                  type="number"
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono text-sm focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Courant résultant (I) :</span>
                <span className="font-mono font-bold text-amber-400">{computeOhm().i} A</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Puissance dissipée (P) :</span>
                <span className="font-mono font-bold text-emerald-400">{computeOhm().p} W</span>
              </div>
            </div>
          </div>

          {/* Énergie Cinétique & Mécanique */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold">🚀</span>
                <div>
                  <h3 className="text-sm font-bold text-white">Énergie Cinétique & Mécanique</h3>
                  <p className="text-xs text-slate-400">Ec = ½·m·v² | Ep = m·g·h</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Masse m (kg)</label>
                <input
                  type="number"
                  value={mass}
                  onChange={(e) => setMass(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Vitesse v (m/s)</label>
                <input
                  type="number"
                  value={velocity}
                  onChange={(e) => setVelocity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Hauteur h (m)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-sm outline-none"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-slate-400">Énergie Cinétique (Ec) :</span>
                <span className="font-mono font-bold text-cyan-400">{computeEnergies().ec} Joules</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-slate-400">Énergie Potentielle (Ep) :</span>
                <span className="font-mono font-bold text-emerald-400">{computeEnergies().ep} Joules</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm pt-1 border-t border-slate-800">
                <span className="text-white font-medium">Énergie Mécanique Totale :</span>
                <span className="font-mono font-bold text-indigo-400">{computeEnergies().em} J</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CHIMIE */}
      {activeTab === 'chemistry' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Gaz parfaits PV = nRT */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-teal-500/10 text-teal-400 font-bold">💨</span>
                <div>
                  <h3 className="text-sm font-bold text-white">Loi des Gaz Parfaits</h3>
                  <p className="text-xs text-slate-400">P · V = n · R · T (R = 8.314 J/mol·K)</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Variable à trouver :</span>
              {(['P', 'V', 'n', 'T'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setGasSolveFor(v)}
                  className={`px-2.5 py-1 rounded font-bold transition-colors cursor-pointer ${
                    gasSolveFor === v ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {gasSolveFor !== 'P' && (
                <div>
                  <label className="text-slate-400 block mb-1">Pression P (Pa)</label>
                  <input
                    type="number"
                    value={gasP}
                    onChange={(e) => setGasP(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-mono outline-none"
                  />
                </div>
              )}
              {gasSolveFor !== 'V' && (
                <div>
                  <label className="text-slate-400 block mb-1">Volume V (m³)</label>
                  <input
                    type="number"
                    value={gasV}
                    onChange={(e) => setGasV(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-mono outline-none"
                  />
                </div>
              )}
              {gasSolveFor !== 'n' && (
                <div>
                  <label className="text-slate-400 block mb-1">Quantité n (moles)</label>
                  <input
                    type="number"
                    value={gasN}
                    onChange={(e) => setGasN(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-mono outline-none"
                  />
                </div>
              )}
              {gasSolveFor !== 'T' && (
                <div>
                  <label className="text-slate-400 block mb-1">Température T (K)</label>
                  <input
                    type="number"
                    value={gasT}
                    onChange={(e) => setGasT(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-mono outline-none"
                  />
                </div>
              )}
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">Valeur calculée pour {gasSolveFor}</span>
              <span className="text-lg font-mono font-bold text-teal-400">{computeGas()}</span>
            </div>
          </div>

          {/* Dilution & pH */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-pink-500/10 text-pink-400 font-bold">🧪</span>
                <div>
                  <h3 className="text-sm font-bold text-white">Dilution & Calcul du pH</h3>
                  <p className="text-xs text-slate-400">C₁ · V₁ = C₂ · V₂ et pH = -log[H₃O⁺]</p>
                </div>
              </div>
            </div>

            {/* Dilution inputs */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300 block">Simulateur de Dilution</span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block">C₁ (mol/L)</label>
                  <input
                    type="number"
                    value={c1}
                    onChange={(e) => setC1(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white font-mono text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block">C₂ voulue</label>
                  <input
                    type="number"
                    value={c2}
                    onChange={(e) => setC2(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white font-mono text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block">V₂ final (L)</label>
                  <input
                    type="number"
                    value={v2}
                    onChange={(e) => setV2(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white font-mono text-xs outline-none"
                  />
                </div>
              </div>

              {computeDilution() && (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                  <div className="text-emerald-400 font-semibold">
                    Volume de solution mère à prélever (V₁) : <b>{computeDilution()?.v1mL} mL</b> ({computeDilution()?.v1L} L)
                  </div>
                  <div className="text-slate-400">
                    Volume d'eau à ajouter : <b>{computeDilution()?.watermL} mL</b>
                  </div>
                </div>
              )}
            </div>

            {/* pH calculator */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300 block">Calcul du pH</span>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-[11px] text-slate-400 block mb-1">[H₃O⁺] en mol/L</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={h3o}
                    onChange={(e) => setH3o(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white font-mono text-xs outline-none"
                  />
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-center min-w-[90px]">
                  <span className="text-[10px] text-slate-400 block">pH estimé</span>
                  <span className="text-base font-bold text-pink-400 font-mono">{computePh()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Molécules courantes */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>🧬</span> Masses Molaires de Composés Chimiques Fréquents
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {COMMON_MOLECULES.map((mol) => (
                <div
                  key={mol.formula}
                  className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="font-mono font-bold text-cyan-300 text-sm">{mol.formula}</div>
                    <div className="text-[11px] text-slate-400 truncate">{mol.name}</div>
                  </div>
                  <div className="mt-2 text-xs font-mono font-semibold text-slate-200">
                    {mol.mass} <span className="text-[10px] text-slate-400">g/mol</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. TABLEAU PÉRIODIQUE */}
      {activeTab === 'periodic' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Atom className="w-4 h-4 text-cyan-400" />
                Tableau Périodique des Éléments
              </h3>
              <p className="text-xs text-slate-400">Recherche instantanée et propriétés fondamentales</p>
            </div>
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Symbole, nom ou Z..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Element details display */}
          {selectedElement && (
            <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-cyan-900/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex flex-col items-center justify-center text-cyan-300">
                  <span className="text-[10px] text-cyan-400/80 font-mono self-start pl-2 -mb-1">{selectedElement.z}</span>
                  <span className="text-2xl font-black font-mono">{selectedElement.symbol}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{selectedElement.name}</h4>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>Masse atomique : <b className="text-cyan-300 font-mono">{selectedElement.mass} u</b></span>
                    <span>•</span>
                    <span>Période {selectedElement.period}, Groupe {selectedElement.group}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(selectedElement.mass.toString(), 'elem-' + selectedElement.symbol)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
              >
                {copiedKey === 'elem-' + selectedElement.symbol ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier masse</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Elements grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredElements.map((el) => {
              const isSelected = selectedElement?.z === el.z;
              return (
                <button
                  key={el.z}
                  onClick={() => setSelectedElement(el)}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-md ring-1 ring-cyan-500'
                      : 'bg-slate-950 border-slate-800/80 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>{el.z}</span>
                    <span className="text-[9px] uppercase opacity-60">{el.period}</span>
                  </div>
                  <div className="text-base font-bold font-mono my-0.5 text-center">{el.symbol}</div>
                  <div className="text-[10px] truncate text-slate-400 text-center">{el.name}</div>
                  <div className="text-[9px] font-mono text-slate-500 text-center mt-1">{el.mass}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. CONSTANTES PHYSIQUES */}
      {activeTab === 'constants' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-purple-400" />
                Constantes Physiques Fondamentales
              </h3>
              <p className="text-xs text-slate-400">Valeurs recommandées CODATA utilisables dans les calculs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PHYSICAL_CONSTANTS.map((c) => (
              <div
                key={c.symbol}
                className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-purple-400 text-sm">{c.symbol}</span>
                    <span className="text-xs font-semibold text-slate-200 truncate">{c.name}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-300">
                    {c.value} <span className="text-[11px] text-slate-500">{c.unit}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(c.num.toString(), c.symbol)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Copier la valeur numérique"
                >
                  {copiedKey === c.symbol ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
