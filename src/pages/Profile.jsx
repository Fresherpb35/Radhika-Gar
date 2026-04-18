import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, Settings, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/product/ProductCard';
import toast from 'react-hot-toast';

export default function Profile() {
  const [tab, setTab] = useState('orders');
  const { wishlist } = useApp();
  const [profile, setProfile] = useState({ name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210', city: 'Mumbai', pincode: '400001' });

  const tabs = [
    { id: 'orders', icon: Package, label: 'My Orders' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'settings', icon: Settings, label: 'Account Settings' },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Profile Header */}
      <div className="bg-maroon-900 text-ivory py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-maroon-700 border-2 border-gold-500 flex items-center justify-center text-2xl font-display font-bold text-ivory">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-display text-2xl text-ivory">{profile.name}</h1>
            <p className="font-body text-stone-300 text-sm">{profile.email}</p>
            <p className="font-body text-stone-400 text-xs mt-0.5">Member since January 2023</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tab nav */}
        <div className="flex gap-1 mb-8 border-b border-stone-200 overflow-x-auto">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 pb-3 px-3 font-body text-sm font-medium border-b-2 whitespace-nowrap transition-all ${tab === id ? 'border-maroon-800 text-maroon-900' : 'border-transparent text-stone-500 hover:text-maroon-800'}`}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* Orders */}
        {tab === 'orders' && (
          <div className="text-center py-16">
            <Package size={48} className="text-stone-200 mx-auto mb-4" />
            <p className="font-display text-2xl text-stone-400">No orders yet</p>
            <p className="font-body text-stone-400 text-sm mt-2 mb-7">Orders placed via WhatsApp will appear here once linked to your account.</p>
            <div className="flex gap-3 justify-center">
              <Link to="/shop" className="btn-primary">Start Shopping <ArrowRight size={16} /></Link>
              <button onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm font-body font-medium rounded-sm transition-colors">
                Order via WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* Wishlist */}
        {tab === 'wishlist' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-maroon-900">{wishlist.length} Saved Items</h2>
              {wishlist.length > 0 && <Link to="/wishlist" className="font-body text-sm text-maroon-800 hover:text-gold-600">View All →</Link>}
            </div>
            {wishlist.length === 0 ? (
              <div className="text-center py-16">
                <Heart size={48} className="text-stone-200 mx-auto mb-4" />
                <p className="font-display text-2xl text-stone-400">No saved items</p>
                <Link to="/shop" className="btn-primary mt-6 inline-flex">Browse Products</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {wishlist.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        )}

        {/* Settings */}
        {tab === 'settings' && (
          <div className="max-w-lg">
            <h2 className="font-display text-xl text-maroon-900 mb-6">Account Details</h2>
            <div className="space-y-4">
              {[
                { label: 'Full Name', key: 'name' },
                { label: 'Email Address', key: 'email', type: 'email' },
                { label: 'Phone / WhatsApp', key: 'phone', type: 'tel' },
                { label: 'City', key: 'city' },
                { label: 'PIN Code', key: 'pincode' },
              ].map(({ label, key, type = 'text' }) => (
                <div key={key}>
                  <label className="font-body text-xs font-medium uppercase tracking-widest text-stone-500 mb-1 block">{label}</label>
                  <input type={type} value={profile[key]} onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full border border-stone-300 px-4 py-2.5 text-sm font-body focus:outline-none focus:border-maroon-700 rounded-sm" />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={() => toast.success('Profile updated!')} className="btn-primary">Save Changes</button>
                <button onClick={() => toast('Logged out', { icon: '👋' })} className="btn-outline">Logout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
