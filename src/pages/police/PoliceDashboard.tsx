
import { useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import PoliceNavbar from '@/components/PoliceNavbar';
import { AuthContext } from '../../App';
import { LogOut, CheckCircle, X, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface SOSRequest {
  id: string;
  name: string;
  phone: string;
  location: string;
  time: string;
  status: 'new' | 'accepted' | 'closed';
}

const PoliceDashboard = () => {
  const { userName, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [requests, setRequests] = useState<SOSRequest[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      phone: '9876543210',
      location: '123 Main St, Downtown',
      time: '10 minutes ago',
      status: 'new'
    },
    {
      id: '2',
      name: 'Emily Chen',
      phone: '8765432109',
      location: 'Central Park, East Entrance',
      time: '25 minutes ago',
      status: 'new'
    },
    {
      id: '3',
      name: 'Olivia Martinez',
      phone: '7654321098',
      location: 'Grand Avenue Shopping Mall',
      time: '42 minutes ago',
      status: 'accepted'
    }
  ]);
  
  const handleAcceptRequest = (id: string) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'accepted' } : request
    ));
    
    toast.success('Request accepted', {
      description: 'The citizen has been notified'
    });
  };
  
  const handleCloseRequest = (id: string) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'closed' } : request
    ));
    
    toast.success('Request closed');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/police-login');
  };
  
  // Filter requests that are not closed
  const activeRequests = requests.filter(request => request.status !== 'closed');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="pt-12 px-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-lavender-800">Officer {userName}</h1>
          <p className="text-lavender-600">Pink Police Portal</p>
        </div>
        <button 
          onClick={handleLogout}
          className="p-2 text-gray-500 hover:text-lavender-600 transition-colors"
        >
          <LogOut size={20} />
        </button>
      </header>
      
      <main className="px-6 pt-8">
        <h2 className="text-xl font-semibold mb-4 text-lavender-700">SOS Requests</h2>
        
        {activeRequests.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
            <div className="text-gray-400 mb-2">
              <CheckCircle size={40} className="mx-auto" />
            </div>
            <p className="text-gray-600">No active requests at the moment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeRequests.map((request) => (
              <div 
                key={request.id} 
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{request.name}</h3>
                      <p className="text-sm text-gray-500">{request.phone}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      request.status === 'new' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {request.status === 'new' ? 'New' : 'Accepted'}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin size={16} className="text-lavender-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{request.location}</p>
                  </div>
                  
                  <p className="text-xs text-gray-500">Received {request.time}</p>
                </div>
                
                <div className="h-32 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">Map Preview</p>
                  </div>
                </div>
                
                <div className="flex border-t">
                  {request.status === 'new' ? (
                    <>
                      <button 
                        onClick={() => handleAcceptRequest(request.id)}
                        className="flex-1 py-3 text-green-600 hover:bg-green-50 transition-colors font-medium text-sm flex items-center justify-center gap-1"
                      >
                        <CheckCircle size={16} />
                        <span>Accept</span>
                      </button>
                      <div className="w-px bg-gray-200"></div>
                      <button 
                        onClick={() => handleCloseRequest(request.id)}
                        className="flex-1 py-3 text-gray-500 hover:bg-gray-50 transition-colors font-medium text-sm flex items-center justify-center gap-1"
                      >
                        <X size={16} />
                        <span>Close</span>
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => handleCloseRequest(request.id)}
                      className="flex-1 py-3 text-gray-500 hover:bg-gray-50 transition-colors font-medium text-sm flex items-center justify-center gap-1"
                    >
                      <X size={16} />
                      <span>Close Request</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      {/* Navigation Bar */}
      <PoliceNavbar />
    </div>
  );
};

export default PoliceDashboard;
