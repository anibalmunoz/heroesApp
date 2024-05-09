import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicGuard {
  constructor(private authService: AuthService, private router: Router) {}

  private chechAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthStatus().pipe(
      tap((esAutenticado) => {
        if (esAutenticado) this.router.navigateByUrl('/');
      }),
      map((auntenticado) => !auntenticado)
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
