'use client';

import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const DISMISS_KEY = 'el-bahdja-pwa-install-dismissed';

function isIOSDevice() {
  if (typeof window === 'undefined') return false;
  const platform = window.navigator.platform.toLowerCase();
  const userAgent = window.navigator.userAgent.toLowerCase();
  const iPadOS = platform === 'macintel' && window.navigator.maxTouchPoints > 1;
  return /iphone|ipad|ipod/.test(userAgent) || iPadOS;
}

export default function PWARegister() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [showManualHelp, setShowManualHelp] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    const dismissed = window.localStorage.getItem(DISMISS_KEY) === '1';

    setIsStandalone(standalone);
    setIsDismissed(dismissed);
    setIsIOS(isIOSDevice());
    setIsReady(true);

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((error) => {
          console.warn('PWA service worker registration failed', error);
        });
      });
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setIsDismissed(window.localStorage.getItem(DISMISS_KEY) === '1');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  if (!isReady || isStandalone || isDismissed) {
    return null;
  }

  const dismiss = () => {
    window.localStorage.setItem(DISMISS_KEY, '1');
    setIsDismissed(true);
  };

  const installApp = async () => {
    if (!installPrompt) {
      setShowManualHelp((current) => !current);
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
    dismiss();
  };

  const helpText = isIOS
    ? 'Sur iPhone : appuyez sur Partager, puis Ajouter à l’écran d’accueil.'
    : 'Si l’installation ne s’ouvre pas : menu du navigateur ⋮, puis Installer l’application ou Ajouter à l’écran d’accueil.';

  return (
    <div className="fixed inset-x-3 bottom-4 z-50 mx-auto max-w-md rounded-3xl border border-black/10 bg-white/95 p-4 shadow-2xl shadow-black/20 backdrop-blur md:bottom-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-primary text-lg font-black text-white shadow-lg shadow-brand-primary/25">
          EB
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black text-foreground">Télécharger le raccourci</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Ajoutez El Bahdja à votre écran d’accueil pour commander plus rapidement.
          </p>
          {showManualHelp ? (
            <p className="mt-2 rounded-2xl bg-orange-50 px-3 py-2 text-xs font-medium leading-5 text-orange-950">
              {helpText}
            </p>
          ) : null}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={installApp}
              className="rounded-full bg-brand-primary px-4 py-2 text-xs font-black text-white shadow-md shadow-brand-primary/20 transition hover:-translate-y-0.5"
            >
              {installPrompt ? 'Installer' : 'Comment faire'}
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-full border border-black/10 px-4 py-2 text-xs font-bold text-muted-foreground transition hover:bg-black/[0.03]"
            >
              Plus tard
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="-mr-1 -mt-1 rounded-full px-2 py-1 text-lg leading-none text-muted-foreground hover:bg-black/[0.04]"
          aria-label="Fermer"
        >
          ×
        </button>
      </div>
    </div>
  );
}
