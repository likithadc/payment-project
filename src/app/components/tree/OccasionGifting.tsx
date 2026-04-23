import { motion } from 'motion/react';

interface OccasionGiftingProps {
  onSelectOccasion?: (occasionId: string) => void;
}

const occasions = [
  { icon: '🎂', title: 'Birthday', quote: 'A tree planted in your name on your special day — growing alongside you.', price: 100 },
  { icon: '💐', title: 'Anniversary', quote: 'A love that grows as strong as your love — rooted, lasting, alive.', price: 250 },
  { icon: '🕯️', title: 'In Memory', quote: 'A living tribute — their memory grows in the shade of the tree.', price: 100 },
  { icon: '🎊', title: 'Festival', quote: 'Celebrate the season with a tree that grows leaf for the earth every year.', price: 100 },
  { icon: '👶', title: 'New Baby', quote: 'A tree planted on the day you arrived — growing alongside you, for years to come.', price: 250 },
  { icon: '🏢', title: 'Corporate', quote: 'Walking your milestone with a forest — perfect, trackable and CSR-ready.', price: 500 },
  { icon: '🎁', title: 'Custom', quote: 'Your words, your love, your story — personalized and tracked forever.', price: 100 }
];

export function OccasionGifting({ onSelectOccasion }: OccasionGiftingProps) {
  return (
    <div className="py-16 max-w-6xl mx-auto">
      <div className="text-center mb-3">
        <p className="text-[#2C5F2D] text-sm font-semibold uppercase tracking-wide mb-2">
          Occasion Gifting
        </p>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
        Plant a tree. <span className="text-[#4CAF50]">Gift a memory.</span>
      </h2>

      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        The most meaningful gift — a tree that grows for years and lives on a personal dashboard.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {occasions.map((occasion, index) => (
          <motion.div
            key={occasion.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <div className="text-5xl mb-3">{occasion.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{occasion.title}</h3>
              <p className="text-xs text-gray-600 mb-4 italic leading-relaxed min-h-[60px]">
                "{occasion.quote}"
              </p>
              <div className="text-xl font-bold text-gray-900 mb-4">₹{occasion.price}</div>
              <button
                onClick={() => onSelectOccasion?.(occasion.title)}
                className="w-full bg-[#2C5F2D] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#234d24] transition-colors flex items-center justify-center gap-2"
              >
                <span>🌱</span> Plant This Tree
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-600">
        Certificate sent instantly by email · 80G tax benefit · Tree tracked for 3 years
      </p>
    </div>
  );
}
