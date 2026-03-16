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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const NAV_ITEMS = [
  { href: '/admin/menu', label: 'Menu', icon: UtensilsCrossed },
  { href: '/admin/orders', label: 'Commandes', icon: ClipboardList },
  { href: '/admin/delivery', label: 'Livraison', icon: MapPin },
  { href: '/admin/settings', label: 'Paramètres', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  return (
    <>
      <aside className="hidden w-72 shrink-0 border-r border-black/5 bg-white xl:flex xl:min-h-screen xl:flex-col">
        <div className="border-b border-black/5 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111111] text-sm font-bold text-white">
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
            className="mb-4 flex items-center gap-3 rounded-2xl bg-[#111111] px-4 py-3 text-sm font-semibold text-white"
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
                    ? 'bg-brand-bg text-foreground'
                    : 'text-foreground/65 hover:bg-brand-bg hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-black/5 p-4">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/95 px-2 py-2 backdrop-blur xl:hidden">
        <div className="grid grid-cols-4 gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium',
                  isActive ? 'bg-black text-white' : 'text-foreground/65'
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
