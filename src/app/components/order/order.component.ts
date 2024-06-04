import { TokenInterceptor } from './../../interceptors/token.interceptor';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductResponse } from '../../responses/product.response';
import { ApiResponse } from '../../responses/api.response';
import { UserResponse } from '../../responses/user.response';
import { UserService } from '../../services/user.service';
import { Cart } from '../../responses/cart.response';
import { StorageResponse } from '../../responses/storage.response';
import { Router } from '@angular/router';
import { CartRequest } from '../../dtos/cart.request';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderRequest } from '../../dtos/order.request';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  cart?: Cart;
  // selectedFlavor?: string;
  isCartChanged: boolean = false;
  orderForm: FormGroup;
  constructor(private cartService: CartService, private router: Router, private toastr: ToastrService, private fb: FormBuilder,
    private orderService: OrderService
  ) {
    this.orderForm = this.fb.group({
      fullName: ['', Validators.required, Validators.pattern(/^\d{10}$/), Validators.minLength(8)],
      phoneNumber: ['', Validators.required, Validators.pattern(/^\d+$/)],
      address: ['', Validators.required],
      note: [''],
      shippingMethod: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.getCart();
  }
  getCart() {
    this.cartService.getCart().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Cart>>) => {
        console.log(apiResponse.data);
        this.cart = apiResponse.data.cart
        console.log(this.cart);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  removeItemFromCart(productId: string) {
    console.log(productId);
    this.cartService.removeFromCart(productId).subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Cart>>) => {
        console.log(apiResponse.data);
        this.cart = apiResponse.data.cart
        console.log(this.cart);
        this.router.navigate(['/order']);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  formatPrice(price: number | undefined): string {
    if (price === undefined) return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }
  decreaseQuantity(index: number): void {
    if (this.cart === undefined) return;
    if (this.cart.cartItems[index].quantity <= 1) return;
    this.cart.cartItems[index].quantity -= 1;
    this.isCartChanged = true;
  }

  increaseQuantity(index: number): void {
    if (this.cart === undefined) return;
    this.cart.cartItems[index].quantity += 1;
    this.isCartChanged = true;
  }
  onFlavorSelect(event: Event, index: number) {
    if (this.cart === undefined) return;
    this.cart.cartItems[index].flavorName = (event.target as HTMLSelectElement).value;
    this.isCartChanged = true;
  }
  updateCart() {
    let cartRequest: CartRequest[] = [];
    this.cart?.cartItems?.forEach(item => {
      cartRequest.push({ productId: item.product.id, quantity: item.quantity, flavorName: item.flavorName! })
    })
    this.cartService.updateCart(this?.cart?.id!, cartRequest).subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Cart>>) => {
        console.log(apiResponse.data);
        this.cart = apiResponse.data.cart
        console.log(this.cart);
        this.toastr.success('Cập nhật giỏ hàng thành công!', 'Thành công');
        this.isCartChanged = false;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật giỏ hàng thất bại!', 'Thất bại');
        console.error(error?.error?.message ?? '');
      }
    })
  }
  createOrder() {
    let cartRequest: CartRequest[] = [];
    this.cart?.cartItems?.forEach(item => {
      cartRequest.push({ productId: item.product.id, quantity: item.quantity, flavorName: item.flavorName! })
    })
    console.log(cartRequest);

    const orderRequest: OrderRequest = {
      userId: this.cart?.userId!,
      fullName: this.orderForm.get('fullName')?.value,
      phoneNumber: this.orderForm.get('phoneNumber')?.value,
      address: this.orderForm.get('address')?.value,
      note: this.orderForm.get('note')?.value,
      totalMoney: this.cart?.totalPrice!,
      shippingMethod: this.orderForm.get('shippingMethod')?.value,
      paymentMethod: this.orderForm.get('paymentMethod')?.value,
      cartItems: cartRequest,
    }
    this.orderService.createOrder(orderRequest).subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Order>>) => {
        this.toastr.success("Tạo đơn hàng thành công", "Thành công")
        this.orderForm.reset();
        // this.cart?.cartItems?.forEach(item => {
        //   this.cartService.removeFromCart(item.product.id!).subscribe({
        //     next: (apiResponse: ApiResponse<StorageResponse<Cart>>) => {
        //       console.log(this.cart);
        //     },
        //     error: (error: HttpErrorResponse) => {
        //       console.error(error?.error?.message ?? '');
        //     }
        //   })
        // })
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error("Tạo đơn hàng thất bại", "Thất bại")
        console.error(error?.error?.message ?? '');
      }
    })
    console.log(this.orderForm.value);
  }
}
