// Static product data for test/demo use
import { getAssetPath } from '../lib/assetUtils';

export const products = [
  {
    id: 1,
    title: 'Google Pixel 4',
    price: 499.99,
    category: 'android',
    os: 'android',
    description: 'Google Pixel 4 with Snapdragon 855, 5.7-inch OLED display, 12MP dual camera, Face Unlock.',
    image: getAssetPath('/static/products/GooglePixel4.png'),
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: 2,
    title: 'Apple iPhone 11',
    price: 599.99,
    category: 'ios',
    os: 'ios',
    description: 'Apple iPhone 11 with A13 Bionic chip, 6.1-inch Liquid Retina HD display, dual 12MP cameras.',
    image: getAssetPath('/static/products/iPhone11.png'),
    rating: { rate: 4.7, count: 210 }
  },
  {
    id: 3,
    title: 'Apple iPhone 12 Pro',
    price: 899.99,
    category: 'ios',
    os: 'ios',
    description: 'Apple iPhone 12 Pro with A14 Bionic chip, 6.1-inch Super Retina XDR display, triple 12MP cameras.',
    image: getAssetPath('/static/products/iPhone12Pro.png'),
    rating: { rate: 4.8, count: 180 }
  },
  {
    id: 4,
    title: 'Samsung Galaxy Note 20',
    price: 799.99,
    category: 'android',
    os: 'android',
    description: 'Samsung Galaxy Note 20 with Snapdragon 865+, 6.7-inch AMOLED, S Pen, triple camera system.',
    image: getAssetPath('/static/products/Note20.png'),
    rating: { rate: 4.6, count: 150 }
  },
  {
    id: 5,
    title: 'OnePlus 6T',
    price: 399.99,
    category: 'android',
    os: 'android',
    description: 'OnePlus 6T with Snapdragon 845, 6.41-inch AMOLED, in-display fingerprint sensor.',
    image: getAssetPath('/static/products/Oneplus6T.png'),
    rating: { rate: 4.4, count: 100 }
  },
  {
    id: 6,
    title: 'OnePlus 8',
    price: 499.99,
    category: 'android',
    os: 'android',
    description: 'OnePlus 8 with Snapdragon 865, 6.55-inch Fluid AMOLED, 48MP triple camera.',
    image: getAssetPath('/static/products/OnePlus8.png'),
    rating: { rate: 4.5, count: 110 }
  },
  {
    id: 7,
    title: 'Samsung Galaxy S9',
    price: 349.99,
    category: 'android',
    os: 'android',
    description: 'Samsung Galaxy S9 with Snapdragon 845, 5.8-inch Super AMOLED, 12MP camera.',
    image: getAssetPath('/static/products/samsung-s9.png'),
    rating: { rate: 4.3, count: 90 }
  },
  {
    id: 8,
    title: 'Samsung Galaxy S10',
    price: 449.99,
    category: 'android',
    os: 'android',
    description: 'Samsung Galaxy S10 with Snapdragon 855, 6.1-inch Dynamic AMOLED, triple camera system.',
    image: getAssetPath('/static/products/samsung-S10.png'),
    rating: { rate: 4.6, count: 130 }
  },
  {
    id: 9,
    title: 'Samsung Galaxy S20+',
    price: 699.99,
    category: 'android',
    os: 'android',
    description: 'Samsung Galaxy S20+ with Snapdragon 865, 6.7-inch Dynamic AMOLED, quad camera system.',
    image: getAssetPath('/static/products/samsung-S20+.png'),
    rating: { rate: 4.7, count: 160 }
  },
  {
    id: 10,
    title: 'Samsung Galaxy S20 Ultra',
    price: 999.99,
    category: 'android',
    os: 'android',
    description: 'Samsung Galaxy S20 Ultra with Snapdragon 865, 6.9-inch Dynamic AMOLED, 108MP camera.',
    image: getAssetPath('/static/products/samsung-S20Ultra.png'),
    rating: { rate: 4.8, count: 175 }
  }
];
