import { Component, OnInit, Renderer2 } from '@angular/core';
import { Data } from 'src/app/shared/interfaces/cart';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {}

  cartProducts: Data = {
    _id: '',
    cartOwner: '',
    products: [],
    createdAt: '',
    updatedAt: '',
    __v: 0,
    totalCartPrice: 0,
  };

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartProducts = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(productid: string, removebtn: HTMLButtonElement): void {
    this._Renderer2.setAttribute(removebtn, 'disabled', 'true');
    this._CartService.removeItem(productid).subscribe({
      next: (response) => {
        this.cartProducts = response.data;
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._Renderer2.removeAttribute(removebtn, 'disabled');
      },
      error: (err) => {
        this._Renderer2.removeAttribute(removebtn, 'disabled');
      },
    });
  }

  changeCount(productId: string, newCount: number): void {
    if (newCount > 0) {
      this._CartService.updateCartQuantity(productId, newCount).subscribe({
        next: (response) => {
          this.cartProducts = response.data;
        },
      });
    }
  }

  clear(): void {
    this._CartService.clearCart().subscribe({
      next: (response) => {
        if (response.message == 'success') {
          this.cartProducts = {
            _id: '',
            cartOwner: '',
            products: [],
            createdAt: '',
            updatedAt: '',
            __v: 0,
            totalCartPrice: 0,
          };

          this._CartService.cartNumber.next(0);
        }
      },
    });
  }
}
