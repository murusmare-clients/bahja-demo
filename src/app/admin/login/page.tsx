'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
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

    await new Promise((r) => setTimeout(r, 300));

    const ok = login(password);
    if (ok) {
      router.push('/admin/menu');
    } else {
      setError('Mot de passe incorrect');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col gap-5 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="surface relative overflow-hidden bg-[#111111] p-6 text-white sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,62,62,0.2),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.15),transparent_35%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Admin access
              </div>
              <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">Pilote le restaurant depuis ton téléphone.</h1>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/72 sm:text-base">
                Suivi des commandes, gestion du menu, zones de livraison et paramètres du restaurant dans une interface plus propre et plus mobile-first.
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                ['Commandes', 'Suivi des statuts'],
                ['Menu', 'Photos, prix, disponibilité'],
                ['Livraison', 'Wilayas et frais'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-xs text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="surface flex items-center p-6 sm:p-8 lg:p-10">
          <div className="w-full">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Connexion</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground">Accéder au dashboard</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Version démo inspirée d&apos;un dashboard de livraison moderne, sans surcharge visuelle.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="space-y-2">
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
                    className="h-12 rounded-2xl border-black/10 bg-white pr-11"
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

              <Button type="submit" className="h-12 w-full rounded-2xl bg-black text-white hover:bg-black/90" disabled={!password || loading}>
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            <Link href="/fr" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Retour au site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
