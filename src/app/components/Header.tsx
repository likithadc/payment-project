import { Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌳</span>
          <h1 className="text-xl font-bold text-[#2C5F2D]">MaraChitra</h1>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
