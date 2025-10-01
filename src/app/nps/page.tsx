'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function NpsPage() {
  const [rating, setRating] = useState<number | null>(6);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submit
    console.log({ rating, comment });
    alert('Thanks for your feedback!');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex items-center justify-center p-6">
      {/* Popup card */}
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-gray-100">
        {/* Header icon + close */}
        <button
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-8 pt-10 pb-2 text-center">
          <div className="mx-auto mb-5 h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E9F8F0', color: '#40b869' }}>
            <span className="text-2xl">💬</span>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900">Your input is valuable to us</h2>
          <p className="mt-2 text-gray-600">Would you mind taking a moment to please share your feedback?</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8">
          {/* Likelihood scale */}
          <div className="mt-4">
            <p className="text-[11px] tracking-widest font-semibold text-gray-700 uppercase">
              How likely are you to recommend us to your friends or colleagues?
            </p>
            <div className="mt-4 flex items-center justify-between">
              {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                <label key={n} className="flex flex-col items-center text-[11px] text-gray-500">
                  <input
                    type="radio"
                    name="nps"
                    value={n}
                    checked={rating === n}
                    onChange={() => setRating(n)}
                    className="h-4 w-4 accent-[#40b869]"
                    style={{ accentColor: '#40b869' }}
                  />
                  <span className="mt-2">{n}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between text-[12px] text-gray-500 mt-2">
              <span>Not Likely</span>
              <span>Extremely Likely</span>
            </div>
          </div>

          {/* Why text area */}
          <div className="mt-8">
            <p className="text-[11px] tracking-widest font-semibold text-gray-700 uppercase">
              Why do you feel that way? <span className="text-gray-400">(Optional)</span>
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write here"
              rows={4}
              className="mt-3 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#40b869]/30 focus:border-[#40b869]"
            />
          </div>

          {/* Footer actions */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
            <button type="button" className="px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200">
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-white text-sm shadow-sm hover:opacity-95"
              style={{ backgroundColor: '#40b869' }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

