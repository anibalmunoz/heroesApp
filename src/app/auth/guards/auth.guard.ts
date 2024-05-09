import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  private chechAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthStatus().pipe(
      tap((esAutenticado) => {
        if (!esAutenticado) this.router.navigateByUrl('auth/login');
      })
    );
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    return this.chechAuthStatus();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return this.chechAuthStatus();
  }
}
