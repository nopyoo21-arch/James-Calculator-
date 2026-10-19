import React, { useState } from 'react';
import {
  calculateDateDifference,
  calculateAge,
  addDurations,
  isLeapYear,
} from '../utils/dateTime';
import { Calendar, Clock, Cake, Hourglass, PlusCircle } from 'lucide-react';

export const DateTimeView: React.FC = () => {
  const [subTab, setSubTab] = useState<'diff' | 'age' | 'duration' | 'shift'>('diff');

  // Date diff state
  const [startDate, setStartDate] = useState<string>('2026-01-01');
  const [endDate, setEndDate] = useState<string>('2026-10-18');

  // Age state
  const [birthDate, setBirthDate] = useState<string>('1998-05-15');

  // Duration arithmetic state
  const [d1H, setD1H] = useState<number>(3);
  const [d1M, setD1M] = useState<number>(45);
  const [d1S, setD1S] = useState<number>(30);
  const [durOp, setDurOp] = useState<'add' | 'subtract'>('add');
  const [d2H, setD2H] = useState<number>(1);
  const [d2M, setD2M] = useState<number>(25);
  const [d2S, setD2S] = useState<number>(45);

  // Date Shift state (Add/Subtract days)
  const [baseDate, setBaseDate] = useState<string>('2026-10-18');
  const [shiftDays, setShiftDays] = useState<number>(90);
  const [shiftOp, setShiftOp] = useState<'add' | 'subtract'>('add');

  // Computations
  const dateDiffResult = calculateDateDifference(new Date(startDate), new Date(endDate));
  const ageResult = calculateAge(new Date(birthDate));
  const durResult = addDurations(
    { hours: d1H, minutes: d1M, seconds: d1S },
    { hours: d2H, minutes: d2M, seconds: d2S },
    durOp
  );

  // Shift result
  const shiftedDate = new Date(baseDate);
  if (!isNaN(shiftedDate.getTime())) {
    const delta = shiftOp === 'add' ? shiftDays : -shiftDays;
    shiftedDate.setDate(shiftedDate.getDate() + delta);
  }
  const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const shiftedDayName = daysOfWeek[shiftedDate.getDay()];
  const shiftedFormatted = shiftedDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Sub tabs */}
      <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold overflow-x-auto scrollbar-none">
        <button
          onClick={() => setSubTab('diff')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'diff' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Différence entre 2 dates
        </button>
        <button
          onClick={() => setSubTab('shift')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'shift' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Ajouter / Soustraire des jours
        </button>
        <button
          onClick={() => setSubTab('age')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'age' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Calculateur d'Âge Précis
        </button>
        <button
          onClick={() => setSubTab('duration')}
          className={`flex-1 py-2 px-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            subTab === 'duration' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
        >
          Calculs sur les Durées (H:M:S)
        </button>
      </div>

      {/* 1. Date Diff */}
      {subTab === 'diff' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-sky-400" />
                <span>Intervalle entre deux dates</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Calcul des jours, semaines, mois et années avec prise en compte des années bissextiles</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Date de début</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Date de fin</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Total en jours</div>
              <div className="text-2xl font-mono font-bold text-sky-400 mt-1 tabular-nums">
                {dateDiffResult.totalDays} jours
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Semaines</div>
              <div className="text-2xl font-mono font-bold text-emerald-400 mt-1 tabular-nums">
                {dateDiffResult.weeks} sem + {dateDiffResult.remainingDays} j
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Années & Mois</div>
              <div className="text-xl font-mono font-bold text-white mt-1 tabular-nums">
                {dateDiffResult.years} an{dateDiffResult.years > 1 ? 's' : ''}, {dateDiffResult.months} mois
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Bissextile dans l'intervalle</div>
              <div className="text-lg font-mono font-semibold text-amber-400 mt-1">
                {dateDiffResult.isLeapYearBetween ? 'Oui (Année bissextile)' : 'Non'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Date Shift */}
      {subTab === 'shift' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-sky-400" />
                <span>Ajouter ou Soustraire des Jours à une Date</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Calcul précis d'échéances, de délais ou de dates prévisionnelles</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Date de départ</label>
                <input
                  type="date"
                  value={baseDate}
                  onChange={(e) => setBaseDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Opération</label>
                <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setShiftOp('add')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                      shiftOp === 'add' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    + Ajouter
                  </button>
                  <button
                    onClick={() => setShiftOp('subtract')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                      shiftOp === 'subtract' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    − Soustraire
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre de jours</label>
                <input
                  type="number"
                  min="1"
                  value={shiftDays}
                  onChange={(e) => setShiftDays(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-tr from-sky-950/60 to-indigo-950/60 border border-sky-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-medium text-slate-400">Date d'échéance calculée</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
                {shiftedDayName} {shiftedFormatted}
              </div>
            </div>
            <div className="text-xs font-mono text-sky-400 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
              {baseDate} {shiftOp === 'add' ? '+' : '−'} {shiftDays} jours
            </div>
          </div>
        </div>
      )}

      {/* 3. Age Calculator */}
      {subTab === 'age' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Cake className="w-5 h-5 text-sky-400" />
                <span>Calculateur d'Âge et Éphéméride</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Âge exact en années, mois, jours et prochain anniversaire</p>
            </div>

            <div className="max-w-xs">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Date de naissance</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-5 rounded-2xl bg-gradient-to-tr from-sky-950/60 to-indigo-950/60 border border-sky-800/40">
              <div className="text-xs font-medium text-slate-400">Âge exact</div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-sky-400 mt-1">
                {ageResult.years} ans
              </div>
              <div className="text-xs text-slate-300 mt-1">
                {ageResult.months} mois et {ageResult.days} jours
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Prochain anniversaire</div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-400 mt-1">
                Dans {ageResult.daysUntilNextBirthday} jours
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Né(e) un {ageResult.dayOfWeekBorn}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-medium text-slate-400">Temps total vécu</div>
              <div className="text-xl font-mono font-bold text-white mt-1 tabular-nums">
                {ageResult.totalDays.toLocaleString('fr-FR')} jours
              </div>
              <div className="text-xs text-slate-400 mt-1 font-mono">
                ≈ {ageResult.totalHours.toLocaleString('fr-FR')} heures
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Duration Arithmetic */}
      {subTab === 'duration' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Hourglass className="w-5 h-5 text-sky-400" />
                <span>Addition & Soustraction de Durées</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Calcul précis des temps de travail, temps de vol ou durées d'activités</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 py-4 bg-slate-950/60 rounded-xl border border-slate-800">
              {/* Duration 1 */}
              <div className="flex items-center gap-1 font-mono text-sm">
                <input
                  type="number"
                  value={d1H}
                  onChange={(e) => setD1H(parseInt(e.target.value) || 0)}
                  className="w-14 px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-center"
                />
                <span className="text-slate-400">h</span>
                <input
                  type="number"
                  value={d1M}
                  onChange={(e) => setD1M(parseInt(e.target.value) || 0)}
                  className="w-14 px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-center"
                />
                <span className="text-slate-400">m</span>
                <input
                  type="number"
                  value={d1S}
                  onChange={(e) => setD1S(parseInt(e.target.value) || 0)}
                  className="w-14 px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-center"
                />
                <span className="text-slate-400">s</span>
              </div>

              {/* Op */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setDurOp('add')}
                  className={`w-9 h-9 rounded-lg font-bold text-base transition-colors cursor-pointer ${
                    durOp === 'add' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  +
                </button>
                <button
                  onClick={() => setDurOp('subtract')}
                  className={`w-9 h-9 rounded-lg font-bold text-base transition-colors cursor-pointer ${
                    durOp === 'subtract' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  −
                </button>
              </div>

              {/* Duration 2 */}
              <div className="flex items-center gap-1 font-mono text-sm">
                <input
                  type="number"
                  value={d2H}
                  onChange={(e) => setD2H(parseInt(e.target.value) || 0)}
                  className="w-14 px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-center"
                />
                <span className="text-slate-400">h</span>
                <input
                  type="number"
                  value={d2M}
                  onChange={(e) => setD2M(parseInt(e.target.value) || 0)}
                  className="w-14 px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-center"
                />
                <span className="text-slate-400">m</span>
                <input
                  type="number"
                  value={d2S}
                  onChange={(e) => setD2S(parseInt(e.target.value) || 0)}
                  className="w-14 px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-center"
                />
                <span className="text-slate-400">s</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Durée totale calculée</div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-sky-400 mt-1">
                {durResult.hours}h {durResult.minutes}min {durResult.seconds}s
              </div>
            </div>
            <div className="text-xs font-mono text-slate-400 text-right">
              Équivalent : {durResult.totalSeconds.toLocaleString('fr-FR')} secondes
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
