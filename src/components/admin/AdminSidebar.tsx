'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  UtensilsCrossed,
  ClipboardList,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const NAV_ITEMS = [
  { href: '/admin/menu', label: 'Menu', icon: UtensilsCrossed },
  { href: '/admin/orders', label: 'Commandes', icon: ClipboardList },
  { href: '/admin/delivery', label: 'Livraisons', icon: MapPin },
  { href: '/admin/settings', label: 'Paramètres', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <p className="font-black text-lg text-brand-primary">🍕 El Bahdja</p>
        <p className="text-xs text-muted-foreground mt-0.5">Panneau d&apos;administration</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group',
                isActive
                  ? 'bg-brand-primary text-white'
                  : 'text-foreground/70 hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="h-4 w-4 opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 w-full transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
