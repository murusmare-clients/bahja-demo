import Header from '@/components/storefront/Header';
import Hero from '@/components/storefront/Hero';
import MenuSection from '@/components/storefront/MenuSection';
import ContactSection from '@/components/storefront/ContactSection';
import CartDrawer from '@/components/storefront/CartDrawer';
import FloatingCartButton from '@/components/storefront/FloatingCartButton';
import { MOCK_CATEGORIES, MOCK_MENU_ITEMS, STORE_SETTINGS } from '@/lib/mock-data';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-brand-bg">
      <Header locale={locale} />
      <main>
        <Hero />
        <MenuSection categories={MOCK_CATEGORIES} items={MOCK_MENU_ITEMS} locale={locale} />
        <ContactSection />
      </main>

      <footer className="border-t border-black/5 bg-white py-10">
        <div className="shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-black text-foreground">{STORE_SETTINGS.nameFr}</p>
            <p className="mt-1 text-sm text-muted-foreground">{STORE_SETTINGS.address}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground sm:flex sm:flex-wrap sm:gap-6">
            <span>Livraison à domicile</span>
            <span>Paiement à la livraison</span>
            <span>Commande WhatsApp</span>
            <span>Admin mobile</span>
          </div>
        </div>
      </footer>

      <FloatingCartButton />
      <CartDrawer />
    </div>
  );
}
