export type ResponseStatus = 'no-answer' | 'answered' | 'call-back' | 'switched-off';

export interface Hotel {
  id: number;
  name: string;
  countryCode: string;
  phoneNumber: string;
  address: string;
  responseStatus: ResponseStatus;
  conversation: string;
}

export const responseStatusColors = {
  'no-answer': 'bg-red-500',
  'answered': 'bg-green-500',
  'call-back': 'bg-orange-500',
  'switched-off': 'bg-gray-800'
};

export const responseStatusLabels = {
  'no-answer': 'No Answer',
  'answered': 'Answered',
  'call-back': 'Call back in 2-3 minutes',
  'switched-off': 'Switched Off'
};
