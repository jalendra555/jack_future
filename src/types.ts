export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  description: string;
  benefits: string[];
  technologies: string[];
  basePrice: number;
  deliveryWeeks: number;
}

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface BookingState {
  id: string;
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  company: string;
  serviceType: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface EstimatorState {
  selectedServices: string[];
  companySize: 'small' | 'medium' | 'enterprise';
  supportLevel: 'none' | 'standard' | 'premium';
  complianceRequirements: string[];
}
