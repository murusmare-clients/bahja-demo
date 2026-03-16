'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, Search } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAdminAuth } from '@/hooks/useAdminAuth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthed } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthed === false && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthed, pathname, router]);

  if (pathname === '/admin/login') {
    return <div style={{ fontFamily: "'Inter', sans-serif" }}>{children}</div>;
  }

  if (isAuthed === null) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif" }} className="flex min-h-screen items-center justify-center bg-brand-bg">
        <div className="surface px-6 py-5 text-sm text-muted-foreground">Chargement du dashboard…</div>
      </div>
    );
  }

  if (!isAuthed) {
    return null;
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-brand-bg text-foreground xl:flex">
      <AdminSidebar />
      <div className="flex-1">
        <header className="sticky top-0 z-30 border-b border-black/5 bg-brand-bg/90 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Admin</p>
              <h1 className="mt-1 text-lg font-bold">Restaurant operations</h1>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <div className="flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 text-sm text-muted-foreground">
                <Search className="h-4 w-4" />
                Rechercher commande ou produit
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-muted-foreground">
                <Bell className="h-4 w-4" />
              </button>
              <Link href="/fr" className="rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
                Voir le site
              </Link>
            </div>
          </div>
        </header>

        <main className="px-4 pb-24 pt-5 sm:px-6 lg:px-8 xl:pb-8">{children}</main>
      </div>
    </div>
  );
}
