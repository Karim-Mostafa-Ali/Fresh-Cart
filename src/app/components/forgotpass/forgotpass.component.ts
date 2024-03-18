import { HttpErrorResponse } from '@angular/common/http';
import { ForgotpassService } from './../../shared/services/forgotpass.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css'],
})
export class ForgotpassComponent {
  constructor(
    private _ForgotpassService: ForgotpassService,
    private _Router: Router
  ) {}

  isLoading: boolean = false;

  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;

  forgotForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });

  resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
    ]),
  });

  email: string = '';
  message: string = '';

  forgotPassword(): void {
    this.isLoading = true;
    let userEmail = this.forgotForm.value;
    this.email = userEmail.email;
    this._ForgotpassService.forgotPassword(userEmail).subscribe({
      next: (response) => {
        this.message = response.message;
        this.step1 = false;
        this.step2 = true;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.message = err.error.message;
        this.isLoading = false;
      },
    });
  }

  verifyCode(): void {
    this.isLoading = true;
    let resetCode = this.resetCodeForm.value;
    this._ForgotpassService.resetCode(resetCode).subscribe({
      next: (response) => {
        this.message = response.message;
        this.step2 = false;
        this.step3 = true;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.message = err.error.message;
        this.isLoading = false;
      },
    });
  }

  resetPassword(): void {
    this.isLoading = true;
    let userData = this.resetPasswordForm.value;
    userData.email = this.email;

    this._ForgotpassService.resetPassword(userData).subscribe({
      next: (response) => {
        this.message = response.message;
        this.step3 = false;
        if (response?.token) {
          localStorage.setItem('eToken', response.token);
          this._Router.navigate(['/home']);
          this.isLoading = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        this.message = err.error.message;
        this.isLoading = false;
      },
    });
  }
}
