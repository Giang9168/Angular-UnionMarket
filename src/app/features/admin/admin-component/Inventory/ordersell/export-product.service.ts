import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExportProduct {
  id: number;
  source: string;
  phone: string;
  receiverPhone: string;
  customerCode: string;
  customerName: string;
  paymentMethod: string;
  status: string;
  address: string;
  product: string;
  isSelected?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ExportProductService {
  private apiUrl = 'http://localhost:5193/api/ExportProduct'; // URL backend

  constructor(private http: HttpClient) {}

  getExportProducts(): Observable<ExportProduct[]> {
    return this.http.get<ExportProduct[]>(this.apiUrl);
  }

  addExportProduct(product: ExportProduct): Observable<ExportProduct> {
    return this.http.post<ExportProduct>(this.apiUrl, product);
  }
}
