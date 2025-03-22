
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { List, Image } from 'lucide-react';

const PoliceNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard')) {
      setActiveTab('dashboard');
    } else if (path.includes('/gallery')) {
      setActiveTab('gallery');
    }
  }, [location.pathname]);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Requests',
      icon: List,
      path: '/police/dashboard',
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: Image,
      path: '/police/gallery',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] rounded-t-2xl z-10">
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item px-6 py-2 ${activeTab === item.id ? 'active' : 'text-gray-500'}`}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={22} className={`mb-1 ${activeTab === item.id ? 'text-lavender-600' : 'text-gray-500'}`} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PoliceNavbar;
