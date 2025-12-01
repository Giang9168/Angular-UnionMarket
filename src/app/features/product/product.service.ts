import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageModel } from '../../shared/models/category.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiUrl = "http://localhost:5193/product";

    constructor(private http: HttpClient) { }

    getProducts(page: PageModel): Observable<any[]> {
        return this.http.post<any[]>(this.apiUrl, page, { withCredentials: true });
    }

    getProduct(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
    }

    addProduct(product: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/add`, product, { withCredentials: true });
    }
    updateProduct(id: number, product: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/update/${id}`, product, { withCredentials: true });
    }
    deleteProduct(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete/${id}`, { withCredentials: true });
    }
}