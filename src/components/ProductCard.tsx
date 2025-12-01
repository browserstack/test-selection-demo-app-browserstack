import React, { useState } from 'react';
import { ShoppingCart, Star, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Product {
  id: number;
  displayId?: number; // Make displayId optional in Product interface for ProductCard
  title: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (quantity: number) => void;
  loading?: boolean;
}

const ProductCardSkeleton: React.FC = () => (
  <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4 animate-pulse">
    <div className="flex space-x-4">
      <div className="size-10 rounded-full bg-gray-200"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 rounded bg-gray-200"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-gray-200"></div>
            <div className="col-span-1 h-2 rounded bg-gray-200"></div>
          </div>
          <div className="h-2 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  </div>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, loading }) => {
  const { cart, removeFromCart } = useCart();
  const inCart = cart.items.some(item => item.id === product.id);
  const [quantity, setQuantity] = useState(1);
  const elementId = (base: string) => `${base}-${product.id}`;

  // Simulate a short loading state before showing the actual card
  const [showLoading, setShowLoading] = useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 600); // 600ms loading
    return () => clearTimeout(timer);
  }, []);

  if (loading || showLoading) return <ProductCardSkeleton />;

  const getProductName = () => product.title;
  const getPriceText = () => `$${product.price}`;

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mx-auto w-full max-w-sm border border-blue-300 p-4 flex flex-col h-full"
      id={elementId('product-card')}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
          id={elementId('product-image')}
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1">
          <div className="flex items-center gap-1 px-2 py-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">
              {typeof product.rating === 'object' ? product.rating.rate : product.rating}
            </span>
            {product.rating?.count !== undefined && (
              <span className="text-xs text-gray-500 ml-1">({product.rating.count})</span>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            className="font-semibold text-lg text-gray-900 mb-2"
            id={elementId('product-title')}
          >
            {getProductName()}
          </h3>
          {product.category && (
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mb-2">
              {product.category}
            </span>
          )}
          <p 
            className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[2.5rem]"
            id={elementId('product-description')}
          >
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span 
            className="text-2xl font-bold text-blue-600"
            id={elementId('product-price')}
          >
            {getPriceText()}
          </span>
          {inCart ? (
            <Button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              id={elementId('remove-from-cart')}
              onClick={() => removeFromCart(product.id)}
              variant="destructive"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </Button>
          ) : (
            <div className="flex items-end gap-2 flex-nowrap w-full min-w-0 mt-auto">
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 px-2 py-1 text-center min-w-0"
              />
              <Button
                className="p-2 flex items-center min-w-0 truncate text-sm sm:text-base sm:px-4 sm:py-2 product-card-btn-responsive"
                id={elementId('add-to-cart')}
                onClick={() => onAddToCart && onAddToCart(quantity)}
                title="Add to Cart"
                style={{maxWidth: '100%'}}
              >
                <ShoppingCart className="w-5 h-5 shrink-0" />
                <span className="truncate block">Add to Cart</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
