import { Component } from '@angular/core';
import { ProductComponentComponent } from '../../../product/product-component/product-component.component';
import { ProductListComponent } from '../../../product/product-component/product-list/product-list.component';
import { ProductDetailComponent } from '../../../product/product-component/product-detail/product-detail.component';
import { ProductFormComponent } from '../../../product/product-component/product-form/product-form.component';

@Component({
  selector: 'app-product-management',
  imports: [ProductListComponent],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent {

}
