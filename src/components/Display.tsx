import React, { useState } from 'react';
import { Copy, Check, Delete } from 'lucide-react';
import { AngleMode } from '../types/calculator';

interface DisplayProps {
  expression: string;
  result: string;
  previewResult?: string;
  error?: string;
  angleMode: AngleMode;
  hasMemory: boolean;
  onBackspace: () => void;
  onClear: () => void;
  onCopyResult: (text: string) => void;
}

export const Display: React.FC<DisplayProps> = ({
  expression,
  result,
  previewResult,
  error,
  angleMode,
  hasMemory,
  onBackspace,
  onClear,
  onCopyResult,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = error ? expression : result || previewResult || expression || '0';
    navigator.clipboard.writeText(textToCopy);
    onCopyResult(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative w-full rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 sm:p-5 flex flex-col justify-between shadow-inner transition-colors">
      {/* Top Status & Indicators Row */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-slate-800/80 text-[10px] font-semibold text-sky-400">
            {angleMode}
          </span>
          {hasMemory && (
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
              M
            </span>
          )}
        </div>

        {/* Action icons: Copy, Backspace */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Copier le résultat"
            aria-label="Copier"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={onBackspace}
            className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Effacer le dernier caractère"
            aria-label="Effacer le dernier caractère"
          >
            <Delete className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expression Area (multi-line or scrollable) */}
      <div className="w-full text-right overflow-x-auto scrollbar-none py-1">
        <div className="text-sm sm:text-base font-mono text-slate-400 tracking-wide whitespace-nowrap min-h-[24px]">
          {expression || ' '}
        </div>
      </div>

      {/* Main Result & Error Area */}
      <div className="w-full text-right mt-1">
        {error ? (
          <div className="text-sm sm:text-base font-semibold text-rose-400 font-sans tracking-tight break-words animate-in fade-in duration-150">
            {error}
          </div>
        ) : (
          <div className="flex flex-col items-end">
            <div className="text-2xl sm:text-4xl lg:text-5xl font-mono font-bold text-white tracking-tight tabular-nums select-all break-all overflow-x-auto scrollbar-none">
              {result || (previewResult ? previewResult : '0')}
            </div>
            {/* Real-time live calculation preview indicator */}
            {!result && previewResult && expression && previewResult !== expression && (
              <div className="text-xs font-mono text-sky-400/80 mt-0.5">
                = {previewResult}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
