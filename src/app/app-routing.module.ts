import { authGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { BranddetailsComponent } from './components/branddetails/branddetails.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'allorders', redirectTo: 'home', pathMatch: 'full' },
      // { path: 'allorders', component: AllordersComponent, title: 'All Orders' },
      { path: 'checkout/:id', component: CheckoutComponent, title: 'Checkout' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
      { path: 'wishlist', component: WishlistComponent, title: 'Wishlist' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
      {
        path: 'categories/:id',
        component: CategorydetailsComponent,
        title: 'Category Details',
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Product Details',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      {
        path: 'brands/:id',
        component: BranddetailsComponent,
        title: 'Brand Details',
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      {
        path: 'ForgotPassword',
        component: ForgotpassComponent,
        title: 'ForgotPassword',
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
