import React, { useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { 
  Home, 
  Image, 
  Calendar, 
  MessageSquare, 
  Activity,
  Heart, 
  User, 
  Settings,
  BookOpen,
  Pill,
  Sun,
  Target,
  LineChart,
  Lightbulb
} from 'lucide-react';

interface PatientLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { name: 'Dashboard', href: '/patient/dashboard', icon: Home },
  { name: 'Diagnoses', href: '/diagnoses', icon: Image },
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { 
    name: 'Health Tracking',
    href: '/tracking',
    icon: Activity,
    subItems: [
      { name: 'Health Metrics', href: '/tracking/metrics', icon: LineChart },
      { name: 'Eczema Metrics', href: '/tracking/eczema', icon: Heart },
      { name: 'Medications', href: '/tracking/medications', icon: Pill },
      { name: 'Environmental', href: '/tracking/environmental', icon: Sun },
      { name: 'Goals', href: '/tracking/goals', icon: Target },
      { name: 'Education', href: '/tracking/education', icon: BookOpen },
      { name: 'Insights', href: '/tracking/insights', icon: Lightbulb }
    ]
  },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const PatientLayout: React.FC<PatientLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar onMenuClick={() => setOpen(!open)} />
      <div className="flex">
        <Sidebar open={open} setOpen={setOpen} navigationItems={navigationItems} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
