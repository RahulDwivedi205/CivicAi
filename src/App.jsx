import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EmergencyNotice from './components/EmergencyNotice';
import CitizenPortal from './components/CitizenPortal';
import TrackComplaint from './components/TrackComplaint';
import StaffDashboard from './components/StaffDashboard';
import RoutingDirectory from './components/RoutingDirectory';
import MLEvaluationLab from './components/MLEvaluationLab';
import ProjectReportView from './components/ProjectReportView';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { INITIAL_COMPLAINTS } from './data/mockComplaints';

export default function App() {
  // Complaints persistent state
  const [complaints, setComplaints] = useState(() => {
    try {
      const saved = localStorage.getItem('civicai_complaints_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load from local storage', e);
    }
    return INITIAL_COMPLAINTS;
  });

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem('civicai_complaints_v1', JSON.stringify(complaints));
    } catch (e) {
      console.warn('Failed to save to local storage', e);
    }
  }, [complaints]);

  // Active navigation tab: 'citizen' | 'track' | 'staff' | 'routing' | 'ml-lab' | 'report'
  const [activeTab, setActiveTab] = useState('citizen');

  // Currently focused complaint for tracking
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

  // Language: 'en' | 'hi'
  const [language, setLanguage] = useState('en');

  // Toast notifications
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3500);
  };

  const pendingCount = complaints.filter((c) => c.status === 'submitted' || c.status === 'assigned').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Emergency Notice Banner */}
      <EmergencyNotice language={language} />

      {/* Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        pendingCount={pendingCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'citizen' && (
          <CitizenPortal
            complaints={complaints}
            setComplaints={setComplaints}
            language={language}
            setActiveTab={setActiveTab}
            setSelectedComplaintId={setSelectedComplaintId}
            showToast={showToast}
          />
        )}

        {activeTab === 'track' && (
          <TrackComplaint
            complaints={complaints}
            setComplaints={setComplaints}
            selectedComplaintId={selectedComplaintId}
            setSelectedComplaintId={setSelectedComplaintId}
            language={language}
            showToast={showToast}
          />
        )}

        {activeTab === 'staff' && (
          <StaffDashboard
            complaints={complaints}
            setComplaints={setComplaints}
            language={language}
            showToast={showToast}
          />
        )}

        {activeTab === 'routing' && (
          <RoutingDirectory language={language} />
        )}

        {activeTab === 'ml-lab' && (
          <MLEvaluationLab language={language} />
        )}

        {activeTab === 'report' && (
          <ProjectReportView language={language} />
        )}
      </main>

      {/* Footer */}
      <Footer language={language} setActiveTab={setActiveTab} />

      {/* Global Toast Alert */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        onHide={() => setToast({ visible: false, message: '' })}
      />
    </div>
  );
}
