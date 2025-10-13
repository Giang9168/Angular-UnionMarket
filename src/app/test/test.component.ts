import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-test',
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  username: string = "";
  selectedValue = "green";
  kq = "đỏ";
  colors = ["đỏ,xanh,vàng"]
  usernameAgain: string = "";
  fors = ["ga the", "khis", 6];
  pro: string = "";
  count: number = 0;
  press() {
    this.count++;
  }

}
