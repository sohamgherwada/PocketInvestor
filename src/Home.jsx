import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [showInvestor, setShowInvestor] = useState(false);
  const [showFounder, setShowFounder] = useState(false);

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(167,139,250,0.25),transparent),radial-gradient(900px_500px_at_100%_10%,rgba(49,46,129,0.35),transparent),linear-gradient(135deg,#0b0720,#1a1440)] flex flex-col">
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_300px_at_50%_0%,rgba(0,0,0,0.35),transparent)]" />
      {/* Floating background orbs */}
      <div className="pointer-events-none absolute top-16 left-8 w-72 h-72 bg-primary-700/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 bg-navy-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="pointer-events-none absolute top-1/2 left-1/3 w-64 h-64 bg-primary-800/30 rounded-full blur-3xl animate-ping"></div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-24 px-6 z-10">
        <div className="relative z-10 text-center max-w-3xl">
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 ring-1 ring-white/10 text-sm mb-4">
            Welcome to PocketEquity
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Invest in Startups. Build Generational Wealth.
          </h1>
          <p className="text-lg text-white/80 mb-8">
            PocketEquity bridges the gap between retail investors and private equity, making startup investing accessible for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
            <Link
              to="/about"
              className="px-8 py-3 bg-white/10 ring-1 ring-white/10 text-white/90 rounded-xl shadow-lg font-semibold hover:bg-white/20 transition"
            >
              Learn More
            </Link>
            <a
              href="mailto:contact@pocketequity.com"
              className="px-8 py-3 bg-white/10 ring-1 ring-white/10 text-white/90 rounded-xl shadow-lg font-semibold hover:bg-white/20 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="relative z-10 mx-auto w-full max-w-4xl px-6 py-8">
        <div className="bg-white/5 rounded-3xl ring-1 ring-white/10 p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-4 text-white">How PocketEquity Works</h2>
          <p className="text-white/70 mb-6">
            We pool investments and divide equity based on your contribution, making private equity accessible to all. Your share: <span className="font-semibold text-primary-200">(your investment / desired capital) × offered equity</span>.
          </p>
          <div className="space-y-6">
            {/* Investor Dropdown */}
            <div>
              <button
                className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-primary-700 to-navy-700 rounded-xl font-semibold text-lg shadow hover:bg-primary-800 transition"
                onClick={() => setShowInvestor((v) => !v)}
              >
                <span>I'm an Investor</span>
                <span className={`transform transition ${showInvestor ? "rotate-180" : ""}`}>▼</span>
              </button>
              {showInvestor && (
                <div className="mt-3 px-6 py-4 bg-white/10 rounded-xl text-white/80 text-base space-y-2">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Create your investor profile on our mobile app to help us suggest start-ups tailored to your preferences.</li>
                    <li>Browse suggested start-ups or explore the full catalog to choose where to invest.</li>
                    <li>Invest as little as $10 to own a real percentage of a start-up.</li>
                    <li>If you want out, use our marketplace to resell your holdings.</li>
                  </ul>
                </div>
              )}
            </div>
            {/* Founder Dropdown */}
            <div>
              <button
                className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-navy-700 to-primary-700 rounded-xl font-semibold text-lg shadow hover:bg-navy-800 transition"
                onClick={() => setShowFounder((v) => !v)}
              >
                <span>I'm a Founder</span>
                <span className={`transform transition ${showFounder ? "rotate-180" : ""}`}>▼</span>
              </button>
              {showFounder && (
                <div className="mt-3 px-6 py-4 bg-white/10 rounded-xl text-white/80 text-base space-y-2">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Fill out the online form to be accepted on the app.</li>
                    <li>Complete your profile (legal, equity, and more).</li>
                    <li>Choose your pricing plan.</li>
                    <li>Monitor your dashboard to track funding received at your asking valuation.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-xs text-white/60 z-10">
        © PocketInvestor
      </footer>
    </div>
  );
}

export default Home;