import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Eye, Star, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const TAG_STYLES = {
  bestseller: 'bg-gold-500 text-white',
  new: 'bg-emerald-600 text-white',
  sale: 'bg-maroon-700 text-white',
  trending: 'bg-purple-600 text-white',
  premium: 'bg-stone-800 text-white',
};

const colorMap = {
  'Crimson': '#dc143c', 'Royal Blue': '#4169e1', 'Emerald Green': '#50c878',
  'Peach': '#ffcba4', 'Lavender': '#e6e6fa', 'Mint': '#98ff98',
  'Rani Pink': '#e75480', 'Deep Red': '#8b0000', 'Gold': '#ffd700',
  'Sky Blue': '#87ceeb', 'Rose': '#ff007f', 'Lilac': '#c8a2c8',
  'Indigo': '#4b0082', 'Rust': '#b7410e', 'Sage Green': '#9dc183',
  'Wine': '#722f37', 'Navy': '#000080', 'Beige': '#f5f5dc',
  'Magenta': '#ff00ff', 'Turquoise': '#40e0d0', 'Midnight Blue': '#191970',
  'Maroon': '#800000', 'Black': '#222222', 'Blush Pink': '#ffb6c1',
  'Champagne': '#f7e7ce', 'Ivory': '#fffff0', 'Fuchsia': '#ff77ff',
  'Aqua': '#00ffff', 'Coral': '#ff7f50', 'Lemon Yellow': '#fff44f',
  'Mint Green': '#98ff98', 'Baby Pink': '#ffb6c1', 'Orange': '#ff8c00',
  'Red': '#cc0000', 'Teal': '#008080', 'Terracotta': '#c66b3d',
  'Cobalt': '#0047ab', 'Olive': '#808000', 'White': '#f9f9f9', 'Mustard': '#e1ad01',
};

export default function ProductCard({ product, index = 0 }) {
  const { toggleWishlist, isWishlisted, setQuickViewProduct, addToCart } = useApp();
  const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      <div className="relative product-img-wrap aspect-[3/4] bg-stone-100">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" loading="lazy" />

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.tags?.slice(0, 2).map(tag => (
            <span key={tag} className={`tag ${TAG_STYLES[tag] || 'bg-stone-600 text-white'}`}>
              {tag === 'new' ? 'New' : tag === 'bestseller' ? 'Best Seller' : tag === 'sale' ? `-${discountPct}%` : tag.charAt(0).toUpperCase() + tag.slice(1)}
            </span>
          ))}
        </div>

        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button onClick={() => toggleWishlist(product)}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${isWishlisted(product.id) ? 'bg-maroon-700 text-white' : 'bg-white text-maroon-700 hover:bg-maroon-700 hover:text-white'}`}>
            <Heart size={14} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
          </button>
          <button onClick={() => setQuickViewProduct(product)}
            className="w-8 h-8 rounded-full bg-white text-maroon-700 hover:bg-maroon-700 hover:text-white flex items-center justify-center shadow-md transition-all">
            <Eye size={14} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-maroon-900/90 text-ivory text-xs font-body font-medium text-center py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 cursor-pointer"
          onClick={() => addToCart(product, product.colors[0], product.sizes[0])}>
          <span className="flex items-center justify-center gap-2"><ShoppingBag size={13} /> Add to Bag</span>
        </div>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <p className="font-body text-[10px] text-stone-400 uppercase tracking-widest mb-0.5">{product.category}</p>
        <Link to={`/product/${product.slug}`} className="font-display text-sm text-maroon-900 leading-snug hover:text-gold-600 transition-colors line-clamp-2 flex-1">
          {product.name}
        </Link>
        <div className="flex items-center gap-1 mt-1.5 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'text-gold-500 fill-gold-500' : 'text-stone-300 fill-stone-300'} />)}
          </div>
          <span className="font-body text-[10px] text-stone-400">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display font-semibold text-maroon-900">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && <span className="font-body text-xs text-stone-400 line-through">₹{product.originalPrice.toLocaleString()}</span>}
          {discountPct > 0 && <span className="font-body text-xs text-emerald-600 font-medium">{discountPct}% off</span>}
        </div>
        <div className="flex items-center gap-1 mt-2">
          {product.colors.slice(0, 4).map(c => (
            <span key={c} title={c} className="w-3 h-3 rounded-full border border-stone-200" style={{ background: colorMap[c] || '#ccc' }} />
          ))}
          {product.colors.length > 4 && <span className="font-body text-[10px] text-stone-400">+{product.colors.length - 4}</span>}
        </div>
      </div>
    </motion.div>
  );
}
