import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-them-san-pham',
  templateUrl: './them-san-pham.component.html',
  styleUrls: ['./them-san-pham.component.css']
})
export class ThemSanPhamComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ThemSanPhamComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      loaiPhieu: ['Nhập mua', Validators.required],
      code: [{value: 'NMUA.25.1', disabled: true}],
      nhaCungCap: ['', Validators.required],
      soHoaDon: [''],
      ngayTao: [new Date(), Validators.required],
      trangThaiThanhToan: ['chua'],
      ghiChu: [''],
      searchText: ['']
    });
  }

  saveAndClose() {
    if (this.form.valid) {
      // Lấy giá trị (nếu muốn lấy cả field disabled, dùng getRawValue)
      const payload = this.form.getRawValue();
      // Trả dữ liệu về parent
      this.dialogRef.close({ saved: true, data: payload });
    } else {
      // Nếu bạn muốn báo lỗi, có thể markAllAsTouched
      this.form.markAllAsTouched();
    }
  }

  close() {
    this.dialogRef.close({ saved: false });
  }

  // ví dụ: nút "THÊM MỚI SP" mở 1 dialog con khác hoặc xử lý logic
  onAddProductClick() {
    // TODO: mở dialog chọn sản phẩm, hoặc emit event
    console.log('Add product clicked');
  }
}
