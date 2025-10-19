'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  ArrowLeft,
  Download,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

// Sample exit survey data - in a real app, this would come from your API
const sampleExitSurveyData = [
  { reason: 'Prices are too high', count: 145, percentage: 35 },
  { reason: 'Not enough options available', count: 98, percentage: 24 },
  { reason: "Couldn't find the hotel I was looking for", count: 87, percentage: 21 },
  { reason: "The hotels didn't look appealing", count: 52, percentage: 13 },
  { reason: 'Website is too slow to load', count: 28, percentage: 7 }
];

const sampleTimeSeriesData = [
  { date: '2024-01-01', exitRate: 12.5, totalExits: 145 },
  { date: '2024-01-08', exitRate: 11.2, totalExits: 132 },
  { date: '2024-01-15', exitRate: 9.8, totalExits: 118 },
  { date: '2024-01-22', exitRate: 10.5, totalExits: 125 },
  { date: '2024-01-29', exitRate: 8.9, totalExits: 98 },
  { date: '2024-02-05', exitRate: 7.2, totalExits: 87 },
  { date: '2024-02-12', exitRate: 6.8, totalExits: 78 }
];

const sampleSourceData = [
  { name: 'Facebook', count: 45, fill: '#1877F2' },
  { name: 'Instagram', count: 38, fill: '#E4405F' },
  { name: 'Google Search', count: 52, fill: '#4285F4' },
  { name: 'Google Ads', count: 28, fill: '#34A853' },
  { name: 'LinkedIn', count: 15, fill: '#0077B5' },
  { name: 'TikTok', count: 22, fill: '#000000' },
  { name: 'Twitter', count: 18, fill: '#1DA1F2' },
  { name: 'Referral', count: 35, fill: '#FF6B6B' },
  { name: 'Events', count: 12, fill: '#4ECDC4' },
  { name: 'Others', count: 8, fill: '#95A5A6' }
];

const sampleOtherResponses = [
  "Website is too slow to load",
  "Poor customer service experience",
  "Limited payment options",
  "Confusing booking process",
  "No mobile app available",
  "Unclear pricing structure",
  "Limited hotel reviews",
  "Booking cancellation issues"
];

const COLORS = ['#40b869', '#3B82F6', '#EF4444', '#F59E0B', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

export default function SurveyAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const totalExitResponses = sampleExitSurveyData.reduce((sum, d) => sum + d.count, 0);
  const avgExitRate = sampleTimeSeriesData.reduce((sum, d) => sum + d.exitRate, 0) / sampleTimeSeriesData.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Loading survey analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <a
              href="/dashboard"
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </a>
            <h1 className="text-3xl font-bold text-gray-900">
              Exit Survey Analytics Dashboard
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Exit Responses</p>
                <p className="text-2xl font-bold text-gray-900">{totalExitResponses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Exit Rate</p>
                <p className="text-2xl font-bold text-gray-900">{avgExitRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Top Exit Reason</p>
                <p className="text-lg font-bold text-gray-900">Prices too high</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Survey Completion</p>
                <p className="text-2xl font-bold text-gray-900">92%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exit Survey Reasons (Bar Chart)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={sampleExitSurveyData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="reason" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  interval={0}
                />
                <YAxis />
                <Tooltip 
                  cursor={false}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    boxShadow: 'none',
                    padding: '8px 12px',
                    fontSize: '14px',
                    color: '#374151'
                  }}
                  labelStyle={{
                    color: '#6b7280',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#40b869" />
              </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exit Survey Reasons (Pie Chart)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={sampleExitSurveyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ reason, percentage }) => `${reason}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {sampleExitSurveyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Time Series Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exit Rate Trends Over Time</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={sampleTimeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="exitRate"
                stackId="1"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Tables */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Exit Survey Responses Breakdown</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {sampleExitSurveyData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm text-gray-700">{item.reason}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{item.count}</span>
                      <span className="text-xs text-gray-500">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">"Other" Responses Details</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {sampleOtherResponses.map((response, index) => (
                  <div key={index} className="flex items-start space-x-3 py-2 border-b border-gray-100 last:border-b-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{response}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>Total "Other" responses:</strong> 28 (Website performance issues)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Exit Rate Summary</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-700">Current Exit Rate</span>
                  <span className="text-sm font-medium text-red-600">6.8%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-700">Average Exit Rate</span>
                  <span className="text-sm font-medium text-yellow-600">{avgExitRate.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-700">Peak Exit Rate</span>
                  <span className="text-sm font-medium text-red-600">12.5%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-700">Lowest Exit Rate</span>
                  <span className="text-sm font-medium text-green-600">6.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
