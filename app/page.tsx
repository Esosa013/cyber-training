"use client";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Shield, Trophy, Book, Users, Bell } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header / Navigation */}
      <header className="w-full py-6 px-8 flex justify-between items-center relative z-20">
        <div className="flex items-center">
          <Shield className="w-8 h-8 text-cyan-400 mr-2" />
          <span className="font-bold text-xl">SocialHackDefender</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
          <a href="#testimonials" className="hover:text-cyan-400 transition-colors">Testimonials</a>
          <a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
        </nav>
        <button
          disabled={!user}
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors backdrop-blur-sm"
        >
          {user ? 'Dashboard' : 'Sign In'}
        </button>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-32 flex flex-col items-center text-center relative z-10">
        <div className="absolute -top-10 right-10 px-4 py-2 bg-white/5 rounded-full backdrop-blur-md border border-white/10 text-sm font-medium text-cyan-400 flex items-center">
          <Bell className="w-4 h-4 mr-2" />
          New: Team Training Features Released!
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Social Hack Defender
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl text-gray-300">
          Learn to defend against social engineering threats through interactive, gamified training that builds real security skills.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <button
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => router.push(user ? '/dashboard' : '/sign-in')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-xl font-semibold shadow-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center group"
          >
            Get Started
            <ArrowRight className={`ml-2 w-5 h-5 transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`} />
          </button>
          <button
            onClick={() => router.push('/demo')}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full text-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/10"
          >
            Try Demo
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-20">
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-1">10,000+</p>
            <p className="text-gray-400">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-1">95%</p>
            <p className="text-gray-400">Success Rate</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-1">200+</p>
            <p className="text-gray-400">Organizations</p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
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

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-black/20 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Our platform makes learning cybersecurity fun and effective through our proven methodology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-400">Create your account and profile to get started</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Train</h3>
              <p className="text-gray-400">Complete interactive scenarios and challenges</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn</h3>
              <p className="text-gray-400">Get instant feedback and educational resources</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Master</h3>
              <p className="text-gray-400">Track progress and earn certification badges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Users Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Hear from security professionals who've transformed their teams</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <p className="text-sm text-gray-400">CISO, TechCorp</p>
                </div>
              </div>
              <p className="text-gray-300">"The gamified approach has significantly improved our security awareness metrics. Our team actually looks forward to training now!"</p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-semibold">David Chen</h3>
                  <p className="text-sm text-gray-400">IT Director, GlobalFin</p>
                </div>
              </div>
              <p className="text-gray-300">"We've seen a 70% reduction in successful phishing attempts since implementing Social Hack Defender's training program."</p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-semibold">Alisha Patel</h3>
                  <p className="text-sm text-gray-400">Security Analyst, HealthSafe</p>
                </div>
              </div>
              <p className="text-gray-300">"The realistic scenarios and immediate feedback make this platform superior to any security training we've used before."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-black/20 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Choose the plan that works for you or your organization</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/10 relative">
              <h3 className="text-xl font-semibold mb-2">Basic</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">Free</span>
              </div>
              <p className="text-gray-400 mb-6">Perfect for individual learning</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>5 Training Scenarios</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Basic Progress Tracking</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Community Support</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors">
                Get Started
              </button>
            </div>
            
            <div className="backdrop-blur-xl bg-gradient-to-b from-blue-900/40 to-cyan-900/40 p-8 rounded-2xl shadow-2xl border border-cyan-500/30 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full px-4 py-1 text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$19</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400 mb-6">For serious security professionals</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Unlimited Scenarios</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Advanced Analytics</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Certification Path</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Priority Support</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg font-medium transition-colors">
                Subscribe Now
              </button>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/10 relative">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <p className="text-gray-400 mb-6">For teams and organizations</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Team Management</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Custom Scenarios</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>API Access</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Dedicated Support</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-12 rounded-3xl shadow-2xl border border-white/10 max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to strengthen your security posture?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of security professionals who are leveling up their skills with Social Hack Defender.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/dashboard')}
                disabled={!user}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-xl font-semibold shadow-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
              >
                Get Started Now
              </button>
              <button
                onClick={() => router.push('/contact')}
                className="px-8 py-4 bg-white/10 text-white rounded-full text-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/10"
              >
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black/30 backdrop-blur-md relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-bold text-lg">SocialHackDefender</span>
              </div>
              <p className="text-gray-400 mb-4">Gamified security training that builds real-world skills.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span>𝕏</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span>in</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span>f</span>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Testimonials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Security Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Webinars</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2025 Social Hack Defender. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}