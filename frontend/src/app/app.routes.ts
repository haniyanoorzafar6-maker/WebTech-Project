import { Routes } from '@angular/router';
import { AdminPage, CatalogPage, CoffeeDetailPage, DashboardPage, LocationsPage, LoginPage, PremiumHomePage, ProfilePage, SignupPage } from './pages';
import { adminGuard, authGuard } from './guards';

export const routes: Routes = [
  { path: '', component: PremiumHomePage, title: 'BrewPoint Islamabad' },
  { path: 'catalog', component: CatalogPage, title: 'Coffee Menu | BrewPoint' },
  { path: 'catalog/:id', component: CoffeeDetailPage, title: 'Customize Coffee | BrewPoint' },
  { path: 'locations', component: LocationsPage, title: 'Pickup Locations | BrewPoint' },
  { path: 'login', component: LoginPage, title: 'Sign In | BrewPoint' },
  { path: 'signup', component: SignupPage, title: 'Join BrewPoint' },
  { path: 'dashboard', component: DashboardPage, canActivate: [authGuard], title: 'Your Orders | BrewPoint' },
  { path: 'profile', component: ProfilePage, canActivate: [authGuard], title: 'Profile | BrewPoint' },
  { path: 'admin', component: AdminPage, canActivate: [authGuard, adminGuard], title: 'Admin | BrewPoint' },
  { path: '**', redirectTo: '' }
];
