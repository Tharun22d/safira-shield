
export interface SafetyTip {
  id: string;
  title: string;
  icon: string;
  category: string;
  content: string;
}

export const safetyTips: SafetyTip[] = [
  {
    id: '1',
    title: 'Public Transport',
    icon: '🚌',
    category: 'Travel',
    content: "When using public transportation, try to sit near the driver or in a populated area. Always stay alert and keep your belongings secure. If possible, share your live location with a trusted contact while traveling. Avoid empty buses or train compartments, especially at night."
  },
  {
    id: '2',
    title: 'Walking Alone',
    icon: '🚶‍♀️',
    category: 'Outdoors',
    content: "When walking alone, especially at night, stay in well-lit and populated areas. Walk confidently and be aware of your surroundings. Avoid looking at your phone continuously as it reduces your awareness. Consider carrying a personal safety alarm and keep emergency contacts readily accessible on your phone."
  },
  {
    id: '3',
    title: 'Ride Sharing',
    icon: '🚗',
    category: 'Travel',
    content: "Before getting into a ride-share vehicle, verify the driver's identity and car details. Share your trip details with someone you trust. Sit in the back seat when possible, and always check that the child locks aren't enabled before closing the door. Trust your instincts – if something feels wrong, don't get in the car."
  },
  {
    id: '4',
    title: 'Digital Safety',
    icon: '📱',
    category: 'Online',
    content: "Protect your personal information online by using strong, unique passwords and enabling two-factor authentication. Be cautious about sharing your location or personal details on social media. Review your privacy settings regularly to ensure only trusted people can view your information. Be wary of unsolicited messages or friend requests from strangers."
  },
  {
    id: '5',
    title: 'Home Security',
    icon: '🏠',
    category: 'Home',
    content: "Ensure your home has secure locks on all doors and windows. Consider installing a security system or camera. Never leave spare keys in obvious places. When arriving home, have your keys ready before reaching your door. If you live alone, consider not advertising this fact to strangers or on social media."
  },
  {
    id: '6',
    title: 'Self Defense',
    icon: '💪',
    category: 'Personal',
    content: "Consider taking a self-defense class to build confidence and learn basic techniques. Remember that the goal of self-defense is to create an opportunity to escape to safety. Simple techniques like targeting vulnerable areas (eyes, nose, throat, groin) can be effective in creating distance between you and a threat. Practice awareness and avoidance as your first line of defense."
  },
];
