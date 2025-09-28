import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-[linear-gradient(135deg,#0b0720,#1a1440)] bg-opacity-95 shadow-lg ring-1 ring-white/10 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white tracking-tight hover:text-primary-300 transition">
          PocketEquity
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="text-white/90 px-3 py-2 rounded-lg hover:bg-white/10 transition">Home</Link>
          <Link to="/AboutUs" className="text-white/90 px-3 py-2 rounded-lg hover:bg-white/10 transition">About Us</Link>
          <Link to="/Registerpage" className="text-white/90 px-3 py-2 rounded-lg hover:bg-white/10 transition">Founder Registration</Link>
          <Link to="/Pricing" className="text-white/90 px-3 py-2 rounded-lg hover:bg-white/10 transition">Pricing</Link>
          <Link to="/Dashboard" className="text-white/90 px-3 py-2 rounded-lg hover:bg-white/10 transition">Founder Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;