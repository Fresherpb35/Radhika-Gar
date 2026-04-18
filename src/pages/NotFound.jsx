import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-lg">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <p className="font-display text-[120px] md:text-[160px] text-maroon-100 font-bold leading-none select-none">404</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="font-display text-3xl text-maroon-900 -mt-4 mb-3">Page Not Found</h1>
          <p className="font-body text-stone-500 leading-relaxed mb-8">
            Looks like this page wandered off like a beautiful dupatta in the wind.
            Let's get you back to our collection!
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/" className="btn-primary">
              <Home size={16} /> Go to Homepage
            </Link>
            <Link to="/shop" className="btn-outline">
              <ShoppingBag size={16} /> Browse Shop
            </Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-12 text-center">
          <p className="font-body text-sm text-stone-400">Need help? </p>
          <button onClick={() => window.open('https://wa.me/919876543210', '_blank')}
            className="font-body text-sm text-green-700 hover:underline mt-1 flex items-center gap-1 mx-auto">
            Chat with us on WhatsApp <ArrowRight size={12} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
