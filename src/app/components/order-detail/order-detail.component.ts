import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageResponse } from '../../responses/storage.response';
import { OrderDetailResponse } from '../../responses/order-detail.response';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  userId: string = '';
  orderDetailResponse?: OrderDetailResponse;
  constructor(private router: ActivatedRoute, private orderService: OrderService) {
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.userId = params.get('userId') ?? '';
    });
    this.getOrderDetail(this.userId);
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
