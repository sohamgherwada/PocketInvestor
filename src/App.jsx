import { useState } from 'react'
import SignUpForm from './components/SignUpForm'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-primary-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Pocket<span className="text-primary-400">Investor</span>
          </h1>
          <p className="text-xl text-gray-300">
            Your personal investment companion
          </p>
        </header>
        
        <main className="max-w-md mx-auto">
          <SignUpForm />
        </main>
      </div>
    </div>
  )
}

export default App
