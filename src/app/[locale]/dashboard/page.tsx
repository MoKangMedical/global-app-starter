import {useTranslations} from 'next-intl';
import ClinicalTrialTracker from '@/components/medical/ClinicalTrialTracker';
import CountrySelector from '@/components/international/CountrySelector';
import CurrencyConverter from '@/components/international/CurrencyConverter';
import {Activity, Users, FileText, AlertTriangle, Calendar, TrendingUp} from 'lucide-react';
 
export default function DashboardPage() {
  const t = useTranslations();
 
  const stats = [
    {
      name: 'Active Patients',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Appointments Today',
      value: '45',
      change: '+5%',
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      name: 'Pending Reports',
      value: '23',
      change: '-8%',
      icon: FileText,
      color: 'bg-yellow-500',
    },
    {
      name: 'Critical Alerts',
      value: '3',
      change: '0%',
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
  ];
 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Medical Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, Dr. Smith
              </p>
            </div>
            <div className="flex items-center gap-4">
              <CountrySelector />
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">DS</span>
              </div>
            </div>
          </div>
        </div>
      </header>
 
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p
                    className={`mt-2 text-sm ${
                      stat.change.startsWith('+')
                        ? 'text-green-600'
                        : stat.change.startsWith('-')
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div
                  className={`${stat.color} p-3 rounded-lg`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
 
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Clinical Trial Tracker */}
          <div className="lg:col-span-2">
            <ClinicalTrialTracker />
          </div>
 
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Revenue Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Monthly Revenue
              </h3>
              <div className="text-3xl font-bold text-gray-900">
                <CurrencyConverter amountUSD={125000} />
              </div>
              <div className="mt-2 flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+15% from last month</span>
              </div>
            </div>
 
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  {
                    action: 'New patient registered',
                    time: '2 minutes ago',
                    icon: Users,
                  },
                  {
                    action: 'Lab results received',
                    time: '15 minutes ago',
                    icon: FileText,
                  },
                  {
                    action: 'Appointment scheduled',
                    time: '1 hour ago',
                    icon: Calendar,
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <activity.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-left">
                  New Appointment
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-left">
                  Add Patient
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-left">
                  Write Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
