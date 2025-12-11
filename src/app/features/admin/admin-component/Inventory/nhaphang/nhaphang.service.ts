import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhaphangService {   
  private apiUrl = 'http://localhost:5193/api/importproduct';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  deleteProductByCode(code: string): Observable<any> {
    const encoded = encodeURIComponent(code);
    const url = `${this.apiUrl}/bycode/${encoded}`;
    console.log('[NhaphangService] DELETE BY CODE ->', url);
    return this.http.delete(url);
  }
  
  
  
}
