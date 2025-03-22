
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Pause, Play } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface Sound {
  id: string;
  name: string;
  description: string;
}

interface FakeSoundsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FakeSounds = ({ open, onOpenChange }: FakeSoundsProps) => {
  const [playingSoundId, setPlayingSoundId] = useState<string | null>(null);
  
  const sounds: Sound[] = [
    { id: '1', name: 'Phone Ring', description: 'Incoming call ringtone' },
    { id: '2', name: 'Police Siren', description: 'Emergency vehicle sound' },
    { id: '3', name: 'Door Bell', description: 'Someone at the door' },
    { id: '4', name: 'Alarm Clock', description: 'Loud alarm sound' },
    { id: '5', name: 'Dog Barking', description: 'Aggressive dog barking' },
  ];
  
  const handlePlaySound = (soundId: string) => {
    if (playingSoundId === soundId) {
      setPlayingSoundId(null);
    } else {
      setPlayingSoundId(soundId);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md" side="bottom">
        <SheetHeader className="pb-5">
          <SheetTitle className="text-safira-800">Play Deterrent Sounds</SheetTitle>
          <SheetDescription>
            Play sounds to deter potential threats
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <div className="space-y-3">
            {sounds.map((sound) => (
              <div 
                key={sound.id} 
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-safira-100 flex items-center justify-center mr-3">
                    <Volume2 size={20} className="text-safira-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{sound.name}</div>
                    <div className="text-sm text-gray-500">{sound.description}</div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handlePlaySound(sound.id)}
                  className={playingSoundId === sound.id ? 'text-safira-600' : 'text-gray-500'}
                >
                  {playingSoundId === sound.id ? <Pause size={20} /> : <Play size={20} />}
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FakeSounds;
