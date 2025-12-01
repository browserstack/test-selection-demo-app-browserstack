import { CartItem, CartState } from './cart-types';

export type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'DECREMENT'; id: number }
  | { type: 'REMOVE'; id: number }
  | { type: 'CLEAR' };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((item) => item.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + (action.item.quantity || 1) }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { ...action.item, quantity: action.item.quantity || 1 }],
      };
    }
    case 'DECREMENT': {
      return {
        items: state.items
          .map((item) =>
            item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      };
    }
    case 'REMOVE': {
      return {
        items: state.items.filter((item) => item.id !== action.id),
      };
    }
    case 'CLEAR': {
      return { items: [] };
    }
    default:
      return state;
  }
}

export function getInitialCart(): CartState {
  try {
    const stored = localStorage.getItem('cart-items');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore access errors (SSR/localStorage disabled)
  }
  return { items: [] };
}
