import React from 'react';

interface AddDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddDeveloperModal({ isOpen, onClose }: AddDeveloperModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add Developer</h2>
            <p className="text-sm text-gray-500 mt-1">There is no public sign-up — accounts are created by Admin only</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Full Name</label>
            <input 
              type="text" 
              placeholder="Priyanka Iyer" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent outline-none text-sm transition-all" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Email</label>
            <input 
              type="email" 
              placeholder="priyanka.iyer@company.com" 
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent outline-none text-sm transition-all" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">Temporary Password</label>
            <div className="relative">
              <input 
                type="text" 
                value="Tr8•kL2•pQm9" 
                readOnly 
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm outline-none font-mono" 
              />
              <span className="absolute right-3 top-2.5 text-xs font-bold bg-[#eef2f6] text-gray-600 px-2 py-0.5 rounded">
                Auto-generated
              </span>
            </div>
          </div>

          {/* Info Box */}
          <div className="flex items-start bg-gray-50 p-4 rounded-lg border border-gray-100">
            <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-600 leading-relaxed">
              The Developer must change this password on first sign-in. It won't be shown again after this account is created — share it securely.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 bg-gray-50/80 border-t border-gray-100">
          <div className="text-xs text-gray-400 font-medium">
            Role: DEVELOPER · Status: Active
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={onClose} 
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[#4f46e5] hover:bg-indigo-700 shadow-sm transition-colors">
              Create Account
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}