import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { tap } from "rxjs"
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:7133/WeatherForecast/admin';

    constructor(private http: HttpClient) { }

    login() {
        return this.http.get(this.apiUrl, { withCredentials: true }).pipe(

            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    console.warn('Không có quyền truy cập hoặc token sai!');
                    // Có thể chuyển hướng hoặc hiển thị thông báo
                }
                return throwError(() => error);
            })

        );
    }
}
