import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Heart, Leaf, Users } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function About() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1610189844804-4ba5f75540f5?w=1400&q=80" alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-maroon-950/65" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-accent text-gold-300 italic text-xl mb-2">Our Story</p>
            <h1 className="font-display text-4xl md:text-5xl text-ivory">About RADHA RANI FASHION</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {/* Story */}
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div variants={fadeUp}>
            <p className="font-accent text-gold-600 italic text-lg mb-3">Est. 2015, Surat</p>
            <h2 className="font-display text-3xl text-maroon-900 mb-4">Celebrating India's Textile Heritage</h2>
            <p className="font-body text-stone-600 leading-relaxed mb-4">
              Founded in 2015 in the heart of Surat, Gujarat — India's textile capital — RADHA RANI FASHION was born out of a deep love for traditional Indian craftsmanship and a mission to make premium ethnic wear accessible to every woman.
            </p>
            <p className="font-body text-stone-600 leading-relaxed mb-6">
              We work directly with master weavers, embroiderers, and artisans across Rajasthan, Varanasi, Gujarat, and Bengal to bring you authentic, handcrafted pieces that tell a story with every thread.
            </p>
            <Link to="/shop" className="btn-primary">Explore Our Collection <ArrowRight size={16} /></Link>
          </motion.div>
          <motion.div variants={fadeUp}>
            <img src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80" alt="Our Story" className="rounded-sm w-full h-80 object-cover shadow-lg" />
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10 border-y border-stone-200">
          {[['8+', 'Years of Excellence'], ['500+', 'Products Curated'], ['10,000+', 'Happy Customers'], ['15+', 'States Delivered']].map(([num, label]) => (
            <div key={label} className="text-center py-4">
              <p className="font-display text-4xl text-maroon-900 font-bold">{num}</p>
              <p className="font-body text-sm text-stone-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="font-accent text-gold-600 italic text-lg mb-1">What Drives Us</p>
            <h2 className="font-display text-3xl text-maroon-900">Our Values</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Award, title: 'Authenticity', desc: 'Every piece is handpicked and quality-verified. We never compromise on craftsmanship.' },
              { icon: Leaf, title: 'Sustainability', desc: 'We champion eco-friendly dyeing and fair trade practices that preserve our artisan communities.' },
              { icon: Heart, title: 'Inclusivity', desc: 'From petite to plus size, every woman deserves to feel like royalty in our garments.' },
              { icon: Users, title: 'Community', desc: 'RADHA RANI FASHION is a celebration of Indian womanhood — past, present, and future.' },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp} className="bg-cream rounded-sm p-6 border border-stone-200 text-center">
                <div className="w-12 h-12 rounded-full bg-maroon-100 flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-maroon-800" />
                </div>
                <h3 className="font-display text-lg text-maroon-900 mb-2">{title}</h3>
                <p className="font-body text-sm text-stone-600 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team / CTA */}
        <div className="bg-maroon-900 rounded-sm p-8 md:p-12 text-center">
          <p className="font-accent text-gold-300 italic text-lg mb-2">Join Us</p>
          <h2 className="font-display text-3xl text-ivory mb-3">Experience the Radhika Difference</h2>
          <p className="font-body text-stone-300 text-sm leading-relaxed max-w-xl mx-auto mb-7">
            Order via WhatsApp for personalised styling assistance, custom sizing, and exclusive deals not available online.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => window.open('https://wa.me/919876543210', '_blank')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm font-body font-semibold rounded-sm transition-colors">
              Chat on WhatsApp
            </button>
            <Link to="/contact" className="bg-white/10 border border-white/20 hover:bg-white/20 text-ivory px-6 py-3 text-sm font-body font-medium rounded-sm transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
