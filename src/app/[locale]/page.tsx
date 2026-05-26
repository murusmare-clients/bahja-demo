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
    <div className="min-h-screen bg-background">
      <Header locale={locale} />
      <main>
        <Hero />
        <MenuSection categories={MOCK_CATEGORIES} items={MOCK_MENU_ITEMS} locale={locale} />
        <ContactSection />
      </main>

      <footer className="border-t-2 border-brand-primary/15 bg-white py-10">
        <div className="shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-black text-foreground">{STORE_SETTINGS.nameFr}</p>
            <p className="mt-1 text-sm text-muted-foreground">{STORE_SETTINGS.address}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              © {new Date().getFullYear()} Fast Food El Bahdja. Tous droits réservés.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Livraison à domicile', 'Paiement à la livraison', 'Commande WhatsApp', 'Menu à jour'].map((feat) => (
              <span
                key={feat}
                className="rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>
      </footer>

      <FloatingCartButton />
      <CartDrawer />
    </div>
  );
}
