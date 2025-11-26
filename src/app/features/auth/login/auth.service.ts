import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, of, tap } from "rxjs"
import { HttpErrorResponse } from '@angular/common/http';

import { isPlatformBrowser } from '@angular/common';
import { mapToCanActivate } from '@angular/router';
export interface User {
  username: string;
  role: Role;
}

export enum Role {
  Guest = 0,
  User = 1,
  Manager = 2,
  Admin = 3
  // Thêm bất kỳ role nào khác bạn có
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5193/auth';
  private readonly USER_STORAGE_KEY = 'currentUser';


  private currentUserSubject = new BehaviorSubject<any>(null);
  user$ = this.currentUserSubject.asObservable();
  constructor(private http: HttpClient) { }

  initAuthCheck() {
    return this.http.get<any>('http://localhost:5193/auth/me', { withCredentials: true }).pipe(
      tap(user => {
        console.log("✅ /me response:", user);
        this.currentUserSubject.next(user)
      }),
      map(user => user),
      catchError(() => {
        this.currentUserSubject.next(null);
        return of(null);
      })
    );
  }

  isAuthenticated() {
    return !!this.currentUserSubject.value;
  }
  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }, { withCredentials: true }).pipe(tap(res => {
      const user: User = {
        username: res.userName,  // <-- key là 'username', value là res.username
        role: res.role             // <-- key là 'role', value là res.role
      };
      this.currentUserSubject.next(user);

      console.log(res)

    }
    ));
  }
}
