import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Webtravel';
  constructor(private auth: AuthService) {
    // Gọi ngay khi app khởi động
    auth.initAuthCheck().subscribe();
  }
}
