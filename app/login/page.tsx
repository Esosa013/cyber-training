'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn, isLoaded: clerkLoaded } = useSignIn();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (!clerkLoaded) {
      setError('Authentication system is loading. Please try again.');
      setIsLoading(false);
      return;
    }
    
    try {
      // Start the sign-in process with email
      const result = await signIn.create({
        identifier: email,
        password,
      });
      
      // Check if the sign-in requires multi-factor authentication
      if (result.status === "complete") {
        // Sign in was successful, redirect to the dashboard
        router.push('/dashboard');
      } else {
        // Sign in requires MFA or other verification steps
        // Handle additional verification steps here
        // For now, we'll just forward to the next step in the Clerk flow
        router.push("/sign-in/" + result.createdSessionId);
      }
    } catch (err: any) {
      // Handle sign-in errors
      console.error('Sign in error:', err);
      setError(err.errors?.[0]?.message || 'Failed to sign in. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex items-center justify-center">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md p-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-2xl shadow-blue-500/30">
        <div className="backdrop-blur-xl bg-black/60 rounded-xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              CyberGuard Training
            </h1>
            <p className="text-cyan-200/70 mt-2">Secure your future with expert training</p>
          </div>
          
          {error && (
            <div className="mb-6 backdrop-blur-md bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-300 text-sm">
              <div className="flex items-center">
                <span className="mr-2">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-cyan-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
                <div className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-cyan-300">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <div className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !clerkLoaded}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg py-3 px-4 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                  Authenticating...
                </div>
              ) : (
                'Secure Login'
              )}
            </button>
            
            <div className="mt-6 text-center">
              <a href="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                Forgot password?
              </a>
            </div>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center">
            <div className="text-xs text-gray-400">
              New recruit? <a href="/sign-up" className="text-cyan-400 hover:text-cyan-300 transition-colors">Register for training</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}