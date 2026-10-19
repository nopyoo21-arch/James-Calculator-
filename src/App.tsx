/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  CalculatorMode,
  AngleMode,
  AppTheme,
  CalculationHistoryItem,
  AppSettings,
} from './types/calculator';
import { evaluateExpression, formatNumber } from './utils/mathEngine';
import { playKeySound, triggerHaptic } from './utils/soundHaptics';

// Components
import { Header } from './components/Header';
import { Display } from './components/Display';
import { KeypadStandard } from './components/KeypadStandard';
import { KeypadScientific } from './components/KeypadScientific';
import { GraphView } from './components/GraphView';
import { ProgrammerView } from './components/ProgrammerView';
import { MatricesView } from './components/MatricesView';
import { AlgebraView } from './components/AlgebraView';
import { FractionsView } from './components/FractionsView';
import { PercentagesView } from './components/PercentagesView';
import { FinanceView } from './components/FinanceView';
import { GeometryView } from './components/GeometryView';
import { StatisticsView } from './components/StatisticsView';
import { ProbabilitiesView } from './components/ProbabilitiesView';
import { ScienceToolsView } from './components/ScienceToolsView';
import { ConverterView } from './components/ConverterView';
import { DateTimeView } from './components/DateTimeView';
import { LearningView } from './components/LearningView';
import { HistoryDrawer } from './components/HistoryDrawer';
import { SettingsModal } from './components/SettingsModal';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  language: 'fr',
  angleMode: 'DEG',
  decimals: -1,
  roundingMode: 'round',
  soundEnabled: true,
  vibrationEnabled: true,
  defaultMode: 'standard',
  thousandsSeparator: true,
};

