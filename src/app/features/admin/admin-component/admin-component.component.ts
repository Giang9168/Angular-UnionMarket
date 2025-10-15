import { Component } from '@angular/core';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-admin-component',
  imports: [SidebarComponent, RouterModule, HeaderComponent],
  templateUrl: './admin-component.component.html',
  styleUrl: './admin-component.component.css'
})
export class AdminComponentComponent {

}
