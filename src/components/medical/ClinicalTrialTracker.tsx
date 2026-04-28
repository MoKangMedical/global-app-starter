'use client';
 
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Activity, Calendar, Clock, User, FileText, Pill, AlertCircle} from 'lucide-react';
 
interface ClinicalTrial {
  id: string;
  title: string;
  status: 'recruiting' | 'active' | 'completed' | 'suspended';
  phase: 'I' | 'II' | 'III' | 'IV';
  startDate: string;
  endDate?: string;
  participants: number;
  targetParticipants: number;
  sponsor: string;
}
 
interface PatientSummary {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  nextAppointment?: string;
  medications: number;
  alerts: number;
}
 
export default function ClinicalTrialTracker() {
  const t = useTranslations('medical');
  const [activeTab, setActiveTab] = useState<'trials' | 'patients'>('trials');
 
  const trials: ClinicalTrial[] = [
    {
      id: 'NCT001',
      title: 'Phase III Trial of Novel Cancer Treatment',
      status: 'recruiting',
      phase: 'III',
      startDate: '2024-01-15',
      participants: 45,
      targetParticipants: 100,
      sponsor: 'PharmaCorp',
    },
    {
      id: 'NCT002',
      title: 'Cardiovascular Prevention Study',
      status: 'active',
      phase: 'II',
      startDate: '2023-06-01',
      participants: 200,
      targetParticipants: 200,
      sponsor: 'HeartHealth Inc',
    },
  ];
 
  const patients: PatientSummary[] = [
    {
      id: 'P001',
      name: 'John Smith',
      age: 45,
      condition: 'Type 2 Diabetes',
      lastVisit: '2024-03-15',
      nextAppointment: '2024-04-15',
      medications: 3,
      alerts: 1,
    },
    {
      id: 'P002',
      name: 'Maria Garcia',
      age: 62,
      condition: 'Hypertension',
      lastVisit: '2024-03-10',
      medications: 2,
      alerts: 0,
    },
  ];
 
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recruiting':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
 
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Clinical Trial Tracker
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('trials')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'trials'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Trials
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'patients'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Patients
          </button>
        </div>
      </div>
 
      {activeTab === 'trials' && (
        <div className="space-y-4">
          {trials.map((trial) => (
            <div
              key={trial.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">
                      {trial.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        trial.status
                      )}`}
                    >
                      {trial.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {trial.id} • Phase {trial.phase}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {trial.participants}/{trial.targetParticipants}
                  </p>
                  <p className="text-xs text-gray-500">participants</p>
                </div>
              </div>
 
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {trial.startDate}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {trial.sponsor}
                </div>
              </div>
 
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${
                        (trial.participants / trial.targetParticipants) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
 
      {activeTab === 'patients' && (
        <div className="space-y-4">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {patient.age} years • {patient.condition}
                    </p>
                  </div>
                </div>
                {patient.alerts > 0 && (
                  <div className="flex items-center gap-1 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {patient.alerts} alert{patient.alerts > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
 
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Last: {patient.lastVisit}
                </div>
                {patient.nextAppointment && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Next: {patient.nextAppointment}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Pill className="h-4 w-4" />
                  {patient.medications} medications
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
