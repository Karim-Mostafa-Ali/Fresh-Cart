import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _EcomdataService: EcomdataService,
    private _Renderer2: Renderer2,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}

  products: Product[] = [];
  ngOnInit(): void {
    this._EcomdataService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.p = response.metadata.currentPage;
        this.total = response.results;
      },
    });

    this._WishlistService.getUserWish().subscribe({
      next: (response) => {
        const newdata = response.data.map((item: any) => item._id);
        this.wishListData = newdata;
      },
    });
  }

  //pagination
  pageSize: number = 0;
  p: number = 1;
  total: number = 0;

  searchterm: string = '';

  pageChanged(event: any): void {
    this._EcomdataService.getProducts(event).subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.p = response.metadata.currentPage;
        this.total = response.results;
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
