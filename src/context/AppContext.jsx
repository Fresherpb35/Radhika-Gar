import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rg_cart')) || []; } catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rg_wishlist')) || []; } catch { return []; }
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { localStorage.setItem('rg_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('rg_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = (product, selectedColor, selectedSize, quantity = 1) => {
    const key = `${product.id}-${selectedColor}-${selectedSize}`;
    setCart(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) {
        toast.success('Quantity updated in bag!');
        return prev.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i);
      }
      toast.success('Added to bag!');
      return [...prev, { ...product, key, selectedColor, selectedSize, quantity }];
    });
  };

  const removeFromCart = (key) => {
    setCart(prev => prev.filter(i => i.key !== key));
    toast('Removed from bag', { icon: '🗑️' });
  };

  const updateQuantity = (key, qty) => {
    if (qty < 1) return removeFromCart(key);
    setCart(prev => prev.map(i => i.key === key ? { ...i, quantity: qty } : i));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      if (prev.find(i => i.id === product.id)) {
        toast('Removed from wishlist', { icon: '💔' });
        return prev.filter(i => i.id !== product.id);
      }
      toast.success('Added to wishlist!');
      return [...prev, product];
    });
  };

  const isWishlisted = (id) => wishlist.some(i => i.id === id);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal,
      wishlist, toggleWishlist, isWishlisted,
      quickViewProduct, setQuickViewProduct,
      searchQuery, setSearchQuery,
      mobileMenuOpen, setMobileMenuOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
