import { useState } from 'react';
import { X, Ruler } from 'lucide-react';

const sizeRows = [
  { size:'XS', chest:'32"', waist:'26"', hip:'35"' },
  { size:'S',  chest:'34"', waist:'28"', hip:'37"' },
  { size:'M',  chest:'36"', waist:'30"', hip:'39"' },
  { size:'L',  chest:'38"', waist:'32"', hip:'41"' },
  { size:'XL', chest:'40"', waist:'34"', hip:'43"' },
  { size:'XXL',chest:'42"', waist:'36"', hip:'45"' },
  { size:'3XL',chest:'44"', waist:'38"', hip:'47"' },
];

export default function SizeGuide() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="flex items-center gap-1 font-body text-xs text-maroon-700 hover:text-gold-600 underline underline-offset-2 transition-colors">
        <Ruler size={12} /> Size Guide
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-sm p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl text-maroon-900">Size Guide</h3>
              <button onClick={() => setOpen(false)} className="text-stone-400 hover:text-maroon-800"><X size={18} /></button>
            </div>
            <p className="font-body text-xs text-stone-500 mb-4">All measurements in inches. Measure over your inner garments for best fit.</p>
            <table className="w-full font-body text-sm border-collapse">
              <thead>
                <tr className="bg-maroon-50">
                  {['Size','Chest','Waist','Hip'].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-maroon-900 uppercase tracking-wider border border-stone-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeRows.map((row, i) => (
                  <tr key={row.size} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                    <td className="px-3 py-2 font-semibold text-maroon-900 border border-stone-200">{row.size}</td>
                    <td className="px-3 py-2 text-stone-600 border border-stone-200">{row.chest}</td>
                    <td className="px-3 py-2 text-stone-600 border border-stone-200">{row.waist}</td>
                    <td className="px-3 py-2 text-stone-600 border border-stone-200">{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="font-body text-xs text-stone-400 mt-4">
              Need sizing help?{' '}
              <button onClick={() => window.open('https://wa.me/919876543210','_blank')} className="text-green-700 underline">Chat on WhatsApp</button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
