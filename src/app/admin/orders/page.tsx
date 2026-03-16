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
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  const stats = {
    nouveau: orders.filter((o) => o.status === 'nouveau').length,
    preparation: orders.filter((o) => o.status === 'preparation').length,
    livre: orders.filter((o) => o.status === 'livre').length,
    revenue: orders.filter((o) => o.status === 'livre').reduce((sum, o) => sum + o.total, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Commandes</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground">Vue opérationnelle</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Suivi des commandes reçues via WhatsApp avec une lecture plus propre sur mobile.</p>
        </div>
        <div className="surface-soft flex items-center gap-6 px-5 py-4 text-sm">
          <div>
            <p className="font-semibold text-foreground">Actives</p>
            <p className="text-muted-foreground">{stats.nouveau + stats.preparation} commandes</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">CA livré</p>
            <p className="text-muted-foreground">{formatPrice(stats.revenue)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: 'Nouvelles', value: stats.nouveau },
          { label: 'En préparation', value: stats.preparation },
          { label: 'Livrées', value: stats.livre },
          { label: 'CA livré', value: formatPrice(stats.revenue) },
        ].map((stat) => (
          <div key={stat.label} className="surface p-4 sm:p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</p>
            <p className="mt-3 text-2xl font-black text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { label: 'Toutes', count: orders.length, dotColor: 'bg-foreground/40' },
          { label: 'Nouvelles', count: stats.nouveau, dotColor: 'bg-blue-400' },
          { label: 'En préparation', count: stats.preparation, dotColor: 'bg-orange-400' },
          { label: 'Livrées', count: stats.livre, dotColor: 'bg-green-500' },
        ].map((filter) => (
          <button
            key={filter.label}
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-foreground/75 transition-colors hover:border-brand-primary/30 hover:text-foreground"
          >
            <span className={`h-2 w-2 rounded-full ${filter.dotColor}`} />
            {filter.label}
            <Badge variant="secondary" className="rounded-full bg-brand-bg text-[11px] text-foreground">
              {filter.count}
            </Badge>
          </button>
        ))}
      </div>

      <OrdersTable orders={orders} onStatusChange={handleStatusChange} />
    </div>
  );
}
