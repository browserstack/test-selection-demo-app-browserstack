import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { CartProvider, useCart } from "./contexts/CartContext";
import { UserProvider, useUser } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import LoginForm from "./components/LoginForm";
import NotFound from "./pages/NotFound";
import Scenarios from "./pages/Scenarios";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import React from 'react';

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/scenarios" element={<Scenarios />} />
        <Route path="/login" element={
          <RedirectIfLoggedIn>
            <LoginForm />
          </RedirectIfLoggedIn>
        } />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/checkout" element={
          <RequireAuth>
            <Checkout />
          </RequireAuth>
        } />
        <Route path="/profile" element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
        <Route path="/orders" element={
          <RequireAuth>
            <OrderHistory />
          </RequireAuth>
        } />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="w-full text-center py-4 text-gray-500 text-sm border-t bg-white mt-8">
        © 2025 BrowserStack. All rights reserved.
      </footer>
    </div>
  );
};

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export const RedirectIfLoggedIn = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  return user ? <Navigate to="/profile" replace /> : <>{children}</>;
};

const ShoppingCartPage = () => {
  const { cart, removeFromCart, clearCart, addToCart, decrementFromCart } = useCart();
  const { user } = useUser();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-4 p-3">
          {cart.items.map(item => (
            <div key={item.id} id='cart-item' className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow p-4 gap-4">
              <div className="flex items-center gap-4 w-full md:w-2/3">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{item.name}</div>
                  {item.category && (
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mb-1">{item.category}</span>
                  )}
                  {item.rating && (
                    <div className="text-xs text-gray-500">Rating: {item.rating.rate} ({item.rating.count} reviews)</div>
                  )}
                  <div className="text-blue-600 font-bold text-lg">${item.price} x {item.quantity}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => decrementFromCart(item.id)}>-</button>
                    <span className="px-2" id="item-quantity">{item.quantity}</span>
                    <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => addToCart(item, 1)}>+</button>
                  </div>
                </div>
              </div>
              <button className="text-red-500 hover:underline self-start" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <button id="clear-cart-btn" className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={clearCart}>Clear Cart</button>
          {user ? (
            <>
              <Link to="/checkout" id="place-order-btn" className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 w-full text-lg font-bold text-center block">Checkout</Link>
            </>
          ) : (
            <div className="mt-6 px-6 py-3 bg-yellow-100 text-yellow-800 rounded w-full text-center text-lg font-semibold">
              Please <Link to="/profile" className="underline text-blue-600">login</Link> to checkout.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const App = () => (
  <UserProvider>
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </CartProvider>
  </UserProvider>
);

export default App;
