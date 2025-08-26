'use client';

import { useState } from 'react';
import { Hotel, ResponseStatus } from '@/types/hotel';
import { X } from 'lucide-react';

interface AddHotelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (hotel: Omit<Hotel, 'id'>) => void;
}

export default function AddHotelModal({ isOpen, onClose, onAdd }: AddHotelModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    responseStatus: 'no-answer' as ResponseStatus,
    conversation: '',
    countryCode: '+234'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: '',
      phoneNumber: '',
      address: '',
      responseStatus: 'no-answer',
      conversation: '',
      countryCode: '+234'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md mx-4 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Add New Hotel</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hotel Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex space-x-2">
              <select
                value={formData.countryCode || '+234'}
                onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="+234">🇳🇬 +234</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+81">🇯🇵 +81</option>
                <option value="+86">🇨🇳 +86</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+7">🇷🇺 +7</option>
                <option value="+55">🇧🇷 +55</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+27">🇿🇦 +27</option>
                <option value="+20">🇪🇬 +20</option>
                <option value="+254">🇰🇪 +254</option>
                <option value="+256">🇺🇬 +256</option>
                <option value="+233">🇬🇭 +233</option>
              </select>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Response Status
            </label>
            <select
              value={formData.responseStatus}
              onChange={(e) => setFormData({ ...formData, responseStatus: e.target.value as ResponseStatus })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="no-answer">No Answer</option>
              <option value="answered">Answered</option>
              <option value="call-back">Call back in 2-3 minutes</option>
              <option value="switched-off">Switched Off</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conversation Notes
            </label>
            <textarea
              value={formData.conversation}
              onChange={(e) => setFormData({ ...formData, conversation: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Hotel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
