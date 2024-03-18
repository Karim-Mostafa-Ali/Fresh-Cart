import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}

  cartId: any;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
      },
    });
  }

  checkOut: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
    city: [''],
  });

  isLoading: boolean = false;
  msgError: string = '';

  handleform(): void {
    if (this.checkOut.valid) {
      this.isLoading = true;
      this._CartService.checkOut(this.cartId, this.checkOut.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.status == 'success') {
            window.open(response.session.url, '_self');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.msgError = err.error.message;
        },
      });
    } else {
      this.checkOut.markAllAsTouched();
    }
  }
}
