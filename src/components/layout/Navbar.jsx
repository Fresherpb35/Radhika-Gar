import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Phone } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  {
    label: 'Shop', path: '/shop',
    children: [
      { label: 'All Products', path: '/shop' },
      { label: 'Sarees', path: '/shop?category=Sarees' },
      { label: 'Lehengas', path: '/shop?category=Lehengas' },
      { label: 'Kurti Sets', path: '/shop?category=Kurti+Sets' },
      { label: 'Gowns', path: '/shop?category=Gowns' },
      { label: 'Dupattas', path: '/shop?category=Dupattas' },
      { label: 'Palazzo Sets', path: '/shop?category=Palazzo+Sets' },
    ],
  },
  { label: 'Categories', path: '/categories' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { cartCount, wishlist, searchQuery, setSearchQuery, mobileMenuOpen, setMobileMenuOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-maroon-900 text-ivory text-center py-2 text-xs font-body tracking-widest uppercase">
        <span className="opacity-90">Free Shipping on Orders Over ₹500 &nbsp;|&nbsp; WhatsApp: +91 98765 43210 &nbsp;|&nbsp; Summer Sale — Upto 30% Off</span>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-ivory shadow-md' : 'bg-ivory/95 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl md:text-3xl text-maroon-900 tracking-tight">Radhika</span>
                <span className="font-accent text-xs tracking-[0.3em] text-gold-600 uppercase -mt-1">Garment</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative"
                    onMouseEnter={() => setDropdownOpen(link.label)}
                    onMouseLeave={() => setDropdownOpen(null)}>
                    <button className="flex items-center gap-1 px-3 py-2 font-body text-sm font-medium text-maroon-900 hover:text-gold-600 transition-colors">
                      {link.label} <ChevronDown size={14} />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen === link.label && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                          className="absolute top-full left-0 bg-white shadow-xl border border-stone-100 rounded-sm min-w-[180px] py-2 z-50">
                          {link.children.map(child => (
                            <Link key={child.path} to={child.path}
                              className="block px-4 py-2 text-sm font-body text-stone-700 hover:bg-maroon-50 hover:text-maroon-900 transition-colors">
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink key={link.path} to={link.path}
                    className={({ isActive }) => `px-3 py-2 font-body text-sm font-medium transition-colors ${isActive ? 'text-gold-600' : 'text-maroon-900 hover:text-gold-600'}`}>
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-maroon-900 hover:text-gold-600 transition-colors">
                <Search size={20} />
              </button>
              <Link to="/wishlist" className="relative p-2 text-maroon-900 hover:text-gold-600 transition-colors">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-maroon-700 text-ivory text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative p-2 text-maroon-900 hover:text-gold-600 transition-colors">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-maroon-700 text-ivory text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to="/login" className="hidden md:flex p-2 text-maroon-900 hover:text-gold-600 transition-colors">
                <User size={20} />
              </Link>
              <button className="hidden md:flex btn-primary !py-2 !px-4 !text-xs ml-1" onClick={() => window.open('https://wa.me/919876543210', '_blank')}>
                <Phone size={14} /> WhatsApp
              </button>
              <button className="lg:hidden p-2 text-maroon-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="border-t border-stone-200 bg-ivory overflow-hidden">
              <div className="max-w-2xl mx-auto px-4 py-3">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search sarees, lehengas, kurtis…"
                    className="flex-1 border border-stone-300 px-4 py-2 text-sm font-body focus:outline-none focus:border-maroon-700 rounded-sm"
                    autoFocus />
                  <button type="submit" className="btn-primary !py-2 !px-5 !text-sm">Search</button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-72 h-full bg-ivory overflow-y-auto">
              <div className="p-6 border-b border-stone-200">
                <span className="font-display text-2xl text-maroon-900">Radhika Garment</span>
              </div>
              <nav className="p-4 space-y-1">
                {navLinks.map(link => (
                  <div key={link.label}>
                    <NavLink to={link.path} onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-3 font-body font-medium text-maroon-900 hover:bg-maroon-50 rounded-sm">
                      {link.label}
                    </NavLink>
                    {link.children && (
                      <div className="ml-4 space-y-1">
                        {link.children.slice(1).map(c => (
                          <Link key={c.path} to={c.path} onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 text-sm font-body text-stone-600 hover:text-maroon-900">
                            — {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="p-4 border-t border-stone-200 space-y-3">
                <button className="w-full btn-primary justify-center" onClick={() => window.open('https://wa.me/919876543210', '_blank')}>
                  <Phone size={16} /> Order on WhatsApp
                </button>
                <Link to="/login" className="w-full btn-outline justify-center" onClick={() => setMobileMenuOpen(false)}>
                  <User size={16} /> Login / Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
