import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';

const ALL_CATEGORIES = ['All', 'Sarees', 'Lehengas', 'Kurti Sets', 'Gowns', 'Dupattas', 'Palazzo Sets'];
const ALL_TAGS = ['All', 'new', 'bestseller', 'sale', 'trending', 'premium'];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 – ₹1,000', min: 500, max: 1000 },
  { label: '₹1,000 – ₹2,000', min: 1000, max: 2000 },
  { label: 'Above ₹2,000', min: 2000, max: Infinity },
];
const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'asc' },
  { label: 'Price: High to Low', value: 'desc' },
  { label: 'Best Rating', value: 'rating' },
  { label: 'Most Sold', value: 'sold' },
];

export default function Shop() {
  const [params] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState(params.get('category') || 'All');
  const [selectedTag, setSelectedTag] = useState(params.get('tag') || 'All');
  const [priceRange, setPriceRange] = useState(0);
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState(params.get('search') || '');

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCat !== 'All') list = list.filter(p => p.category === selectedCat);
    if (selectedTag !== 'All') list = list.filter(p => p.tags?.includes(selectedTag));
    const { min, max } = PRICE_RANGES[priceRange];
    list = list.filter(p => p.price >= min && p.price <= max);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'sold') list.sort((a, b) => b.sold - a.sold);
    return list;
  }, [selectedCat, selectedTag, priceRange, sort, search]);

  const clearFilters = () => { setSelectedCat('All'); setSelectedTag('All'); setPriceRange(0); setSearch(''); };
  const hasFilters = selectedCat !== 'All' || selectedTag !== 'All' || priceRange !== 0 || search;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Page header */}
      <div className="bg-maroon-900 text-ivory py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-accent text-gold-300 italic text-lg mb-1">Browse Our</p>
          <h1 className="font-display text-3xl md:text-4xl">Collection</h1>
          <p className="font-body text-stone-300 text-sm mt-2">{filtered.length} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 border border-stone-300 px-4 py-2 text-sm font-body text-maroon-900 hover:border-maroon-700 rounded-sm transition-colors">
            <SlidersHorizontal size={15} /> Filters {hasFilters && <span className="bg-maroon-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">!</span>}
          </button>
          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map(c => (
              <button key={c} onClick={() => setSelectedCat(c)}
                className={`px-3 py-1.5 text-xs font-body rounded-sm border transition-all ${selectedCat === c ? 'bg-maroon-800 text-ivory border-maroon-800' : 'border-stone-300 text-stone-600 hover:border-maroon-500'}`}>
                {c}
              </button>
            ))}
          </div>
          {/* Sort */}
          <div className="ml-auto flex items-center gap-2">
            <label className="font-body text-xs text-stone-500">Sort by:</label>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="border border-stone-300 px-3 py-2 text-sm font-body text-maroon-900 focus:outline-none focus:border-maroon-700 rounded-sm bg-white">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Filter panel */}
        {filterOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            className="bg-white border border-stone-200 rounded-sm p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {/* Search */}
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">Search</p>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search products…"
                className="w-full border border-stone-300 px-3 py-2 text-sm font-body focus:outline-none focus:border-maroon-700 rounded-sm" />
            </div>
            {/* Tags */}
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map(t => (
                  <button key={t} onClick={() => setSelectedTag(t)}
                    className={`px-2.5 py-1 text-xs font-body rounded-sm border transition-all capitalize ${selectedTag === t ? 'bg-maroon-800 text-ivory border-maroon-800' : 'border-stone-300 text-stone-600 hover:border-maroon-500'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            {/* Price */}
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">Price Range</p>
              <div className="flex flex-col gap-1.5">
                {PRICE_RANGES.map((r, i) => (
                  <button key={r.label} onClick={() => setPriceRange(i)}
                    className={`text-left text-xs font-body px-2 py-1.5 rounded-sm transition-all ${priceRange === i ? 'bg-maroon-100 text-maroon-900 font-medium' : 'text-stone-600 hover:bg-stone-100'}`}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Clear */}
            <div className="flex items-end">
              {hasFilters && (
                <button onClick={clearFilters}
                  className="flex items-center gap-1 text-xs font-body text-maroon-700 hover:text-maroon-900 underline">
                  <X size={12} /> Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-stone-400">No products found</p>
            <button onClick={clearFilters} className="btn-primary mt-4">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
