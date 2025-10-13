import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiUrl = "http://localhost:7133/WeatherForecast/product";

    constructor(private http: HttpClient) { }

    getProducts(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getProduct(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    addProduct(product: any): Observable<any> {
        return this.http.post(this.apiUrl, product);
    }
    updateProduct(id: number, product: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, product);
    }
    deleteProduct(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}