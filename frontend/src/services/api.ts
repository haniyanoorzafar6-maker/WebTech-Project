import axios from "axios";
import type { Coffee, Location, Order, Review, User } from "@/types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5084/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("brewpoint_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export interface AuthResponse {
  token: string;
  user: User;
}

export interface OrderPayload {
  locationId: number;
  pickupTime: string;
  items: Array<{
    coffeeId: number;
    quantity: number;
    size: string;
    milkType: string;
    sugarLevel: string;
    toppings: string;
  }>;
}

export const authApi = {
  login: (email: string, password: string) => api.post<AuthResponse>("/auth/login", { email, password }).then((r) => r.data),
  signup: (payload: { fullName: string; email: string; password: string; phone?: string }) =>
    api.post<AuthResponse>("/auth/signup", payload).then((r) => r.data),
  me: () => api.get<User>("/auth/me").then((r) => r.data)
};

export const coffeeApi = {
  list: () => api.get<Coffee[]>("/coffees").then((r) => r.data),
  get: (id: number) => api.get<Coffee>(`/coffees/${id}`).then((r) => r.data),
  create: (coffee: Omit<Coffee, "id">) => api.post<Coffee>("/coffees", coffee).then((r) => r.data),
  update: (id: number, coffee: Omit<Coffee, "id">) => api.put<Coffee>(`/coffees/${id}`, coffee).then((r) => r.data),
  remove: (id: number) => api.delete(`/coffees/${id}`)
};

export const locationApi = {
  list: () => api.get<Location[]>("/locations").then((r) => r.data),
  get: (id: number) => api.get<Location>(`/locations/${id}`).then((r) => r.data),
  create: (location: Omit<Location, "id">) => api.post<Location>("/locations", location).then((r) => r.data),
  update: (id: number, location: Omit<Location, "id">) => api.put<Location>(`/locations/${id}`, location).then((r) => r.data),
  remove: (id: number) => api.delete(`/locations/${id}`)
};

export const orderApi = {
  all: () => api.get<Order[]>("/orders").then((r) => r.data),
  mine: () => api.get<Order[]>("/orders/my-orders").then((r) => r.data),
  create: (payload: OrderPayload) => api.post<Order>("/orders", payload).then((r) => r.data),
  status: (id: number, status: string) => api.put<Order>(`/orders/${id}/status`, { status }).then((r) => r.data),
  remove: (id: number) => api.delete(`/orders/${id}`)
};

export const userApi = {
  list: () => api.get<User[]>("/users").then((r) => r.data),
  update: (id: number, payload: Partial<User>) => api.put<User>(`/users/${id}`, payload).then((r) => r.data),
  remove: (id: number) => api.delete(`/users/${id}`)
};

export const reviewApi = {
  list: () => api.get<Review[]>("/reviews").then((r) => r.data),
  byCoffee: (coffeeId: number) => api.get<Review[]>(`/reviews/coffee/${coffeeId}`).then((r) => r.data),
  create: (payload: { coffeeId: number; rating: number; comment: string }) => api.post<Review>("/reviews", payload).then((r) => r.data)
};
