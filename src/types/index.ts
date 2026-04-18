export type UserRole = 'user' | 'business' | 'organizer' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  location?: string;
  phone?: string;
  bio?: string;
  joinedAt: string;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  image: string;
  tags: string[];
  hours: string;
  ownerId: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  image: string;
  attendees: number;
  maxAttendees: number;
  organizerId: string;
  organizerName: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  businessName: string;
  discount: string;
  validUntil: string;
  code?: string;
  category: string;
  image: string;
  businessId: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  businessId: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface Booking {
  id: string;
  userId: string;
  eventId?: string;
  businessId?: string;
  type: 'event' | 'table' | 'service';
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  title: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'event' | 'offer' | 'review' | 'system' | 'booking';
  read: boolean;
  timestamp: string;
}
