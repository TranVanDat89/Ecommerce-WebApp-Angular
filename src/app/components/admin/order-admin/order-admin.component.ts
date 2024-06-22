import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderDetailResponse } from '../../../responses/order-detail.response';
import { OrderService } from '../../../services/order.service';
import { StorageResponse } from '../../../responses/storage.response';
import { ApiResponse } from '../../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrl: './order-admin.component.css'
})
export class OrderAdminComponent implements OnInit {
  selectedYear: number = new Date().getFullYear();
  currentYear: number = new Date().getFullYear();
  orderDetailResponses?: OrderDetailResponse[];
  status?: string;
  years: number[] = Array.from({ length: this.currentYear - 2020 + 1 }, (_, i) => 2020 + i);
  dtoptions: any = {};
  dttrigger: Subject<any> = new Subject<any>();
  loadDataForYear(selectedYear: number) {

  }
  constructor(private orderService: OrderService) { }
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      lengthMenu: [5, 10, 15, 20, 25, 30],
      responsive: true
    }
    this.getAllOrder();
  }
  updateOrder(orderId: string) {
    console.log(orderId, this.status);
  }
  formatPrice(price: number | undefined): string {
    if (price === undefined) return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }
  getAllOrder() {
    this.orderService.getAllOrder().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<OrderDetailResponse[]>>) => {
        this.orderDetailResponses = apiResponse.data.orderDetails;
        this.dttrigger.next(null);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }
}
