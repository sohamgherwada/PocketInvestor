import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import AboutUs from "./AboutUs"; // Import your new page
import Pricing from "./Pricing";
import Dashboard from "./Dashboard";
import Registerpage from "./Registerpage";  
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16"> {/* Add padding to avoid navbar overlap */}
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/AboutUs" element={<AboutUs />} />
         <Route path="/Pricing" element={<Pricing />} />
         <Route path="/Dashboard" element={<Dashboard />} />
         <Route path="/Registerpage" element={<Registerpage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;