import React from 'react';
import { Smartphone, Monitor, QrCode, Sparkles, Check, Copy, ExternalLink, X } from 'lucide-react';

export type DeviceMode = 'desktop' | 'ios' | 'android';

interface DevicePreviewBarProps {
  deviceMode: DeviceMode;
  onDeviceModeChange: (mode: DeviceMode) => void;
  onOpenExpoModal: () => void;
}

export const DevicePreviewBar: React.FC<DevicePreviewBarProps> = ({
  deviceMode,
  onDeviceModeChange,
  onOpenExpoModal,
}) => {
  return (
    <aside
      aria-label="Contrôles de prévisualisation mobile"
      className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 text-xs py-2 px-3 sm:px-6 flex items-center justify-between gap-3 shadow-sm select-none"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold tracking-wide text-slate-200 hidden sm:inline">Sninat Multi-Platform</span>
        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          iOS + Android + Web
        </span>
      </div>

      {/* Device Mode Switcher */}
      <div className="flex items-center bg-slate-800/90 rounded-lg p-0.5 border border-slate-700/80">
        <button
          type="button"
          onClick={() => onDeviceModeChange('desktop')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs transition-colors ${
            deviceMode === 'desktop'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Mode Desktop Plein Écran"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Web / Desktop</span>
        </button>

        <button
          type="button"
          onClick={() => onDeviceModeChange('ios')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs transition-colors ${
            deviceMode === 'ios'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Simulateur iPhone 16 Pro (Apple iOS)"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Apple iOS</span>
        </button>

        <button
          type="button"
          onClick={() => onDeviceModeChange('android')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs transition-colors ${
            deviceMode === 'android'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Simulateur Google Pixel (Android)"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Android</span>
        </button>
      </div>

      {/* Expo Go React Native Launcher */}
      <button
        type="button"
        onClick={onOpenExpoModal}
        className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-medium text-xs transition-transform active:scale-95 shadow-xs"
      >
        <QrCode className="w-3.5 h-3.5" />
        <span className="font-semibold">Expo Go</span>
        <span className="hidden sm:inline text-[10px] bg-white/20 px-1 rounded">Mobile App</span>
      </button>
    </aside>
  );
};

interface ExpoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExpoModal: React.FC<ExpoModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const expoCommand = `cd expo-app && npm install && npx expo start`;

  const handleCopy = () => {
    navigator.clipboard.writeText(expoCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <QrCode className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Expo Go • React Native</h3>
              <p className="text-xs text-slate-500">Compatible Apple iOS & Google Android</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 text-sky-900 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-sky-950">Architecture Hybride & Expo Go prête</p>
              <p className="text-sky-800/90 leading-relaxed">
                Le projet contient l'application React Native complète dans le dossier <code className="bg-sky-200/60 px-1 py-0.5 rounded font-mono font-bold">/expo-app</code> prête pour <strong>Expo Go</strong>, ainsi que le mode PWA optimisé pour Safari iOS et Chrome Android.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Commande pour lancer Expo Go sur votre ordinateur :
            </label>
            <div className="flex items-center justify-between bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-xs border border-slate-800">
              <span className="truncate">{expoCommand}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="ml-2 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-sans flex items-center gap-1 transition-colors shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <span className="text-base">🍎</span>
                <span>Apple iOS (iPhone)</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-tight">
                Téléchargez <strong>Expo Go</strong> sur l'App Store, ouvrez l'appareil photo et scannez le QR code.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <span className="text-base">🤖</span>
                <span>Android (Google)</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-tight">
                Installez <strong>Expo Go</strong> depuis le Google Play Store et scannez directement le QR code dans l'application.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/60 text-emerald-950 space-y-1">
            <div className="font-bold text-xs flex items-center gap-1.5 text-emerald-900">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Installation PWA directe sans Expo (Instantané) :</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Sur iPhone : Ouvrez l'URL dans Safari &gt; <em>Partager</em> &gt; <strong>Sur l'écran d'accueil</strong>.<br/>
              Sur Android : Ouvrez dans Chrome &gt; Menu (3 points) &gt; <strong>Installer l'application</strong>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
