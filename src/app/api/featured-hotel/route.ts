import { NextResponse } from 'next/server';

export async function GET() {
  // Example dynamic data. Replace with real backend call when available.
  const featuredHotel = {
    id: 101,
    name: 'Statement Hotel',
    location: 'Jabi',
    distanceKm: 30,
    priceNgn: 60000,
    discountPercent: 10,
    amenities: ['Breakfast Included', 'WiFi', 'Swimming Pool'],
    imageUrl: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=1200&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=1600&q=80'
  };

  return NextResponse.json(featuredHotel);
}


