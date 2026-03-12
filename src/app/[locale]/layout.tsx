import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import DirectionProvider from '@/components/DirectionProvider';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'fr' | 'ar')) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <DirectionProvider locale={locale} isRTL={isRTL}>
      <NextIntlClientProvider messages={messages}>
        <div style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}>
          {children}
        </div>
      </NextIntlClientProvider>
    </DirectionProvider>
  );
}
