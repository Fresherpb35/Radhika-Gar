import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-maroon-950 text-stone-300">
      {/* Newsletter Strip */}
      <div className="bg-maroon-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl text-ivory">Stay in the Loop</h3>
            <p className="font-body text-sm text-stone-400 mt-1">Get exclusive offers, new arrivals & festive deals straight to your inbox.</p>
          </div>
          <form className="flex w-full md:w-auto gap-2" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Your email address"
              className="flex-1 md:w-64 px-4 py-2.5 bg-maroon-950 border border-maroon-700 text-ivory placeholder-stone-500 text-sm font-body focus:outline-none focus:border-gold-500 rounded-sm" />
            <button type="submit" className="bg-gold-500 hover:bg-gold-600 text-white px-5 py-2.5 text-sm font-body font-medium transition-colors rounded-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <span className="font-display text-2xl text-ivory">Radhika Garment</span>
          </Link>
          <p className="font-body text-sm text-stone-400 leading-relaxed mb-5">
            Premium women's ethnic fashion rooted in tradition, crafted for the modern woman. Celebrating India's rich textile heritage since 2015.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Instagram, href: '#' },
              { icon: Facebook, href: '#' },
              { icon: Youtube, href: '#' },
            ].map(({ icon: Icon, href }) => (
              <a key={href} href={href} className="w-8 h-8 rounded-full bg-maroon-800 flex items-center justify-center text-stone-300 hover:bg-gold-500 hover:text-white transition-all">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-body font-semibold text-ivory uppercase tracking-wider text-xs mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { label: 'Home', to: '/' }, { label: 'Shop All', to: '/shop' },
              { label: 'Categories', to: '/categories' }, { label: 'New Arrivals', to: '/shop?tag=new' },
              { label: 'Best Sellers', to: '/shop?tag=bestseller' }, { label: 'Sale Items', to: '/shop?tag=sale' },
              { label: 'About Us', to: '/about' }, { label: 'Blogs', to: '/blogs' },
            ].map(l => (
              <li key={l.to}><Link to={l.to} className="font-body text-sm text-stone-400 hover:text-gold-400 transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="font-body font-semibold text-ivory uppercase tracking-wider text-xs mb-5">Policies</h4>
          <ul className="space-y-3">
            {[
              { label: 'Privacy Policy', to: '/policies#privacy' },
              { label: 'Return & Exchange', to: '/policies#returns' },
              { label: 'Shipping Policy', to: '/policies#shipping' },
              { label: 'Terms of Service', to: '/policies#terms' },
              { label: 'FAQ', to: '/policies#faq' },
            ].map(l => (
              <li key={l.to}><Link to={l.to} className="font-body text-sm text-stone-400 hover:text-gold-400 transition-colors">{l.label}</Link></li>
            ))}
          </ul>
          <div className="mt-6 space-y-2">
            <p className="font-body text-xs text-stone-500 uppercase tracking-widest">We Accept</p>
            <div className="flex gap-2 flex-wrap">
              {['UPI', 'VISA', 'MC', 'RuPay'].map(m => (
                <span key={m} className="px-2 py-1 bg-maroon-900 text-stone-300 text-xs font-body rounded border border-maroon-700">{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-body font-semibold text-ivory uppercase tracking-wider text-xs mb-5">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPin size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
              <span className="font-body text-sm text-stone-400">Shop No. 5, Textile Market, Surat, Gujarat – 395003</span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="text-gold-500 flex-shrink-0" />
              <a href="tel:+919876543210" className="font-body text-sm text-stone-400 hover:text-gold-400">+91 98765 43210</a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="text-gold-500 flex-shrink-0" />
              <a href="mailto:care@radhikagarment.in" className="font-body text-sm text-stone-400 hover:text-gold-400">care@radhikagarment.in</a>
            </li>
          </ul>
          <button onClick={() => window.open('https://wa.me/919876543210', '_blank')}
            className="mt-5 flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-4 py-2.5 text-sm font-body font-medium rounded-sm transition-colors">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-maroon-900 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-stone-500">© {year} Radhika Garment. All rights reserved.</p>
          <p className="font-body text-xs text-stone-500 flex items-center gap-1">Made with <Heart size={11} className="text-maroon-500 fill-maroon-500" /> in India</p>
        </div>
      </div>
    </footer>
  );
}
