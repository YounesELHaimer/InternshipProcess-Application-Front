import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StudentAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    const etudientId = route.params['etudiantId'] as string;
    const storedId = this.authService.getUserId();

    if (etudientId !== storedId) {
        this.authService.logout();
        return this.router.createUrlTree(['']);
    }

    if (this.authService.isAuthenticatedFunc() && this.authService.getUserRole() === 'student' ) {
      return true;
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}