
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { AuthContext } from '../App';

const PoliceLogin = () => {
  const [badgeNumber, setBadgeNumber] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    
    if (!badgeNumber.trim()) {
      toast.error('Please enter your badge number');
      return false;
    }
    
    return true;
  };

  const handleLogin = () => {
    if (!validateInputs()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store in context to pass to OTP screen
      sessionStorage.setItem('safira_temp_auth', JSON.stringify({
        phone: badgeNumber,
        name: name,
        type: 'police'
      }));
      
      navigate('/otp-verification');
      setIsLoading(false);
    }, 1000);
  };

  const handleBackToUserLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-50 to-safira-50 flex flex-col justify-center items-center p-6 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-lavender-600 flex items-center justify-center shadow-lg">
                <Shield size={40} className="text-white" />
              </div>
              <div className="absolute -bottom-1 right-0 bg-safira-500 rounded-full p-1 shadow-md">
                <Shield size={14} className="text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-safira-900 mb-1">Safira</h1>
          <p className="text-lavender-700 font-medium">Pink Police Portal</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl animate-scale-in card-shadow">
          <h2 className="text-xl font-semibold mb-6 text-center text-lavender-700">Officer Login</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-lavender-700 mb-1 ml-1">
                Officer Name
              </label>
              <Input 
                id="name"
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input border-lavender-200 focus:ring-lavender-300"
              />
            </div>
            
            <div>
              <label htmlFor="badge" className="block text-sm font-medium text-lavender-700 mb-1 ml-1">
                Badge Number
              </label>
              <Input 
                id="badge"
                type="text" 
                placeholder="Enter your badge number" 
                value={badgeNumber}
                onChange={(e) => setBadgeNumber(e.target.value)}
                className="auth-input border-lavender-200 focus:ring-lavender-300"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleLogin} 
            disabled={isLoading}
            className="w-full py-6 bg-lavender-600 hover:bg-lavender-700 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Processing...' : 'Continue'}
            <ChevronRight size={18} />
          </Button>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={handleBackToUserLogin}
            className="text-sm font-medium text-lavender-700 hover:text-lavender-800 transition-colors duration-200 underline"
          >
            Back to User Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoliceLogin;
