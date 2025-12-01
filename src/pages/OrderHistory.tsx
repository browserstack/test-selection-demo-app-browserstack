import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import type { CartItem } from '../contexts/cart-types';
import type { User } from '../contexts/UserContext';
import EmptyState from '../components/ui/EmptyState';
import { Button } from '../components/ui/button';

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  user: User;
}

const OrderHistory: React.FC = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }
    // Use user id if available, else fallback to email
    const userKey = user.id ? `order-history-${user.id}` : `order-history-${user.email}`;
    const stored = localStorage.getItem(userKey);
    if (stored) {
      const userOrders = JSON.parse(stored);
      userOrders.sort((a: Order, b: Order) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setOrders(userOrders);
    } else {
      setOrders([]);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-8">
        <h1 className="text-2xl font-bold mb-4">Order History</h1>
        <EmptyState message="Please login to view your orders." className="bg-yellow-100 text-yellow-800 rounded px-6 py-4 text-lg font-semibold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>
        {orders.length === 0 ? (
          <EmptyState message="No orders placed yet." />
        ) : (
          <ul className="space-y-4">
            {orders.map(order => (
              <li key={order.id} className="border-b pb-4 order-list-item" data-order-id={order.id}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Order #{order.id}</div>
                    <div className="text-gray-500 text-sm">{order.date}</div>
                  </div>
                  <Button
                    variant="link"
                    className="text-blue-600 underline"
                    id={`view-invoice-btn-${order.id}`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Invoice
                  </Button>
                </div>
                <div className="text-gray-700 mt-2">Total: <span className="font-bold">${order.total}</span></div>
              </li>
            ))}
          </ul>
        )}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
              <button className="absolute top-2 right-2 text-gray-500" onClick={() => setSelectedOrder(null)}>&times;</button>
              <h2 className="text-xl font-bold mb-2">Invoice for Order #{selectedOrder.id}</h2>
              <div className="mb-2 text-gray-600">Date: {selectedOrder.date}</div>
              <div className="mb-2 text-gray-600">User: {selectedOrder.user?.email}</div>
              <ul className="mb-4">
                {selectedOrder.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between border-b py-1">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="font-bold text-lg">Total: ${selectedOrder.total}</div>
            </div>
          </div>
        )}
        <div className="mt-6 text-center">
          <Link to="/products" className="text-blue-600 underline">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
