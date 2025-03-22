
import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, ChevronRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { AuthContext } from '../App';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [tempAuthData, setTempAuthData] = useState<{
    phone: string;
    name: string;
    type: 'user' | 'police';
  } | null>(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  useEffect(() => {
    const tempAuth = sessionStorage.getItem('safira_temp_auth');
    if (!tempAuth) {
      toast.error('Session expired. Please try again.');
      navigate('/login');
      return;
    }

    try {
      const parsedAuth = JSON.parse(tempAuth);
      setTempAuthData(parsedAuth);
    } catch (e) {
      console.error('Error parsing temp auth', e);
      toast.error('Something went wrong. Please try again.');
      navigate('/login');
    }

    // Focus first input on mount
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, [navigate]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4).split('');
    const newOtp = [...otp];
    
    pastedData.forEach((char, index) => {
      if (index < 4) {
        newOtp[index] = char;
      }
    });
    
    setOtp(newOtp);
    
    // Focus last field or the next empty one
    const lastIndex = Math.min(pastedData.length, 3);
    inputRefs[lastIndex].current?.focus();
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length !== 4) {
      toast.error('Please enter a valid 4-digit OTP');
      return;
    }
    
    setIsLoading(true);
    
    // For demo purposes, accept only '0000' as valid OTP
    setTimeout(() => {
      if (enteredOtp === '0000' && tempAuthData) {
        login(tempAuthData.phone, tempAuthData.name, tempAuthData.type);
        sessionStorage.removeItem('safira_temp_auth');
        
        toast.success('Verification successful!');
        
        if (tempAuthData.type === 'user') {
          navigate('/user/dashboard');
        } else {
          navigate('/police/dashboard');
        }
      } else {
        toast.error('Invalid OTP. For this demo, please use 0000');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleBack = () => {
    if (tempAuthData?.type === 'police') {
      navigate('/police-login');
    } else {
      navigate('/login');
    }
  };

  if (!tempAuthData) {
    return null; // Loading or redirect handled in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender-50 to-safira-50 flex flex-col justify-center items-center p-6 animate-fade-in">
      <div className="w-full max-w-md">
        <button 
          onClick={handleBack}
          className="flex items-center text-safira-600 hover:text-safira-700 transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Back</span>
        </button>
      
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className={`h-16 w-16 rounded-full ${tempAuthData.type === 'police' ? 'bg-lavender-600' : 'bg-safira-500'} flex items-center justify-center shadow-lg`}>
              <Shield size={30} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-safira-900 mb-1">Verification</h1>
          <p className="text-safira-600 font-medium">Enter the code sent to {tempAuthData.phone}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl animate-scale-in card-shadow">
          <div className="mb-6">
            <div className="flex justify-center gap-3 mb-8">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-14 h-14 text-center text-xl font-bold auth-input"
                />
              ))}
            </div>
            
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">
                For this demo, use code: <span className="font-semibold">0000</span>
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleVerify} 
            disabled={isLoading}
            className={`w-full py-6 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              tempAuthData.type === 'police' 
                ? 'bg-lavender-600 hover:bg-lavender-700' 
                : 'bg-safira-600 hover:bg-safira-700'
            }`}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
