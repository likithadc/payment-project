import { motion } from 'motion/react';

const impacts = [
  {
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=400&fit=crop',
    title: 'Day 1 - Sapling planted',
    description: 'GPS tagged • AI verified'
  },
  {
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=400&fit=crop',
    title: 'Month 6 - Growing strong',
    description: 'Updated every week'
  },
  {
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=600&h=400&fit=crop',
    title: 'Year 3 - Mature canopy',
    description: 'Soaking CO₂/shelter'
  }
];

const badges = [
  { icon: '💰', title: '80% tax benefit', description: 'Claim tax deductions under Section 80G' },
  { icon: '📜', title: 'Certificate instantly', description: 'Receive your digital certificate via email' },
  { icon: '🤖', title: 'AI verified', description: 'Every tree verified by AI technology' },
  { icon: '🌱', title: 'Tree tracking', description: 'Track your trees for 3 years with monthly photo updates' }
];

export function RealImpact() {
  return (
    <div className="py-16 max-w-6xl mx-auto">
      <div className="mb-4">
        <p className="text-[#2C5F2D] text-sm font-semibold uppercase tracking-wide mb-2">
          From blade to turbine
        </p>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        Real trees. <span className="text-[#4CAF50]">Real impact.</span>
      </h2>

      <p className="text-gray-600 mb-12 max-w-2xl">
        Every tree you plant grows through the journey — you see it all unfold. Real.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {impacts.map((impact, index) => (
          <motion.div
            key={impact.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-shadow">
              <img
                src={impact.image}
                alt={impact.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
              <span className="text-[#2C5F2D]">✓</span> {impact.title}
            </h3>
            <p className="text-sm text-gray-600">{impact.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-[#1B4332] text-white rounded-xl p-4 text-center"
          >
            <div className="text-3xl mb-2">{badge.icon}</div>
            <h4 className="text-sm font-semibold mb-1">{badge.title}</h4>
            <p className="text-xs text-gray-300">{badge.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
