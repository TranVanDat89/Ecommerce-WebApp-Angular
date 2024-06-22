import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../responses/api.response';
import { Cart } from '../../responses/cart.response';
import { StorageResponse } from '../../responses/storage.response';
import { CartService } from '../../services/cart.service';
import { TokenService } from '../../services/token.service';
import { UserResponse } from './../../responses/user.response';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from '../../models/notification';
import { FavoriteResponse } from '../../responses/favorite.response';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userResponse?: UserResponse | null;
  isPopoverOpen = false;
  cart?: Cart;
  notifications?: Notification[];
  favorites?: FavoriteResponse[];
  constructor(private router: Router, private productService: ProductService, private cartService: CartService, private userService: UserService, private tokenService: TokenService) {
  }
  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage()?.userResponse || this.userService.getUserResponseFromSessionStorage()?.userResponse;
    // console.log(this.userResponse);
    this.getCart();
    this.getAllNotifications();
    this.getAllFavs();
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
  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }
  getCart() {
    this.cartService.getCart().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Cart>>) => {
        console.log(apiResponse.data);
        this.cart = apiResponse.data.cart
        console.log(this.cart?.cartItems.length);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  handleItemClick(index: number): void {
    //console.error(`Clicked on "${index}"`);
    if (index === 0) {
      this.router.navigate(['/user-profile']);
    } else if (index === 2) {
      this.userService.removeUserFromLocalStorage();
      this.tokenService.deleteCookie();
      this.userResponse = this.userService.getUserResponseFromLocalStorage()?.userResponse;
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item    
  }
  getAllNotifications() {
    this.userService.getAllNotifications().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Notification[]>>) => {
        console.log(apiResponse.data);
        this.notifications = apiResponse.data.notifications
        console.log(this.notifications?.length);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
}
