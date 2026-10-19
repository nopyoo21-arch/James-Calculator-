import React, { useState } from 'react';
import { combinations, permutations, factorial } from '../utils/mathEngine';
import { binomialProbability } from '../utils/statistics';
import { Dices, Coins, Layers, Play, RotateCcw, Shuffle, Split } from 'lucide-react';

export const ProbabilitiesView: React.FC = () => {
  const [subTab, setSubTab] = useState<'dice' | 'coin' | 'cards' | 'events' | 'counting' | 'binomial'>('dice');

  // Combinatorics State
  const [combN, setCombN] = useState<number>(10);
  const [combR, setCombR] = useState<number>(3);

  // Dice Simulator State
  const [diceCount, setDiceCount] = useState<number>(1);
  const [diceRolls, setDiceRolls] = useState<number[]>([]);
  const [diceHistory, setDiceHistory] = useState<number[][]>([]);

  // Coin Simulator State
  const [coinFlips, setCoinFlips] = useState<{ heads: number; tails: number }>({ heads: 0, tails: 0 });
  const [lastCoin, setLastCoin] = useState<'pile' | 'face' | null>(null);

  // Cards & Urn Simulator State
  const [deckSize, setDeckSize] = useState<52 | 32>(52);
  const [drawnCard, setDrawnCard] = useState<{ rank: string; suit: string; symbol: string; color: 'red' | 'black' } | null>(null);
  const [urnRed, setUrnRed] = useState<number>(5);
  const [urnBlue, setUrnBlue] = useState<number>(3);
  const [urnGreen, setUrnGreen] = useState<number>(2);
  const [lastUrnDraw, setLastUrnDraw] = useState<'Rouge' | 'Bleue' | 'Verte' | null>(null);

  // Events & Conditional Probability State
  const [probA, setProbA] = useState<number>(0.4);
  const [probB, setProbB] = useState<number>(0.3);
  const [probAandB, setProbAandB] = useState<number>(0.12);
  const [isIndependent, setIsIndependent] = useState<boolean>(true);

  // Binomial State
  const [binN, setBinN] = useState<number>(10);
  const [binP, setBinP] = useState<number>(0.5);
  const [binK, setBinK] = useState<number>(5);

  // Computations
  let combVal = 0;
  let permVal = 0;
  let factNVal = 0;
  try {
    combVal = combinations(combN, combR);
    permVal = permutations(combN, combR);
    factNVal = factorial(combN);
  } catch {}

  let binomResult = null;
  let binomError = '';
  try {
    binomResult = binomialProbability(binN, binP, binK);
  } catch (err: unknown) {
    binomError = err instanceof Error ? err.message : 'Erreur';
  }

  // Event computations
  const effectiveProbAandB = isIndependent ? probA * probB : Math.min(probAandB, Math.min(probA, probB));
  const probNotA = Math.max(0, 1 - probA);
  const probNotB = Math.max(0, 1 - probB);
  const probAorB = Math.min(1, probA + probB - effectiveProbAandB);
  const probAgivenB = probB > 0 ? effectiveProbAandB / probB : 0;
  const probBgivenA = probA > 0 ? effectiveProbAandB / probA : 0;

  // Draw card handler
  const drawRandomCard = () => {
    const suits = [
      { name: 'Coeur', symbol: '♥', color: 'red' as const },
      { name: 'Carreau', symbol: '♦', color: 'red' as const },
      { name: 'Pique', symbol: '♠', color: 'black' as const },
      { name: 'Trèfle', symbol: '♣', color: 'black' as const },
    ];
    const ranks = deckSize === 52
      ? ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Valet', 'Dame', 'Roi', 'As']
      : ['7', '8', '9', '10', 'Valet', 'Dame', 'Roi', 'As'];

    const chosenSuit = suits[Math.floor(Math.random() * suits.length)];
    const chosenRank = ranks[Math.floor(Math.random() * ranks.length)];
    setDrawnCard({ rank: chosenRank, suit: chosenSuit.name, symbol: chosenSuit.symbol, color: chosenSuit.color });
  };

  // Draw from Urn handler
  const drawFromUrn = () => {
    const total = urnRed + urnBlue + urnGreen;
    if (total <= 0) return;
    const rand = Math.random() * total;
    if (rand < urnRed) {
      setLastUrnDraw('Rouge');
    } else if (rand < urnRed + urnBlue) {
      setLastUrnDraw('Bleue');
    } else {
      setLastUrnDraw('Verte');
    }
  };

  // Roll Dice Action
  const rollDice = () => {
    const current: number[] = [];
    for (let i = 0; i < diceCount; i++) {
      current.push(Math.floor(Math.random() * 6) + 1);
    }
    setDiceRolls(current);
    setDiceHistory((prev) => [current, ...prev.slice(0, 19)]);
  };

  // Flip Coin Action
  const flipCoin = () => {
    const isHeads = Math.random() < 0.5;
    const result = isHeads ? 'pile' : 'face';
    setLastCoin(result);
    setCoinFlips((prev) => ({
      heads: prev.heads + (isHeads ? 1 : 0),
      tails: prev.tails + (!isHeads ? 1 : 0),
    }));
  };

  const flip100Coins = () => {
    let h = 0;
    let t = 0;
    for (let i = 0; i < 100; i++) {
      if (Math.random() < 0.5) h++;
      else t++;
    }
    setCoinFlips((prev) => ({
      heads: prev.heads + h,
      tails: prev.tails + t,
    }));
    setLastCoin(Math.random() < 0.5 ? 'pile' : 'face');
  };

  const totalFlips = coinFlips.heads + coinFlips.tails;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Sub tabs */}
      <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold overflow-x-auto scrollbar-none">
        <button
          onClick={() => setSubTab('dice')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'dice' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Simulateur de Dés 🎲
        </button>
        <button
          onClick={() => setSubTab('coin')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'coin' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Pile ou Face 🪙
        </button>
        <button
          onClick={() => setSubTab('cards')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'cards' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Tirage de Cartes & Urne 🃏
        </button>
        <button
          onClick={() => setSubTab('events')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'events' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Événements & Bayes ∩/∪
        </button>
        <button
          onClick={() => setSubTab('counting')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'counting' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Dénombrement (nCr, nPr, n!)
        </button>
        <button
          onClick={() => setSubTab('binomial')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'binomial' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Loi Binomiale B(n, p)
        </button>
      </div>

      {/* 1. Dice Simulator */}
      {subTab === 'dice' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Dices className="w-5 h-5 text-sky-400" />
                  <span>Simulateur de Lancer de Dés</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Expérience aléatoire réelle vs loi uniforme théorique P(X=k) = 1/6</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300">Nombre de dés :</span>
                {[1, 2, 3, 4].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => { setDiceCount(cnt); setDiceRolls([]); }}
                    className={`w-8 h-8 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                      diceCount === cnt ? 'bg-sky-600 text-white' : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>

            {/* Roll Dice Action Button */}
            <div className="flex items-center justify-center py-4">
              <button
                onClick={rollDice}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-base flex items-center gap-2 shadow-lg shadow-sky-600/30 transition-transform active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Lancer le{diceCount > 1 ? 's' : ''} dé{diceCount > 1 ? 's' : ''}</span>
              </button>
            </div>

            {/* Display Dice */}
            {diceRolls.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3 py-2">
                  {diceRolls.map((d, i) => (
                    <div
                      key={i}
                      className="w-16 h-16 rounded-2xl bg-white text-slate-900 border-2 border-slate-300 flex items-center justify-center font-mono font-black text-3xl shadow-xl animate-in zoom-in-75 duration-150"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div className="text-center text-xs font-mono text-slate-400">
                  Somme obtenue : <strong className="text-white text-sm">{diceRolls.reduce((a, b) => a + b, 0)}</strong>
                </div>
              </div>
            )}
          </div>

          {/* History of rolls */}
          {diceHistory.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Derniers lancers effectués
              </h3>
              <div className="flex flex-wrap gap-2">
                {diceHistory.map((hist, i) => (
                  <div key={i} className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                    [{hist.join(', ')}] = {hist.reduce((a, b) => a + b, 0)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Coin Toss Simulator */}
      {subTab === 'coin' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Coins className="w-5 h-5 text-sky-400" />
                  <span>Simulateur de Pile ou Face (Loi de Bernoulli)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Probabilité théorique : P(Pile) = P(Face) = 50% (0.5)</p>
              </div>

              <button
                onClick={() => { setCoinFlips({ heads: 0, tails: 0 }); setLastCoin(null); }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser</span>
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-4 py-2">
              <button
                onClick={flipCoin}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                Lancer 1 pièce
              </button>
              <button
                onClick={flip100Coins}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm border border-slate-700 transition-transform active:scale-95 cursor-pointer"
              >
                + 100 lancers rapides
              </button>
            </div>

            {/* Last Coin Animation Display */}
            {lastCoin && (
              <div className="flex flex-col items-center justify-center py-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 border-4 border-amber-200 text-amber-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20 uppercase">
                  {lastCoin}
                </div>
              </div>
            )}

            {/* Stats Distribution */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Total Pile :</div>
                <div className="text-2xl font-mono font-bold text-amber-400">
                  {coinFlips.heads}{' '}
                  <span className="text-sm font-normal text-slate-500">
                    ({totalFlips > 0 ? ((coinFlips.heads / totalFlips) * 100).toFixed(1) : 0}%)
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Total Face :</div>
                <div className="text-2xl font-mono font-bold text-sky-400">
                  {coinFlips.tails}{' '}
                  <span className="text-sm font-normal text-slate-500">
                    ({totalFlips > 0 ? ((coinFlips.tails / totalFlips) * 100).toFixed(1) : 0}%)
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 text-center font-mono">
              Total des lancers effectués : <strong>{totalFlips}</strong> (Selon la loi des grands nombres, la fréquence observée converge vers 50%).
            </div>
          </div>
        </div>
      )}

      {/* 3. Dénombrement */}
      {subTab === 'counting' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-400" />
                <span>Dénombrement : Combinaisons & Permutations</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Calculs exacts de n!, nCr (sans ordre) et nPr (avec ordre)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Total d'éléments (n)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={combN}
                  onChange={(e) => setCombN(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre d'éléments choisis (r)</label>
                <input
                  type="number"
                  min="0"
                  max={combN}
                  value={combR}
                  onChange={(e) => setCombR(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-medium">Combinaisons C({combN}, {combR})</div>
              <div className="text-2xl font-mono font-bold text-sky-400 tabular-nums">
                {combVal.toLocaleString('fr-FR')}
              </div>
              <div className="text-[11px] text-slate-500">n! / (r! × (n - r)!) (Tirage sans ordre)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-medium">Arrangements A({combN}, {combR})</div>
              <div className="text-2xl font-mono font-bold text-emerald-400 tabular-nums">
                {permVal.toLocaleString('fr-FR')}
              </div>
              <div className="text-[11px] text-slate-500">n! / (n - r)! (Tirage avec ordre)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-medium">Factorielle {combN}!</div>
              <div className="text-2xl font-mono font-bold text-white tabular-nums">
                {factNVal < 1e12 ? factNVal.toLocaleString('fr-FR') : factNVal.toExponential(4)}
              </div>
              <div className="text-[11px] text-slate-500">Nombre de permutations de n</div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Binomial Distribution */}
      {subTab === 'binomial' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white">Loi Binomiale B(n, p)</h2>
              <p className="text-xs text-slate-400 mt-0.5">Nombre de succès k lors de n répétitions indépendantes</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre d'essais (n)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={binN}
                  onChange={(e) => setBinN(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Probabilité de succès (p)</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={binP}
                  onChange={(e) => setBinP(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre de succès visés (k)</label>
                <input
                  type="number"
                  min="0"
                  max={binN}
                  value={binK}
                  onChange={(e) => setBinK(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {binomError ? (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-sm">
              {binomError}
            </div>
          ) : binomResult && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400 font-medium">P(X = {binK})</div>
                <div className="text-2xl font-mono font-bold text-sky-400">
                  {(binomResult.probExact * 100).toFixed(4)} %
                </div>
                <div className="text-[11px] text-slate-500">Probabilité exacte</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400 font-medium">P(X ≤ {binK})</div>
                <div className="text-2xl font-mono font-bold text-emerald-400">
                  {(binomResult.probAtMost * 100).toFixed(4)} %
                </div>
                <div className="text-[11px] text-slate-500">Probabilité cumulée inférieure</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400 font-medium">Espérance mathématique E(X)</div>
                <div className="text-2xl font-mono font-bold text-white">
                  {binomResult.expectedValue.toFixed(2)}
                </div>
                <div className="text-[11px] text-slate-500">E = n × p (Variance V = {binomResult.variance.toFixed(2)})</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Tirage de Cartes & Modèle de l'Urne */}
      {subTab === 'cards' && (
        <div className="space-y-6">
          {/* Card Deck Simulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Shuffle className="w-5 h-5 text-sky-400" />
                  <span>Simulateur de Tirage de Cartes</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Expérience aléatoire équiprobable dans un jeu standard</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300">Jeu :</span>
                {[52, 32].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setDeckSize(s as 52 | 32); setDrawnCard(null); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      deckSize === s ? 'bg-sky-600 text-white' : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {s} cartes
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center py-2">
              <button
                onClick={drawRandomCard}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-sky-600/25 transition-transform active:scale-95 cursor-pointer"
              >
                <Shuffle className="w-4 h-4" />
                <span>Tirer une carte au hasard</span>
              </button>
            </div>

            {drawnCard && (
              <div className="flex flex-col items-center justify-center space-y-3 py-2 animate-in zoom-in-75 duration-150">
                <div className={`w-28 h-40 rounded-2xl bg-white border-2 border-slate-300 shadow-2xl p-3 flex flex-col justify-between select-none ${
                  drawnCard.color === 'red' ? 'text-rose-600' : 'text-slate-900'
                }`}>
                  <div className="font-mono font-bold text-lg leading-none">
                    {drawnCard.rank}
                    <div className="text-base">{drawnCard.symbol}</div>
                  </div>
                  <div className="text-4xl text-center font-bold">
                    {drawnCard.symbol}
                  </div>
                  <div className="font-mono font-bold text-lg leading-none text-right rotate-180">
                    {drawnCard.rank}
                    <div className="text-base">{drawnCard.symbol}</div>
                  </div>
                </div>

                <div className="text-center text-xs font-mono text-slate-300">
                  Carte tirée : <strong className="text-white text-sm">{drawnCard.rank} de {drawnCard.suit}</strong>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400">P(cette carte)</div>
                    <div className="text-xs font-mono font-bold text-sky-400">1/{deckSize} ({(100 / deckSize).toFixed(2)}%)</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400">P(enseigne {drawnCard.suit})</div>
                    <div className="text-xs font-mono font-bold text-indigo-400">1/4 (25.0%)</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400">P(couleur {drawnCard.color === 'red' ? 'rouge' : 'noire'})</div>
                    <div className="text-xs font-mono font-bold text-emerald-400">1/2 (50.0%)</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400">P(hauteur {drawnCard.rank})</div>
                    <div className="text-xs font-mono font-bold text-amber-400">4/{deckSize} ({(400 / deckSize).toFixed(2)}%)</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Urn Model */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">Modèle de l'Urne & Tirage avec Remise</h3>
              <p className="text-xs text-slate-400 mt-0.5">Composition de l'urne et probabilités exactes de tirage</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-rose-400 mb-1">Boules Rouges</label>
                <input
                  type="number"
                  min="0"
                  value={urnRed}
                  onChange={(e) => setUrnRed(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-sky-400 mb-1">Boules Bleues</label>
                <input
                  type="number"
                  min="0"
                  value={urnBlue}
                  onChange={(e) => setUrnBlue(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-emerald-400 mb-1">Boules Vertes</label>
                <input
                  type="number"
                  min="0"
                  value={urnGreen}
                  onChange={(e) => setUrnGreen(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-mono">
                Total dans l'urne : <strong>{urnRed + urnBlue + urnGreen} boules</strong>
              </span>
              <button
                onClick={drawFromUrn}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                Tirer 1 boule au hasard
              </button>
            </div>

            {lastUrnDraw && (
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
                <span className="text-xs text-slate-300">Boule obtenue :</span>
                <span className={`text-sm font-bold font-mono ${
                  lastUrnDraw === 'Rouge' ? 'text-rose-400' : lastUrnDraw === 'Bleue' ? 'text-sky-400' : 'text-emerald-400'
                }`}>
                  ● Boule {lastUrnDraw}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. Événements, Probabilités Complémentaires & Conditionnelles (Bayes) */}
      {subTab === 'events' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Split className="w-5 h-5 text-sky-400" />
                <span>Probabilités Simples, Complémentaires & Conditionnelles (Bayes)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Calcul formel de P(A), P(B), P(Ā), P(A ∪ B), P(A ∩ B) et de la probabilité conditionnelle P(A|B)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">P(A) — Probabilité de l'événement A</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={probA}
                  onChange={(e) => setProbA(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">P(B) — Probabilité de l'événement B</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="1"
                  value={probB}
                  onChange={(e) => setProbB(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isIndependent}
                  onChange={(e) => setIsIndependent(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-0 bg-slate-900 border-slate-700 cursor-pointer"
                />
                <span className="text-xs text-slate-300 font-medium">
                  Événements A et B indépendants (P(A ∩ B) = P(A) × P(B))
                </span>
              </label>

              {!isIndependent && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">P(A ∩ B) :</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max={Math.min(probA, probB)}
                    value={probAandB}
                    onChange={(e) => setProbAandB(parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs text-center"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Événements Complémentaires</div>
              <div className="text-xs font-mono text-slate-300 space-y-1.5">
                <div>
                  P(Ā) = 1 − P(A) = <strong className="text-sky-400">{(probNotA * 100).toFixed(1)}%</strong>
                </div>
                <div>
                  P(B̄) = 1 − P(B) = <strong className="text-indigo-400">{(probNotB * 100).toFixed(1)}%</strong>
                </div>
              </div>
              <div className="text-[11px] text-slate-500">Probabilité du contraire</div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Intersection & Union</div>
              <div className="text-xs font-mono text-slate-300 space-y-1.5">
                <div>
                  P(A ∩ B) = <strong className="text-amber-400">{(effectiveProbAandB * 100).toFixed(2)}%</strong>
                </div>
                <div>
                  P(A ∪ B) = <strong className="text-emerald-400">{(probAorB * 100).toFixed(2)}%</strong>
                </div>
              </div>
              <div className="text-[11px] text-slate-500">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</div>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Probabilités Conditionnelles</div>
              <div className="text-xs font-mono text-slate-300 space-y-1.5">
                <div>
                  P(A | B) = <strong className="text-sky-400">{(probAgivenB * 100).toFixed(2)}%</strong>
                </div>
                <div>
                  P(B | A) = <strong className="text-emerald-400">{(probBgivenA * 100).toFixed(2)}%</strong>
                </div>
              </div>
              <div className="text-[11px] text-slate-500">Formule de Bayes : P(A|B) = P(A ∩ B) / P(B)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
