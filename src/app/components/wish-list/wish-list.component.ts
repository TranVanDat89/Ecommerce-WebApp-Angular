import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../responses/api.response';
import { StorageResponse } from '../../responses/storage.response';
import { FavoriteResponse } from '../../responses/favorite.response';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit {
  products?: Product[];
  favorites?: FavoriteResponse[];
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.getAllFavs();
    console.log(this.favorites);

  }
  getAllFavs() {
    this.productService.getAllFavorites().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<FavoriteResponse[]>>) => {
        this.favorites = apiResponse.data.favorites;
        // apiResponse.data.favorites?.forEach((fav) => {
        //   console.log(fav.product);
        //   this.products?.push(fav.product);
        //   console.log(this.products);
        // })
        // console.log(this.products);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? 'An error occurred during registration');
      }
    })
  }
}
