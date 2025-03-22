
import { useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { AuthContext } from '../../App';
import UserNavbar from '@/components/UserNavbar';
import FriendsList from '@/components/FriendsList';
import LocationSharing from '@/components/LocationSharing';
import FakeSounds from '@/components/FakeSounds';
import { Shield, Users, MapPin, Volume, Phone, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { userName, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSosActive, setIsSosActive] = useState(false);
  const [friendsListOpen, setFriendsListOpen] = useState(false);
  const [locationSharingOpen, setLocationSharingOpen] = useState(false);
  const [fakeSoundsOpen, setFakeSoundsOpen] = useState(false);
  
  const handleSosButtonClick = () => {
    setIsSosActive(true);
    
    toast.success('SOS alert sent to your emergency contacts', {
      description: 'They have been notified with your current location'
    });
    
    // Reset after animation
    setTimeout(() => {
      setIsSosActive(false);
    }, 2000);
  };
  
  const handleCallPolice = () => {
    toast.success('Alert sent to police', {
      description: 'The nearest police station has been notified'
    });
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="pt-12 px-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-safira-800">Hi, {userName}</h1>
          <p className="text-safira-600">Stay safe today</p>
        </div>
        <button 
          onClick={handleLogout}
          className="p-2 text-gray-500 hover:text-safira-600 transition-colors"
        >
          <LogOut size={20} />
        </button>
      </header>
      
      <main className="px-6 pt-8">
        {/* SOS Button */}
        <div className="flex flex-col items-center justify-center mb-12">
          <button
            onClick={handleSosButtonClick}
            className={`sos-button w-36 h-36 mb-4 ${isSosActive ? 'animate-pulse-soft' : ''}`}
            disabled={isSosActive}
          >
            {isSosActive && <span className="sos-ripple" />}
            <div className="flex flex-col items-center justify-center">
              <Shield size={40} className="mb-1" />
              <span className="font-bold text-xl">SOS</span>
            </div>
          </button>
          <p className="text-sm text-safira-600 font-medium">Tap to send emergency alert</p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex justify-between gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => setFriendsListOpen(true)}
            className="flex-1 flex flex-col items-center py-5 border-gray-200 bg-white hover:bg-gray-50 shadow-sm rounded-xl"
          >
            <Users size={24} className="mb-2 text-safira-600" />
            <span className="text-xs">Contacts</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setLocationSharingOpen(true)}
            className="flex-1 flex flex-col items-center py-5 border-gray-200 bg-white hover:bg-gray-50 shadow-sm rounded-xl"
          >
            <MapPin size={24} className="mb-2 text-safira-600" />
            <span className="text-xs">Share Location</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setFakeSoundsOpen(true)}
            className="flex-1 flex flex-col items-center py-5 border-gray-200 bg-white hover:bg-gray-50 shadow-sm rounded-xl"
          >
            <Volume size={24} className="mb-2 text-safira-600" />
            <span className="text-xs">Fake Sounds</span>
          </Button>
        </div>
        
        {/* Call Police Button */}
        <Button
          onClick={handleCallPolice}
          className="w-full py-6 bg-lavender-600 hover:bg-lavender-700 text-white rounded-xl shadow-md flex items-center justify-center gap-2"
        >
          <Phone size={18} className="mr-1" />
          <span>Call Police</span>
        </Button>
      </main>
      
      {/* Friends List Sheet */}
      <FriendsList 
        open={friendsListOpen} 
        onOpenChange={setFriendsListOpen} 
      />
      
      {/* Location Sharing Sheet */}
      <LocationSharing 
        open={locationSharingOpen} 
        onOpenChange={setLocationSharingOpen} 
      />
      
      {/* Fake Sounds Sheet */}
      <FakeSounds 
        open={fakeSoundsOpen} 
        onOpenChange={setFakeSoundsOpen} 
      />
      
      {/* Navigation Bar */}
      <UserNavbar />
    </div>
  );
};

export default UserDashboard;
