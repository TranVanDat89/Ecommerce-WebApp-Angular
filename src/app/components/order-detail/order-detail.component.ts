import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderDetailReponse } from '../../responses/order-detail.response';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  userId?: string;
  orderDetailResponse?: OrderDetailReponse;
  constructor(private router: ActivatedRoute, private orderService: OrderService) { }
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.userId = params.get('userId') ?? '';
    });
  }
  getOrderDetail(userId: string) {
    this.orderService.getOrderDetail(userId).subscribe({
      next: (apiResponse: ApiResponse<OrderDetailReponse>) => {
        console.log(apiResponse.data)
        // this.orderDetailResponse = apiResponse.data;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
}
