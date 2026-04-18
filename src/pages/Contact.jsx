import { useState } from 'react';
import toast from 'react-hot-toast';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Product Inquiry', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`;
    window.open(`mailto:care@radhikagarment.in?subject=${encodeURIComponent(form.subject + ' — ' + form.name)}&body=${encodeURIComponent(body)}`, '_blank');
    toast.success('Opening your email client…');
  };

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-maroon-900 text-ivory py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-accent text-gold-300 italic text-lg mb-1">We'd love to hear from you</p>
          <h1 className="font-display text-3xl md:text-4xl">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="font-display text-2xl text-maroon-900 mb-6">Get in Touch</h2>
          <p className="font-body text-stone-600 text-sm leading-relaxed mb-7">
            Have questions about sizing, bulk orders, or custom designs? We're here to help — reach out via WhatsApp for fastest response!
          </p>

          <div className="space-y-4">
            {[
              { icon: Phone, title: 'WhatsApp / Call', info: '+91 98765 43210', link: 'tel:+919876543210' },
              { icon: Mail, title: 'Email', info: 'care@radhikagarment.in', link: 'mailto:care@radhikagarment.in' },
              { icon: MapPin, title: 'Store Address', info: 'Shop No. 5, Textile Market, Ring Road, Surat, Gujarat – 395003' },
              { icon: Clock, title: 'Store Hours', info: 'Mon–Sat: 10 AM – 8 PM · Sun: 11 AM – 6 PM' },
            ].map(({ icon: Icon, title, info, link }) => (
              <div key={title} className="flex gap-4 items-start bg-cream rounded-sm p-4 border border-stone-200">
                <div className="w-10 h-10 rounded-full bg-maroon-100 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-maroon-800" />
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-maroon-900">{title}</p>
                  {link ? (
                    <a href={link} className="font-body text-sm text-stone-600 hover:text-maroon-800 transition-colors">{info}</a>
                  ) : (
                    <p className="font-body text-sm text-stone-600">{info}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => window.open('https://wa.me/919876543210', '_blank')}
            className="mt-7 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm font-body font-semibold rounded-sm transition-colors">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp — Fastest Response
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-sm p-8 shadow-sm">
          <h2 className="font-display text-2xl text-maroon-900 mb-6">Send an Inquiry</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Full Name', key: 'name', type: 'text', ph: 'Your full name' },
              { label: 'Email', key: 'email', type: 'email', ph: 'your@email.com' },
              { label: 'Phone / WhatsApp', key: 'phone', type: 'tel', ph: '+91 XXXXX XXXXX' },
            ].map(({ label, key, type, ph }) => (
              <div key={key}>
                <label className="font-body text-xs font-medium uppercase tracking-widest text-stone-500 mb-1 block">{label}</label>
                <input type={type} placeholder={ph} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} required
                  className="w-full border border-stone-300 px-4 py-2.5 text-sm font-body focus:outline-none focus:border-maroon-700 rounded-sm transition-colors" />
              </div>
            ))}
            <div>
              <label className="font-body text-xs font-medium uppercase tracking-widest text-stone-500 mb-1 block">Subject</label>
              <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                className="w-full border border-stone-300 px-4 py-2.5 text-sm font-body focus:outline-none focus:border-maroon-700 rounded-sm bg-white">
                {['Product Inquiry', 'Custom Order', 'Bulk / Wholesale', 'Return / Exchange', 'Sizing Help', 'Other'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="font-body text-xs font-medium uppercase tracking-widest text-stone-500 mb-1 block">Message</label>
              <textarea rows={4} placeholder="Tell us what you need…" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required
                className="w-full border border-stone-300 px-4 py-2.5 text-sm font-body focus:outline-none focus:border-maroon-700 rounded-sm resize-none transition-colors" />
            </div>
            <button type="submit" className="w-full btn-primary justify-center py-3">Send Inquiry <ArrowRight size={16} /></button>
          </form>
        </div>
      </div>
    </div>
  );
}
