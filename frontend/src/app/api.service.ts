import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, Coffee, Location, Order, OrderPayload, Review, User } from './models';

declare global {
  interface Window { BREWPOINT_API_BASE_URL?: string; }
}
export const API_BASE_URL = window.BREWPOINT_API_BASE_URL ?? 'http://localhost:5084/api';
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('brewpoint_token');
  return next(token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request);
};

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private readonly http: HttpClient) {}
  login(email: string, password: string) { return this.http.post<AuthResponse>(`${API_BASE_URL}/auth/login`, { email, password }); }
  signup(payload: { fullName: string; email: string; password: string; phone?: string }) { return this.http.post<AuthResponse>(`${API_BASE_URL}/auth/signup`, payload); }
  me() { return this.http.get<User>(`${API_BASE_URL}/auth/me`); }
  coffees() { return this.http.get<Coffee[]>(`${API_BASE_URL}/coffees`); }
  coffee(id: number) { return this.http.get<Coffee>(`${API_BASE_URL}/coffees/${id}`); }
  createCoffee(payload: Omit<Coffee, 'id'>) { return this.http.post<Coffee>(`${API_BASE_URL}/coffees`, payload); }
  deleteCoffee(id: number) { return this.http.delete(`${API_BASE_URL}/coffees/${id}`); }
  locations() { return this.http.get<Location[]>(`${API_BASE_URL}/locations`); }
  orders() { return this.http.get<Order[]>(`${API_BASE_URL}/orders`); }
  myOrders() { return this.http.get<Order[]>(`${API_BASE_URL}/orders/my-orders`); }
  createOrder(payload: OrderPayload) { return this.http.post<Order>(`${API_BASE_URL}/orders`, payload); }
  setOrderStatus(id: number, status: string) { return this.http.put<Order>(`${API_BASE_URL}/orders/${id}/status`, { status }); }
  users() { return this.http.get<User[]>(`${API_BASE_URL}/users`); }
  reviews() { return this.http.get<Review[]>(`${API_BASE_URL}/reviews`); }
  updateUser(id: number, payload: Partial<User>) { return this.http.put<User>(`${API_BASE_URL}/users/${id}`, payload); }
}

export function coffeeImage(id: number): string {
  const names = ['coffee-iced-latte.png','coffee-pink-cloud-mocha.png','coffee-classic-americano.png','coffee-saffron-cappuccino.png','coffee-vanilla-cold-brew.png','coffee-salted-caramel-latte.png','coffee-espresso-shot.png','coffee-honey-cinnamon-flat-white.png','coffee-rose-pistachio.png','coffee-dark-mocha.png','coffee-hazelnut-macchiato.png','coffee-midnight-black-brew.png'];
  return `/assets/generated/${names[id - 1] ?? names[0]}`;
}
