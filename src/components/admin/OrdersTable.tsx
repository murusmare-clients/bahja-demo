'use client';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  { label: string; variant: 'default' | 'warning' | 'info' | 'success' | 'muted' }
> = {
  nouveau: { label: 'Nouveau', variant: 'info' },
  preparation: { label: 'En préparation', variant: 'warning' },
  livre: { label: 'Livré', variant: 'success' },
  annule: { label: 'Annulé', variant: 'muted' },
};

const STATUS_TRANSITIONS: Record<OrderStatus, { value: OrderStatus; label: string }[]> = {
  nouveau: [
    { value: 'preparation', label: '👨‍🍳 Préparer' },
    { value: 'annule', label: '❌ Annuler' },
  ],
  preparation: [
    { value: 'livre', label: '✅ Marquer livré' },
    { value: 'annule', label: '❌ Annuler' },
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
    <div className="rounded-xl border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead>Commande</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Articles</TableHead>
            <TableHead>Wilaya</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const { label, variant } = STATUS_CONFIG[order.status];
            const transitions = STATUS_TRANSITIONS[order.status];

            return (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-sm font-semibold">
                  {order.id}
                  <div className="text-xs text-muted-foreground font-normal mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString('fr-DZ', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-medium text-sm">{order.clientName}</p>
                  <p className="text-xs text-muted-foreground">{order.clientPhone}</p>
                </TableCell>
                <TableCell>
                  <ul className="text-xs space-y-0.5 text-muted-foreground">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.quantity}x {item.name}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{order.wilaya}</p>
                  <p className="text-xs text-muted-foreground">{order.commune}</p>
                </TableCell>
                <TableCell className="font-bold text-brand-primary">
                  {formatPrice(order.total)}
                </TableCell>
                <TableCell>
                  <Badge variant={variant}>{label}</Badge>
                </TableCell>
                <TableCell>
                  {transitions.length > 0 ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-1">
                          Changer
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {transitions.map((t) => (
                          <DropdownMenuItem
                            key={t.value}
                            onClick={() => onStatusChange(order.id, t.value)}
                          >
                            {t.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                Aucune commande pour le moment.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
