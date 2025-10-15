import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from "rxjs"
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5193/product/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(this.apiUrl, { username, password }, { withCredentials: true }).pipe(tap(res => {

      if (res && res.token) {
        localStorage.setItem("token", res.token);
      } else {
        console.warn("Không nhận được token từ server:", res);
      }

    }
    ));
  }
}
