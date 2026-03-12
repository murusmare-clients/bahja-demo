'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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

  // On login page
  if (pathname === '/admin/login') {
    return <div style={{ fontFamily: "'Inter', sans-serif" }}>{children}</div>;
  }

  // Still checking auth
  if (isAuthed === null) {
    return (
      <div
        style={{ fontFamily: "'Inter', sans-serif" }}
        className="min-h-screen bg-brand-bg flex items-center justify-center"
      >
        <div className="text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  // Not authed — redirect in progress
  if (!isAuthed) {
    return null;
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
