
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share, MapPin, Check } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { toast } from 'sonner';

interface LocationSharingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LocationSharing = ({ open, onOpenChange }: LocationSharingProps) => {
  const [isSharing, setIsSharing] = useState(false);
  
  const handleStartSharing = () => {
    setIsSharing(true);
    toast.success('Location sharing started. Your trusted contacts will receive updates.');
  };
  
  const handleStopSharing = () => {
    setIsSharing(false);
    toast.success('Location sharing stopped.');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md" side="bottom">
        <SheetHeader className="pb-5">
          <SheetTitle className="text-safira-800">Share Live Location</SheetTitle>
          <SheetDescription>
            Share your real-time location with trusted contacts
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col items-center justify-center py-6 space-y-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-safira-100 flex items-center justify-center">
              <MapPin size={40} className="text-safira-600" />
            </div>
            {isSharing && (
              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                <Check size={12} className="text-white" />
              </div>
            )}
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {isSharing ? 'Currently Sharing Location' : 'Share Your Location'}
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              {isSharing 
                ? 'Your trusted contacts can see your live location' 
                : 'Your emergency contacts will receive your real-time location'
              }
            </p>
          </div>
          
          {isSharing ? (
            <Button
              variant="destructive"
              onClick={handleStopSharing}
              className="w-full"
            >
              Stop Sharing
            </Button>
          ) : (
            <Button
              className="w-full bg-safira-600 hover:bg-safira-700"
              onClick={handleStartSharing}
            >
              Start Sharing
              <Share size={16} className="ml-2" />
            </Button>
          )}
        </div>
        
        <SheetFooter className="pt-2">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default LocationSharing;
