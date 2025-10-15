import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CATEGORIES } from '../../../../../shared/data/categories';
import { Category } from '../../../../../shared/models/category.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  categories = CATEGORIES;
  public toggleSubmenu(category: Category): void {
    if (category.children && category.children.length > 0) {
      category.isOpen = !category.isOpen;
    }
  }

}
