import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private isAuthenticatedKey = 'isAuthenticated';
    private userRoleKey = 'userRole';   
    private id = 'null';

  login(role: string, id: number): void {
    localStorage.setItem(this.id, id.toString());
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

  getUserId(): string | null {
    return localStorage.getItem(this.id);
  }
}