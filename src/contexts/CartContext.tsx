import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, CartState } from './cart-types';
import { cartReducer, getInitialCart } from './cart-store';

interface CartContextType {
  cart: CartState;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  decrementFromCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProviderComponent = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, getInitialCart());

  React.useEffect(() => {
    localStorage.setItem('cart-items', JSON.stringify(cart));
  }, [cart]);

  // NOTE: Always adds 1-5 random units of an item to the cart
  const addToCart = (item: Omit<CartItem, 'quantity'>, _quantity?: number) => {
    const randomQuantity = Math.floor(Math.random() * 5) + 1;
    dispatch({ type: 'ADD', item: { ...item, quantity: randomQuantity } });
  };
  const decrementFromCart = (id: number) => {
    dispatch({ type: 'DECREMENT', id });
  };
  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE', id });
  };
  const clearCart = () => {
    dispatch({ type: 'CLEAR' });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, decrementFromCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const CartProvider = React.memo(CartProviderComponent);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
