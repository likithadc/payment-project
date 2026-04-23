interface SiteFooterProps {
  onPlantTreeClick?: () => void;
  onGiftTreeClick?: () => void;
}

export function SiteFooter({ onPlantTreeClick, onGiftTreeClick }: SiteFooterProps) {
  return (
    <footer className="bg-[#0D2818] text-white py-16 -mx-4 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌲</span>
              <div>
                <h3 className="text-xl font-bold">EcoTree</h3>
                <p className="text-xs text-gray-400">EVERY IMPACT, VERIFIED.</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Tech-powered environmental action — every tree planted is GPS-tagged, AI-verified, and trackable for 3 years.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Trees</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Waste</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Water</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Live Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Impact Map</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">Get Involved</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={onPlantTreeClick} className="hover:text-white transition-colors text-left">Donate a Tree</button></li>
              <li><button onClick={onGiftTreeClick} className="hover:text-white transition-colors text-left">Gift a Tree</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Volunteer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Field Worker App</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">CSR</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Why Partner</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CSR Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ESG Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become a Partner</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © 2026 EcoTree. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 bg-[#1B4332] rounded-full flex items-center justify-center hover:bg-[#2C5F2D] transition-colors">
              <span className="text-sm">in</span>
            </a>
            <a href="#" className="w-8 h-8 bg-[#1B4332] rounded-full flex items-center justify-center hover:bg-[#2C5F2D] transition-colors">
              <span className="text-sm">𝕏</span>
            </a>
            <a href="#" className="w-8 h-8 bg-[#1B4332] rounded-full flex items-center justify-center hover:bg-[#2C5F2D] transition-colors">
              <span className="text-sm">📷</span>
            </a>
            <a href="#" className="w-8 h-8 bg-[#1B4332] rounded-full flex items-center justify-center hover:bg-[#2C5F2D] transition-colors">
              <span className="text-sm">▶</span>
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            SECTION 8 COMPANY • 12A REGISTERED • 80G APPROVED • REGO DARPAN CERTIFIED • CSR 8 FILED
          </p>
        </div>
      </div>
    </footer>
  );
}
