import { Business, Event, Offer, Review, Booking, Notification, Message } from '@/types';

export const DEMO_ACCOUNTS = {
  user: { email: 'user@skysiti.com', password: 'demo123', role: 'user' as const, name: 'Alex Johnson' },
  business: { email: 'business@skysiti.com', password: 'demo123', role: 'business' as const, name: 'Sarah Mitchell' },
  organizer: { email: 'organizer@skysiti.com', password: 'demo123', role: 'organizer' as const, name: 'Marcus Chen' },
  admin: { email: 'admin@skysiti.com', password: 'demo123', role: 'admin' as const, name: 'Diana Prince' },
};

export const MOCK_BUSINESSES: Business[] = [
  { id: '1', name: 'The Urban Brew', category: 'Cafe', description: 'Premium coffee experience in the heart of the city', address: '12 Main St, Downtown', phone: '+1 555-0101', email: 'info@urbanbrew.com', rating: 4.8, reviewCount: 234, verified: true, image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop', tags: ['Coffee', 'Breakfast', 'WiFi'], hours: 'Mon-Sun 7am-10pm', ownerId: '2' },
  { id: '2', name: 'Skyline Fitness', category: 'Gym', description: 'State-of-the-art fitness center with panoramic views', address: '45 Tower Ave, Midtown', phone: '+1 555-0102', email: 'join@skylinefitness.com', rating: 4.6, reviewCount: 189, verified: true, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop', tags: ['Gym', 'Yoga', 'Pool'], hours: 'Mon-Sun 5am-11pm', ownerId: '2' },
  { id: '3', name: 'Metro Bites', category: 'Restaurant', description: 'Contemporary fusion cuisine celebrating local ingredients', address: '78 Food Lane, Westside', phone: '+1 555-0103', email: 'reservations@metrobites.com', rating: 4.7, reviewCount: 312, verified: true, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop', tags: ['Fusion', 'Fine Dining', 'Bar'], hours: 'Tue-Sun 12pm-11pm', ownerId: '2' },
  { id: '4', name: 'TechHub Coworking', category: 'Coworking', description: 'Modern workspace for innovators and entrepreneurs', address: '200 Innovation Blvd', phone: '+1 555-0104', email: 'hello@techhub.com', rating: 4.5, reviewCount: 98, verified: true, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop', tags: ['Coworking', 'Events', 'Mentorship'], hours: 'Mon-Fri 8am-8pm', ownerId: '2' },
  { id: '5', name: 'Bloom Spa & Wellness', category: 'Spa', description: 'Luxury wellness retreat in the city center', address: '33 Serenity Road', phone: '+1 555-0105', email: 'book@bloomspa.com', rating: 4.9, reviewCount: 156, verified: false, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop', tags: ['Spa', 'Massage', 'Wellness'], hours: 'Tue-Sun 10am-8pm', ownerId: '2' },
  { id: '6', name: 'City Art Gallery', category: 'Art', description: 'Rotating exhibitions featuring local and international artists', address: '5 Culture Square', phone: '+1 555-0106', email: 'info@cityartgallery.com', rating: 4.4, reviewCount: 67, verified: true, image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&h=300&fit=crop', tags: ['Art', 'Culture', 'Events'], hours: 'Wed-Mon 10am-6pm', ownerId: '2' },
];

export const MOCK_EVENTS: Event[] = [
  { id: '1', title: 'City Music Festival 2026', description: 'Three days of live music featuring 50+ artists across 5 stages', date: '2026-05-15', time: '4:00 PM', location: 'Central Park Amphitheater', category: 'Music', price: 45, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop', attendees: 1240, maxAttendees: 2000, organizerId: '3', organizerName: 'Marcus Chen', status: 'upcoming' },
  { id: '2', title: 'Tech Summit 2026', description: 'Annual technology conference with keynotes and workshops', date: '2026-04-28', time: '9:00 AM', location: 'Convention Center Hall A', category: 'Technology', price: 120, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop', attendees: 480, maxAttendees: 500, organizerId: '3', organizerName: 'Marcus Chen', status: 'upcoming' },
  { id: '3', title: 'Street Food Carnival', description: 'Taste 100+ local and international street food vendors', date: '2026-05-01', time: '11:00 AM', location: 'Harbor Boulevard', category: 'Food', price: 0, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop', attendees: 3200, maxAttendees: 5000, organizerId: '3', organizerName: 'Marcus Chen', status: 'upcoming' },
  { id: '4', title: 'Yoga in the Park', description: 'Morning yoga sessions led by certified instructors', date: '2026-04-26', time: '7:00 AM', location: 'Riverside Gardens', category: 'Wellness', price: 15, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop', attendees: 89, maxAttendees: 100, organizerId: '3', organizerName: 'Marcus Chen', status: 'upcoming' },
  { id: '5', title: 'Art & Wine Evening', description: 'Paint while enjoying curated wine selections', date: '2026-05-08', time: '6:30 PM', location: 'City Art Gallery', category: 'Art', price: 65, image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=400&h=300&fit=crop', attendees: 42, maxAttendees: 50, organizerId: '3', organizerName: 'Marcus Chen', status: 'upcoming' },
  { id: '6', title: 'Marathon City Run 2026', description: 'Annual city marathon with 5K, 10K and full marathon categories', date: '2026-06-01', time: '6:00 AM', location: 'City Hall Start Line', category: 'Sports', price: 30, image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop', attendees: 2100, maxAttendees: 3000, organizerId: '3', organizerName: 'Marcus Chen', status: 'upcoming' },
];

export const MOCK_OFFERS: Offer[] = [
  { id: '1', title: '30% Off Premium Coffee', description: 'Get 30% off on all premium coffee drinks on weekdays', businessName: 'The Urban Brew', discount: '30%', validUntil: '2026-05-31', code: 'BREW30', category: 'Food & Drink', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop', businessId: '1' },
  { id: '2', title: 'Free 1-Month Gym Trial', description: 'Join Skyline Fitness with a complimentary first month', businessName: 'Skyline Fitness', discount: '100%', validUntil: '2026-04-30', code: 'SKYFIT1', category: 'Health', image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop', businessId: '2' },
  { id: '3', title: '2-for-1 Dinner Special', description: 'Buy one main course, get one free every Tuesday', businessName: 'Metro Bites', discount: '50%', validUntil: '2026-06-30', code: 'METRO241', category: 'Dining', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', businessId: '3' },
  { id: '4', title: 'Hot Desk Weekend Pass', description: 'Unlimited weekend hot desk access for just $25', businessName: 'TechHub Coworking', discount: '60%', validUntil: '2026-05-15', code: 'TECHWEEK', category: 'Work', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop', businessId: '4' },
  { id: '5', title: 'Spa Day Package 40% Off', description: 'Full day spa package including massage and facial', businessName: 'Bloom Spa & Wellness', discount: '40%', validUntil: '2026-05-20', code: 'BLOOM40', category: 'Wellness', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop', businessId: '5' },
  { id: '6', title: 'Free Gallery Entry Friday', description: 'Free entry to all exhibitions every last Friday of the month', businessName: 'City Art Gallery', discount: '100%', validUntil: '2026-12-31', code: 'ARTFREE', category: 'Culture', image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop', businessId: '6' },
];

export const MOCK_REVIEWS: Review[] = [
  { id: '1', userId: '1', userName: 'Alex J.', businessId: '1', rating: 5, comment: 'Amazing coffee and cozy atmosphere! Best spot in the city.', date: '2026-04-10', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop' },
  { id: '2', userId: '1', userName: 'Emma L.', businessId: '1', rating: 4, comment: 'Great place to work remotely. WiFi is excellent.', date: '2026-04-08', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop' },
  { id: '3', userId: '1', userName: 'Ryan M.', businessId: '2', rating: 5, comment: 'State-of-the-art equipment and amazing views!', date: '2026-04-05', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop' },
];

export const MOCK_BOOKINGS: Booking[] = [
  { id: '1', userId: '1', eventId: '1', type: 'event', date: '2026-05-15', status: 'confirmed', title: 'City Music Festival 2026' },
  { id: '2', userId: '1', businessId: '1', type: 'table', date: '2026-04-25', status: 'pending', title: 'Table at The Urban Brew' },
  { id: '3', userId: '1', eventId: '3', type: 'event', date: '2026-05-01', status: 'confirmed', title: 'Street Food Carnival' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'Event Reminder', message: 'City Music Festival is in 3 days!', type: 'event', read: false, timestamp: '2026-04-18T09:00:00' },
  { id: '2', title: 'New Offer Available', message: 'Urban Brew is offering 30% off this week', type: 'offer', read: false, timestamp: '2026-04-17T14:00:00' },
  { id: '3', title: 'Booking Confirmed', message: 'Your table at Metro Bites is confirmed', type: 'booking', read: true, timestamp: '2026-04-16T10:00:00' },
  { id: '4', title: 'Review Response', message: 'Skyline Fitness replied to your review', type: 'review', read: true, timestamp: '2026-04-15T16:00:00' },
];

export const MOCK_MESSAGES: Message[] = [
  { id: '1', from: 'The Urban Brew', to: 'user', content: 'Thank you for your inquiry! We have tables available this weekend.', timestamp: '2026-04-18T10:30:00', read: false },
  { id: '2', from: 'Skyline Fitness', to: 'user', content: 'Your membership has been activated. Welcome to the family!', timestamp: '2026-04-17T15:00:00', read: true },
  { id: '3', from: 'Metro Bites', to: 'user', content: 'Your reservation for Saturday at 7pm is confirmed.', timestamp: '2026-04-16T12:00:00', read: true },
];

export const CATEGORIES = ['All', 'Restaurants', 'Cafes', 'Shopping', 'Entertainment', 'Health & Wellness', 'Sports', 'Art & Culture', 'Technology', 'Coworking'];
export const EVENT_CATEGORIES = ['All', 'Music', 'Technology', 'Food', 'Wellness', 'Art', 'Sports', 'Business', 'Community'];
export const OFFER_CATEGORIES = ['All', 'Food & Drink', 'Health', 'Dining', 'Work', 'Wellness', 'Culture', 'Shopping'];
