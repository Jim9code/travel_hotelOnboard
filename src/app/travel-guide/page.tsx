'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share, ChevronDown, MapPin, Wifi, Coffee, Waves } from 'lucide-react';

interface FeaturedHotel {
  id: number;
  name: string;
  location: string;
  distanceKm: number;
  priceNgn: number;
  discountPercent: number;
  amenities: string[];
  imageUrl: string;
  heroImageUrl: string;
}

export default function TravelGuidePage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hotel, setHotel] = useState<FeaturedHotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/featured-hotel', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load featured hotel');
        const data: FeaturedHotel = await res.json();
        if (mounted) setHotel(data);
      } catch (e: any) {
        if (mounted) setError(e.message || 'Error loading featured hotel');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Status Bar */}
      <div className="bg-black text-white text-xs py-1 px-4 flex justify-between items-center">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2 bg-white rounded-sm"></div>
          <div className="w-4 h-2 bg-white rounded-sm"></div>
          <div className="w-4 h-2 bg-white rounded-sm"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-white">
        {/* Header */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-black leading-tight mb-4">
            Top 10 Places To Visit In Rivers State On Your Next Trip
          </h1>

          {/* Hero Image */}
          <div className="mb-4">
            <div className="w-full h-48 rounded-lg relative overflow-hidden">
              {hotel?.heroImageUrl ? (
                <Image
                  src={hotel.heroImageUrl}
                  alt={hotel.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
          </div>

          {/* Interaction Icons */}
          <div className="flex justify-center space-x-8 mb-4">
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="text-gray-400 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="text-gray-400 hover:text-green-500 transition-colors">
              <Share className="w-6 h-6" />
            </button>
          </div>

          {/* Booking CTA */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-sm">
                Booking is faster, cheaper & reliable, with free cancellation.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                Book a Stay
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-black mb-3">
              Visit The Southern Heartbeat Of Tourism
            </h2>
            
            <div className="text-gray-800 text-sm leading-relaxed">
              <p className="mb-3">
                Rivers State, popularly known as the <strong>Treasure Base of the Nation</strong>, is one of Nigeria's most vibrant tourist destinations. The state capital, <strong>Port Harcourt (the Garden City)</strong>, is home to most of its top attractions, ranging from amusement parks and cultural museums to buzzing nightlife and modern shopping malls.
              </p>
              
              {isExpanded && (
                <div className="space-y-3">
                  <p>
                    Rivers State offers a unique blend of natural beauty and urban sophistication. From the serene beaches of Bonny Island to the bustling markets of Port Harcourt, visitors can experience the rich cultural heritage and modern amenities that make this state a must-visit destination.
                  </p>
                  <p>
                    The state is also known for its oil and gas industry, which has contributed to its economic growth and development. However, beyond the industrial landscape, Rivers State boasts beautiful waterways, lush vegetation, and a warm, welcoming people who are proud of their heritage.
                  </p>
                  <p>
                    Whether you're interested in exploring historical sites, enjoying water sports, or simply relaxing in nature, Rivers State has something to offer every type of traveler. The state's strategic location along the Atlantic coast makes it an ideal gateway to other parts of Nigeria and West Africa.
                  </p>
                </div>
              )}
              
              <button 
                onClick={toggleExpanded}
                className="flex items-center text-gray-600 hover:text-gray-800 mt-3"
              >
                <ChevronDown className={`w-4 h-4 mr-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                {isExpanded ? 'Show Less' : 'Read More'}
              </button>
            </div>
          </div>

          {/* Hotel Booking Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-black mb-4">
              Let's Help You Book this Hotel
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex space-x-4">
                {/* Hotel Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                  {hotel?.imageUrl ? (
                    <Image
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  ) : null}
                </div>
                
                {/* Hotel Details */}
                <div className="flex-1">
                  <h4 className="font-bold text-black text-sm mb-1">{hotel?.name || '...'}</h4>
                  
                  <div className="flex items-center text-gray-600 text-xs mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{hotel?.location || '...'}</span>
                    {hotel && (
                      <span className="ml-2">{hotel.distanceKm}KM away from you</span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-xs mb-2 space-x-2">
                    {hotel?.amenities?.slice(0,3).map((amenity) => (
                      <span key={amenity} className="flex items-center">
                        {amenity.toLowerCase().includes('breakfast') && <Coffee className="w-3 h-3 mr-1" />}
                        {amenity.toLowerCase().includes('wifi') && <Wifi className="w-3 h-3 mr-1" />}
                        {amenity.toLowerCase().includes('pool') && <Waves className="w-3 h-3 mr-1" />}
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-red-600 font-bold text-lg">{hotel ? `N${hotel.priceNgn.toLocaleString()}` : '...'}</div>
                      {hotel && (
                        <div className="text-gray-500 text-xs">Save {hotel.discountPercent}%</div>
                      )}
                    </div>
                    
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-green-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                  
                  {/* Pagination Dots */}
                  <div className="flex space-x-1 mt-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
