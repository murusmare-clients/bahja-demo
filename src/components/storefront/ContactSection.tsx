import { useTranslations } from 'next-intl';
import { MapPin, Phone, Clock } from 'lucide-react';
import { STORE_SETTINGS } from '@/lib/mock-data';

export default function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black mb-3">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Info panel */}
          <div className="space-y-6">
            {/* Address */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                <MapPin className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <p className="font-semibold">{t('address')}</p>
                <p className="text-muted-foreground text-sm mt-0.5">{STORE_SETTINGS.address}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                <Phone className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <p className="font-semibold">{t('phone')}</p>
                <a
                  href={`tel:${STORE_SETTINGS.phone}`}
                  className="text-brand-primary text-sm mt-0.5 hover:underline"
                >
                  {STORE_SETTINGS.phone}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-brand-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-2">{t('hours')}</p>
                <div className="space-y-1">
                  {STORE_SETTINGS.hours.map((h, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className="font-medium">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${STORE_SETTINGS.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <span className="text-xl">💬</span>
              Commander sur WhatsApp
            </a>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-md h-72 lg:h-96 bg-gray-100">
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
        </div>
      </div>
    </section>
  );
}
