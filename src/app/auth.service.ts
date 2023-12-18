import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private isAuthenticatedKey = 'isAuthenticated';
    private userRoleKey = 'userRole';   

  login(role: string): void {
    localStorage.setItem(this.isAuthenticatedKey, 'true');
    localStorage.setItem(this.userRoleKey, role)
  }

  logout(): void {
    localStorage.setItem(this.isAuthenticatedKey, 'false');
    localStorage.setItem(this.userRoleKey, 'null')
  }

  isAuthenticatedFunc(): boolean {
    return localStorage.getItem(this.isAuthenticatedKey) === 'true';
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.userRoleKey);
  }
}