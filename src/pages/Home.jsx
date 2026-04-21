import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Truck, RefreshCw, Headphones, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { products, categories, reviews } from '../data/products';
import ProductCard from '../components/product/ProductCard';

// ── Animation helpers ────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.section>
  );
}

// ── WhatsApp SVG ─────────────────────────────────────────────────
const WASvg = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ── Hero Slider ──────────────────────────────────────────────────
const heroSlides = [
  {
    bg: 'https://images.unsplash.com/photo-1618901185975-d59f7091bcfe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FyZWV8ZW58MHx8MHx8fDA%3D',
    tag: 'New Collection 2025',
    title: 'Draped in\nTradition',
    subtitle: 'Exquisite Banarasi & Silk Sarees — handpicked for the modern woman',
    cta: 'Explore Sarees',
    link: '/shop?category=Sarees',
  },
  {
    bg: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1400&q=85',
    tag: 'Bridal Season',
    title: 'Lehengas\nof Dreams',
    subtitle: 'Embroidered bridal lehengas crafted with love and heritage',
    cta: 'Shop Lehengas',
    link: '/shop?category=Lehengas',
  },
  {
    bg: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=1400&q=85',
    tag: 'Summer Essentials',
    title: 'Effortless\nElegance',
    subtitle: 'Pure cotton kurti sets that breathe style into every day',
    cta: 'Shop Kurti Sets',
    link: '/shop?category=Kurti+Sets',
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);
  const slide = heroSlides[current];

  return (
    <div className="relative h-[520px] md:h-[680px] lg:h-[760px] overflow-hidden">
      {heroSlides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <img src={s.bg} alt="" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/80 via-maroon-950/40 to-transparent" />
        </div>
      ))}

      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div key={current} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="max-w-xl">
            <span className="tag bg-gold-500 text-white mb-4 inline-block">{slide.tag}</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ivory leading-tight whitespace-pre-line">{slide.title}</h1>
            <p className="font-body text-ivory/80 mt-4 text-base md:text-lg leading-relaxed">{slide.subtitle}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to={slide.link} className="btn-gold">{slide.cta} <ArrowRight size={16} /></Link>
              <Link to="/categories" className="bg-white/10 hover:bg-white/20 border border-white/30 text-ivory px-6 py-3 font-body font-medium tracking-wide rounded-sm inline-flex items-center gap-2 transition-all">
                All Categories
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-gold-400 w-8' : 'bg-white/40 w-3'}`} />
        ))}
      </div>
      <button onClick={() => setCurrent(c => (c - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 p-2 rounded-full text-ivory transition-all"><ChevronLeft size={20} /></button>
      <button onClick={() => setCurrent(c => (c + 1) % heroSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 p-2 rounded-full text-ivory transition-all"><ChevronRight size={20} /></button>
    </div>
  );
}

// ── Trust Badges ─────────────────────────────────────────────────
function TrustBadges() {
  const badges = [
    { icon: Truck, title: 'Free Shipping', sub: 'On orders over ₹500' },
    { icon: RefreshCw, title: 'Easy Returns', sub: 'Within 3 days' },
    { icon: ShieldCheck, title: '100% Authentic', sub: 'Genuine products only' },
    { icon: Headphones, title: '24/7 Support', sub: 'Always here for you' },
  ];
  return (
    <div className="bg-white border-y border-stone-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-maroon-50 flex items-center justify-center flex-shrink-0">
              <Icon size={18} className="text-maroon-800" />
            </div>
            <div>
              <p className="font-body font-semibold text-sm text-maroon-900">{title}</p>
              <p className="font-body text-xs text-stone-500">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Category Grid ─────────────────────────────────────────────────
function CategoryGrid() {
  return (
    <Section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div variants={fadeUp} className="text-center mb-10">
        <p className="font-accent text-gold-600 text-lg italic mb-1">Explore by</p>
        <h2 className="section-title">Trending Categories</h2>
        <div className="divider-gold w-48 mx-auto mt-3" />
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <motion.div key={cat.id} variants={fadeUp} transition={{ delay: i * 0.08 }}>
            <Link to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group block rounded-sm overflow-hidden relative aspect-[3/4] bg-stone-100 shadow-sm hover:shadow-lg transition-shadow">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                <p className="font-display text-sm text-ivory font-semibold">{cat.name}</p>
                <p className="font-accent text-[11px] text-gold-300 italic">{cat.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ── Marquee Strip ─────────────────────────────────────────────────
function MarqueeBanner() {
  const items = ['✦ Banarasi Sarees', '✦ Bridal Lehengas', '✦ Cotton Kurtis', '✦ Embroidered Gowns', '✦ Silk Dupattas', '✦ Palazzo Sets', '✦ Festival Collection', '✦ Summer Sale'];
  const doubled = [...items, ...items];
  return (
    <div className="bg-maroon-900 py-3 overflow-hidden">
      <div className="marquee-inner gap-8">
        {doubled.map((item, i) => (
          <span key={i} className="font-body text-xs uppercase tracking-widest text-gold-300 mx-6 whitespace-nowrap">{item}</span>
        ))}
      </div>
    </div>
  );
}

// ── Best Sellers ─────────────────────────────────────────────────
function BestSellers() {
  const best = products.filter(p => p.tags?.includes('bestseller')).slice(0, 4);
  return (
    <Section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-10">
          <p className="font-accent text-gold-600 text-lg italic mb-1">Our Favourites</p>
          <h2 className="section-title">Best Sellers</h2>
          <div className="divider-gold w-48 mx-auto mt-3" />
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {best.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <motion.div variants={fadeUp} className="text-center mt-10">
          <Link to="/shop?tag=bestseller" className="btn-outline">View All Best Sellers <ArrowRight size={16} /></Link>
        </motion.div>
      </div>
    </Section>
  );
}

// ── Promo Banners ─────────────────────────────────────────────────
function PromoBanners() {
  const promos = [
    { title: 'Save Upto 15%', sub: 'On Kurti Sets', tag: 'Offer!', link: '/shop?category=Kurti+Sets', img: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&q=80', grad: 'from-rose-900 to-maroon-900' },
    { title: 'Save Upto 25%', sub: 'On Lehenga Choli', tag: 'Deals!', link: '/shop?category=Lehengas', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80', grad: 'from-maroon-900 to-stone-900' },
    { title: '10% – 30% OFF', sub: 'Festive Sale!', tag: 'Sale!', link: '/shop?tag=sale', img: 'https://images.unsplash.com/photo-1610189844804-4ba5f75540f5?w=400&q=80', grad: 'from-amber-900 to-stone-900' },
  ];
  return (
    <Section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {promos.map(({ title, sub, tag, link, img, grad }) => (
          <motion.div key={title} variants={fadeUp}>
            <Link to={link} className={`group relative flex items-center justify-between rounded-sm overflow-hidden bg-gradient-to-r ${grad} p-6 h-36 md:h-44 shadow-md hover:shadow-xl transition-shadow`}>
              <img src={img} alt="" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10">
                <span className="tag bg-gold-500 text-white mb-2 inline-block">{tag}</span>
                <p className="font-display text-xl text-ivory font-semibold">{title}</p>
                <p className="font-accent text-gold-300 text-base italic">{sub}</p>
                <span className="font-body text-xs text-white/70 mt-2 flex items-center gap-1">Shop Now <ArrowRight size={12} /></span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ── New Arrivals ─────────────────────────────────────────────────
function NewArrivals() {
  const newProds = products.filter(p => p.tags?.includes('new')).slice(0, 4);
  return (
    <Section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="flex items-end justify-between mb-10">
          <div>
            <p className="font-accent text-gold-600 text-lg italic mb-1">Fresh & Fabulous</p>
            <h2 className="font-display text-3xl md:text-4xl text-maroon-900">New Arrivals</h2>
            <div className="divider-gold w-48 mt-3" />
          </div>
          <Link to="/shop?tag=new" className="hidden md:flex items-center gap-1 font-body text-sm text-maroon-800 hover:text-gold-600 transition-colors">
            View All <ArrowRight size={14} />
          </Link>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newProds.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <motion.div variants={fadeUp} className="text-center mt-8 md:hidden">
          <Link to="/shop?tag=new" className="btn-outline">View All <ArrowRight size={16} /></Link>
        </motion.div>
      </div>
    </Section>
  );
}

// ── Sale Banner ──────────────────────────────────────────────────
function SaleBanner() {
  return (
    <div className="relative h-64 md:h-80 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=1400&q=85" alt="" className="w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-maroon-950/70" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <span className="tag bg-gold-500 text-white mb-4">Summer Sale Begins!</span>
        <h2 className="font-display text-4xl md:text-5xl text-ivory">Upto <span className="text-gold-400">30% Off</span></h2>
        <p className="font-body text-ivory/70 mt-2 mb-6 text-sm">
          30 March – 5 June · Use code <strong className="text-gold-300 font-semibold">RADHIKA50</strong>
        </p>
        <Link to="/shop?tag=sale" className="btn-gold">Shop the Sale <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}

// ── Reviews ──────────────────────────────────────────────────────
function Reviews() {
  return (
    <Section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-10">
          <p className="font-accent text-gold-600 text-lg italic mb-1">What Our Customers Say</p>
          <h2 className="section-title">Loved by Women Across India</h2>
          <div className="divider-gold w-48 mx-auto mt-3" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div key={r.id} variants={fadeUp} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-sm p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-maroon-800 text-ivory flex items-center justify-center font-body font-bold text-sm flex-shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-maroon-900">{r.name}</p>
                  <p className="font-body text-xs text-stone-400">{r.location}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} size={12} className="text-gold-500 fill-gold-500" />)}
                </div>
              </div>
              <p className="font-body text-sm text-stone-600 leading-relaxed italic">"{r.text}"</p>
              <p className="font-body text-[10px] text-stone-400 mt-3 uppercase tracking-widest">{r.product}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── Newsletter ───────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); setEmail(''); alert('Thank you for subscribing!'); };
  return (
    <Section className="py-14 bg-maroon-900">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div variants={fadeUp}>
          <p className="font-accent text-gold-300 text-lg italic mb-2">Stay Updated</p>
          <h2 className="font-display text-3xl text-ivory mb-3">Join the Radhika Family</h2>
          <p className="font-body text-stone-300 text-sm mb-7">Get exclusive offers, new arrivals & festival deals straight to your inbox.</p>
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required
              className="flex-1 px-4 py-3 bg-maroon-950 border border-maroon-700 text-ivory placeholder-stone-500 text-sm font-body focus:outline-none focus:border-gold-500 rounded-sm" />
            <button type="submit" className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 text-sm font-body font-medium transition-colors rounded-sm whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}

// ── WhatsApp Floating Button ─────────────────────────────────────
function WhatsAppFloat() {
  return (
    <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

// ── Home Page ─────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <CategoryGrid />
      <MarqueeBanner />
      <BestSellers />
      <PromoBanners />
      <NewArrivals />
      <SaleBanner />
      <Reviews />
      <Newsletter />
      <WhatsAppFloat />
    </>
  );
}
