export type DonorType = 'restaurant' | 'hostel' | 'wedding' | 'festival' | 'street-vendor' | 'household';

export type FoodType = 'cooked' | 'raw' | 'packaged' | 'beverages' | 'mixed';

export interface SurplusPost {
  id: string;
  donorName: string;
  donorType: DonorType;
  foodType: FoodType;
  foodDescription: string;
  quantity: string;
  servings: number;
  location: string;
  city: string;
  expiryTime: string;
  contactPhone: string;
  isVegetarian: boolean;
  createdAt: string;
  claimed: boolean;
  claimedBy?: string;
}

export interface DashboardStats {
  totalPosts: number;
  totalClaimed: number;
  totalServings: number;
  activeDonors: number;
}

export const DONOR_TYPES: { value: DonorType; label: string; icon: string }[] = [
  { value: 'restaurant', label: 'Restaurant', icon: '🍽️' },
  { value: 'hostel', label: 'Hostel / PG', icon: '🏠' },
  { value: 'wedding', label: 'Wedding / Event', icon: '💒' },
  { value: 'festival', label: 'Festival / Temple', icon: '🎉' },
  { value: 'street-vendor', label: 'Street Vendor', icon: '🛒' },
  { value: 'household', label: 'Household', icon: '🏡' },
];

export const FOOD_TYPES: { value: FoodType; label: string }[] = [
  { value: 'cooked', label: 'Cooked Food' },
  { value: 'raw', label: 'Raw Ingredients' },
  { value: 'packaged', label: 'Packaged Food' },
  { value: 'beverages', label: 'Beverages' },
  { value: 'mixed', label: 'Mixed Items' },
];

export const CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
];
