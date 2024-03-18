import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-blank-nav',
  templateUrl: './blank-nav.component.html',
  styleUrls: ['./blank-nav.component.css'],
})
export class BlankNavComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  cartNumber: number = 0;
  wishNumber: number = 0;

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartNumber = data;
      },
    });

    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartNumber = response.numOfCartItems;
      },
    });

    this._WishlistService.wishNumber.subscribe({
      next: (data) => {
        this.wishNumber = data;
      },
    });

    this._WishlistService.getUserWish().subscribe({
      next: (response) => {
        this.wishNumber = response.count;
      },
    });
  }

  logOutUser(): void {
    this._AuthService.logOut();
  }
}
