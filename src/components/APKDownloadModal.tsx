import React, { useState } from 'react';
import { X, Download, Smartphone, Check, ExternalLink, HelpCircle, FileArchive, Terminal, Sparkles } from 'lucide-react';
import { AppLanguage } from '../types/calculator';

interface APKDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: AppLanguage;
  onInstallPWA?: () => void;
  isInstallable?: boolean;
  onHideFromHeader?: () => void;
}

export const APKDownloadModal: React.FC<APKDownloadModalProps> = ({
  isOpen,
  onClose,
  language,
  onInstallPWA,
  isInstallable = false,
}) => {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<'zip' | 'apk' | 'pc'>('zip');

  if (!isOpen) return null;

  const isHt = language === 'ht';

  const handleDownloadZip = () => {
    setDownloadStarted(true);
    const link = document.createElement('a');
    link.href = '/james-calculator-pro.zip';
    link.download = 'james-calculator-pro.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloadStarted(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 flex items-center justify-center text-white shadow-sm">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {isHt ? 'Telechaje ZIP & Enstale APK' : 'Télécharger le ZIP & Installer l\'APK'}
              </h2>
              <p className="text-xs text-slate-400">
                {isHt ? 'James Calculator Pro - Pare pou telefòn ak òdinatè' : 'James Calculator Pro - Prêt pour mobile et PC'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fèmen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 p-1.5 gap-1 text-xs font-medium">
          <button
            onClick={() => setActiveTab('zip')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'zip'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <FileArchive className="w-3.5 h-3.5" />
            <span>{isHt ? 'Fichye ZIP (.zip)' : 'Fichier ZIP (.zip)'}</span>
          </button>
          <button
            onClick={() => setActiveTab('apk')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'apk'
                ? 'bg-sky-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isHt ? 'Enstale sou Android (APK)' : 'Installer sur Android (APK)'}</span>
          </button>
          <button
            onClick={() => setActiveTab('pc')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'pc'
                ? 'bg-purple-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{isHt ? 'Lanse sou PC' : 'Exécuter sur PC'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* TAB 1: ZIP DOWNLOAD */}
          {activeTab === 'zip' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileArchive className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-white text-sm">james-calculator-pro.zip</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                    ~428 KB
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isHt
                    ? 'Fichye ZIP sa a gen tout sous kòd pwojè a, tout kalkilatris yo, konvèsyon yo, mòd syans lan, ak vèsyon konpile ki pare pou lanse a.'
                    : 'Ce fichier ZIP contient le code source complet, tous les calculateurs, convertisseurs, outils scientifiques, et la version compilée prête à l\'emploi.'}
                </p>

                <button
                  onClick={handleDownloadZip}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  {downloadStarted ? (
                    <>
                      <Check className="w-4 h-4 text-slate-950 animate-bounce" />
                      <span>{isHt ? 'Telechajman an kòmanse !' : 'Téléchargement démarré !'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-slate-950" />
                      <span>{isHt ? 'Telechaje Fichye ZIP la kounye a' : 'Télécharger le fichier ZIP maintenant'}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{isHt ? 'Sa ki anndan ZIP la :' : 'Contenu du fichier ZIP :'}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-400 font-mono text-[11px]">
                  <li>src/ (Kalkilatris syantifik, finans, grafik, matris, elatriye)</li>
                  <li>dist/ (Vèsyon konpile pare pou sèvi)</li>
                  <li>public/ (Manifest PWA, ikòn, Service Worker)</li>
                  <li>GID_ENSTALASYON_APK_KREYOL.md (Gid detaye an kreyòl)</li>
                  <li>package.json, vite.config.ts, tsconfig.json</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: APK & ANDROID */}
          {activeTab === 'apk' && (
            <div className="space-y-4">
              {/* Option A: Fast Install via PWA (Acts identical to APK) */}
              <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 space-y-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-sky-400" />
                  <span className="font-bold text-white text-sm">
                    {isHt ? 'Opsyon 1 : Enstale dirèkteman sou Android (Rekòmande)' : 'Option 1 : Installation directe Android (Recommandé)'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isHt
                    ? 'James Calculator Pro fèt kòm yon aplikasyon PWA. Li enstale dirèkteman sou telefòn ou egzakteman tankou yon APK reyèl : li gen ikòn sou ekran akèy la, li ouvri an plen ekran, epi li mache 100% SAN ENTÈNÈT (OFFLINE) !'
                    : 'James Calculator Pro est une PWA officielle. Elle s\'installe sur votre téléphone exactement comme un APK natif avec icône sur l\'écran d\'accueil, affichage plein écran et fonctionnement 100% HORS-LIGNE !'}
                </p>

                {isInstallable && onInstallPWA ? (
                  <button
                    onClick={onInstallPWA}
                    className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>{isHt ? 'Klike la pou Enstale sou Telefòn ou' : 'Cliquer ici pour Installer'}</span>
                  </button>
                ) : (
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
                    <div className="font-bold text-sky-300">
                      {isHt ? 'Kòman pou w enstale l nan Chrome sou telefòn :' : 'Comment installer via Chrome mobile :'}
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-slate-400">
                      <li>{isHt ? 'Ouvri paj sa a nan Chrome sou Android.' : 'Ouvrez cette page dans Chrome sur Android.'}</li>
                      <li>{isHt ? 'Klike sou 3 ti pwen yo anlè a dwat.' : 'Appuyez sur les 3 points en haut à droite.'}</li>
                      <li>{isHt ? 'Chwazi "Ajoute sou Ekran Akèy" oswa "Enstale".' : 'Choisissez "Ajouter à l\'écran d\'accueil" ou "Installer".'}</li>
                      <li>{isHt ? 'Fini ! Aplikasyon an ap sou telefòn ou.' : 'Terminé ! L\'icône est désormais installée sur votre smartphone.'}</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Option B: Generate Standalone .APK File */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white text-xs">
                    {isHt ? 'Opsyon 2 : Jenere yon vrè fichye .apk (PWABuilder)' : 'Option 2 : Générer un fichier .apk autonome (PWABuilder)'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {isHt
                    ? 'Si w bezwen yon vrè fichye ki fini pa .apk pou w voye sou WhatsApp oswa pou mete sou Play Store :'
                    : 'Si vous avez besoin d\'un vrai fichier .apk à partager sur WhatsApp ou publier sur le Play Store :'}
                </p>
                <ol className="list-decimal list-inside space-y-1 font-mono text-[11px] text-slate-300">
                  <li>Ale sou <a href="https://www.pwabuilder.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">PWABuilder.com</a></li>
                  <li>Kole lyen aplikasyon an</li>
                  <li>Klike sou "Package for Android" epi telechaje fichye .apk a</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 3: RUN ON PC */}
          {activeTab === 'pc' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="font-bold text-white text-xs flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span>{isHt ? 'Lanse sou òdinatè w (Windows, Mac, Linux)' : 'Exécuter sur votre ordinateur'}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {isHt
                    ? 'Apre w fin dekonprese fichye ZIP la, ouvri yon tèminal nan dosye a epi tape lòd sa yo :'
                    : 'Après avoir extrait le fichier ZIP, ouvrez un terminal dans le dossier et tapez :'}
                </p>
                <div className="p-3 bg-black/80 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400 space-y-1 select-all">
                  <div>npm install</div>
                  <div>npm run dev</div>
                </div>
                <p className="text-[11px] text-slate-500">
                  {isHt
                    ? 'Apre sa, ouvri navigatè w sou http://localhost:5173 oswa 3000.'
                    : 'Ensuite, ouvrez votre navigateur sur http://localhost:5173 ou 3000.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs gap-2">
          <button
            onClick={handleDownloadZip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 font-semibold cursor-pointer border border-emerald-500/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isHt ? 'Telechaje ZIP' : 'Télécharger ZIP'}</span>
          </button>

          <div className="flex items-center gap-2">
            {onHideFromHeader && (
              <button
                onClick={() => {
                  onHideFromHeader();
                  onClose();
                }}
                className="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors text-[11px] cursor-pointer"
                title={isHt ? 'Retire bouton ZIP/APK a sou tèt ekran an' : 'Masquer ce bouton de l\'en-tête'}
              >
                {isHt ? 'Kache bouton sa a' : 'Masquer ce bouton'}
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer"
            >
              {isHt ? 'Fèmen' : 'Fermer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
