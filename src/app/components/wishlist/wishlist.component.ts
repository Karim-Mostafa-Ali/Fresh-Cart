import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Data } from 'src/app/shared/interfaces/cart';
import { Daum, Wish } from 'src/app/shared/interfaces/wish';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _ToastrService: ToastrService
  ) {}

  wishdata: Wish = {
    status: '',
    count: 0,
    data: [],
  };

  wishListData: string[] = [];

  wishProducts: Daum[] = [];

  ngOnInit(): void {
    this._WishlistService.getUserWish().subscribe({
      next: (response) => {
        this.wishdata = response;
        this.wishProducts = response.data;
      },
    });
  }

  addCart(productid: string, btn: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btn, 'disabled', 'true');
    this._CartService.addToCart(productid).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message, 'Fresh Cart');
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._Renderer2.removeAttribute(btn, 'disabled');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Fresh Cart');
        this._Renderer2.removeAttribute(btn, 'disabled');
      },
    });
  }

  removeWish(productid: string, removebtn: HTMLButtonElement): void {
    this._Renderer2.setAttribute(removebtn, 'disabled', 'true');
    this._WishlistService.removeWish(productid).subscribe({
      next: (response) => {
        this.wishListData = response.data;
        const newData = this.wishProducts.filter((item: any) =>
          this.wishListData.includes(item._id)
        );
        this.wishProducts = newData;
        // this._WishlistService.getUserWish().subscribe({
        //   next: (response) => {
        //     this.wishdata = response;
        //     this.wishProducts = response.data;
        //   },
        // });
        this._ToastrService.success(response.message, 'Fresh Cart');
        this._WishlistService.wishNumber.next(response.data.length);
        this._Renderer2.removeAttribute(removebtn, 'disabled');
      },
      error: (err) => {
        this._Renderer2.removeAttribute(removebtn, 'disabled');
      },
    });
  }
}
