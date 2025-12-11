import { Component, OnInit } from '@angular/core';
import { ExportProductService, ExportProduct } from './export-product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  selector: 'app-ordersell',
  templateUrl: './ordersell.component.html',
  styleUrls: ['./ordersell.component.css']
})
export class OrdersellComponent implements OnInit {

  orders: ExportProduct[] = [];
  selectedCount: number = 0;
  totalRecords: number = 0;
  page: number = 1;
  pageSize: number = 10;
  filter = { fromDate: null, toDate: null, search: '' };

  constructor(private exportProductService: ExportProductService) {}

  ngOnInit(): void {
    this.exportProductService.getExportProducts().subscribe({
      next: (data) => {
        console.log('Dữ liệu từ API:', data);
        this.orders = data || [];       // phòng trường hợp API trả null
        this.totalRecords = this.orders.length;
        this.updateSelectedCount();
      },
      error: (err) => {
        console.error('Lỗi khi load dữ liệu:', err);
        this.orders = [];
        this.totalRecords = 0;
        this.selectedCount = 0;
      }
    });
  }
  
  loadOrders() {
    this.exportProductService.getExportProducts().subscribe(
      data => {
        console.log('Dữ liệu từ API:', data);
        this.orders = data; // gán dữ liệu
        this.totalRecords = data.length;
        this.updateSelectedCount();
      },
      error => console.error(error)
    );
  }
  

  // --------------------- Search ---------------------
  onSearch() {
    const q = (this.filter.search || '').trim().toLowerCase();
    this.orders.forEach(o => o.isSelected = false); // reset selection
    this.updateSelectedCount();

    // Nếu muốn filter hiển thị tạm thời trong Angular:
    // this.orders = this.orders.filter(o =>
    //   o.customerName.toLowerCase().includes(q) ||
    //   o.phone.includes(q)
    // );
  }

  // --------------------- Selection ---------------------
  toggleAll(checked: boolean) {
    this.orders.forEach(o => o.isSelected = checked);
    this.updateSelectedCount();
  }

  updateSelectedCount() {
    this.selectedCount = this.orders.filter(o => o.isSelected).length;
  }

  // --------------------- Actions ---------------------
  approveSelected() {
    const selected = this.orders.filter(o => o.isSelected);
    if (!selected.length) return;

    selected.forEach(o => o.status = 'Đã duyệt');
    alert(`Đã duyệt ${selected.length} đơn`);
    this.updateSelectedCount();
  }

  deleteSelected() {
    const selected = this.orders.filter(o => o.isSelected);
    if (!selected.length) return;

    if (confirm(`Bạn có chắc muốn xóa ${selected.length} đơn?`)) {
      this.orders = this.orders.filter(o => !o.isSelected);
      this.updateSelectedCount();
      this.totalRecords = this.orders.length;
    }
  }

  addOrder() {
    alert('Thêm mới đơn (sample)');
    // Có thể mở modal hoặc form nhập đơn mới
  }

  detailOrder(order: ExportProduct) {
    alert(`Chi tiết đơn: ${order.customerName}`);
    // Có thể mở modal hiển thị chi tiết
  }

  // --------------------- Pagination ---------------------
  goPrevPage() {
    if (this.page > 1) this.page--;
  }

  goNextPage() {
    if (this.page * this.pageSize < this.totalRecords) this.page++;
  }
}
