export interface Category {
  id: string;
  nameFr: string;
  nameAr: string;
  emoji: string;
  order: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  nameFr: string;
  nameAr: string;
  descriptionFr?: string;
  descriptionAr?: string;
  price: number; // in DA
  image: string;
  available: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface DeliveryZone {
  wilayaCode: number;
  wilayaFr: string;
  wilayaAr: string;
  fee: number; // in DA
}

export type OrderStatus = 'nouveau' | 'preparation' | 'livre' | 'annule';

export interface Order {
  id: string;
  createdAt: string;
  clientName: string;
  clientPhone: string;
  wilaya: string;
  commune: string;
  address: string;
  notes?: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
}

export interface StoreSettings {
  nameFr: string;
  nameAr: string;
  descriptionFr: string;
  descriptionAr: string;
  logoUrl: string;
  whatsappNumber: string;
  address: string;
  phone: string;
  mapEmbedUrl: string;
  hours: {
    day: string;
    openFr: string;
    openAr: string;
    hours: string;
  }[];
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  wilayaCode: number;
  wilayaFr: string;
  commune: string;
  address: string;
  notes: string;
}
