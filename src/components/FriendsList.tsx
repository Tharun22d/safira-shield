
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, User, UserCheck, Trash, Pencil } from 'lucide-react';
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

interface Friend {
  id: string;
  name: string;
  phone: string;
}

interface FriendsListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FriendsList = ({ open, onOpenChange }: FriendsListProps) => {
  const [friends, setFriends] = useState<Friend[]>([
    { id: '1', name: 'Sarah Johnson', phone: '9876543210' },
    { id: '2', name: 'Emily Chen', phone: '8765432109' },
  ]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentFriend, setCurrentFriend] = useState<Friend | null>(null);

  const handleAddFriend = () => {
    if (!name.trim()) {
      toast.error('Please enter a name');
      return;
    }
    
    if (!phone.trim() || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    if (editMode && currentFriend) {
      setFriends(friends.map(friend => 
        friend.id === currentFriend.id ? { ...friend, name, phone } : friend
      ));
      toast.success('Contact updated successfully');
    } else {
      const newFriend = {
        id: Date.now().toString(),
        name,
        phone,
      };
      
      setFriends([...friends, newFriend]);
      toast.success('Contact added successfully');
    }
    
    resetForm();
  };

  const handleEditFriend = (friend: Friend) => {
    setName(friend.name);
    setPhone(friend.phone);
    setEditMode(true);
    setCurrentFriend(friend);
  };

  const handleDeleteFriend = (id: string) => {
    setFriends(friends.filter(friend => friend.id !== id));
    toast.success('Contact removed successfully');
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setEditMode(false);
    setCurrentFriend(null);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md" side="right">
        <SheetHeader>
          <SheetTitle className="text-safira-800">Emergency Contacts</SheetTitle>
          <SheetDescription>
            Add friends and family who will receive SOS alerts
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleAddFriend} 
                className="bg-safira-600 hover:bg-safira-700 text-white flex-1"
              >
                {editMode ? 'Update Contact' : 'Add Contact'}
              </Button>
              
              {editMode && (
                <Button 
                  onClick={resetForm}
                  variant="outline"
                >
                  <X size={18} />
                </Button>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Your Contacts</h3>
            
            {friends.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <User className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                <p>No contacts added yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {friends.map((friend) => (
                  <div 
                    key={friend.id} 
                    className="bg-gray-50 rounded-lg p-3 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium text-gray-800">{friend.name}</div>
                      <div className="text-sm text-gray-500">{friend.phone}</div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditFriend(friend)}
                        className="text-gray-500 hover:text-safira-600 transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteFriend(friend.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

export default FriendsList;
