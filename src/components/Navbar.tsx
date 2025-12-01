import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { getAssetPath } from '../lib/assetUtils';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user } = useUser();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Scenarios', path: '/scenarios' },
    // Show Order History only if logged in
    ...(user ? [{ name: 'Order History', path: '/orders' }] : []),
  ];

  const getNavLinkId = (name: string) => {
    return `nav-${name.toLowerCase()}`;
  };

  const getNavLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-primary rounded-md ${
      isActive ? 'text-primary bg-accent' : 'text-foreground'
    }`;
  };

  return (
    <nav className="sticky top-0 z-40 border-b bg-background/95 border-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold transition-all duration-200 text-foreground"
            id="logo"
          >
            <div className="flex items-center justify-center">
              <img src={getAssetPath("/favicon.svg")} alt="Demo logo" className="w-12 h-12 object-contain block" style={{margin: 0, padding: 0, minWidth: '3rem', minHeight: '3rem', maxWidth: '3rem', maxHeight: '3rem'}} />
            </div>
            <span className="tracking-tight">Browserstack Demo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 ml-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                id={getNavLinkId(item.name)}
                className={getNavLinkClass(item.path) + ' flex items-center px-4 py-2 rounded-lg shadow-sm border border-transparent hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40'}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side icons - always visible */}
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="p-2 transition-all duration-200 relative rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
              id="shopping-cart-btn"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </Link>

            <Link
              to="/profile"
              className="p-2 transition-all duration-200 rounded-md flex items-center gap-2 max-w-[160px] overflow-hidden whitespace-nowrap text-ellipsis md:max-w-[120px] lg:max-w-[180px] xl:max-w-[220px] 2xl:max-w-[260px] text-muted-foreground hover:text-foreground hover:bg-accent"
              id="profile-btn"
            >
              {user ? (
                <>
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full border border-gray-300 shrink-0" />
                  <span className="hidden md:inline lg:inline xl:inline 2xl:inline text-sm font-medium text-ellipsis overflow-hidden max-w-[80px] lg:max-w-[120px] xl:max-w-[160px] 2xl:max-w-[200px] ipad:hidden">{user.name || user.email}</span>
                </>
              ) : (
                <User className="w-5 h-5" />
              )}
            </Link>

            {/* Hamburger menu always visible */}
            <button
              className="md:hidden p-2 rounded-md transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t transition-all duration-300 bg-background/95 border-border">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                id={getNavLinkId(item.name)}
                className="block px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 text-foreground hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
