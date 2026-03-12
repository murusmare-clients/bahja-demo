'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const STORAGE_KEY = 'bahdja_admin_authed';

export function useAdminAuth() {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authed = localStorage.getItem(STORAGE_KEY) === '1';
    setIsAuthed(authed);
  }, []);

  const login = (password: string): boolean => {
    const correct = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'admin123';
    if (password === correct) {
      localStorage.setItem(STORAGE_KEY, '1');
      setIsAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthed(false);
    router.push('/admin/login');
  };

  return { isAuthed, login, logout };
}
