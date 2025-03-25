import React, { useState } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { LayoutDashboard, Calendar, MessageSquare, BarChart3, Bell, Settings } from 'lucide-react';

interface DoctorLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { name: 'Dashboard', href: '/doctor/dashboard', icon: LayoutDashboard },
  { name: 'Appointments', href: '/doctor/appointments', icon: Calendar },
  { name: 'Messages', href: '/doctor/messages', icon: MessageSquare },
  { name: 'Analytics', href: '/doctor/analytics', icon: BarChart3 },
  { name: 'Notifications', href: '/doctor/notifications', icon: Bell },
  { name: 'Settings', href: '/doctor/settings', icon: Settings },
];

const DoctorLayout: React.FC<DoctorLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-green-50">
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

export default DoctorLayout;
