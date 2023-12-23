import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const filiereId = route.params['filiereId'] as string;
        const storedId = this.authService.getUserId();

        if (filiereId !== storedId) {
            this.authService.logout();
            return this.router.createUrlTree(['/login/chef/de/filiere/admin']);
        }

        if (this.authService.isAuthenticatedFunc() && this.authService.getUserRole() === 'admin' ) {
            return true;
        } else {
            this.authService.logout();
            this.router.navigate(['/login/chef/de/filiere/admin']); 
            return false;
        }
    }
}