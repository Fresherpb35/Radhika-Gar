import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const WASvg = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useApp();

  const handleWhatsApp = () => {
    const lines = cart.map(i => `• ${i.name} (${i.selectedColor}, ${i.selectedSize}) x${i.quantity} = ₹${(i.price * i.quantity).toLocaleString()}`).join('%0A');
    const msg = `Hi! I'd like to place an order:%0A${lines}%0A%0ATotal: ₹${cartTotal.toLocaleString()}`;
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  const shipping = cartTotal >= 500 ? 0 : 99;
  const total = cartTotal + shipping;

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-maroon-900 text-ivory py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl">Your Bag</h1>
          <p className="font-body text-stone-300 text-sm mt-1">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {cart.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={52} className="text-stone-200 mx-auto mb-4" />
            <p className="font-display text-2xl text-stone-400">Your bag is empty</p>
            <p className="font-body text-stone-400 text-sm mt-2 mb-8">Add beautiful ethnic wear to get started!</p>
            <Link to="/shop" className="btn-primary">Continue Shopping <ArrowRight size={16} /></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map(item => (
                  <motion.div key={item.key} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-sm p-4 flex gap-4 shadow-sm">
                    <img src={item.images[0]} alt={item.name} className="w-20 h-24 md:w-24 md:h-28 object-cover rounded-sm flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.slug}`} className="font-display text-sm md:text-base text-maroon-900 hover:text-gold-600 transition-colors line-clamp-2">{item.name}</Link>
                      <p className="font-body text-xs text-stone-400 mt-1">{item.selectedColor} · Size {item.selectedSize}</p>
                      <p className="font-body text-xs text-stone-400">{item.fabric}</p>
                      <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                        <div className="flex items-center border border-stone-300 rounded-sm">
                          <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="px-2.5 py-1.5 text-maroon-800 hover:bg-stone-100 transition-colors"><Minus size={12} /></button>
                          <span className="px-3 py-1.5 font-body text-sm border-x border-stone-300 min-w-[36px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="px-2.5 py-1.5 text-maroon-800 hover:bg-stone-100 transition-colors"><Plus size={12} /></button>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-semibold text-maroon-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                          <p className="font-body text-xs text-stone-400">₹{item.price.toLocaleString()} each</p>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.key)} className="text-stone-300 hover:text-maroon-700 transition-colors self-start mt-1">
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-sm p-6 shadow-sm sticky top-24">
                <h2 className="font-display text-xl text-maroon-900 mb-5 pb-3 border-b border-stone-200">Order Summary</h2>
                <div className="space-y-3 text-sm font-body mb-5">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-emerald-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-sm">Add ₹{500 - cartTotal} more for free shipping!</p>
                  )}
                  <div className="border-t border-stone-200 pt-3 flex justify-between">
                    <span className="font-display text-lg font-semibold text-maroon-900">Total</span>
                    <span className="font-display text-lg font-semibold text-maroon-900">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3.5 text-sm font-body font-semibold rounded-sm transition-colors">
                    <WASvg /> Order on WhatsApp
                  </button>
                  <button onClick={() => {
                    const body = cart.map(i => `• ${i.name} — ${i.selectedColor}, ${i.selectedSize} x${i.quantity} = ₹${(i.price * i.quantity)}`).join('\n');
                    window.open(`mailto:care@radhikagarment.in?subject=Cart Inquiry&body=${encodeURIComponent('Hi,\n\nI would like to inquire about:\n' + body + `\n\nTotal: ₹${total}`)}`, '_blank');
                  }} className="w-full btn-outline justify-center">
                    Send Inquiry via Email
                  </button>
                </div>

                <Link to="/shop" className="block text-center font-body text-xs text-stone-400 hover:text-maroon-800 mt-5 transition-colors">
                  ← Continue Shopping
                </Link>

                {/* Trust mini */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col gap-2">
                  {['🔒 Secure & Private Ordering', '📦 Fast Delivery Across India', '↩️ Easy 3-Day Returns'].map(t => (
                    <p key={t} className="font-body text-xs text-stone-500">{t}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
