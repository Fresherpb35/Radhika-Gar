import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Truck, RefreshCw, Shield, ChevronRight, Minus, Plus } from 'lucide-react';
import { products } from '../data/products';
import SizeGuide from '../components/ui/SizeGuide';
import ProductCard from '../components/product/ProductCard';
import { useApp } from '../context/AppContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const { addToCart, toggleWishlist, isWishlisted } = useApp();

  const [imgIdx, setImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('desc');

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-3xl text-stone-400">Product not found</p>
        <Link to="/shop" className="btn-primary mt-4">Back to Shop</Link>
      </div>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleWhatsApp = () => {
    const msg = `Hi! I'd like to order:%0A*${product.name}*%0APrice: ₹${product.price}%0AColor: ${product.colors[selectedColor]}%0ASize: ${product.sizes[selectedSize]}%0AQty: ${qty}%0APage: ${window.location.href}`;
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  const handleInquiry = () => {
    window.open(`mailto:Radharanifashion567@gmail.com?subject=Inquiry: ${product.name}&body=Hi, I'm interested in ${product.name} (₹${product.price}). Color: ${product.colors[selectedColor]}, Size: ${product.sizes[selectedSize]}, Qty: ${qty}.`, '_blank');
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-stone-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-body text-stone-500">
          <Link to="/" className="hover:text-maroon-800">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-maroon-800">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-maroon-800">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-maroon-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="aspect-square rounded-sm overflow-hidden bg-stone-100">
              <img src={product.images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-all ${imgIdx === i ? 'border-maroon-800' : 'border-transparent hover:border-stone-300'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div>
              <p className="font-body text-xs text-stone-400 uppercase tracking-widest">{product.category} · {product.subcategory}</p>
              <h1 className="font-display text-2xl md:text-3xl text-maroon-900 mt-1">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-gold-500 fill-gold-500' : 'text-stone-300 fill-stone-300'} />)}</div>
                <span className="font-body text-sm text-stone-500">{product.rating} ({product.reviews} reviews)</span>
                <span className="text-stone-300">·</span>
                <span className="font-body text-sm text-emerald-600">{product.sold} sold</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 py-3 border-y border-stone-200">
              <span className="font-display text-3xl font-semibold text-maroon-900">₹{product.price.toLocaleString()}</span>
              <span className="font-body text-lg text-stone-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="tag bg-emerald-100 text-emerald-700">{discount}% off</span>
            </div>

            {/* Description */}
            <p className="font-body text-sm text-stone-600 leading-relaxed">{product.description}</p>

            {/* Fabric / Occasion */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-cream rounded-sm px-3 py-2">
                <p className="font-body text-[10px] uppercase tracking-widest text-stone-400">Fabric</p>
                <p className="font-body font-medium text-maroon-900">{product.fabric}</p>
              </div>
              <div className="bg-cream rounded-sm px-3 py-2">
                <p className="font-body text-[10px] uppercase tracking-widest text-stone-400">Occasion</p>
                <p className="font-body font-medium text-maroon-900">{product.occasion}</p>
              </div>
            </div>

            {/* Color */}
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">Color: <span className="text-maroon-900 normal-case font-medium">{product.colors[selectedColor]}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c, i) => (
                  <button key={c} onClick={() => setSelectedColor(i)}
                    className={`px-3 py-1.5 text-sm font-body border rounded-sm transition-all ${selectedColor === i ? 'border-maroon-800 bg-maroon-50 text-maroon-900 font-medium' : 'border-stone-200 text-stone-600 hover:border-maroon-400'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">Size: <span className="text-maroon-900 normal-case font-medium">{product.sizes[selectedSize]}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s, i) => (
                  <button key={s} onClick={() => setSelectedSize(i)}
                    className={`w-11 h-11 text-sm font-body border rounded-sm transition-all ${selectedSize === i ? 'border-maroon-800 bg-maroon-800 text-ivory' : 'border-stone-300 text-stone-600 hover:border-maroon-500'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Guide */}
              <div className="mt-1">
                <SizeGuide />
              </div>
              {/* Qty */}
            <div className="flex items-center gap-4">
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-stone-500">Quantity:</p>
              <div className="flex items-center border border-stone-300 rounded-sm">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 text-maroon-800 hover:bg-stone-100 transition-colors">
                  <Minus size={14} />
                </button>
                <span className="px-4 py-2 font-body text-sm border-x border-stone-300 min-w-[48px] text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 text-maroon-800 hover:bg-stone-100 transition-colors">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <button onClick={() => addToCart(product, product.colors[selectedColor], product.sizes[selectedSize], qty)}
                  className="flex-1 btn-primary justify-center py-3">
                  <ShoppingBag size={18} /> Add to Bag
                </button>
                <button onClick={() => toggleWishlist(product)}
                  className={`p-3 border rounded-sm transition-all ${isWishlisted(product.id) ? 'bg-maroon-50 border-maroon-700 text-maroon-700' : 'border-stone-300 text-stone-500 hover:border-maroon-500 hover:text-maroon-700'}`}>
                  <Heart size={18} fill={isWishlisted(product.id) ? '#8f1c3c' : 'none'} />
                </button>
              </div>
              <button onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 text-sm font-body font-medium transition-colors rounded-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Order on WhatsApp
              </button>
              <button onClick={handleInquiry}
                className="w-full btn-outline justify-center py-3">
                Send Inquiry via Email
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Orders ₹500+' },
                { icon: RefreshCw, label: 'Easy Return', sub: '3-day window' },
                { icon: Shield, label: '100% Authentic', sub: 'Guaranteed' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1 bg-cream rounded-sm py-3 px-2">
                  <Icon size={16} className="text-maroon-700" />
                  <p className="font-body text-[11px] font-semibold text-maroon-900">{label}</p>
                  <p className="font-body text-[10px] text-stone-400">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-14">
          <div className="flex border-b border-stone-200 gap-6">
            {[['desc', 'Description'], ['care', 'Care Instructions'], ['shipping', 'Shipping & Returns']].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)}
                className={`pb-3 font-body text-sm font-medium border-b-2 transition-all ${tab === id ? 'border-maroon-800 text-maroon-900' : 'border-transparent text-stone-500 hover:text-maroon-800'}`}>
                {label}
              </button>
            ))}
          </div>
          <div className="py-6 max-w-2xl">
            {tab === 'desc' && (
              <div className="font-body text-sm text-stone-600 space-y-3 leading-relaxed">
                <p>{product.description}</p>
                <p>Fabric: <strong>{product.fabric}</strong> · Occasion: <strong>{product.occasion}</strong></p>
                <p>Available in {product.colors.length} colors and {product.sizes.length} size options. Perfect for gifting and personal wardrobe.</p>
              </div>
            )}
            {tab === 'care' && (
              <ul className="font-body text-sm text-stone-600 space-y-2 leading-relaxed list-disc list-inside">
                <li>Dry clean recommended for silk and embroidered pieces</li>
                <li>Hand wash in cold water with mild detergent for cotton fabrics</li>
                <li>Do not bleach or tumble dry</li>
                <li>Iron on low heat on reverse side</li>
                <li>Store in a cool, dry place away from direct sunlight</li>
              </ul>
            )}
            {tab === 'shipping' && (
              <div className="font-body text-sm text-stone-600 space-y-3 leading-relaxed">
                <p><strong>Shipping:</strong> Free shipping on orders above ₹500. Standard delivery 3–7 business days.</p>
                <p><strong>Returns:</strong> Hassle-free returns within 3 days of delivery. Item must be unused with original tags.</p>
                <p><strong>Exchange:</strong> Size exchanges available within 7 days. Contact us on WhatsApp for quick resolution.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-2xl text-maroon-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
