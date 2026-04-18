import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sections = [
  {
    id: 'shipping', title: '🚚 Shipping Policy',
    content: `Free standard shipping on all orders above ₹500. Orders below ₹500 incur a flat shipping charge of ₹99.

Delivery timelines: Standard delivery 3–7 business days. Express delivery 1–2 days (available in select cities, additional charge applies).

We ship via trusted courier partners: Delhivery, BlueDart, and India Post. Once your order is dispatched, you will receive a tracking link via SMS/WhatsApp.

International shipping is not currently available.`,
  },
  {
    id: 'returns', title: '↩️ Return & Exchange Policy',
    content: `We accept returns within 3 days of delivery for unused, unwashed items with original packaging and tags intact.

Non-returnable items: Customised/stitched garments, sale items marked "Final Sale", innerwear and accessories.

For size exchanges, contact us within 7 days on WhatsApp. Exchanges are subject to stock availability.

Refund process: Once we receive the returned item and verify its condition, refunds are processed within 5–7 business days to your original payment method.

To initiate a return, WhatsApp us at +91 98765 43210 with your order details and reason for return.`,
  },
  {
    id: 'privacy', title: '🔒 Privacy Policy',
    content: `Your personal data (name, email, phone, address) is collected solely to process orders and provide customer support.

We never share, sell, or rent your personal information to third parties without your explicit consent.

We use industry-standard SSL encryption to protect your information during transmission.

Cookies are used to improve your browsing experience. You may disable cookies in your browser settings, though this may affect site functionality.

You may request deletion of your account data by contacting us at care@radhikagarment.in.`,
  },
  {
    id: 'terms', title: '📋 Terms of Service',
    content: `By accessing and using Radhika Garment, you agree to be bound by these Terms of Service.

All products are subject to availability. Prices may change without prior notice. Images are for representation purposes only; actual product colours may vary slightly due to photography and display settings.

We reserve the right to cancel orders that appear fraudulent, or where errors in pricing occur.

Promotional offers and coupon codes cannot be combined unless explicitly stated.

Any disputes arising from use of this website are subject to jurisdiction in Surat, Gujarat, India.`,
  },
  {
    id: 'faq', title: '❓ Frequently Asked Questions',
    content: `Q: How do I place an order?
A: Browse products, add to bag, then either send a WhatsApp message or use the "Send Inquiry" email option.

Q: Do you offer custom stitching?
A: Yes! Contact us on WhatsApp for custom size orders. Additional charges may apply.

Q: What payment modes are accepted?
A: UPI (PhonePe, GPay, Paytm), NEFT/IMPS bank transfer, and cash on delivery within Surat city.

Q: Can I visit your store?
A: Yes! Our Surat store is open Monday–Saturday, 10 AM to 8 PM.

Q: How do I track my order?
A: Once shipped, you will receive a tracking link via SMS/WhatsApp from our logistics partner.

Q: Do you offer bulk/wholesale pricing?
A: Yes! Contact us for bulk orders of 10+ pieces. We offer competitive wholesale pricing.`,
  },
];

function AccordionItem({ section }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-sm shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-stone-50 transition-colors">
        <h2 className="font-display text-xl text-maroon-900">{section.title}</h2>
        {open ? <ChevronUp size={18} className="text-maroon-700 flex-shrink-0" /> : <ChevronDown size={18} className="text-stone-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-6">
          <div className="border-t border-stone-100 pt-4">
            <pre className="font-body text-sm text-stone-600 leading-relaxed whitespace-pre-wrap">{section.content}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Policies() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-maroon-900 text-ivory py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl">Our Policies</h1>
          <p className="font-body text-stone-300 text-sm mt-1">Transparency is at the heart of Radhika Garment</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
        {sections.map(s => <AccordionItem key={s.id} section={s} />)}
      </div>
    </div>
  );
}
