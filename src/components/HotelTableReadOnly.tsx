'use client';

import { Hotel, responseStatusColors, responseStatusLabels } from '@/types/hotel';

interface HotelTableReadOnlyProps {
  hotels: Hotel[];
}

export default function HotelTableReadOnly({ hotels }: HotelTableReadOnlyProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Hotel Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Response Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Conversation Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-200">
            {hotels.map((hotel) => (
              <tr key={hotel.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {hotel.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {hotel.name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center space-x-2">
                    {hotel.phoneNumber ? (
                      <>
                        <span className="text-xs text-gray-500">
                          {hotel.countryCode || '+234'}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {hotel.phoneNumber}
                        </span>
                      </>
                    ) : (
                      '-'
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {hotel.address || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center space-x-2">
                    <div 
                      className={`w-4 h-4 rounded ${responseStatusColors[hotel.responseStatus]}`}
                      title={responseStatusLabels[hotel.responseStatus]}
                    />
                    <span className="text-xs text-gray-600">
                      {responseStatusLabels[hotel.responseStatus]}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="max-w-xs">
                    {hotel.conversation || '-'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Response Status Legend */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Response Status Legend:</h3>
        <div className="flex flex-wrap gap-4">
          {(['no-answer', 'answered', 'call-back', 'switched-off'] as const).map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded ${responseStatusColors[status]}`} />
              <span className="text-sm text-gray-600">{responseStatusLabels[status]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
