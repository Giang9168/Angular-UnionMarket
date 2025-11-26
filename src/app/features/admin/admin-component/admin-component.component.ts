import { Component } from '@angular/core';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/login/auth.service';

@Component({
  selector: 'app-admin-component',
  imports: [SidebarComponent, RouterModule, HeaderComponent, CommonModule],
  templateUrl: './admin-component.component.html',
  styleUrl: './admin-component.component.css'
})
export class AdminComponentComponent {
  constructor(public authService: AuthService) { }
}
