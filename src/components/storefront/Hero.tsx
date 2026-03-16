import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="shell py-6 pb-8 lg:py-8 lg:pb-12">
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface relative overflow-hidden bg-[#111111] p-6 text-white sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.25),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />
          <div className="relative max-w-xl">
            <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Alger • Pizza • Burgers
            </div>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{t('hero.tagline')}</h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/72 sm:text-base">{t('hero.subtitle')}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#menu">
                <Button size="lg" className="w-full rounded-full bg-white px-7 text-black hover:bg-white/90 sm:w-auto">
                  {t('hero.cta')}
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline" className="w-full rounded-full border-white/15 bg-white/5 px-7 text-white hover:bg-white/10 sm:w-auto">
                  Contact
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="surface overflow-hidden p-3">
            <div className="relative h-[280px] overflow-hidden rounded-[22px] sm:h-[340px] lg:h-[390px]">
              <Image
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=80"
                alt="Inside a modern pizzeria"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 text-white">
                <p className="text-xs uppercase tracking-[0.18em] text-white/70">Ambiance</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-black">Salle chaleureuse</h2>
                    <p className="mt-1 text-sm text-white/80">Service rapide, cuisine visible, expérience simple.</p>
                  </div>
                  <a href="#menu">
                    <Button className="rounded-full bg-white px-4 text-black hover:bg-white/90">Commander</Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="surface p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Combo</p>
                <h3 className="mt-1 text-xl font-black text-foreground">Combo Solo</h3>
                <p className="mt-1 text-sm text-muted-foreground">Burger crispy, frites maison et boisson.</p>
              </div>
              <p className="whitespace-nowrap text-2xl font-black text-foreground">1 350 DA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
