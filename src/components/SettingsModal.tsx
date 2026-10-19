import React, { useState } from 'react';
import { AppSettings, AppTheme, AppLanguage, CalculatorMode } from '../types/calculator';
import { X, Smartphone, RotateCcw, Volume2, Vibrate, Check, HelpCircle, Globe, Download } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onResetAllData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetAllData,
}) => {
  const [showAPKGuide, setShowAPKGuide] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Paramètres de James Calculator</h2>
            <p className="text-xs text-slate-400">Préférences enregistrées localement</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Langue de l'interface */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>Langue / Chanje Lang</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'fr', label: 'Français', flag: '🇫🇷' },
                { id: 'ht', label: 'Kreyòl', flag: '🇭🇹' },
                { id: 'en', label: 'English', flag: '🇺🇸' },
                { id: 'es', label: 'Español', flag: '🇪🇸' },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => onUpdateSettings({ language: l.id as AppLanguage })}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    (settings.language || 'fr') === l.id
                      ? 'bg-sky-600 border-sky-500 text-white shadow-xs'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 1. Theme Choice */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Thème de l'interface
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'dark', label: 'Sombre' },
                  { id: 'light', label: 'Clair' },
                  { id: 'amoled', label: 'AMOLED Noir' },
                ] as const
              ).map((th) => (
                <button
                  key={th.id}
                  onClick={() => onUpdateSettings({ theme: th.id as AppTheme })}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    settings.theme === th.id
                      ? 'bg-sky-600 border-sky-500 text-white shadow-xs'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {th.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Decimals and Precision */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Nombre de décimales affichées
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { val: -1, label: 'Auto' },
                { val: 2, label: '2 déc.' },
                { val: 4, label: '4 déc.' },
                { val: 6, label: '6 déc.' },
                { val: 8, label: '8 déc.' },
                { val: 10, label: '10 déc.' },
              ].map((d) => (
                <button
                  key={d.val}
                  onClick={() => onUpdateSettings({ decimals: d.val })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                    settings.decimals === d.val
                      ? 'bg-sky-600 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Rounding Mode */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Méthode d'arrondi
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'round', label: 'Au plus proche' },
                { id: 'floor', label: 'Plancher (Tronqué)' },
                { id: 'ceil', label: 'Plafond (Supérieur)' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => onUpdateSettings({ roundingMode: r.id as AppSettings['roundingMode'] })}
                  className={`py-2 px-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer text-center ${
                    settings.roundingMode === r.id
                      ? 'bg-sky-600 border-sky-500 text-white font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Sounds and Vibrations */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-medium text-slate-200">Retour sonore (bips de touches synthétisés)</span>
              </div>
              <button
                onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.soundEnabled ? 'bg-sky-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                    settings.soundEnabled ? 'left-5.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Vibrate className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-medium text-slate-200">Vibrations haptiques (si supporté par l'appareil)</span>
              </div>
              <button
                onClick={() => onUpdateSettings({ vibrationEnabled: !settings.vibrationEnabled })}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.vibrationEnabled ? 'bg-sky-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                    settings.vibrationEnabled ? 'left-5.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 5. Default Launch Mode */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Mode de démarrage par défaut
            </label>
            <select
              value={settings.defaultMode}
              onChange={(e) => onUpdateSettings({ defaultMode: e.target.value as CalculatorMode })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium text-xs"
            >
              <option value="standard">Calculatrice Standard</option>
              <option value="scientific">Calculatrice Scientifique</option>
              <option value="algebra">Calculatrice Algébrique</option>
              <option value="fractions">Fractions</option>
              <option value="finance">Finance & Prêt</option>
              <option value="geometry">Géométrie</option>
              <option value="statistics">Statistiques</option>
              <option value="probabilities">Probabilités</option>
              <option value="converter">Conversions d'unités</option>
              <option value="date_time">Dates et Heures</option>
            </select>
          </div>

          {/* 6. Guide d'exportation Android APK */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => setShowAPKGuide(!showAPKGuide)}
              className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-white">Instructions pour créer un fichier APK Android</span>
              </div>
              <span className="text-xs text-sky-400">{showAPKGuide ? 'Masquer' : 'Afficher'}</span>
            </button>

            {showAPKGuide && (
              <div className="mt-3 p-4 bg-slate-950/90 border border-slate-800 rounded-xl space-y-3 text-xs text-slate-300">
                {/* Download ZIP Card */}
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl space-y-2">
                  <div className="font-semibold text-emerald-300 flex items-center justify-between">
                    <span>{settings.language === 'ht' ? 'Telechaje Fichye ZIP Pwojè a' : 'Télécharger le Fichier ZIP Complet'}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">~428 KB</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {settings.language === 'ht'
                      ? 'Fichye ZIP sa a gen tout sous kòd la, fichye distribisyon an, ak gid pou kreye APK a.'
                      : 'Ce fichier ZIP contient le code source complet, les fichiers distribués et le guide pour générer votre APK.'}
                  </p>
                  <a
                    href="/james-calculator-pro.zip"
                    download="james-calculator-pro.zip"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{settings.language === 'ht' ? 'Telechaje james-calculator-pro.zip' : 'Télécharger james-calculator-pro.zip'}</span>
                  </a>
                </div>

                <div className="font-bold text-white pt-1">
                  {settings.language === 'ht' ? '2 Fason pou gen aplikasyon an sou telefòn :' : '2 méthodes simples pour produire un APK réel :'}
                </div>
                
                <div className="space-y-1">
                  <div className="font-semibold text-emerald-400">
                    {settings.language === 'ht' ? 'Opsyon 1 : Enstale dirèkteman kòm PWA sou Android (Rekòmande)' : 'Option 1 : Installation PWA directe (Recommandée)'}
                  </div>
                  <p>
                    {settings.language === 'ht'
                      ? 'Aplikasyon an gen Service Worker ak Manifest konplè. Sou telefòn Android ou nan Chrome, klike sou 3 pwen yo epi chwazi "Ajoute sou Ekran Akèy" oswa "Enstale". Li fonksyone tankou yon APK ofisyèl epi 100% san entènèt !'
                      : 'L\'application intègre un Service Worker complet et un Manifest PWA. Sur votre smartphone Android ou tablette Samsung, cliquez sur "Installer" dans le menu pour l\'ajouter sur votre écran d\'accueil avec icône native et fonctionnement 100% hors-ligne.'}
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-800">
                  <div className="font-semibold text-sky-400">Option 2 : Compiler un APK avec Capacitor ou Bubblewrap</div>
                  <p>Pour générer un fichier `.apk` autonome :</p>
                  <ol className="list-decimal list-inside space-y-1 pl-1 font-mono text-[11px] text-slate-300">
                    <li>Exécutez : <code className="text-white">npm run build</code></li>
                    <li>Installez Capacitor : <code className="text-white">npm i @capacitor/core @capacitor/cli @capacitor/android</code></li>
                    <li>Initialisez : <code className="text-white">npx cap init "James Calculator" com.james.calculator --web-dir=dist</code></li>
                    <li>Ajoutez Android : <code className="text-white">npx cap add android</code></li>
                    <li>Ouvrez dans Android Studio : <code className="text-white">npx cap open android</code> puis Build &gt; Build APK.</li>
                  </ol>
                </div>
              </div>
            )}
          </div>

          {/* 7. Reset all data */}
          <div className="pt-2 border-t border-slate-800">
            {confirmReset ? (
              <div className="space-y-2">
                <p className="text-xs text-rose-400">
                  Êtes-vous sûr ? Vos calculs récents et vos préférences seront réinitialisés.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onResetAllData();
                      setConfirmReset(false);
                      onClose();
                    }}
                    className="flex-1 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
                  >
                    Oui, réinitialiser tout
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmReset(true)}
                className="w-full py-2.5 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-rose-400 hover:border-rose-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser les paramètres par défaut</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-center text-[11px] text-slate-500">
          James Calculator Pro · Créé par James
        </div>
      </div>
    </div>
  );
};
