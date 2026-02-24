'use client'
import React from 'react'

const PopUp = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-lg">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">
          🚀 Welcome to Bino Input Enhancer
        </h2>

        <p className="text-gray-600 mb-4">
          This app transforms simple user inputs into powerful, high-intent queries.
        </p>

        <div className="space-y-3 text-sm text-gray-700">
          <div>✨ Understands user intent</div>
          <div>📍 Adds smart context like location</div>
          <div>🎯 Improves clarity and specificity</div>
          <div>⚡ Generates optimized search-ready output</div>
        </div>

        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-sm">
          <strong>How it works:</strong>
          <br />
          You type something simple like:
          <br />
          <span className="italic">"best phone under 20000"</span>
          <br />
          We enhance it into a structured, context-rich query.
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          Got it, Let’s Try 🚀
        </button>
      </div>
    </div>
  )
}

export default PopUp