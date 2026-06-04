import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
export const authGuard = () => inject(AuthService).user() || localStorage.getItem('brewpoint_token') ? true : inject(Router).createUrlTree(['/login']);
export const adminGuard = () => inject(AuthService).isAdmin() ? true : inject(Router).createUrlTree(['/dashboard']);
