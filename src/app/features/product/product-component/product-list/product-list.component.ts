import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageModel } from '../../../../shared/models/category.model';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductDetailComponent,
    ProductFormComponent,
    CommonModule,
    MatTableModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: any[] = [];   // ✅ BỎ MatTableDataSource
  totalRecords = 0;

  pageModel: PageModel = {
    page: 1,
    pageSize: 10
  };

  displayedColumns: string[] = ["blank", 'Image', 'name2', 'name', 'mota', 'price', 'actions'];

  isFormVisible = false;
  isFormDetailVisible = false;

  selectedProduct: any | null = null;
  selectId = 0;

  productIdToDelete: number | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  // ===== LOAD DATA WITH PAGINATION =====
  loadProducts() {
    this.productService.getProducts(this.pageModel).subscribe((res: any) => {
      this.products = res.data;

      this.totalRecords = res.totalRecord ?? res.totalRecords; // support 2 kiểu

      this.pageModel.page = res.currentPage ?? res.page;
      this.pageModel.pageSize = res.pageSize;
    });
  }

  // ===== PAGINATOR CHANGE =====
  onPageChange(event: PageEvent) {
    this.pageModel.page = event.pageIndex + 1;
    this.pageModel.pageSize = event.pageSize;
    this.loadProducts();
  }

  // ===== ACTIONS =====
  add(): void {
    this.selectedProduct = null;
    this.isFormVisible = true;
  }

  update(product: any): void {
    this.selectedProduct = product;
    this.isFormVisible = true;
  }

  detail(id: number): void {
    this.selectId = id;
    this.isFormDetailVisible = true;
  }

  close(): void {
    this.isFormDetailVisible = false;
  }

  closeform(): void {
    this.isFormVisible = false;
  }

  // ===== SAVE (ADD / UPDATE) =====
  handleSave(formData: any): void {
    if (this.selectedProduct) {
      // Update
      this.productService.updateProduct(this.selectedProduct.id, formData)
        .subscribe(() => {
          this.closeform();
          this.loadProducts(); // ✅ gọi lại API
        });
    } else {
      // Add
      this.productService.addProduct(formData)
        .subscribe(() => {
          this.closeform();
          this.loadProducts(); // ✅ gọi lại API
        });
    }
  }

  // ===== DELETE =====
  prepareDelete(id: number): void {
    this.productIdToDelete = id;
  }

  confirmDelete(): void {
    if (this.productIdToDelete) {
      this.productService.deleteProduct(this.productIdToDelete)
        .subscribe(() => {
          this.productIdToDelete = null;
          this.loadProducts(); // ✅ load lại trang hiện tại
        });
    }
  }

  onFormCancelled(): void {
    this.isFormVisible = false;
  }
}
