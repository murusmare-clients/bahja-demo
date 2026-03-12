import Header from '@/components/storefront/Header';
import Hero from '@/components/storefront/Hero';
import MenuSection from '@/components/storefront/MenuSection';
import ContactSection from '@/components/storefront/ContactSection';
import CartDrawer from '@/components/storefront/CartDrawer';
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
        <MenuSection
          categories={MOCK_CATEGORIES}
          items={MOCK_MENU_ITEMS}
          locale={locale}
        />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white py-10 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-black text-xl mb-1">🍕 Fast Food El Bahdja</p>
              <p className="text-sm text-white/60">{STORE_SETTINGS.address}</p>
            </div>
            <div className="flex gap-6 text-sm text-white/60">
              <span>🚚 Livraison à domicile</span>
              <span>💵 Paiement à la livraison</span>
            </div>
          </div>
          <div className="border-t border-white/10 mt-6 pt-6 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Fast Food El Bahdja. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* Global cart drawer */}
      <CartDrawer />
    </div>
  );
}
