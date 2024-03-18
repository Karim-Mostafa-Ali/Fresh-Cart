import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.css'],
})
export class CategorydetailsComponent {
  constructor(
    private _EcomdataService: EcomdataService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  categoryDetails: Category = {} as Category;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let productId: any = params.get('id');
        this._EcomdataService.getCategoryDetails(productId).subscribe({
          next: (response) => {
            this.categoryDetails = response.data;
          },
        });
      },
    });
  }
}
