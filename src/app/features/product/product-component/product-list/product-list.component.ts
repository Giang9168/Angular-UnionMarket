import { Component } from '@angular/core';
import { ProductService } from '../../product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, ProductFormComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  isFormVisible = false;
  selectedProduct: any | null = null;
  isFormDetailVisible = false;
  selectId = 0;
  products: any = [];
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


  ngOnInit(): void {
    // Đây là nơi lý tưởng để gọi API lấy dữ liệu ban đầu
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }
  constructor(private productService: ProductService) {

  }


  delete(id: number) {
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
    if (confirmDelete) this.productService.deleteProduct(id).subscribe({
      next: (res: any) => {
        this.products = this.products.filter((product: any) => product.id !== id);
      }
    })
  }

  handleSave(formData: any): void {
    // Nếu có selectedProduct -> đây là chế độ Sửa
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct.id, formData).subscribe((updatedProduct: any) => {
        console.log(this.selectedProduct.id + formData)
        const index = this.products.findIndex((p: any) => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }

        this.closeform();
      });
    }
    // Nếu không -> đây là chế độ Thêm
    else {
      this.productService.addProduct(formData).subscribe((newProduct: any) => {
        this.products.push(newProduct);
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







  // Xử lý sự kiện khi form con lưu thành công

  // Xử lý sự kiện khi form con bị hủy
  onFormCancelled(): void {
    this.isFormVisible = false; // Ẩn form đi
  }
}
