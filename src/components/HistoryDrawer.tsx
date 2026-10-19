import React, { useState } from 'react';
import { CalculationHistoryItem } from '../types/calculator';
import { X, Search, Trash2, Copy, Check, CornerDownLeft, Download, FileText } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: CalculationHistoryItem[];
  onReuseCalculation: (item: CalculationHistoryItem) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onReuseCalculation,
  onDeleteHistoryItem,
  onClearHistory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  const filteredHistory = history.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.expression.toLowerCase().includes(q) ||
      item.result.toLowerCase().includes(q)
    );
  });

  const handleCopy = (res: string, id: string) => {
    navigator.clipboard.writeText(res);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleExportText = () => {
    if (history.length === 0) return;
    const content = [
      '=====================================================',
      '       JAMES CALCULATOR PRO - HISTORIQUE DES CALCULS',
      `       Généré le ${new Date().toLocaleString('fr-FR')}`,
      '=====================================================\n',
      ...history.map(
        (h, i) =>
          `[${i + 1}] ${new Date(h.timestamp).toLocaleString('fr-FR')} (${h.mode})\n    ${h.expression} = ${h.result}\n`
      ),
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historique_james_calculator_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAll = () => {
    if (history.length === 0) return;
    const text = history
      .map((h) => `${h.expression} = ${h.result}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const formatTimestamp = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs select-none">
      <div className="w-full max-w-md h-full bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Historique des calculs</h2>
            <p className="text-xs text-slate-400">{history.length} opération(s) enregistrée(s)</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fermer l'historique"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-slate-800/80">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Rechercher une expression ou un résultat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredHistory.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-center text-slate-500 text-xs">
              {searchQuery ? 'Aucun résultat correspondant' : 'Historique vide. Vos prochains calculs apparaîtront ici.'}
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-2 group"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{formatTimestamp(item.timestamp)}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onDeleteHistoryItem(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-400 rounded transition-colors"
                      title="Supprimer cette ligne"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="font-mono text-xs text-slate-300 break-all">
                  {item.expression}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                  <span className="font-mono text-base font-bold text-sky-400 tabular-nums">
                    = {item.result}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(item.result, item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Copier le résultat"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => {
                        onReuseCalculation(item);
                        onClose();
                      }}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
                      title="Reprendre cette expression dans la calculatrice"
                    >
                      <CornerDownLeft className="w-3.5 h-3.5" />
                      <span>Reprendre</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Actions */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-2">
            {/* Export and Copy All actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportText}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                title="Télécharger l'historique au format fichier texte .txt"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>Exporter (.txt)</span>
              </button>

              <button
                onClick={handleCopyAll}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                title="Copier tout l'historique dans le presse-papiers"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Tout copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier tout</span>
                  </>
                )}
              </button>
            </div>

            {confirmClear ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onClearHistory();
                    setConfirmClear(false);
                  }}
                  className="flex-1 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
                >
                  Confirmer l'effacement
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  Annuler
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="w-full py-2 text-xs font-semibold rounded-xl bg-slate-800/80 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700/60 hover:border-rose-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Effacer tout l'historique</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
