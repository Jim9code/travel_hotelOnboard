'use client';

import { useState } from 'react';
import HotelTable from '@/components/HotelTable';
import AddHotelModal from '@/components/AddHotelModal';
import { Hotel } from '@/types/hotel';
import { Plus, Phone, Eye, MapPin } from 'lucide-react';

export default function Dashboard() {
  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: 1,
      name: 'Fine',
      countryCode: '+234',
      phoneNumber: '703040040',
      address: 'Ikeja',
      responseStatus: 'call-back',
      conversation: 'kdkdkd'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentCallIndex, setCurrentCallIndex] = useState<number | null>(null);

  const addHotel = (hotel: Omit<Hotel, 'id'>) => {
    const newHotel = {
      ...hotel,
      id: Math.max(...hotels.map(h => h.id), 0) + 1
    };
    setHotels([...hotels, newHotel]);
    setIsAddModalOpen(false);
  };

  const updateHotel = (id: number, updates: Partial<Hotel>) => {
    setHotels(hotels.map(hotel => 
      hotel.id === id ? { ...hotel, ...updates } : hotel
    ));
  };

  const deleteHotel = (id: number) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
  };

  const callNextHotel = () => {
    const nextIndex = hotels.findIndex((_, index) => 
      index > (currentCallIndex ?? -1) && hotels[index].phoneNumber
    );
    
    if (nextIndex !== -1) {
      setCurrentCallIndex(nextIndex);
      // In a real app, this would trigger a phone call
      window.open(`tel:${hotels[nextIndex].phoneNumber}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Hotel Onboarding Dashboard
          </h1>
          <div className="flex gap-3">
            <button
              onClick={callNextHotel}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Next Hotel
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Hotel
            </button>
            <a
              href="/update"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Status
            </a>
            {/* New navigation buttons */}
            <a
              href="/nps"
              className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-white hover:opacity-95"
              style={{ backgroundColor: '#40b869', borderColor: '#40b869' }}
            >
              NPS Popup
            </a>
            <a
              href="/exit-survey"
              className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-white hover:opacity-95"
              style={{ backgroundColor: '#40b869', borderColor: '#40b869' }}
            >
              Exit Survey
            </a>
            <a
              href="/travel-guide"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Travel Guide
            </a>
          </div>
        </div>

        <HotelTable
          hotels={hotels}
          onUpdate={updateHotel}
          onDelete={deleteHotel}
          currentCallIndex={currentCallIndex}
        />

        <AddHotelModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={addHotel}
        />
      </div>
    </div>
  );
}
