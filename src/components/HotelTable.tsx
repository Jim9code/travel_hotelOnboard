'use client';

import { useState } from 'react';
import { Hotel, ResponseStatus, responseStatusColors, responseStatusLabels } from '@/types/hotel';
import { Phone, Edit, Trash2, X, CheckSquare, Square } from 'lucide-react';

interface HotelTableProps {
  hotels: Hotel[];
  onUpdate: (id: number, updates: Partial<Hotel>) => void;
  onDelete: (id: number) => void;
  currentCallIndex: number | null;
}

export default function HotelTable({ hotels, onUpdate, onDelete, currentCallIndex }: HotelTableProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Hotel>>({});
  const [selectedHotels, setSelectedHotels] = useState<Set<number>>(new Set());

  const startEditing = (hotel: Hotel) => {
    setEditingId(hotel.id);
    setEditData(hotel);
  };

  const saveEdit = () => {
    if (editingId) {
      onUpdate(editingId, editData);
      setEditingId(null);
      setEditData({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const updateResponseStatus = (id: number, status: ResponseStatus) => {
    onUpdate(id, { responseStatus: status });
  };

  const makeCall = (phoneNumber: string) => {
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`, '_blank');
    }
  };

  const toggleHotelSelection = (hotelId: number) => {
    const newSelected = new Set(selectedHotels);
    if (newSelected.has(hotelId)) {
      newSelected.delete(hotelId);
    } else {
      newSelected.add(hotelId);
    }
    setSelectedHotels(newSelected);
  };

  const selectAllHotels = () => {
    if (selectedHotels.size === hotels.length) {
      setSelectedHotels(new Set());
    } else {
      setSelectedHotels(new Set(hotels.map(hotel => hotel.id)));
    }
  };

  const callSelectedHotels = () => {
    const selectedHotelList = hotels.filter(hotel => selectedHotels.has(hotel.id));
    if (selectedHotelList.length === 0) return;

    // Call the first selected hotel
    const firstHotel = selectedHotelList[0];
    const phoneNumber = `${firstHotel.countryCode || '+234'}${firstHotel.phoneNumber}`;
    makeCall(phoneNumber);

    // Clear selection after calling
    setSelectedHotels(new Set());
  };

  const isAllSelected = hotels.length > 0 && selectedHotels.size === hotels.length;
  const isIndeterminate = selectedHotels.size > 0 && selectedHotels.size < hotels.length;



  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Selection Controls */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={selectAllHotels}
              className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900"
            >
              {isAllSelected ? (
                <CheckSquare className="w-5 h-5 text-blue-600" />
              ) : isIndeterminate ? (
                <div className="w-5 h-5 border-2 border-blue-600 bg-blue-600 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                </div>
              ) : (
                <Square className="w-5 h-5 text-gray-400" />
              )}
              <span>
                {isAllSelected ? 'Deselect All' : 'Select All'}
              </span>
            </button>
            {selectedHotels.size > 0 && (
              <span className="text-sm text-gray-600">
                {selectedHotels.size} hotel{selectedHotels.size !== 1 ? 's' : ''} selected
              </span>
            )}
          </div>
          {selectedHotels.size > 0 && (
            <button
              onClick={callSelectedHotels}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Selected ({selectedHotels.size})</span>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Select
              </th>
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
                Response
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Conversation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-200">
            {hotels.map((hotel, index) => (
              <tr 
                key={hotel.id} 
                className={`${currentCallIndex === index ? 'bg-blue-100' : ''} hover:bg-gray-100`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => toggleHotelSelection(hotel.id)}
                    className="flex items-center justify-center"
                  >
                    {selectedHotels.has(hotel.id) ? (
                      <CheckSquare className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {hotel.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === hotel.id ? (
                    <input
                      type="text"
                      value={editData.name || ''}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    hotel.name || '-'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === hotel.id ? (
                    <div className="flex items-center space-x-2">
                      <select
                        value={editData.countryCode || '+234'}
                        onChange={(e) => setEditData({ ...editData, countryCode: e.target.value })}
                        className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        type="text"
                        value={editData.phoneNumber || ''}
                        onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Phone number"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      {hotel.phoneNumber ? (
                        <>
                          <span className="text-xs text-gray-500">
                            {hotel.countryCode || '+234'}
                          </span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                            {hotel.phoneNumber}
                          </span>
                          <button
                            onClick={() => makeCall(`${hotel.countryCode || '+234'}${hotel.phoneNumber}`)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        '-'
                      )}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === hotel.id ? (
                    <input
                      type="text"
                      value={editData.address || ''}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    hotel.address || '-'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center space-x-2">
                    {/* Show current status as a colored dot */}
                    <div 
                      className={`w-4 h-4 rounded ${responseStatusColors[hotel.responseStatus]}`}
                      title={responseStatusLabels[hotel.responseStatus]}
                    />
                    {/* Show status label */}
                    <span className="text-xs text-gray-600">
                      {responseStatusLabels[hotel.responseStatus]}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === hotel.id ? (
                    <input
                      type="text"
                      value={editData.conversation || ''}
                      onChange={(e) => setEditData({ ...editData, conversation: e.target.value })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    hotel.conversation || '-'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === hotel.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={saveEdit}
                        className="text-green-600 hover:text-green-800"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(hotel)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(hotel.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
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
          {(['no-answer', 'answered', 'call-back', 'switched-off'] as ResponseStatus[]).map((status) => (
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
