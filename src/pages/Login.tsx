
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { AuthContext } from '../App';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    
    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
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
        phone: phoneNumber,
        name: name,
        type: 'user'
      }));
      
      navigate('/otp-verification');
      setIsLoading(false);
    }, 1000);
  };

  const handlePoliceLogin = () => {
    navigate('/police-login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-50 to-safira-50 flex flex-col justify-center items-center p-6 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-safira-500 flex items-center justify-center shadow-lg">
                <Shield size={40} className="text-white" />
              </div>
              <div className="absolute -bottom-1 right-0 bg-lavender-500 rounded-full p-1 shadow-md">
                <Shield size={14} className="text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-safira-900 mb-1">Safira</h1>
          <p className="text-safira-600 font-medium">Your personal safety companion</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl animate-scale-in card-shadow">
          <h2 className="text-xl font-semibold mb-6 text-center text-safira-800">Welcome Back</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-safira-700 mb-1 ml-1">
                Your Name
              </label>
              <Input 
                id="name"
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-safira-700 mb-1 ml-1">
                Phone Number
              </label>
              <Input 
                id="phone"
                type="tel" 
                placeholder="Enter your phone number" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="auth-input"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleLogin} 
            disabled={isLoading}
            className="w-full py-6 bg-safira-600 hover:bg-safira-700 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Processing...' : 'Continue'}
            <ChevronRight size={18} />
          </Button>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={handlePoliceLogin}
            className="text-sm font-medium text-safira-700 hover:text-safira-800 transition-colors duration-200 underline"
          >
            Login as Pink Police
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
