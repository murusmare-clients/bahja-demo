import type { CartItem, CheckoutFormData } from '@/types';

export function formatOrderMessage(
  items: CartItem[],
  form: CheckoutFormData,
  deliveryFee: number
): string {
  const subtotal = items.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );
  const total = subtotal + deliveryFee;

  const itemLines = items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.menuItem.nameFr} — ${(item.menuItem.price * item.quantity).toLocaleString('fr-DZ')} DA`
    )
    .join('\n');

  const message = [
    `🍕 *Nouvelle Commande - Fast Food El Bahdja*`,
    ``,
    `📋 *Commande:*`,
    itemLines,
    ``,
    `💰 Sous-total: ${subtotal.toLocaleString('fr-DZ')} DA`,
    `🚚 Livraison (${form.wilayaFr}): ${deliveryFee.toLocaleString('fr-DZ')} DA`,
    `💵 *Total: ${total.toLocaleString('fr-DZ')} DA*`,
    ``,
    `👤 *Client:* ${form.name}`,
    `📞 *Téléphone:* ${form.phone}`,
    `📍 *Wilaya:* ${form.wilayaFr}`,
    `🏠 *Adresse:* ${form.commune}, ${form.address}`,
    form.notes ? `📝 *Notes:* ${form.notes}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  return message;
}

export function openWhatsApp(
  message: string,
  waNumber: string = process.env.NEXT_PUBLIC_WA_NUMBER ?? '213555123456'
): void {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank');
}
