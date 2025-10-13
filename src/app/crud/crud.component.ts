import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authe';

@Component({
  selector: 'app-crud',
  imports: [],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {
  }
  meg = ""
  ngOnInit(): void {
    this.authService.login().subscribe({
      next: (res) => this.meg = "oks",

    })

  }

}
