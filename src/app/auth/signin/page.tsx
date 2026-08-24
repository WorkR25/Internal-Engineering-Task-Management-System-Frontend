import React from 'react';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Pane - Branding & Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1b1b3a] text-white flex-col justify-between p-12 lg:p-20">
        <div>
          <h1 className="text-2xl font-bold mb-16 tracking-tight">TaskReview</h1>
          
          <p className="text-xs font-bold tracking-widest text-gray-400 mb-4 uppercase">
            Internal Engineering Task & Review System
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-10">
            One source of truth for engineering work, from assignment to review.
          </h2>
          
          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-white/10 mr-4 mt-1">✓</span>
              <span className="text-gray-300 text-sm leading-relaxed">Ownership, deadlines and submissions visible and auditable across every project.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-white/10 mr-4 mt-1">✓</span>
              <span className="text-gray-300 text-sm leading-relaxed">Objective review scoring across six dimensions for every PR submission.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-white/10 mr-4 mt-1">✓</span>
              <span className="text-gray-300 text-sm leading-relaxed">Full task activity history and developer performance analytics.</span>
            </li>
          </ul>
        </div>
        
        <div className="text-sm text-gray-500">
          © 2026 Internal Engineering Platform
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Sign in</h2>
          <p className="text-gray-500 text-sm mb-8">Access is provisioned by your Admin. No public sign-up.</p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
              <input 
                type="email" 
                placeholder="arijit.ganguly@company.com" 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-900" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••••••" 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-900" 
              />
            </div>
            
            <button 
              type="button" 
              className="w-full bg-[#4f46e5] text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm mt-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-10 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-gray-400 font-semibold tracking-wider uppercase">Need Access</span>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500 leading-relaxed">
            Forgot your password or don't have an account yet?<br/>
            Contact your workspace Admin to get provisioned.
          </p>
        </div>
      </div>
    </div>
  );
}