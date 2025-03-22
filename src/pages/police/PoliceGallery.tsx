
import { useState, useContext } from 'react';
import PoliceNavbar from '@/components/PoliceNavbar';
import { AuthContext } from '../../App';
import { LogOut, Calendar, MapPin, Clock, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface ImageItem {
  id: string;
  imageUrl: string;
  name: string;
  phone: string;
  location: string;
  date: string;
  time: string;
}

const dummyImages: ImageItem[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4',
    name: 'Sarah Johnson',
    phone: '9876543210',
    location: '123 Main St, Downtown',
    date: 'May 15, 2023',
    time: '14:32'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1684153952266-6ca0fae2915e',
    name: 'Emily Chen',
    phone: '8765432109',
    location: 'Central Park, East Entrance',
    date: 'May 14, 2023',
    time: '18:45'
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1673802665977-496796b3d68a',
    name: 'Olivia Martinez',
    phone: '7654321098',
    location: 'Grand Avenue Shopping Mall',
    date: 'May 13, 2023',
    time: '09:15'
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1693276094477-6d53ad0f531c',
    name: 'Madison Taylor',
    phone: '6543210987',
    location: 'Harbor View Park',
    date: 'May 12, 2023',
    time: '16:20'
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed',
    name: 'Sophia Williams',
    phone: '5432109876',
    location: 'West Side Highway',
    date: 'May 10, 2023',
    time: '20:05'
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1677429053405-2f373ad98bc3',
    name: 'Isabella Brown',
    phone: '4321098765',
    location: 'Riverfront District',
    date: 'May 9, 2023',
    time: '12:50'
  }
];

const PoliceGallery = () => {
  const { userName, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image);
    setSheetOpen(true);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/police-login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="pt-12 px-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-lavender-800">Image Gallery</h1>
          <p className="text-lavender-600">Received from citizens</p>
        </div>
        <button 
          onClick={handleLogout}
          className="p-2 text-gray-500 hover:text-lavender-600 transition-colors"
        >
          <LogOut size={20} />
        </button>
      </header>
      
      <main className="px-6 pt-8">
        <div className="grid grid-cols-2 gap-3">
          {dummyImages.map((image) => (
            <button
              key={image.id}
              onClick={() => handleImageClick(image)}
              className="aspect-square rounded-lg overflow-hidden shadow-sm relative group"
            >
              <img 
                src={image.imageUrl} 
                alt={`Submitted by ${image.name}`} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-white text-sm font-medium truncate">{image.name}</p>
                <p className="text-white/80 text-xs truncate">{image.date}</p>
              </div>
            </button>
          ))}
        </div>
      </main>
      
      {/* Image Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-md" side="bottom">
          {selectedImage && (
            <>
              <div className="pb-5">
                <img 
                  src={selectedImage.imageUrl} 
                  alt={`Submitted by ${selectedImage.name}`} 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedImage.name}</h3>
                  <p className="text-sm text-gray-500">{selectedImage.phone}</p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-lavender-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{selectedImage.location}</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-lavender-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{selectedImage.date}</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-lavender-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{selectedImage.time}</p>
                  </div>
                </div>
              </div>
              
              <SheetFooter className="mt-6">
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
      
      {/* Navigation Bar */}
      <PoliceNavbar />
    </div>
  );
};

export default PoliceGallery;
