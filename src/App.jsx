import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutUs from "./AboutUs"; // Import your new page
import Registerpage from "./Registerpage"; // Import Registerpage

function Home() {
  return (
    <div className="min-h-screen text-white bg-[linear-gradient(135deg,#0b0720,#1a1440)]">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Pocket<span className="text-primary-400">Investor</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Placeholder Home Page
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/about"
            className="px-6 py-3 bg-gradient-to-r from-navy-600 to-primary-600 text-white rounded-xl shadow-lg hover:opacity-95 transition"
          >
            Go to About Us
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-gradient-to-r from-primary-700 to-navy-700 text-white rounded-xl shadow-lg hover:opacity-95 transition"
          >
            Register Your Pitch
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Registerpage />} />
      </Routes>
    </Router>
  );
}

export default App;