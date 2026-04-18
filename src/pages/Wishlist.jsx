import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/product/ProductCard';

export default function Wishlist() {
  const { wishlist } = useApp();
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-maroon-900 text-ivory py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl">My Wishlist</h1>
          <p className="font-body text-stone-300 text-sm mt-1">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {wishlist.length === 0 ? (
          <div className="text-center py-24">
            <Heart size={52} className="text-stone-200 mx-auto mb-4" />
            <p className="font-display text-2xl text-stone-400">Your wishlist is empty</p>
            <p className="font-body text-stone-400 text-sm mt-2 mb-8">Save pieces you love by clicking the heart icon.</p>
            <Link to="/shop" className="btn-primary">Start Browsing <ArrowRight size={16} /></Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
            {wishlist.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
