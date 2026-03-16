import { Phone, Clock, ArrowUpRight, Instagram, Facebook, Music2 } from 'lucide-react';
import { STORE_SETTINGS } from '@/lib/mock-data';

export default function ContactSection() {
  return (
    <section id="contact" className="shell py-4 pb-28 lg:pb-16">
      {/* Section header */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Localisation
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground">Nous trouver</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Venez nous rendre visite ou passez commande par WhatsApp.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface p-5 sm:p-6 lg:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] bg-brand-bg p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Adresse
              </p>
              <p className="mt-3 text-base font-semibold leading-7 text-foreground">
                {STORE_SETTINGS.address}
              </p>
            </div>
            <div className="rounded-[24px] bg-brand-bg p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Téléphone
              </p>
              <a
                href={`tel:${STORE_SETTINGS.phone}`}
                className="mt-3 inline-block text-base font-semibold text-foreground transition-colors hover:text-brand-primary"
              >
                {STORE_SETTINGS.phone}
              </a>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] bg-brand-bg p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {STORE_SETTINGS.hours.map((h, i) => (
                <div key={i} className="rounded-[20px] bg-white px-4 py-4">
                  <p className="text-sm font-semibold text-foreground">{h.day}</p>
                  <p className="mt-1 text-sm text-brand-primary font-medium">{h.hours}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { href: 'https://instagram.com', label: 'Instagram', icon: Instagram, hoverColor: 'hover:text-[#E1306C] hover:border-[#E1306C]/20' },
              { href: 'https://facebook.com', label: 'Facebook', icon: Facebook, hoverColor: 'hover:text-[#1877F2] hover:border-[#1877F2]/20' },
              { href: 'https://tiktok.com', label: 'TikTok', icon: Music2, hoverColor: 'hover:text-foreground' },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2.5 text-sm font-medium text-foreground/70 transition-colors ${social.hoverColor}`}
                >
                  <Icon className="h-4 w-4" />
                  {social.label}
                </a>
              );
            })}
          </div>

          <a
            href={`https://wa.me/${STORE_SETTINGS.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1DA851]"
          >
            Commander sur WhatsApp
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="surface overflow-hidden p-3">
          <div className="h-[320px] overflow-hidden rounded-[24px] bg-gray-100 sm:h-[420px]">
            <iframe
              src={STORE_SETTINGS.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation Fast Food El Bahdja"
            />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] bg-brand-bg p-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-primary/10">
                <Phone className="h-4 w-4 text-brand-primary" />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">Contact direct</p>
              <p className="mt-1 text-sm text-muted-foreground">
                WhatsApp et téléphone disponibles pendant les heures d&apos;ouverture.
              </p>
            </div>
            <div className="rounded-[22px] bg-brand-bg p-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-primary/10">
                <Clock className="h-4 w-4 text-brand-primary" />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">Service rapide</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Préparation pensée pour des commandes simples et mobiles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
