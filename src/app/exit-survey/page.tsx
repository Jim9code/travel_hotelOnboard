'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

const reasons = [
  'Prices are too high',
  'Not enough options available',
  "Couldn't find the hotel I was looking for",
  "The hotels didn't look appealing",
  'Other (please specify)'
];

export default function ExitSurveyPage() {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [details, setDetails] = useState('');

  const showText = selectedReason === 'Other (please specify)' || selectedReason === "Couldn't find the hotel I was looking for";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ selectedReason, details });
    alert('Thank you for your feedback');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex items-center justify-center p-6">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Survey</h2>
            <button aria-label="Close" className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Please take a moment to tell us why you're leaving so we can improve TheTravelHunters.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <p className="text-[12px] tracking-widest font-semibold text-gray-700 uppercase mb-3">Please select a reason</p>
              <div className="space-y-3">
                {reasons.map((r) => (
                  <label key={r} className="flex items-center gap-3 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="reason"
                      value={r}
                      checked={selectedReason === r}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="h-4 w-4 accent-[#40b869]"
                      style={{ accentColor: '#40b869' }}
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>
            </div>

            {showText && (
              <div>
                <p className="text-[12px] tracking-widest font-semibold text-gray-700 uppercase mb-2">Please tell us more</p>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Write here"
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#40b869]/30 focus:border-[#40b869]"
                />
              </div>
            )}

            <div className="pt-4 flex justify-center">
              <button type="submit" className="px-6 py-2.5 rounded-full text-white text-sm shadow-sm hover:opacity-95" style={{ backgroundColor: '#40b869' }}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
