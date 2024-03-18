import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-branddetails',
  templateUrl: './branddetails.component.html',
  styleUrls: ['./branddetails.component.css'],
})
export class BranddetailsComponent {
  constructor(
    private _EcomdataService: EcomdataService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  BrandDetails: Brand = {} as Brand;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let productId: any = params.get('id');
        this._EcomdataService.getBrandDetails(productId).subscribe({
          next: (response) => {
            this.BrandDetails = response.data;
            console.log(this.BrandDetails);
          },
        });
      },
    });
  }
}
