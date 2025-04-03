"use client";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          CyberGuard Training
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl text-gray-300">
          Learn to defend against social engineering threats through interactive, gamified training.
        </p>
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => router.push('/signup')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-lg font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-lg font-semibold shadow-md hover:bg-white/10 transition-colors"
          >
            Log in
          </button>
        </div>

        <button
          onClick={() => router.push('/login')} // Assuming login routes to training. Adjust if needed.
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-xl font-semibold shadow-lg hover:from-cyan-600 hover:to-blue-600 transition-colors"
        >
          Start Training
        </button>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          <div className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl shadow-2xl border border-white/10 hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl mb-4 text-cyan-400">🎮</div>
            <h2 className="text-xl font-semibold mb-2 text-white">Engaging & Interactive</h2>
            <p className="text-gray-300">Learn through realistic scenarios that simulate real-world social engineering attacks.</p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl shadow-2xl border border-white/10 hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl mb-4 text-purple-400">🏆</div>
            <h2 className="text-xl font-semibold mb-2 text-white">Earn & Compete</h2>
            <p className="text-gray-300">Collect badges, earn points, and compete with colleagues to become a security champion.</p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl shadow-2xl border border-white/10 hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="text-3xl mb-4 text-blue-400">🛡️</div>
            <h2 className="text-xl font-semibold mb-2 text-white">Real Skills</h2>
            <p className="text-gray-300">Build practical security skills that transfer to your daily work and protect your organization.</p>
          </div>
        </div>
      </div>
    </div>
  );
}