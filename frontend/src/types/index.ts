export type RoleName = "Admin" | "User";

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  role: RoleName;
}

export interface Coffee {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  sizeOptions: string[];
  imageUrl: string;
  ingredients: string[];
  calories: number;
  isFeatured: boolean;
  isAvailable: boolean;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  openingHours: string;
  latitude: number;
  longitude: number;
}

export type OrderStatus = "Pending" | "Preparing" | "Ready for Pickup" | "Completed" | "Cancelled";

export interface OrderItem {
  id: number;
  coffeeId: number;
  coffeeName: string;
  quantity: number;
  size: string;
  milkType: string;
  sugarLevel: string;
  toppings: string;
  unitPrice: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  pickupTime: string;
  createdAt: string;
  locationName: string;
  userName: string;
  items: OrderItem[];
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  coffeeName: string;
  userName: string;
}
