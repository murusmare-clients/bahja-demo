'use client';

import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Order, OrderStatus } from '@/types';

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; variant: 'default' | 'warning' | 'info' | 'success' | 'muted'; borderColor: string }
> = {
  nouveau: { label: 'Nouveau', variant: 'info', borderColor: 'border-l-blue-400' },
  preparation: { label: 'En préparation', variant: 'warning', borderColor: 'border-l-orange-400' },
  livre: { label: 'Livré', variant: 'success', borderColor: 'border-l-green-500' },
  annule: { label: 'Annulé', variant: 'muted', borderColor: 'border-l-gray-300' },
};

const STATUS_TRANSITIONS: Record<OrderStatus, { value: OrderStatus; label: string }[]> = {
  nouveau: [
    { value: 'preparation', label: 'Passer en préparation' },
    { value: 'annule', label: 'Annuler la commande' },
  ],
  preparation: [
    { value: 'livre', label: 'Marquer comme livrée' },
    { value: 'annule', label: 'Annuler la commande' },
  ],
  livre: [],
  annule: [],
};

interface OrdersTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

export default function OrdersTable({ orders, onStatusChange }: OrdersTableProps) {
  return (
    <div className="space-y-4">
      <div className="hidden overflow-hidden rounded-[28px] border border-black/5 bg-white lg:block">
        <table className="w-full text-left">
          <thead className="bg-brand-bg text-xs uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-semibold">Commande</th>
              <th className="px-6 py-4 font-semibold">Client</th>
              <th className="px-6 py-4 font-semibold">Articles</th>
              <th className="px-6 py-4 font-semibold">Zone</th>
              <th className="px-6 py-4 font-semibold">Total</th>
              <th className="px-6 py-4 font-semibold">Statut</th>
              <th className="px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const { label, variant, borderColor } = STATUS_CONFIG[order.status];
              const transitions = STATUS_TRANSITIONS[order.status];
              return (
                <tr key={order.id} className={`border-t border-black/5 align-top border-l-4 ${borderColor} transition-colors hover:bg-gray-50/60`}>
                  <td className="px-6 py-5">
                    <p className="font-mono text-sm font-semibold text-foreground">{order.id}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString('fr-DZ', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-foreground">{order.clientName}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{order.clientPhone}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{order.address}</p>
                  </td>
                  <td className="px-6 py-5">
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {order.items.map((item, i) => (
                        <li key={i}>
                          <span className="font-medium text-foreground">{item.quantity}x</span> {item.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-5 text-sm">
                    <p className="font-semibold text-foreground">{order.wilaya}</p>
                    <p className="mt-1 text-muted-foreground">{order.commune}</p>
                  </td>
                  <td className="px-6 py-5 text-sm font-black text-foreground">{formatPrice(order.total)}</td>
                  <td className="px-6 py-5"><Badge variant={variant}>{label}</Badge></td>
                  <td className="px-6 py-5">
                    {transitions.length > 0 ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="rounded-full border-black/10">
                            Changer
                            <ChevronDown className="ml-1 h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {transitions.map((t) => (
                            <DropdownMenuItem key={t.value} onClick={() => onStatusChange(order.id, t.value)}>
                              {t.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <span className="text-xs text-muted-foreground">Aucune action</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 lg:hidden">
        {orders.map((order) => {
          const { label, variant } = STATUS_CONFIG[order.status];
          const transitions = STATUS_TRANSITIONS[order.status];
          return (
            <div key={order.id} className="surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-sm font-semibold text-foreground">{order.id}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString('fr-DZ', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <Badge variant={variant}>{label}</Badge>
              </div>

              <div className="mt-4 grid gap-3 rounded-2xl bg-brand-bg p-3 text-sm">
                <div>
                  <p className="font-semibold text-foreground">{order.clientName}</p>
                  <p className="text-muted-foreground">{order.clientPhone}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Articles</p>
                  <ul className="mt-2 space-y-1.5 text-muted-foreground">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        <span className="font-medium text-foreground">{item.quantity}x</span> {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Zone</p>
                    <p className="mt-1 font-medium text-foreground">{order.wilaya} · {order.commune}</p>
                  </div>
                  <p className="text-lg font-black text-foreground">{formatPrice(order.total)}</p>
                </div>
              </div>

              {transitions.length > 0 && (
                <div className="mt-4 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-full border-black/10">
                        Mettre à jour
                        <ChevronDown className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {transitions.map((t) => (
                        <DropdownMenuItem key={t.value} onClick={() => onStatusChange(order.id, t.value)}>
                          {t.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {orders.length === 0 && (
        <div className="surface py-10 text-center text-sm text-muted-foreground">Aucune commande pour le moment.</div>
      )}
    </div>
  );
}
