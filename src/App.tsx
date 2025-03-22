
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Login from "./pages/Login";
import OTPVerification from "./pages/OTPVerification";
import UserDashboard from "./pages/user/UserDashboard";
import CameraView from "./pages/user/CameraView";
import SafetyTips from "./pages/user/SafetyTips";
import PoliceLogin from "./pages/PoliceLogin";
import PoliceDashboard from "./pages/police/PoliceDashboard";
import PoliceGallery from "./pages/police/PoliceGallery";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

type UserType = 'user' | 'police';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: UserType | null;
  userPhone: string | null;
  userName: string | null;
  login: (phone: string, name: string, type: UserType) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userType: null,
  userPhone: null,
  userName: null,
  login: () => {},
  logout: () => {},
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("safira_auth");
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setIsAuthenticated(true);
        setUserType(authData.userType);
        setUserPhone(authData.userPhone);
        setUserName(authData.userName);
      } catch (e) {
        console.error("Error parsing stored auth data", e);
        localStorage.removeItem("safira_auth");
      }
    }
  }, []);

  const login = (phone: string, name: string, type: UserType) => {
    setIsAuthenticated(true);
    setUserType(type);
    setUserPhone(phone);
    setUserName(name);
    
    localStorage.setItem("safira_auth", JSON.stringify({
      userType: type,
      userPhone: phone,
      userName: name,
    }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setUserPhone(null);
    setUserName(null);
    localStorage.removeItem("safira_auth");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, userType, userPhone, userName, login, logout }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route 
                path="/" 
                element={isAuthenticated ? 
                  (userType === 'user' ? <Navigate to="/user/dashboard" /> : <Navigate to="/police/dashboard" />)
                  : <Login />
                } 
              />
              <Route path="/login" element={<Login />} />
              <Route path="/police-login" element={<PoliceLogin />} />
              <Route path="/otp-verification" element={<OTPVerification />} />
              
              {/* User Routes - Protected */}
              <Route 
                path="/user/dashboard" 
                element={isAuthenticated && userType === 'user' ? <UserDashboard /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/user/camera" 
                element={isAuthenticated && userType === 'user' ? <CameraView /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/user/safety-tips" 
                element={isAuthenticated && userType === 'user' ? <SafetyTips /> : <Navigate to="/login" />} 
              />
              
              {/* Police Routes - Protected */}
              <Route 
                path="/police/dashboard" 
                element={isAuthenticated && userType === 'police' ? <PoliceDashboard /> : <Navigate to="/police-login" />} 
              />
              <Route 
                path="/police/gallery" 
                element={isAuthenticated && userType === 'police' ? <PoliceGallery /> : <Navigate to="/police-login" />} 
              />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
