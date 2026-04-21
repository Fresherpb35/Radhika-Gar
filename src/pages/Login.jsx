import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(isLogin ? 'Welcome back!' : 'Account created! Welcome to RADHA RANI FASHION.');
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-sm shadow-lg w-full max-w-md p-8">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="font-display text-3xl text-maroon-900">RADHA RANI FASHION</span>
          </Link>
          <div className="divider-gold w-32 mx-auto mt-2" />
          <p className="font-body text-stone-500 text-sm mt-3">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex border border-stone-200 rounded-sm mb-6">
          {['Login', 'Register'].map((t, i) => (
            <button key={t} onClick={() => setIsLogin(i === 0)}
              className={`flex-1 py-2.5 text-sm font-body font-medium transition-all rounded-sm ${(i === 0 ? isLogin : !isLogin) ? 'bg-maroon-800 text-ivory' : 'text-stone-500 hover:bg-stone-50'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="font-body text-xs font-medium uppercase tracking-widest text-stone-500 mb-1 block">Full Name</label>
              <input type="text" placeholder="Your full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-stone-300 px-4 py-2.5 text-sm font-body focus:outline-none focus:border-maroon-700 rounded-sm" />
            </div>
          )}
          <div>
            <label className="font-body text-xs font-medium uppercase tracking-widest text-stone-500 mb-1 block">Email Address</label>
            <input type="email" placeholder="your@email.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full border border-stone-300 px-4 py-2.5 text-sm font-body focus:outline-none focus:border-maroon-700 rounded-sm" />
          </div>
          <div>
            <label className="font-body text-xs font-medium uppercase tracking-widest text-stone-500 mb-1 block">Password</label>
            <input type="password" placeholder="••••••••" required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full border border-stone-300 px-4 py-2.5 text-sm font-body focus:outline-none focus:border-maroon-700 rounded-sm" />
          </div>
          {!isLogin && (
            <div>
              <label className="font-body text-xs font-medium uppercase tracking-widest text-stone-500 mb-1 block">Phone / WhatsApp</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full border border-stone-300 px-4 py-2.5 text-sm font-body focus:outline-none focus:border-maroon-700 rounded-sm" />
            </div>
          )}
          {isLogin && (
            <div className="text-right -mt-1">
              <a href="#" className="font-body text-xs text-maroon-700 hover:underline">Forgot password?</a>
            </div>
          )}
          <button type="submit" className="w-full btn-primary justify-center py-3 mt-2">
            {isLogin ? 'Sign In to My Account' : 'Create Account'}
          </button>
        </form>

        {/* Social / divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 border-t border-stone-200" />
          <span className="font-body text-xs text-stone-400">or continue with</span>
          <div className="flex-1 border-t border-stone-200" />
        </div>
        <button onClick={() => window.open('https://wa.me/919876543210', '_blank')}
          className="w-full flex items-center justify-center gap-2 border border-green-300 bg-green-50 hover:bg-green-100 text-green-800 py-2.5 text-sm font-body font-medium rounded-sm transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-green-600"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Order directly via WhatsApp
        </button>

        <p className="text-center font-body text-xs text-stone-500 mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-maroon-700 hover:underline font-medium">
            {isLogin ? 'Register here' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
