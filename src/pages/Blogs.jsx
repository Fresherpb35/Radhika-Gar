import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';

const posts = [
  {
    id: 1, title: 'How to Style a Banarasi Saree for Every Occasion',
    excerpt: 'From weddings to office parties — here are our top tips for draping and accessorising a Banarasi saree to make every occasion unforgettable.',
    date: 'April 10, 2025', category: 'Style Guide', readTime: '5 min',
    img: 'https://images.unsplash.com/photo-1610189844804-4ba5f75540f5?w=700&q=80',
    author: 'Radhika Team',
  },
  {
    id: 2, title: 'The Ultimate Guide to Choosing Your Wedding Lehenga',
    excerpt: 'Finding the perfect lehenga can be overwhelming. We break down fabric, silhouette, embroidery, and colour choices for your big day.',
    date: 'March 28, 2025', category: 'Bridal', readTime: '8 min',
    img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=700&q=80',
    author: 'Priya Sharma',
  },
  {
    id: 3, title: '5 Must-Have Kurti Sets for Summer 2025',
    excerpt: 'Stay cool and stylish with these breathable cotton and chanderi kurti sets that are perfect for the Indian summer.',
    date: 'March 15, 2025', category: 'Trends', readTime: '4 min',
    img: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=700&q=80',
    author: 'Radhika Team',
  },
  {
    id: 4, title: 'How to Care for Your Silk and Embroidered Garments',
    excerpt: 'Expert care tips to ensure your precious ethnic wear stays vibrant and beautiful for years to come. Learn the dos and don\'ts.',
    date: 'February 20, 2025', category: 'Care Tips', readTime: '6 min',
    img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=700&q=80',
    author: 'Sunita Mehta',
  },
  {
    id: 5, title: 'Palazzo Sets: The Perfect Fusion of Comfort and Style',
    excerpt: 'Why every Indian woman needs at least one palazzo set in her wardrobe — and how to style it for different occasions.',
    date: 'February 5, 2025', category: 'Fashion', readTime: '5 min',
    img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=700&q=80',
    author: 'Radhika Team',
  },
  {
    id: 6, title: 'Festive Season Lookbook: Navratri to Diwali',
    excerpt: 'Curated ethnic looks for every festive occasion from Navratri\'s garba to Diwali celebrations — all from our latest collection.',
    date: 'January 28, 2025', category: 'Lookbook', readTime: '7 min',
    img: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=700&q=80',
    author: 'Kavya Reddy',
  },
];

const catColors = {
  'Style Guide': 'bg-maroon-100 text-maroon-800',
  'Bridal': 'bg-rose-100 text-rose-800',
  'Trends': 'bg-purple-100 text-purple-800',
  'Care Tips': 'bg-emerald-100 text-emerald-800',
  'Fashion': 'bg-amber-100 text-amber-800',
  'Lookbook': 'bg-blue-100 text-blue-800',
};

export default function Blogs() {
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-maroon-900 text-ivory py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-accent text-gold-300 italic text-lg mb-1">Fashion, Style & Care</p>
          <h1 className="font-display text-3xl md:text-4xl">Our Blogs</h1>
          <p className="font-body text-stone-300 text-sm mt-1">Style guides, care tips & fashion inspiration</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured post */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all mb-10 grid md:grid-cols-2">
          <div className="h-64 md:h-auto overflow-hidden">
            <img src={featured.img} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className={`tag ${catColors[featured.category]}`}>{featured.category}</span>
              <span className="font-body text-xs text-stone-400 flex items-center gap-1"><Clock size={11} /> {featured.readTime} read</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-maroon-900 mb-3 group-hover:text-gold-600 transition-colors">{featured.title}</h2>
            <p className="font-body text-stone-600 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm font-medium text-maroon-900">{featured.author}</p>
                <p className="font-body text-xs text-stone-400">{featured.date}</p>
              </div>
              <a href="#" className="btn-outline !py-2 !px-4 !text-sm">Read More <ArrowRight size={14} /></a>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col">
              <div className="h-48 overflow-hidden">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`tag ${catColors[post.category]}`}>{post.category}</span>
                  <span className="font-body text-xs text-stone-400 flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                </div>
                <h2 className="font-display text-lg text-maroon-900 mb-2 group-hover:text-gold-600 transition-colors flex-1">{post.title}</h2>
                <p className="font-body text-sm text-stone-600 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <p className="font-body text-xs font-medium text-maroon-900">{post.author}</p>
                    <p className="font-body text-xs text-stone-400">{post.date}</p>
                  </div>
                  <a href="#" className="font-body text-sm text-maroon-800 hover:text-gold-600 transition-colors flex items-center gap-1">
                    Read <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
