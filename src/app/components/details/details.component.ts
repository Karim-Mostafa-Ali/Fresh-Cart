import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _EcomdataService: EcomdataService,
    private _Renderer2: Renderer2,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}

  productName: string = '';
  productDetails: Product = {} as Product;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let productId: any = params.get('id');
        this._EcomdataService.getProductDetails(productId).subscribe({
          next: (response) => {
            this.productDetails = response.data;
            this.productName = this.productDetails.category.name;
          },
        });
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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  wishListData: string[] = [];
  addWish(productid: string): void {
    this._WishlistService.addToWish(productid).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message, 'Fresh Cart');
        this._WishlistService.wishNumber.next(response.data.length);
        this.wishListData = response.data;
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Fresh Cart');
      },
    });
  }

  removeWish(productid: string, removebtn: HTMLElement): void {
    this._Renderer2.setAttribute(removebtn, 'disabled', 'true');
    this._WishlistService.removeWish(productid).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message, 'Fresh Cart');
        this._WishlistService.wishNumber.next(response.data.length);

        this._Renderer2.removeAttribute(removebtn, 'disabled');
        this.wishListData = response.data;
      },
      error: (err) => {
        this._Renderer2.removeAttribute(removebtn, 'disabled');
      },
    });
  }
}
