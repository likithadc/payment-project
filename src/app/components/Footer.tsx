export function Footer() {
  return (
    <footer className="bg-[#2C5F2D] text-white py-8 px-4 mt-8">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🌳</span>
          <h2 className="text-xl font-bold">MaraChitra</h2>
        </div>
        
        <p className="text-sm text-green-100 mb-6">
          Making the world greener, one tree at a time. Join us in our mission to create a sustainable future.
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2 text-sm">About</h3>
            <ul className="space-y-1 text-xs text-green-100">
              <li><a href="#" className="hover:text-white">Our Story</a></li>
              <li><a href="#" className="hover:text-white">Team</a></li>
              <li><a href="#" className="hover:text-white">Impact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-sm">Contact</h3>
            <ul className="space-y-1 text-xs text-green-100">
              <li><a href="#" className="hover:text-white">Email</a></li>
              <li><a href="#" className="hover:text-white">Phone</a></li>
              <li><a href="#" className="hover:text-white">Location</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-sm">Legal</h3>
            <ul className="space-y-1 text-xs text-green-100">
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">80G Cert</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-700 pt-4 text-center text-xs text-green-100">
          © 2026 MaraChitra NGO. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
