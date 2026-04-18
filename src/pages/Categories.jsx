import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories, products } from '../data/products';

export default function Categories() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-maroon-900 text-ivory py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-accent text-gold-300 italic text-lg mb-1">Browse by Style</p>
          <h1 className="font-display text-3xl md:text-4xl">All Categories</h1>
          <p className="font-body text-stone-300 text-sm mt-1">Explore our curated ethnic wear collections</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => {
            const catProducts = products.filter(p => p.category === cat.name).slice(0, 3);
            return (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <Link to={`/shop?category=${encodeURIComponent(cat.name)}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-maroon-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h2 className="font-display text-2xl text-ivory">{cat.name}</h2>
                      <p className="font-accent text-gold-300 italic">{cat.description}</p>
                    </div>
                  </div>
                </Link>
                <div className="p-4">
                  <div className="flex gap-2 mb-3">
                    {catProducts.map(p => (
                      <Link key={p.id} to={`/product/${p.slug}`} className="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 border border-stone-100 hover:border-maroon-300 transition-colors">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-body text-xs text-stone-500">{cat.count} products</p>
                    <Link to={`/shop?category=${encodeURIComponent(cat.name)}`}
                      className="flex items-center gap-1 font-body text-sm text-maroon-800 hover:text-gold-600 transition-colors font-medium">
                      Shop Now <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
