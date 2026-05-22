export interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  status: 'pending' | 'approved';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email?: string;
  phone: string;
  message: string;
  date: string;
}

export interface NavItem {
  label: string;
  targetId: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  iconName: string;
}
