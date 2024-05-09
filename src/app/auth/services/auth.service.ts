import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.baseUrl}/users?id=1`).pipe(
      map((resp) => resp[0]),
      tap((user) => {
        this.user = user;
        localStorage.setItem('token', user.id.toString());
      })
    );
  }

  checkAuthStatus(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    return this.http.get<User[]>(`${this.baseUrl}/users?id=1`).pipe(
      map((user) => (this.user = user[0])),
      map((user) => !!user),
      catchError((error) => of(false))
    );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
