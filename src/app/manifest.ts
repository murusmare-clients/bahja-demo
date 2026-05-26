import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fast Food El Bahdja',
    short_name: 'El Bahdja',
    description: 'Menu, panier et commande WhatsApp pour Fast Food El Bahdja.',
    id: '/',
    start_url: '/fr?source=pwa',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#fff7ed',
    theme_color: '#f97316',
    categories: ['food', 'shopping', 'lifestyle'],
    lang: 'fr-DZ',
    dir: 'ltr',
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/maskable.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Commander',
        short_name: 'Commander',
        description: 'Ouvrir directement le menu',
        url: '/fr#menu',
        icons: [{ src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
      },
      {
        name: 'Dashboard',
        short_name: 'Admin',
        description: 'Accéder au dashboard restaurant',
        url: '/admin/login',
        icons: [{ src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
      },
    ],
  };
}
