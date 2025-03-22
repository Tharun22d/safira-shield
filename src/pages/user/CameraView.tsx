
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import UserNavbar from '@/components/UserNavbar';
import { Camera, Image, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const CameraView = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' },
          audio: false 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        toast.error('Unable to access camera. Please check permissions.');
      }
    };
    
    startCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw current video frame to canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);
      }
    }
  };
  
  const resetCapture = () => {
    setCapturedImage(null);
    setIsSent(false);
  };
  
  const sendToPolice = () => {
    setIsSending(true);
    
    // Simulate sending to police
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      toast.success('Image sent to police successfully', {
        description: 'The authorities have been notified with your location'
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black pb-16">
      <div className="relative h-full">
        {/* Camera Feed or Captured Image */}
        {capturedImage ? (
          <div className="relative h-[calc(100vh-80px)]">
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="w-full h-full object-cover"
            />
            
            {isSent && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="flex flex-col items-center text-white">
                  <CheckCircle size={60} className="text-green-500 mb-3" />
                  <p className="text-lg font-medium">Image Sent</p>
                  <p className="text-sm opacity-80">The police have been notified</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-[calc(100vh-80px)]">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Hidden canvas for capturing images */}
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Camera Controls */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          {capturedImage ? (
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="lg"
                onClick={resetCapture}
                className="rounded-full h-14 w-14 p-0 bg-white bg-opacity-20 text-white border-white border-opacity-30 hover:bg-opacity-30"
              >
                <Camera size={24} />
              </Button>
              
              <Button
                disabled={isSending || isSent}
                onClick={sendToPolice}
                className="rounded-full bg-safira-600 hover:bg-safira-700 text-white px-5 py-6 flex items-center"
              >
                {isSending ? (
                  <span>Sending...</span>
                ) : isSent ? (
                  <span className="flex items-center">
                    <CheckCircle size={18} className="mr-2" />
                    Sent to Police
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Image size={18} className="mr-2" />
                    Share with Safira
                  </span>
                )}
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="lg"
              onClick={captureImage}
              className="rounded-full h-16 w-16 p-0 bg-white bg-opacity-20 text-white border-white border-opacity-30 hover:bg-opacity-30"
            >
              <div className="h-12 w-12 rounded-full border-2 border-white" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Navigation Bar */}
      <UserNavbar />
    </div>
  );
};

export default CameraView;
