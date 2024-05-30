import { CartService } from '../../services/cart.service';
import { TokenService } from '../../services/token.service';
import { UserResponse } from './../../responses/user.response';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userResponse?: UserResponse | null;
  cart: Map<string, { quantity: number, flavorName: string }> = new Map();
  isPopoverOpen = false;
  constructor(private router: Router, private cartService: CartService, private userService: UserService, private tokenService: TokenService) {
  }
  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage()?.userResponse || this.userService.getUserResponseFromSessionStorage()?.userResponse;
    // console.log(this.userResponse);
    this.cart = this.cartService.getCart();

  }

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }
  handleItemClick(index: number): void {
    //console.error(`Clicked on "${index}"`);
    if (index === 0) {
      this.router.navigate(['/user-profile']);
    } else if (index === 2) {
      // if (localStorage?.getItem('user')) {
      //   this.userService.removeUserFromLocalStorage();
      // }
      // if (sessionStorage?.getItem('user')) {
      //   this.userService.removeUserFromSessionStorage();
      // }
      this.userService.removeUserFromLocalStorage();
      this.userService.removeUserFromSessionStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage()?.userResponse;
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item    
  }
}
