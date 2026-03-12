'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import OrdersTable from '@/components/admin/OrdersTable';
import { MOCK_ORDERS } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import type { Order, OrderStatus } from '@/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const stats = {
    nouveau: orders.filter((o) => o.status === 'nouveau').length,
    preparation: orders.filter((o) => o.status === 'preparation').length,
    livre: orders.filter((o) => o.status === 'livre').length,
    revenue: orders
      .filter((o) => o.status === 'livre')
      .reduce((sum, o) => sum + o.total, 0),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">Commandes</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Gérez les commandes reçues via WhatsApp
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Nouvelles', value: stats.nouveau, emoji: '🔔', color: 'text-blue-600' },
          {
            label: 'En préparation',
            value: stats.preparation,
            emoji: '👨‍🍳',
            color: 'text-yellow-600',
          },
          { label: 'Livrées', value: stats.livre, emoji: '✅', color: 'text-green-600' },
          {
            label: 'CA livré',
            value: formatPrice(stats.revenue),
            emoji: '💰',
            color: 'text-brand-primary',
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border rounded-xl p-4">
            <p className="text-2xl mb-1">{stat.emoji}</p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { label: 'Toutes', count: orders.length },
          { label: 'Nouvelles', count: stats.nouveau },
          { label: 'En préparation', count: stats.preparation },
          { label: 'Livrées', count: stats.livre },
        ].map((filter) => (
          <button
            key={filter.label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium hover:bg-muted transition-colors"
          >
            {filter.label}
            <Badge variant="secondary" className="text-xs">
              {filter.count}
            </Badge>
          </button>
        ))}
      </div>

      <OrdersTable orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
}
