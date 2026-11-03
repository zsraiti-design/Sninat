export type Language = 'fr' | 'ar' | 'en';

export type UserRole = 'gateway' | 'patient' | 'doctor' | 'prosthetist';

export interface ProsthesisOrder {
  id: string;
  doctorName: string;
  clinicName: string;
  city: string;
  patientRef: string;
  workType: string;
  shade: string;
  toothNumber: string;
  laboratoryName: string;
  orderDate: string;
  dueDate: string;
  status: 'pending' | 'in_production' | 'quality_check' | 'delivered';
  priceMad: number;
  notes?: string;
}

export interface DentalLab {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  managerName: string;
  specialties: string[];
  rating: number;
  certified: boolean;
}
export interface Doctor {
  id: string;
  name: string;
  title: string;
  titleAr?: string;
  specialty: string;
  specialtyAr?: string;
  photo: string;
  rating: number;
  reviewsCount: number;
  clinicName: string;
  city: string;
  cityKey: string;
  district: string;
  address: string;
  phone: string;
  nextAvailableSlot: string;
  languages: string[];
  bio: string;
  bioAr?: string;
  services: {
    name: string;
    nameAr?: string;
    price: string;
  }[];
  urgencyAccepted: boolean;
  teleconsultation: boolean;
}

export interface CareCategory {
  id: string;
  name: string;
  nameAr: string;
  nameEn: string;
  description: string;
  descriptionAr: string;
  iconName: string;
  badge?: string;
  estimatedPrice: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  clinicName: string;
  careType: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes?: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}
