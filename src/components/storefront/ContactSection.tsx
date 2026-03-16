import { Phone, Clock, ArrowUpRight, Instagram, Facebook, Music2 } from 'lucide-react';
import { STORE_SETTINGS } from '@/lib/mock-data';

export default function ContactSection() {
  return (
    <section id="contact" className="shell py-4 pb-28 lg:pb-16">
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface p-5 sm:p-6 lg:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] bg-brand-bg p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Adresse</p>
              <p className="mt-3 text-base font-semibold leading-7 text-foreground">{STORE_SETTINGS.address}</p>
            </div>
            <div className="rounded-[24px] bg-brand-bg p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Téléphone</p>
              <a href={`tel:${STORE_SETTINGS.phone}`} className="mt-3 inline-block text-base font-semibold text-foreground hover:text-brand-primary">
                {STORE_SETTINGS.phone}
              </a>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] bg-brand-bg p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {STORE_SETTINGS.hours.map((h, i) => (
                <div key={i} className="rounded-[20px] bg-white px-4 py-4">
                  <p className="text-sm font-semibold text-foreground">{h.day}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{h.hours}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
              { href: 'https://facebook.com', label: 'Facebook', icon: Facebook },
              { href: 'https://tiktok.com', label: 'TikTok', icon: Music2 },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground"
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
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-white hover:bg-black"
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
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
                <Phone className="h-4 w-4" />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">Contact direct</p>
              <p className="mt-1 text-sm text-muted-foreground">WhatsApp et téléphone disponibles pendant les heures d&apos;ouverture.</p>
            </div>
            <div className="rounded-[22px] bg-brand-bg p-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
                <Clock className="h-4 w-4" />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">Service rapide</p>
              <p className="mt-1 text-sm text-muted-foreground">Préparation pensée pour des commandes simples et mobiles.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
