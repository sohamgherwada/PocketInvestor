import { Link } from "react-router-dom";
import { useState } from "react";

function Registerpage() {
  const [form, setForm] = useState({
    intro: "",
    name: "",
    cofounders: 1,
    problem: "",
    solution: "",
    logo: null,
    demo: null,
    founders: [{ intro: "", photo: null, video: null, why: "", meet: "" }],
    goals: { short: "", medium: "", long: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: files[0] }));
  };

  const handleCofoundersChange = (e) => {
    const { value } = e.target;
    const cofounders = parseInt(value, 10);
    setForm((prevForm) => ({
      ...prevForm,
      cofounders,
      founders: Array.from({ length: cofounders }, (_, idx) => prevForm.founders[idx] || { intro: "", photo: null, video: null, why: "", meet: "" }),
    }));
  };

  const handleFounderChange = (idx, field) => (e) => {
    const { value } = e.target;
    setForm((prevForm) => {
      const founders = [...prevForm.founders];
      founders[idx] = { ...founders[idx], [field]: value };
      return { ...prevForm, founders };
    });
  };

  const handleFounderFileChange = (idx, field) => (e) => {
    const { files } = e.target;
    setForm((prevForm) => {
      const founders = [...prevForm.founders];
      founders[idx] = { ...founders[idx], [field]: files[0] };
      return { ...prevForm, founders };
    });
  };

  const handleGoalsChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      goals: { ...prevForm.goals, [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

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
            Register Your Pitch
          </div>
          <h1 className="mt-6 text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
            Your Story Awaits!!
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-3xl mx-auto">
            The Following is the intro form for the team to understand and validate your startup for the amazing investors on the app can invest in. As per the guideline all start-ups must be accepted prior to be featured on the app.
          </p>
        </header>
        {/* Form Section */}
        <form
          className="mx-auto max-w-3xl bg-white/10 rounded-xl p-8 shadow-lg text-left"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Start-up Intro *</label>
            <textarea name="intro" required className="w-full p-2 rounded bg-white/20 text-white" value={form.intro} onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Start-up Name</label>
            <input name="name" className="w-full p-2 rounded bg-white/20 text-white" value={form.name} onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Number of Cofounders</label>
            <input type="number" min="1" max="10" name="cofounders" className="w-24 p-2 rounded bg-white/20 text-white" value={form.cofounders} onChange={handleCofoundersChange} />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">What’s the problem you want to solve</label>
            <textarea name="problem" className="w-full p-2 rounded bg-white/20 text-white" value={form.problem} onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">What is your solution?</label>
            <textarea name="solution" className="w-full p-2 rounded bg-white/20 text-white" value={form.solution} onChange={handleChange} />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Logo</label>
            <input type="file" name="logo" accept="image/*" className="w-full p-2 rounded bg-white/20 text-white" onChange={handleFileChange} />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Demo of your product</label>
            <input type="file" name="demo" accept="video/*" className="w-full p-2 rounded bg-white/20 text-white" onChange={handleFileChange} />
          </div>
          <div className="mb-8">
            <label className="block mb-4 font-bold text-lg">Team Intro *</label>
            <textarea name="team_intro" required className="w-full p-2 rounded bg-white/20 text-white mb-4" value={form.team_intro || ""} onChange={e => setForm(prev => ({ ...prev, team_intro: e.target.value }))} />
            <div className="mb-4 p-2 bg-white/10 rounded text-sm text-white/80">
              Example questions to talk about in your video:<br />
              <ul className="list-disc ml-5">
                <li>What led you to pursue a start-up/this project specifically?</li>
                <li>What gets you out of bed to work on your start-up every morning?</li>
                <li>How did you meet your fellow co-founders?</li>
              </ul>
            </div>
            <label className="block mb-1">Team Video Submission</label>
            <input type="file" name="team_video" accept="video/*" className="w-full p-2 rounded bg-white/20 text-white mb-6" onChange={handleFileChange} />
            {form.founders.map((founder, idx) => (
              <div key={idx} className="mb-8 p-4 rounded bg-primary-900/20">
                <div className="mb-2 font-semibold">Founder {idx + 1}</div>
                <label className="block mb-1">Founder Photo</label>
                <input type="file" name={`founder_${idx}_photo`} accept="image/*" className="w-full p-2 rounded bg-white/20 text-white mb-2" onChange={handleFounderFileChange(idx, 'photo')} />
                <label className="block mb-1">Video entry intro</label>
                <input type="file" name={`founder_${idx}_video`} accept="video/*" className="w-full p-2 rounded bg-white/20 text-white mb-2" onChange={handleFounderFileChange(idx, 'video')} />
                <label className="block mb-1">What gets you out of bed to work on your start-up every morning?</label>
                <textarea name={`founder_${idx}_why`} className="w-full p-2 rounded bg-white/20 text-white mb-2" value={founder.why} onChange={handleFounderChange(idx, 'why')} />
                <label className="block mb-1">How did you meet your fellow co-founders?</label>
                <textarea name={`founder_${idx}_meet`} className="w-full p-2 rounded bg-white/20 text-white mb-2" value={founder.meet} onChange={handleFounderChange(idx, 'meet')} />
              </div>
            ))}
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Short-term goals (1-2 years)</label>
            <textarea name="short" className="w-full p-2 rounded bg-white/20 text-white" value={form.goals.short} onChange={handleGoalsChange} />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Medium-term goals (3-5 years)</label>
            <textarea name="medium" className="w-full p-2 rounded bg-white/20 text-white" value={form.goals.medium} onChange={handleGoalsChange} />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Long-term goals (6-10 years)</label>
            <textarea name="long" className="w-full p-2 rounded bg-white/20 text-white" value={form.goals.long} onChange={handleGoalsChange} />
          </div>
          <button type="submit" className="w-full py-3 mt-6 bg-gradient-to-r from-primary-700 to-navy-700 rounded-xl font-bold text-lg hover:scale-105 transition">Submit</button>
        </form>
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

export default Registerpage;