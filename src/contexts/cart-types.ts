export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface CartState {
  items: CartItem[];
}
