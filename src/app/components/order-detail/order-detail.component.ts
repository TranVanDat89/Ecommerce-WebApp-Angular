import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageResponse } from '../../responses/storage.response';
import { OrderDetailResponse } from '../../responses/order-detail.response';
import { ProductService } from '../../services/product.service';
import { CommentDTO } from '../../dtos/comment.dto';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  userId: string = '';
  orderDetailResponse?: OrderDetailResponse;
  // isComment: boolean = false;
  constructor(private router: ActivatedRoute, private orderService: OrderService, private productService: ProductService) {
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.userId = params.get('userId') ?? '';
    });
    this.getOrderDetail(this.userId);
  }
  formatPrice(price: number | undefined): string {
    if (price === undefined) return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }
  getOrderDetail(userId: string) {
    this.orderService.getOrderDetail(userId).subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<OrderDetailResponse>>) => {
        this.orderDetailResponse = apiResponse.data.orderDetails;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
}
