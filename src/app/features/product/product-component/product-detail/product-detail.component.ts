import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  @Input() id: number = 0
  @Output() closeDetail = new EventEmitter<any>();
  productDetail = { id: 0, name: "", price: 0, description: "" }
  constructor(private productService: ProductService) {

  }
  close(): void {
    this.closeDetail.emit();
  }
  ngOnInit(): void {
    this.productService.getProduct(this.id).subscribe(
      {
        next: (res: any) => {

          this.productDetail = res;
          console.log(this.productDetail)
        }

      }
    )
  }
}
