import { Component, OnInit, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Category, Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _EcomdataService: EcomdataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}
  products: Product[] = [];
  categories: Category[] = [];
  searchterm: string = '';
  wishListData: string[] = [];

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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      992: {
        items: 8,
      },
    },
    nav: true,
  };

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  //get all products
  ngOnInit(): void {
    this._EcomdataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    });
    //get categories
    this._EcomdataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
    });

    this._WishlistService.getUserWish().subscribe({
      next: (response) => {
        const newdata = response.data.map((item: any) => item._id);

        this.wishListData = newdata;
      },
    });
  }
}
