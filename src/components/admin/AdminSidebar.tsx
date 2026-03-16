'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  UtensilsCrossed,
  ClipboardList,
  MapPin,
  Settings,
  LogOut,
  LayoutDashboard,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const NAV_ITEMS = [
  { href: '/admin/menu', label: 'Menu', icon: UtensilsCrossed },
  { href: '/admin/combos', label: 'Combos', icon: Layers },
  { href: '/admin/orders', label: 'Commandes', icon: ClipboardList },
  { href: '/admin/delivery', label: 'Livraison', icon: MapPin },
  { href: '/admin/settings', label: 'Paramètres', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  return (
    <>
      <aside className="hidden w-72 shrink-0 border-r border-black/[0.05] bg-[#FAFAFA] xl:flex xl:min-h-screen xl:flex-col">
        <div className="border-b border-black/[0.05] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary text-sm font-bold text-white shadow-sm">
              EB
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Fast Food El Bahdja</p>
              <p className="text-xs text-muted-foreground">Restaurant dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <Link
            href="/admin/orders"
            className="mb-4 flex items-center gap-3 rounded-2xl bg-brand-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
          >
            <LayoutDashboard className="h-4 w-4" />
            Vue opérationnelle
          </Link>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-l-[3px] border-brand-primary bg-red-50 pl-[13px] text-brand-primary font-semibold'
                    : 'text-foreground/65 hover:bg-white hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-black/[0.05] p-4">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.05] bg-white/95 px-2 py-2 backdrop-blur xl:hidden">
        <div className="grid grid-cols-5 gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-medium',
                  isActive ? 'bg-brand-primary text-white' : 'text-foreground/60'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
