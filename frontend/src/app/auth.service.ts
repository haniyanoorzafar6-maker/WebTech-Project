import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { User } from './models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user = signal<User | null>(null);
  readonly isAdmin = computed(() => this.user()?.role === 'Admin');
  constructor(private readonly api: ApiService, private readonly router: Router) {
    if (localStorage.getItem('brewpoint_token')) this.api.me().subscribe({ next: user => this.user.set(user), error: () => this.logout(false) });
  }
  login(email: string, password: string, done: (error?: string) => void) {
    this.api.login(email, password).subscribe({ next: result => { localStorage.setItem('brewpoint_token', result.token); this.user.set(result.user); done(); this.router.navigateByUrl(result.user.role === 'Admin' ? '/admin' : '/dashboard'); }, error: error => done(error.error?.message ?? 'Unable to sign in. Check your details.') });
  }
  signup(payload: { fullName: string; email: string; password: string; phone?: string }, done: (error?: string) => void) {
    this.api.signup(payload).subscribe({ next: result => { localStorage.setItem('brewpoint_token', result.token); this.user.set(result.user); done(); this.router.navigateByUrl('/dashboard'); }, error: error => done(error.error?.message ?? 'Unable to create your account.') });
  }
  logout(navigate = true) { localStorage.removeItem('brewpoint_token'); this.user.set(null); if (navigate) this.router.navigateByUrl('/'); }
}
