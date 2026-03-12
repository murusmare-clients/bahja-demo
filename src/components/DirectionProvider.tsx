'use client';

import { useEffect } from 'react';

interface DirectionProviderProps {
  children: React.ReactNode;
  locale: string;
  isRTL: boolean;
}

export default function DirectionProvider({ children, locale, isRTL }: DirectionProviderProps) {
  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', locale);
  }, [locale, isRTL]);

  return <>{children}</>;
}
