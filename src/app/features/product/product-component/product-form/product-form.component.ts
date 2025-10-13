import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-form',
  imports: [],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Input() initialData: any = null;
  @Output() productSaved = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();
  formnew: FormGroup;
  isEditMode = false;
  constructor(private productService: ProductService) {
    this.formnew = new FormGroup(
      {
        name: new FormControl("", [Validators.required]),
        price: new FormControl(0, [Validators.required]),
        description: new FormControl("", [Validators.required])
      }
    )
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["initialData"] && this.initialData) {
      this.isEditMode = true;
      this.formnew.patchValue(this.initialData);
      console.log(this.initialData);
      // Điền dữ liệu vào form
    }
    console.log("onchange")
  }
  ngOnInit(): void {

  }


  // Khi nhấn nút Lưu, phát ra sự kiện productSaved cùng với dữ liệu sản phẩm
  buttonFormAddorUpdate(): void {
    if (this.formnew.invalid) {
      return;
    }
    this.productSaved.emit(this.formnew.value);
  }

  // Khi nhấn nút Hủy, phát ra sự kiện cancelled
  cancel(): void {
    this.cancelled.emit();
  }

}
