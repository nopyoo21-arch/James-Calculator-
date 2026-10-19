import React, { useState } from 'react';
import { CalculatorMode, AngleMode, AppTheme, AppLanguage } from '../types/calculator';
import { getTranslation } from '../utils/i18n';
import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  History,
  Settings,
  Download,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Smartphone,
  Menu,
  X,
  BookOpen,
  HelpCircle,
  Check,
  Globe,
} from 'lucide-react';

import { APKDownloadModal } from './APKDownloadModal';

interface HeaderProps {
  currentMode: CalculatorMode;
  onSelectMode: (mode: CalculatorMode) => void;
  angleMode: AngleMode;
  onToggleAngleMode: () => void;
  historyCount: number;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  theme: AppTheme;
  onToggleTheme: () => void;
  hasMemory: boolean;
  language?: AppLanguage;
  onSelectLanguage?: (lang: AppLanguage) => void;
}

const MODES: { id: CalculatorMode; label: string; icon: string }[] = [
  { id: 'standard', label: 'Standard', icon: '🔢' },
  { id: 'scientific', label: 'Scientifique', icon: '📐' },
  { id: 'graph', label: 'Graphique 2D', icon: '📈' },
  { id: 'programmer', label: 'Programmeur', icon: '💻' },
  { id: 'matrices', label: 'Matrices', icon: '🔲' },
  { id: 'algebra', label: 'Algèbre', icon: '𝑥²' },
  { id: 'fractions', label: 'Fractions', icon: '½' },
  { id: 'percentages', label: 'Pourcentages', icon: '%' },
  { id: 'finance', label: 'Finance & Budget', icon: '💶' },
  { id: 'geometry', label: 'Géométrie', icon: '🔺' },
  { id: 'statistics', label: 'Statistiques', icon: '📊' },
  { id: 'probabilities', label: 'Probabilités', icon: '🎲' },
  { id: 'science_tools', label: 'Physique & Chimie', icon: '🔬' },
  { id: 'converter', label: 'Conversions & Devises', icon: '🔄' },
  { id: 'date_time', label: 'Dates & Heures', icon: '📅' },
  { id: 'learning', label: 'Mode Étudiant', icon: '🎓' },
];

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  angleMode,
  onToggleAngleMode,
  historyCount,
  onOpenHistory,
  onOpenSettings,
  soundEnabled,
  onToggleSound,
  theme,
  onToggleTheme,
  hasMemory,
  language = 'fr',
  onSelectLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [showAPKModal, setShowAPKModal] = useState(false);
  const [dismissedDownloadBtn, setDismissedDownloadBtn] = useState(() => {
    try {
      return localStorage.getItem('hide_zip_apk_btn') === 'true';
    } catch {
      return false;
    }
  });
  const t = getTranslation(language);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 select-none">
      {/* Top Branding & Main Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectMode('standard')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
            title="Accueil James Calculator"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <span className="font-mono font-black text-white text-base tracking-tighter">JC</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-sky-400 transition-colors">
                  JAMES CALCULATOR
                </span>
                <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal truncate hidden sm:block">
                {t.common.tagline}
              </p>
            </div>
          </button>

          {/* Offline Ready Badge */}
          <span
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium"
            title="Application 100% autonome et fonctionnelle hors ligne"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{t.common.offlineBadge}</span>
          </span>
        </div>

        {/* Quick Utility Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Changer de langue / Chanje lang"
            >
              <span>{t.flag}</span>
              <span className="uppercase text-[11px] font-mono">{language}</span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-1 py-1 w-40 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100">
                {(['fr', 'ht', 'en', 'es'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      onSelectLanguage?.(l);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer ${
                      language === l ? 'text-sky-400 font-bold bg-slate-800/60' : 'text-slate-300'
                    }`}
                  >
                    <span>{l === 'fr' ? '🇫🇷 Français' : l === 'ht' ? '🇭🇹 Kreyòl' : l === 'en' ? '🇺🇸 English' : '🇪🇸 Español'}</span>
                    {language === l && <Check className="w-3.5 h-3.5 text-sky-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Angle Mode Switcher for Scientific */}
          {(currentMode === 'standard' || currentMode === 'scientific') && (
            <button
              onClick={onToggleAngleMode}
              className="px-2 py-1 text-xs font-mono font-semibold rounded bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 transition-colors cursor-pointer"
              title="Changer l'unité d'angle (Degrés / Radians)"
            >
              {angleMode}
            </button>
          )}

          {/* Memory Active Indicator */}
          {hasMemory && (
            <span
              className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              title="Mémoire active (M)"
            >
              M
            </span>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
            title={soundEnabled ? 'Désactiver les sons' : 'Activer les sons'}
            aria-label="Basculer le son"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Changer de thème (Clair / Sombre)"
            aria-label="Changer de thème"
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* PWA Install Button */}
          {isInstallable && (
            <button
              onClick={install}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer"
              title="Installer sur Android / PC"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Installer</span>
            </button>
          )}

          {isIOS && !isInstalled && (
            <button
              onClick={() => setShowIOSPrompt(true)}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Installer sur iPhone / iPad"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Installer iOS</span>
            </button>
          )}

          {/* ZIP & APK Download Guide Button (Disparaît automatiquement dès que l'app / APK est installée) */}
          {!isInstalled && !dismissedDownloadBtn && (
            <button
              onClick={() => setShowAPKModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer border border-emerald-500/30"
              title={language === 'ht' ? 'Telechaje ZIP la oswa Enstale APK (Lap disparèt lè w fin enstale l)' : 'Télécharger le ZIP ou Installer l\'APK (Disparaît une fois installée)'}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">ZIP / APK</span>
            </button>
          )}

          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="relative p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Historique des calculs"
            aria-label="Ouvrir l'historique"
          >
            <History className="w-4 h-4" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-sky-500 text-[10px] font-bold text-white flex items-center justify-center font-mono">
                {historyCount > 99 ? '99+' : historyCount}
              </span>
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Paramètres de l'application"
            aria-label="Ouvrir les paramètres"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 md:hidden transition-colors cursor-pointer"
            aria-label="Afficher les modes"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Modes Navigation Bar (Desktop & Tablets horizontal scroll) */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto scrollbar-none px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 py-1.5 min-w-max">
          {MODES.map((mode) => {
            const isActive = currentMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  onSelectMode(mode.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold shadow-xs shadow-sky-500/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <span className="text-sm">{mode.icon}</span>
                <span>{t.modes[mode.id] || mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Navigation (when open) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/98 p-4 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-xl">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">
            Espaces de calcul
          </div>
          <div className="grid grid-cols-2 gap-2">
            {MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  onSelectMode(mode.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                  currentMode === mode.id
                    ? 'bg-sky-600 text-white font-semibold'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="text-base">{mode.icon}</span>
                <span className="truncate">{t.modes[mode.id] || mode.label}</span>
              </button>
            ))}
          </div>

          {isInstallable && (
            <button
              onClick={() => {
                install();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-3 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Installer l'application sur cet appareil</span>
            </button>
          )}
        </div>
      )}

      {/* iOS Installation Instructions Modal */}
      {showIOSPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="max-w-sm w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-sky-400" />
              <span>Installer sur iPhone / iPad</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pour utiliser James Calculator comme une application native sans connexion :
            </p>
            <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
              <li>Appuyez sur le bouton <strong>Partager</strong> <span className="text-sky-400 font-bold">⎋</span> dans la barre Safari.</li>
              <li>Faites défiler vers le bas et touchez <strong>Sur l'écran d'accueil</strong>.</li>
              <li>Touchez <strong>Ajouter</strong> en haut à droite.</li>
            </ol>
            <button
              onClick={() => setShowIOSPrompt(false)}
              className="w-full py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
            >
              Compris
            </button>
          </div>
        </div>
      )}

      {/* APK & ZIP Download Guide Modal */}
      <APKDownloadModal
        isOpen={showAPKModal}
        onClose={() => setShowAPKModal(false)}
        language={language}
        onInstallPWA={install}
        isInstallable={isInstallable}
        onHideFromHeader={() => {
          try {
            localStorage.setItem('hide_zip_apk_btn', 'true');
          } catch {
            // ignore
          }
          setDismissedDownloadBtn(true);
        }}
      />
    </header>
  );
};
