import { motion } from 'motion/react';
import { useState } from 'react';

interface SiteHeaderProps {
  onPlantTreeClick?: () => void;
}

export function SiteHeader({ onPlantTreeClick }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-[#1B4332] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌲</span>
              <div>
                <h1 className="text-lg font-bold">EcoTree</h1>
                <p className="text-[10px] text-gray-300 -mt-1">EVERY IMPACT, VERIFIED.</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-[#81C784] transition-colors">About</a>
              <a href="#" className="hover:text-[#81C784] transition-colors">Why Trees</a>
              <a href="#" className="hover:text-[#81C784] transition-colors">Waste</a>
              <a href="#" className="hover:text-[#81C784] transition-colors">Water</a>
              <a href="#" className="hover:text-[#81C784] transition-colors">Impact</a>
              <a href="#" className="hover:text-[#81C784] transition-colors">CSR</a>
              <a href="#" className="hover:text-[#81C784] transition-colors">Blog</a>
            </nav>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPlantTreeClick}
                className="hidden md:flex bg-[#2C5F2D] text-white px-4 py-2 rounded-lg text-sm font-medium items-center gap-2 hover:bg-[#234d24] transition-colors"
              >
                <span>🌱</span> Plant a Tree
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex border border-[#81C784] text-white px-4 py-2 rounded-lg text-sm font-medium items-center gap-2 hover:bg-[#2C5F2D] transition-colors"
              >
                <span>🤝</span> CSR Partner
              </motion.button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#2C5F2D] bg-[#1B4332]"
          >
            <nav className="flex flex-col p-4 space-y-3 text-sm">
              <a href="#" className="hover:text-[#81C784] transition-colors">About</a>
              <a href="#" className="hover:text-[#81C784] transition-colors">Why Trees</a>
              <a href="#" className="hover:text-[#81C784] transition-colors">Waste</a>
              <a href="#" className="hover:text-[#81C784] transition-colors">Water</a>
              <a href="#" className="hover:text-[#81C784] transition-colors">Impact</a>
              <a href="#" className="hover:text-[#81C784] transition-colors">CSR</a>
              <a href="#" className="hover:text-[#81C784] transition-colors">Blog</a>
              <button onClick={onPlantTreeClick} className="bg-[#2C5F2D] text-white px-4 py-2 rounded-lg text-sm font-medium text-left">
                🌱 Plant a Tree
              </button>
              <button className="border border-[#81C784] text-white px-4 py-2 rounded-lg text-sm font-medium text-left">
                🤝 CSR Partner
              </button>
            </nav>
          </motion.div>
        )}
      </header>

      <div className="bg-[#2C5F2D] text-white py-2 -mx-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between overflow-x-auto gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span>🌱</span>
              <span className="font-medium">10,000+ trees planted</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span>✅</span>
              <span className="font-medium">90% survival rate</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span>🤖</span>
              <span className="font-medium">AI-verified</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span>💰</span>
              <span className="font-medium">80% tax benefit</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span>📜</span>
              <span className="font-medium">Certificate instantly</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
