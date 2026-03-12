'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/hooks/useAdminAuth';

export default function AdminLoginPage() {
  const { isAuthed, login } = useAdminAuth();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthed === true) {
      router.push('/admin/menu');
    }
  }, [isAuthed, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise((r) => setTimeout(r, 400)); // slight delay for UX

    const ok = login(password);
    if (ok) {
      router.push('/admin/menu');
    } else {
      setError('Mot de passe incorrect');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">🍕</span>
          </div>
          <h1 className="text-2xl font-black text-foreground">Fast Food El Bahdja</h1>
          <p className="text-muted-foreground text-sm mt-1">Panneau d&apos;administration</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-5 w-5 text-brand-primary" />
            <h2 className="font-bold text-lg">Connexion</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Mot de passe</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-dark"
              disabled={!password || loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/fr" className="hover:text-brand-primary transition-colors">
            ← Retour au site
          </a>
        </p>
      </div>
    </div>
  );
}
