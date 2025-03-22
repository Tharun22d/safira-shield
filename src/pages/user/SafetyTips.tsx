import { useState } from 'react';
import UserNavbar from '@/components/UserNavbar';
import { Shield } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SafetyTip, safetyTips } from '@/data/safetyTips';

const SafetyTips = () => {
  const [selectedTip, setSelectedTip] = useState<SafetyTip | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const handleOpenTip = (tip: SafetyTip) => {
    setSelectedTip(tip);
    setSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="pt-12 px-6 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Shield size={20} className="text-safira-600" />
          <h1 className="text-2xl font-display font-bold text-safira-800">Safety Tips</h1>
        </div>
        <p className="text-safira-600">Useful advice to stay safe</p>
      </header>
      
      <main className="px-6">
        <div className="bento-grid">
          {safetyTips.map((tip) => (
            <button
              key={tip.id}
              onClick={() => handleOpenTip(tip)}
              className="bento-item h-32"
            >
              <div className="text-3xl mb-2">{tip.icon}</div>
              <h3 className="font-medium text-gray-800">{tip.title}</h3>
              <span className="text-xs text-safira-600 mt-1">{tip.category}</span>
            </button>
          ))}
        </div>
      </main>
      
      {/* Tip Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-md">
          {selectedTip && (
            <>
              <SheetHeader className="mb-5">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{selectedTip.icon}</div>
                  <div>
                    <SheetTitle className="text-safira-800">{selectedTip.title}</SheetTitle>
                    <SheetDescription className="text-safira-600">
                      {selectedTip.category}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              
              <div className="py-4">
                <p className="text-gray-700 leading-relaxed">
                  {selectedTip.content}
                </p>
              </div>
              
              <SheetFooter>
                <SheetClose asChild>
                  <Button>Close</Button>
                </SheetClose>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
      
      {/* Navigation Bar */}
      <UserNavbar />
    </div>
  );
};

export default SafetyTips;
