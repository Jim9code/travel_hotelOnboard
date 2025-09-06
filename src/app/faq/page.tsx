'use client';

import { useState } from 'react';
import { HelpCircle, Star } from 'lucide-react';

export default function FAQPage() {
  const [selectedSource, setSelectedSource] = useState('');
  const [otherSource, setOtherSource] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sourceOptions = [
    'Facebook',
    'Instagram', 
    'LinkedIn',
    'TikTok',
    'Twitter',
    'Google Search',
    'Google Ads',
    'Events',
    'Referral',
    'Others (please specify)'
  ];

  const handleSourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const finalSource = selectedSource === 'Others (please specify)' ? otherSource : selectedSource;
    console.log('User heard about us from:', finalSource);
    
    // Reset form
    setSelectedSource('');
    setOtherSource('');
    setIsSubmitting(false);
    
    // Show success message (you could add a toast notification here)
    alert('Thank you for your feedback!');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about TheTravelHunters and our services
          </p>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">How did you hear about us?</h2>
          </div>
          
          <form onSubmit={handleSourceSubmit} className="space-y-6">
            <div>
              <p className="text-gray-600 mb-4">
                Help us improve by telling us how you found TheTravelHunters.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {sourceOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="source"
                      value={option}
                      checked={selectedSource === option}
                      onChange={(e) => setSelectedSource(e.target.value)}
                      className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black"
                      style={{ accentColor: 'black' }}
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              
              {selectedSource === 'Others (please specify)' && (
                <div className="mt-4">
                  <input
                    type="text"
                    value={otherSource}
                    onChange={(e) => setOtherSource(e.target.value)}
                    placeholder="Please specify how you heard about us..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              )}
            </div>
            
            <button
              type="submit"
              disabled={!selectedSource || (selectedSource === 'Others (please specify)' && !otherSource) || isSubmitting}
              className="w-full text-white py-3 px-6 rounded-lg font-semibold focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              style={{ 
                backgroundColor: '#40b869',
                '--hover-color': '#369a5a'
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = '#369a5a';
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = '#40b869';
                }
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
