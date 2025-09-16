import { Link } from "react-router-dom";
import thesisImage from "./assets/pexels-rdne-7414214.jpg";

function AboutUs() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(167,139,250,0.25),transparent),radial-gradient(900px_500px_at_100%_10%,rgba(49,46,129,0.35),transparent),linear-gradient(135deg,#0b0720,#1a1440)]">
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_300px_at_50%_0%,rgba(0,0,0,0.35),transparent)]" />
      {/* Floating background orbs */}
      <div className="pointer-events-none absolute top-16 left-8 w-72 h-72 bg-primary-700/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 bg-navy-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="pointer-events-none absolute top-1/2 left-1/3 w-64 h-64 bg-primary-800/30 rounded-full blur-3xl animate-ping"></div>

      <div className="relative container mx-auto px-6 py-16 z-10">
        {/* Hero */}
        <header className="mx-auto max-w-5xl text-center mb-20">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/10 text-sm text-white/80">
            Built for All
          </div>
          <h1 className="mt-6 text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
            People Driven Private Equity Marketplace
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-3xl mx-auto">
            PocketEquity makes private equity accessible to all. With a focus on transparency, accessibility, and community, we are building a platform that allows everyone to build generational wealth.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { k: "Companies Listed", v: "0" },
              { k: "Total Investors", v: "0" },
              { k: "Funding $", v: "0" },
            ].map((m) => (
              <div key={m.k} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
                <div className="text-2xl font-bold text-primary-200">{m.v}</div>
                <div className="text-xs uppercase tracking-widest text-white/60 mt-1">{m.k}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="space-y-28">
          {/* Story split */}
          <section className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">Our thesis</h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                We at PocketEquity believe that being able to invest in startup's or companies that are not listed on the public market should be accessible to all. This allows business to get the funding they need to grow and succeed. It also allows investors to diversify their portfolio while not risking a significant amount of capital.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Risk clarity",
                  "Signal over noise",
                  "Aligned incentives",
                ].map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/8 ring-1 ring-white/10 text-white/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-white/10">
                <img
                  src={thesisImage}
                  alt="Sticky notes with startup goals on a laptop"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_10%,rgba(167,139,250,0.25),transparent),radial-gradient(500px_300px_at_100%_0%,rgba(49,46,129,0.3),transparent)]" />
              </div>
            </div>
          </section>

          {/* Principles */}
          <section className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Transparency",
                  body: "Plain language, precise metrics, Company Insights and information.",
                },
                {
                  title: "Accessibility",
                  body: "Built for all, not just the wealthy. Get started with as low as $10 ",
                },
                {
                  title: "Community",
                  body: "Focusing on a community driven aspect to investing.",
                },
              ].map((c, i) => (
                <div
                  key={c.title}
                  className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-7 hover:bg-white/[0.07] transition-colors"
                >
                  <div className="text-lg font-semibold text-white">{c.title}</div>
                  <p className="mt-2 text-sm text-white/70">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="mx-auto max-w-6xl">
            <div className="rounded-3xl bg-gradient-to-r from-primary-900/50 to-navy-900/50 ring-1 ring-white/10 p-8 md:p-10">
              <div className="md:flex items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">Let’s build long-term Wealth</h3>
                  <p className="mt-2 text-white/70">Write to us and we’ll get back within 24 hours.</p>
                </div>
                <a
                  href="mailto:contact@pocketequity.com"
                  className="mt-6 md:mt-0 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-navy-600 text-white font-medium hover:opacity-95 transition"
                >
                  contact@pocketequity.com
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Back Button */}
        <div className="mt-20 text-center">
          <Link
            to="/"
            className="px-8 py-4 bg-gradient-to-r from-navy-600 to-primary-600 text-white rounded-xl shadow-lg hover:scale-110 transition transform"
          >
            ⬅ Back to Home
          </Link>
          <div className="mt-6 text-xs text-white/60">© PocketInvestor</div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;