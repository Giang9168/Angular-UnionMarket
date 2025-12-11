import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ThemSanPhamComponent } from './ChucNang/them-san-pham.component';

import { NhaphangService } from './nhaphang.service';

interface ImportProductRow {
  id: string;
  code: string;
  supplier: string;
  created: Date | null;
  approved: Date | null;
  quantity: number;
  total: number;
  status: string;
  note?: string;
  isSelected?: boolean;
}

@Component({
  selector: 'app-nhaphang',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule 
  ],
  templateUrl: './nhaphang.component.html',
  styleUrls: ['./nhaphang.component.css'],
})
export class NhaphangComponent implements OnInit, AfterViewInit {

  filter = {
    fromDate: null as Date | null,
    toDate: null as Date | null,
    code: '',
    search: ''
  };

  dataSource = new MatTableDataSource<ImportProductRow>([]);
  displayedColumns: string[] = ['select', 'stt', 'code', 'supplier', 'created', 'approved', 'quantity', 'total', 'status', 'note'];

  selectedCount = 0;
  totalRecords = 0;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // thêm MatDialog vào constructor
  constructor(private nhaphangService: NhaphangService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
  }

  loadProducts() {
    this.nhaphangService.getProducts().subscribe(data => {
      this.dataSource.data = data;
      this.totalRecords = data.length;
      this.updateSelectedCount();
    });
  }

  onSearch() {
    const q = (this.filter.search || '').trim().toLowerCase();

    this.dataSource.filterPredicate = (row) =>
      row.code.toLowerCase().includes(q) ||
      row.supplier.toLowerCase().includes(q) ||
      (row.note || '').toLowerCase().includes(q);

    this.dataSource.filter = q;
    this.updateSelectedCount();
  }
  add() {
    const dialogRef = this.dialog.open(ThemSanPhamComponent, {
      width: '95vw',        
      height: '90vh',       
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'custom-dialog-container',
      disableClose: false,
      data: {
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
  
      if (result.saved) {
        const payload = result.data;
        console.log('Form ThemSanPham saved, payload:', payload);
  
        const newRow: ImportProductRow = {
          id: (Math.random() * 1000000).toFixed(0),
          code: payload.code ?? 'NMUA.XXX',
          supplier: payload.nhaCungCap ?? '',
          created: payload.ngayTao ? new Date(payload.ngayTao) : new Date(),
          approved: null,
          quantity: 0,
          total: 0,
          status: 'Mới',
          note: payload.ghiChu ?? '',
          isSelected: false
        };
  
        this.dataSource.data = [newRow, ...this.dataSource.data];
        this.totalRecords = this.dataSource.data.length;
        this.updateSelectedCount();
      } else {
        console.log('ThemSanPham dialog closed without saving');
      }
    });
  }
  

  //--------------------------------------------------------------------
  // SELECTION
  //--------------------------------------------------------------------
  toggleAll(event: { checked: boolean }) {
    const checked = !!event.checked;
    this.dataSource.data.forEach(r => r.isSelected = checked);
    this.updateSelectedCount();
  }

  updateSelectedCount() {
    this.selectedCount = this.dataSource.data.filter(r => r.isSelected).length;
  }

  approveSelected() {
    const selected = this.dataSource.data.filter(r => r.isSelected);
    if (selected.length === 0) return;

    const now = new Date();
    selected.forEach(r => {
      r.approved = now;
      r.status = 'Đã duyệt';
      r.isSelected = false;
    });

    console.log(`Đã duyệt ${selected.length} đơn.`);
    this.updateSelectedCount();
  }

  //--------------------------------------------------------------------
  // TOTALS
  //--------------------------------------------------------------------
  get totalQuantity(): number {
    return this.dataSource.data.reduce((s, r) => s + (r.quantity || 0), 0);
  }

  get totalMoney(): number {
    return this.dataSource.data.reduce((s, r) => s + (r.total || 0), 0);
  }

  //--------------------------------------------------------------------
  // PAGINATION
  //--------------------------------------------------------------------
  changePage(event: PageEvent | any) {
    if (event?.pageSize) this.pageSize = event.pageSize;
  }

  // trong class NhaphangComponent (dán vào dưới approveSelected() hoặc vị trí bạn muốn)
  deleting = false; // thêm biến thành phần

  deleteSelectedByCode() {
    const selected = this.dataSource.data.filter(r => r.isSelected);
    if (!selected || selected.length === 0) return;

    const confirmed = confirm(`Bạn có chắc muốn xóa ${selected.length} đơn đã chọn không?`);
    if (!confirmed) return;

    let processed = 0;
    let successCount = 0;
    const failed: { code: string, status?: number, body?: any }[] = [];

    const finishOne = () => {
      processed++;
      if (processed === selected.length) {
        this.loadProducts(); // reload để đồng bộ
        this.updateSelectedCount();
        alert(`Hoàn tất xóa: ${successCount} thành công, ${failed.length} thất bại.`);
        if (failed.length) console.error('Failed deletes:', failed);
      }
    };

    selected.forEach(row => {
      const code = row.code;
      if (!code) {
        failed.push({ code: code ?? 'missing' });
        finishOne();
        return;
      }

      this.nhaphangService.deleteProductByCode(code).subscribe({
        next: () => {
          successCount++;
          this.dataSource.data = (this.dataSource.data || []).filter(r => r.code !== code);
          finishOne();
        },
        error: (err) => {
          failed.push({ code, status: err?.status, body: err?.error ?? err?.message });
          console.error('Delete by code failed', code, err);
          finishOne();
        }
      });
    });
  }

}