export default function App() {
  // Settings State
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('james_calc_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Mode and View State
  const [mode, setMode] = useState<CalculatorMode>(settings.defaultMode);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Calculator Core State
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [previewResult, setPreviewResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [memory, setMemory] = useState<number | null>(() => {
    try {
      const m = localStorage.getItem('james_calc_memory');
      return m ? parseFloat(m) : null;
    } catch {
      return null;
    }
  });

  // History State
  const [history, setHistory] = useState<CalculationHistoryItem[]>(() => {
    try {
      const h = localStorage.getItem('james_calc_history');
      return h ? JSON.parse(h) : [];
    } catch {
      return [];
    }
  });

  // Toast Notification
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  // Sync settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('james_calc_settings', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  // Sync memory to localStorage
  useEffect(() => {
    try {
      if (memory !== null) {
        localStorage.setItem('james_calc_memory', memory.toString());
      } else {
        localStorage.removeItem('james_calc_memory');
      }
    } catch {}
  }, [memory]);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('james_calc_history', JSON.stringify(history));
    } catch {}
  }, [history]);

  // Calculate live preview as user types
  useEffect(() => {
    if (!expression || expression.trim() === '') {
      setPreviewResult('');
      return;
    }
    // Attempt evaluation silently for live preview
    const evalRes = evaluateExpression(expression, settings.angleMode);
    if (evalRes.success && evalRes.result !== undefined) {
      setPreviewResult(formatNumber(evalRes.result, settings.decimals, settings.roundingMode));
    } else {
      setPreviewResult('');
    }
  }, [expression, settings.angleMode, settings.decimals, settings.roundingMode]);

  // Handle Input
  const handleInput = useCallback(
    (char: string) => {
      playKeySound('num', settings.soundEnabled);
      triggerHaptic('light', settings.vibrationEnabled);

      if (error) {
        setError('');
      }

      // If user starts typing a number right after a result, start a fresh expression
      if (result && !['+', '−', '×', '÷', '^', '%'].includes(char)) {
        setExpression(char);
        setResult('');
        return;
      }

      // If user types an operator right after a result, chain it
      if (result && ['+', '−', '×', '÷', '^', '%'].includes(char)) {
        setExpression(result + char);
        setResult('');
        return;
      }

      setExpression((prev) => prev + char);
    },
    [error, result, settings.soundEnabled, settings.vibrationEnabled]
  );

  // Clear All (AC)
  const handleClear = useCallback(() => {
    playKeySound('clear', settings.soundEnabled);
    triggerHaptic('medium', settings.vibrationEnabled);
    setExpression('');
    setResult('');
    setPreviewResult('');
    setError('');
  }, [settings.soundEnabled, settings.vibrationEnabled]);

  // Backspace (DEL)
  const handleBackspace = useCallback(() => {
    playKeySound('num', settings.soundEnabled);
    triggerHaptic('light', settings.vibrationEnabled);

    if (error) {
      setError('');
      return;
    }
    if (result) {
      setResult('');
      return;
    }
    setExpression((prev) => (prev.length > 0 ? prev.slice(0, -1) : ''));
  }, [error, result, settings.soundEnabled, settings.vibrationEnabled]);

  // Main Calculation Execution (=)
  const handleCalculate = useCallback(() => {
    if (!expression || expression.trim() === '') return;

    const evalRes = evaluateExpression(expression, settings.angleMode);

    if (evalRes.success && evalRes.result !== undefined) {
      playKeySound('equals', settings.soundEnabled);
      triggerHaptic('medium', settings.vibrationEnabled);

      const formatted = formatNumber(evalRes.result, settings.decimals, settings.roundingMode);
      setResult(formatted);
      setError('');

      // Add to history
      const historyItem: CalculationHistoryItem = {
        id: `calc-${Date.now()}`,
        expression,
        result: formatted,
        timestamp: Date.now(),
        mode,
      };
      setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
    } else {
      playKeySound('error', settings.soundEnabled);
      triggerHaptic('heavy', settings.vibrationEnabled);
      setError(evalRes.error || 'Erreur de syntaxe');
      setResult('');
    }
  }, [expression, settings.angleMode, settings.decimals, settings.roundingMode, settings.soundEnabled, settings.vibrationEnabled, mode]);

  // Negate sign (±)
  const handleNegate = useCallback(() => {
    playKeySound('op', settings.soundEnabled);
    triggerHaptic('light', settings.vibrationEnabled);

    if (result) {
      const num = parseFloat(result.replace(/\s/g, '').replace(',', '.'));
      if (!isNaN(num)) {
        const negated = (-num).toString().replace('.', ',');
        setExpression(negated);
        setResult('');
        return;
      }
    }

    if (!expression) {
      setExpression('−');
      return;
    }

    if (expression.startsWith('−')) {
      setExpression(expression.slice(1));
    } else {
      setExpression('−(' + expression + ')');
    }
  }, [expression, result, settings.soundEnabled, settings.vibrationEnabled]);

  // Percent (%)
  const handlePercent = useCallback(() => {
    handleInput('%');
  }, [handleInput]);

  // Square (x²)
  const handleSquare = useCallback(() => {
    if (result) {
      setExpression('(' + result + ')^2');
      setResult('');
    } else if (expression) {
      setExpression('(' + expression + ')^2');
    }
  }, [expression, result]);

  // Cube (x³)
  const handleCube = useCallback(() => {
    if (result) {
      setExpression('(' + result + ')^3');
      setResult('');
    } else if (expression) {
      setExpression('(' + expression + ')^3');
    }
  }, [expression, result]);

  // Power (x^y)
  const handlePower = useCallback(() => {
    handleInput('^');
  }, [handleInput]);

  // Square root (√x)
  const handleSquareRoot = useCallback(() => {
    if (result) {
      setExpression('sqrt(' + result + ')');
      setResult('');
    } else {
      handleInput('sqrt(');
    }
  }, [handleInput, result]);

  // Cube root (∛x)
  const handleCubeRoot = useCallback(() => {
    if (result) {
      setExpression('cbrt(' + result + ')');
      setResult('');
    } else {
      handleInput('cbrt(');
    }
  }, [handleInput, result]);

  // Nth Root (ⁿ√x)
  const handleNthRoot = useCallback(() => {
    handleInput('nroot(');
  }, [handleInput]);

  // Invert (1/x)
  const handleInvert = useCallback(() => {
    if (result) {
      setExpression('1/(' + result + ')');
      setResult('');
    } else if (expression) {
      setExpression('1/(' + expression + ')');
    }
  }, [expression, result]);

  // Factorial (n!)
  const handleFactorial = useCallback(() => {
    handleInput('!');
  }, [handleInput]);

  // Absolute value (|x|)
  const handleAbsolute = useCallback(() => {
    handleInput('abs(');
  }, [handleInput]);

  // Scientific EXP (×10^)
  const handleExpNotation = useCallback(() => {
    handleInput('e');
  }, [handleInput]);

  // Memory Operations
  const handleMemoryClear = useCallback(() => {
    setMemory(null);
    showToast('Mémoire effacée (MC)');
  }, []);

  const handleMemoryRecall = useCallback(() => {
    if (memory !== null) {
      const formatted = formatNumber(memory, settings.decimals, settings.roundingMode);
      handleInput(formatted);
      showToast(`Rappel mémoire : ${formatted}`);
    }
  }, [handleInput, memory, settings.decimals, settings.roundingMode]);

  const handleMemoryAdd = useCallback(() => {
    const targetVal = result || previewResult;
    const num = parseFloat((targetVal || '0').replace(/\s/g, '').replace(',', '.'));
    if (!isNaN(num)) {
      setMemory((prev) => (prev || 0) + num);
      showToast(`Ajouté à la mémoire : +${num}`);
    }
  }, [previewResult, result]);

  const handleMemorySubtract = useCallback(() => {
    const targetVal = result || previewResult;
    const num = parseFloat((targetVal || '0').replace(/\s/g, '').replace(',', '.'));
    if (!isNaN(num)) {
      setMemory((prev) => (prev || 0) - num);
      showToast(`Soustrait de la mémoire : -${num}`);
    }
  }, [previewResult, result]);

  const handleMemoryStore = useCallback(() => {
    const targetVal = result || previewResult || expression;
    const evalRes = evaluateExpression(targetVal || '0', settings.angleMode);
    if (evalRes.success && evalRes.result !== undefined) {
      setMemory(evalRes.result);
      showToast(`Valeur enregistrée en mémoire : ${evalRes.result}`);
    }
  }, [expression, previewResult, result, settings.angleMode]);

  // Toggle Angle Mode
  const handleToggleAngleMode = useCallback(() => {
    const nextMode: AngleMode = settings.angleMode === 'DEG' ? 'RAD' : 'DEG';
    setSettings((prev) => ({ ...prev, angleMode: nextMode }));
    showToast(`Mode d'angle : ${nextMode === 'DEG' ? 'Degrés (DEG)' : 'Radians (RAD)'}`);
  }, [settings.angleMode]);

  // Toggle Theme
  const handleToggleTheme = useCallback(() => {
    const nextTheme: AppTheme = settings.theme === 'light' ? 'dark' : 'light';
    setSettings((prev) => ({ ...prev, theme: nextTheme }));
  }, [settings.theme]);

  // Physical Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing inside an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        handleInput(e.key);
      } else if (e.key === '.' || e.key === ',') {
        handleInput(',');
      } else if (e.key === '+') {
        handleInput('+');
      } else if (e.key === '-') {
        handleInput('−');
      } else if (e.key === '*' || e.key === 'x') {
        handleInput('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleInput('÷');
      } else if (e.key === '(' || e.key === ')') {
        handleInput(e.key);
      } else if (e.key === '^') {
        handleInput('^');
      } else if (e.key === '%') {
        handlePercent();
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleCalculate();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBackspace, handleCalculate, handleClear, handleInput, handlePercent]);

  // Reuse calculation from history
  const handleReuseHistory = (item: CalculationHistoryItem) => {
    setExpression(item.expression);
    setResult(item.result);
    setError('');
    setMode('standard');
    showToast('Calcul rechargé');
  };

  // Delete history item
  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((i) => i.id !== id));
  };

  // Clear all history
  const handleClearHistory = () => {
    setHistory([]);
    showToast('Historique effacé');
  };

  // Reset all local data
  const handleResetAllData = () => {
    setSettings(DEFAULT_SETTINGS);
    setHistory([]);
    setMemory(null);
    setExpression('');
    setResult('');
    setError('');
    localStorage.clear();
    showToast('Application réinitialisée');
  };

  // Theme container classes
  const themeClasses = useMemo(() => {
    if (settings.theme === 'light') {
      return 'bg-slate-100 text-slate-900';
    }
    if (settings.theme === 'amoled') {
      return 'bg-black text-slate-100';
    }
    return 'bg-slate-950 text-slate-100';
  }, [settings.theme]);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${themeClasses}`}>
      {/* Top Header with branding, modes and settings */}
      <Header
        currentMode={mode}
        onSelectMode={setMode}
        angleMode={settings.angleMode}
        onToggleAngleMode={handleToggleAngleMode}
        historyCount={history.length}
        onOpenHistory={() => setHistoryOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        soundEnabled={settings.soundEnabled}
        onToggleSound={() => setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
        theme={settings.theme}
        onToggleTheme={handleToggleTheme}
        hasMemory={memory !== null}
        language={settings.language || 'fr'}
        onSelectLanguage={(lang) => setSettings((prev) => ({ ...prev, language: lang }))}
      />

      {/* Main Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-start">
        {/* Standard and Scientific Calculator Modes */}
        {(mode === 'standard' || mode === 'scientific') && (
          <div className="w-full max-w-xl lg:max-w-4xl space-y-4 animate-in fade-in duration-150">
            {/* Multi-line Display */}
            <Display
              expression={expression}
              result={result}
              previewResult={previewResult}
              error={error}
              angleMode={settings.angleMode}
              hasMemory={memory !== null}
              onBackspace={handleBackspace}
              onClear={handleClear}
              onCopyResult={() => showToast('Résultat copié dans le presse-papier')}
            />

            {/* Keypad Layout:
                - On Phone: standard or scientific based on current mode
                - On Tablet / Desktop: if in scientific mode, arrange scientific and standard keys in high-productivity dual layout!
            */}
            {mode === 'standard' ? (
              <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-xl">
                <KeypadStandard
                  onInput={handleInput}
                  onClear={handleClear}
                  onBackspace={handleBackspace}
                  onCalculate={handleCalculate}
                  onNegate={handleNegate}
                  onPercent={handlePercent}
                  onSquare={handleSquare}
                  onSquareRoot={handleSquareRoot}
                  onInvert={handleInvert}
                  onMemoryClear={handleMemoryClear}
                  onMemoryRecall={handleMemoryRecall}
                  onMemoryAdd={handleMemoryAdd}
                  onMemorySubtract={handleMemorySubtract}
                  onMemoryStore={handleMemoryStore}
                  hasMemory={memory !== null}
                />
              </div>
            ) : (
              /* Scientific Mode: Responsive dual layout on tablet/desktop */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-xl">
                <div className="lg:col-span-5 order-2 lg:order-1 border-t lg:border-t-0 lg:border-r border-slate-800 pt-4 lg:pt-0 lg:pr-4">
                  <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-2">
                    Fonctions Scientifiques
                  </div>
                  <KeypadScientific
                    onInput={handleInput}
                    angleMode={settings.angleMode}
                    onToggleAngleMode={handleToggleAngleMode}
                    onFactorial={handleFactorial}
                    onSquare={handleSquare}
                    onCube={handleCube}
                    onPower={handlePower}
                    onSquareRoot={handleSquareRoot}
                    onCubeRoot={handleCubeRoot}
                    onNthRoot={handleNthRoot}
                    onAbsolute={handleAbsolute}
                    onExpNotation={handleExpNotation}
                  />
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Pavé Numérique & Opérateurs
                  </div>
                  <KeypadStandard
                    onInput={handleInput}
                    onClear={handleClear}
                    onBackspace={handleBackspace}
                    onCalculate={handleCalculate}
                    onNegate={handleNegate}
                    onPercent={handlePercent}
                    onSquare={handleSquare}
                    onSquareRoot={handleSquareRoot}
                    onInvert={handleInvert}
                    onMemoryClear={handleMemoryClear}
                    onMemoryRecall={handleMemoryRecall}
                    onMemoryAdd={handleMemoryAdd}
                    onMemorySubtract={handleMemorySubtract}
                    onMemoryStore={handleMemoryStore}
                    hasMemory={memory !== null}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Specialized Domain Views */}
        {mode === 'graph' && <GraphView />}
        {mode === 'programmer' && <ProgrammerView />}
        {mode === 'matrices' && <MatricesView />}
        {mode === 'algebra' && <AlgebraView />}
        {mode === 'fractions' && <FractionsView />}
        {mode === 'percentages' && <PercentagesView />}
        {mode === 'finance' && <FinanceView />}
        {mode === 'geometry' && <GeometryView />}
        {mode === 'statistics' && <StatisticsView />}
        {mode === 'probabilities' && <ProbabilitiesView />}
        {mode === 'science_tools' && <ScienceToolsView />}
        {mode === 'converter' && <ConverterView />}
        {mode === 'date_time' && <DateTimeView />}
        {mode === 'learning' && <LearningView />}
      </main>

      {/* Footer Branding & French Signature */}
      <footer className="border-t border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500 select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-slate-300 font-bold">JAMES CALCULATOR PRO</span>
            <span aria-hidden="true">·</span>
            <span>Le calcul devient simple, rapide et intelligent.</span>
          </div>
          <div className="text-slate-400 font-semibold">
            Créé par James
          </div>
        </div>
      </footer>

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onReuseCalculation={handleReuseHistory}
        onDeleteHistoryItem={handleDeleteHistoryItem}
        onClearHistory={handleClearHistory}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newSt) => setSettings((prev) => ({ ...prev, ...newSt }))}
        onResetAllData={handleResetAllData}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white text-xs font-semibold rounded-xl border border-slate-700 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150">
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
