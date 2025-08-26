'use client';

import { useState } from 'react';
import HotelTableReadOnly from '@/components/HotelTableReadOnly';
import { Hotel } from '@/types/hotel';

export default function UpdatePage() {
  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: 1,
      name: 'Fine',
      countryCode: '+234',
      phoneNumber: '703040040',
      address: 'Ikeja',
      responseStatus: 'no-answer',
      conversation: 'kdkdkd'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hotel Status Update</h1>
          <p className="mt-2 text-gray-600">
            View current status and information for all hotels
          </p>
        </div>

        {/* Hotel Table */}
        <HotelTableReadOnly hotels={hotels} />
      </div>
    </div>
  );
}
