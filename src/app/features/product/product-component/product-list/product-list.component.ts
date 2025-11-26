import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface User {
  id: number;
  name: string;
}


@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, ProductFormComponent, CommonModule, MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  isFormVisible = false;
  selectedProduct: any | null = null;
  isFormDetailVisible = false;
  selectId = 0;
  products = new MatTableDataSource<any>([]);
  add(): void {
    this.selectedProduct = null;
    this.isFormVisible = true;
  }
  detail(id: number): void {
    this.selectId = id;
    this.isFormDetailVisible = true;
  }
  update(product: any): void {
    this.selectedProduct = product; // Đặt sản phẩm để sửa
    this.isFormVisible = true;
  }


  displayedColumns: string[] = ['id', 'name', "mota", "price", 'actions'];


  @ViewChild(MatPaginator)
  set paginator(paginator: MatPaginator) {
    if (paginator) {
      this.products.paginator = paginator; // Tự động kết nối
    }
  }

  // Tương tự cho MatSort
  @ViewChild(MatSort)
  set sort(sort: MatSort) {
    if (sort) {
      this.products.sort = sort; // Tự động kết nối
    }
  }




  ngOnInit(): void {
    this.isFormVisible = false;
    this.isFormDetailVisible = false;
    // Đây là nơi lý tư
    // ởng để gọi API lấy dữ liệu ban đầu
    this.productService.getProducts().subscribe((data: any) => {
      this.products.data = data;


    });
  }
  constructor(private productService: ProductService) {

  }

  handleSave(formData: any): void {
    // Nếu có selectedProduct -> đây là chế độ Sửa
    const currentData = this.products.data;
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct.id, formData).subscribe((updatedProduct: any) => {
        console.log(this.selectedProduct.id + formData)
        const index = this.products.data.findIndex((p: any) => p.id === updatedProduct.id);
        if (index !== -1) {
          const newData = [...currentData];
          // 2. Cập nhật phần tử trong mảng MỚI
          newData[index] = updatedProduct;
          // 3. Gán mảng MỚI cho data source
          this.products.data = newData;
        }

        this.closeform();
      });
    }
    // Nếu không -> đây là chế độ Thêm
    else {
      this.productService.addProduct(formData).subscribe((newProduct: any) => {
        this.products.data = [...currentData, newProduct]; // Gán mảng MỚI
        this.closeform();
      });
    }
  }
  closeform(): void {
    this.isFormVisible = false;
  }
  close(): void {
    this.isFormDetailVisible = false;
  }

  productIdToDelete: number | null = null
  prepareDelete(id: number): void {
    this.productIdToDelete = id;
    console.log('Chuẩn bị xóa ID:', this.productIdToDelete);
  }
  confirmDelete(): void {
    if (this.productIdToDelete) {
      console.log('Đã xác nhận xóa ID:', this.productIdToDelete);

      // Lấy logic từ hàm delete(id) CŨ của bạn dán vào đây
      this.productService.deleteProduct(this.productIdToDelete).subscribe(() => {
        // Sau khi xóa thành công trên server:
        // 1. Cập nhật lại danh sách products trên UI
        this.products.data = this.products.data.filter((p: any) => p.id !== this.productIdToDelete);

        // 2. Đặt lại biến
        this.productIdToDelete = null;

        // 3. (Tùy chọn) Hiển thị thông báo xóa thành công
        // this.toastService.show('Đã xóa thành công!');
      });
    }
  }


  // Xử lý sự kiện khi form con lưu thành công

  // Xử lý sự kiện khi form con bị hủy
  onFormCancelled(): void {
    this.isFormVisible = false; // Ẩn form đi
  }
}
