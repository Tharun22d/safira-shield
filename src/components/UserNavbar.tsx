
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Camera, BookOpen } from 'lucide-react';

const UserNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard')) {
      setActiveTab('dashboard');
    } else if (path.includes('/camera')) {
      setActiveTab('camera');
    } else if (path.includes('/safety-tips')) {
      setActiveTab('safety-tips');
    }
  }, [location.pathname]);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: Home,
      path: '/user/dashboard',
    },
    {
      id: 'camera',
      label: 'Camera',
      icon: Camera,
      path: '/user/camera',
    },
    {
      id: 'safety-tips',
      label: 'Safety Tips',
      icon: BookOpen,
      path: '/user/safety-tips',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] rounded-t-2xl z-10">
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item px-3 py-2 ${activeTab === item.id ? 'active' : 'text-gray-500'}`}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={22} className={`mb-1 ${activeTab === item.id ? 'text-safira-600' : 'text-gray-500'}`} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserNavbar;
