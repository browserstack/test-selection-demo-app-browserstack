import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Confetti from '../components/Confetti';
import EmptyState from '../components/ui/EmptyState';
import { Button } from '../components/ui/button';

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  // User authentication is now handled globally in App.jsx
  // This page assumes user is authenticated

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-8">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <EmptyState message="Your cart is empty." />
      </div>
    );
  }

  const buildUserSummary = () => {
    if (!user) return null;
    const { id, email, name, username } = user;
    return { id, email, name, username };
  };

  const handlePlaceOrder = () => {
    const order = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      items: cart.items,
      total: cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      user: buildUserSummary(),
    };
    // Use user id if available, else fallback to email
    const userKey = user?.id
      ? `order-history-${user.id}`
      : `order-history-${user?.email ?? 'guest'}`;
    const prev = localStorage.getItem(userKey);
    const orders = prev ? JSON.parse(prev) : [];
    orders.push(order);
    localStorage.setItem(userKey, JSON.stringify(orders));
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/orders'); // Redirect to Order History after checkout
    }, 2000); // Show animation for 2 seconds before redirect
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <ul className="mb-4">
          {cart.items.map(item => (
            <li key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="font-bold text-xl mb-6">
          Total: ${cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
        </div>
        <Button
          id="place-order-btn"
          className="w-full bg-green-600 text-white py-3 text-lg font-bold"
          onClick={handlePlaceOrder}
          disabled={orderPlaced}
        >
          Place Order
        </Button>
        <AnimatePresence>
          {orderPlaced && (
            <>
              <Confetti show={orderPlaced} />
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center mt-8"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-2" />
                <div className="text-green-600 text-xl font-bold">Order Placed Successfully!</div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Checkout;
