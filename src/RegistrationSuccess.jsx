import React from "react";
import { Link } from "react-router-dom";

function RegistrationSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[linear-gradient(135deg,#0b0720,#1a1440)] text-white">
      <div className="bg-white/10 rounded-xl p-8 shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">You have been added to the wait list!</h1>
        <p className="mb-6 text-lg text-white/80">Thank you for registering your pitch. We will contact you soon.</p>
        <Link to="/" className="px-6 py-3 bg-gradient-to-r from-navy-600 to-primary-600 text-white rounded-xl shadow-lg hover:scale-105 transition">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
