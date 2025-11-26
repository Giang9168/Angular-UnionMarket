import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  form = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })
  returnUrl = '/page1';
  Focus() {
    this.message.set("");
  }

  ngOnInit() {
    // Lấy returnUrl từ query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/page1';
  }

  message = signal("")
  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
  onSubmit() {

    if (this.form.valid) {

      this.authService.login(this.form.get('username')?.value as string, this.form.get('password')?.value as string).subscribe({
        next: (res: any) => {

          this.router.navigateByUrl(this.returnUrl);

        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 0) {
            this.message.set("Server không phản hồi")

          }
          else {
            this.message.set(err.error.message);
          }

        }
      });
    }
    else {
      this.form.markAllAsTouched();
    }
  }
}