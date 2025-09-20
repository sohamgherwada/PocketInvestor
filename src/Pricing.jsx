function Pricing() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(167,139,250,0.25),transparent),radial-gradient(900px_500px_at_100%_10%,rgba(49,46,129,0.35),transparent),linear-gradient(135deg,#0b0720,#1a1440)] flex flex-col">
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_300px_at_50%_0%,rgba(0,0,0,0.35),transparent)]" />
      {/* Floating background orbs */}
      <div className="pointer-events-none absolute top-16 left-8 w-72 h-72 bg-primary-700/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 bg-navy-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="pointer-events-none absolute top-1/2 left-1/3 w-64 h-64 bg-primary-800/30 rounded-full blur-3xl animate-ping"></div>

      <div className="relative container mx-auto px-6 py-16 z-10">
        {/* Header */}
        <header className="mx-auto max-w-4xl text-center mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/10 text-sm text-white/80">
            For Start-ups
          </div>
          <h1 className="mt-6 text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
            Pricing & Equity Structure
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            We offer transparent, tiered pricing to suit start-ups at every stage. Choose the plan that fits your funding needs and growth ambitions.
            Choose the amount of capital you need and the percentage of equity you are willing to offer.
            <br />
            <span className="font-semibold text-primary-200">We recommend not offering more than 25% equity for a single round to maintain control and attract future investors.</span>
          </p>
        </header>

        {/* Pricing Tiers */}
        <section className="mx-auto max-w-5xl mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Pricing Tiers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-7 flex flex-col items-center hover:bg-white/[0.07] transition-colors">
              <div className="text-2xl font-bold text-primary-200 mb-2">Starter</div>
              <div className="text-4xl font-extrabold mb-2">1.5%</div>
              <div className="text-sm uppercase tracking-widest text-white/60 mb-4">of Capital Raised</div>
              <ul className="list-disc list-inside text-white/70 text-left space-y-2">
                <li>Best for small rounds</li>
                <li>Basic analytics dashboard</li>
                <li>Email support</li>
                <li>Up to $50,000 capital</li>
              </ul>
            </div>
            {/* Tier 2 */}
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-7 flex flex-col items-center hover:bg-white/[0.07] transition-colors">
              <div className="text-2xl font-bold text-primary-200 mb-2">Growth</div>
              <div className="text-4xl font-extrabold mb-2">3%</div>
              <div className="text-sm uppercase tracking-widest text-white/60 mb-4">of Capital Raised</div>
              <ul className="list-disc list-inside text-white/70 text-left space-y-2">
                <li>For growing start-ups</li>
                <li>Advanced analytics dashboard</li>
                <li>Priority support</li>
                <li>Up to $250,000 capital</li>
              </ul>
            </div>
            {/* Tier 3 */}
            <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-7 flex flex-col items-center hover:bg-white/[0.07] transition-colors">
              <div className="text-2xl font-bold text-primary-200 mb-2">Enterprise</div>
              <div className="text-4xl font-extrabold mb-2">5%</div>
              <div className="text-sm uppercase tracking-widest text-white/60 mb-4">of Capital Raised</div>
              <ul className="list-disc list-inside text-white/70 text-left space-y-2">
                <li>For large rounds</li>
                <li>Full analytics suite</li>
                <li>Dedicated account manager</li>
                <li>No capital limit</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-xs text-white/60">
          © PocketInvestor
        </footer>
      </div>
    </div>
  );
}

export default Pricing;