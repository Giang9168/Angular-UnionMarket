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
import { FormsModule } from '@angular/forms'; // 👈 Bắt buộc để dùng [(ngModel)]
import { NgSelectModule } from '@ng-select/ng-select';
import { AppQthtApiService, CategoryTreeDto, } from '../../../../shared/data/qtht-union-market';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductDetailComponent,
    ProductFormComponent,
    CommonModule,
    MatTableModule,
    FormsModule,
    NgSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  categories: any;
  selectedId:any;
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
flatCategories: any[] = [];
  productIdToDelete: number | null = null;
  treeData: CategoryTreeDto[] = [];

  constructor(private productService: ProductService,private qthtt:AppQthtApiService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.qthtt.categoryTree().subscribe((res:any)=>{
      this.treeData = res.data;
      this.flatCategories= this.flattenTree(this.treeData);
      this.refreshVisibleCategories();
    });
  }

toggleNode(item: any, event: Event) {
    // Chặn sự kiện để ng-select không bị đóng hoặc chọn nhầm dòng
    event.stopPropagation();
    event.preventDefault();

    // Đổi trạng thái đóng/mở
    item.expanded = !item.expanded;

    // Tính toán lại danh sách hiển thị
    this.refreshVisibleCategories();
  }
checkExampleVisibility(item: any): boolean {
    // Tìm cha của item này trong danh sách allCategories
    // Lưu ý: Để tối ưu, bạn nên lưu parentId vào item khi flatten.
    // Ở đây mình giả định bạn tìm cha bằng cách duyệt mảng (hơi chậm nếu dữ liệu lớn)
    // Cách tốt nhất: Lúc flatten, gán luôn `item.parentRef = nodeParent`
    
    // 👇 CÁCH SỬA LẠI FLATTEN ĐỂ LOGIC NÀY DỄ HƠN (Xem Bước 1.1 bên dưới)
    if (!item.parentRef) return true; // Là gốc
    return item.parentRef.expanded && this.checkExampleVisibility(item.parentRef);
  }
  visibleCategories: any[] = [];
  allCategories: any[] = [];
refreshVisibleCategories() {
    this.visibleCategories = this.allCategories.filter(item => {
      // Level 0 luôn hiện
      if (item.level === 0) return true;
      
      // Các level khác: Phải tìm xem cha của nó có đang mở không
      // (Cách đơn giản: Duyệt ngược lên hoặc dùng đệ quy check visibility)
      // Dưới đây là cách check nhanh dựa trên mảng phẳng:
      return this.checkExampleVisibility(item);
    });
  }

  flattenTree(nodes: CategoryTreeDto[], level: number = 0, result: any[] = [], parent: any = null): any[] {
    for (const node of nodes) {
      const newItem = { 
        id: node.id, 
        name: node.name, 
        level: level,
        hasChildren: node.children && node.children.length > 0,
        expanded: false, 
        parentRef: parent // 👈 Lưu tham chiếu cha vào đây
      };
      
      result.push(newItem);

      if (node.children && node.children.length > 0) {
        this.flattenTree(node.children, level + 1, result, newItem); // Truyền newItem làm cha của vòng sau
      }
    }
    return result;
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
