import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderDetailResponse } from '../../../responses/order-detail.response';
import { OrderService } from '../../../services/order.service';
import { StorageResponse } from '../../../responses/storage.response';
import { ApiResponse } from '../../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  now: Date;
  years: number[] = Array.from({ length: this.currentYear - 2020 + 1 }, (_, i) => 2020 + i);
  dtoptions: any = {};
  dttrigger: Subject<any> = new Subject<any>();
  loadDataForYear(selectedYear: number) {

  }
  constructor(private orderService: OrderService, private toastr: ToastrService, private modalService: NgbModal) {
    this.now = new Date();
  }
  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      lengthMenu: [5, 10, 15, 20, 25, 30],
      responsive: true
    }
    this.getAllOrder();
  }
  openModal(modal: any) {
    this.modalService.open(modal);
  }
  updateOrder(orderId: string) {
    this.orderService.updateOrderStatus({ orderId: orderId, status: this.status }).subscribe({
      next: (apiResponse: ApiResponse<any>) => {
        this.toastr.success("Cập nhật đơn hàng thành công", "Thành công");
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error("Cập nhật đơn hàng thất bại", "Thất bại");
        console.error(error);
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
  generateInvoice() {
    const invoice: any = document.getElementById("invoice");
    html2canvas(invoice).then((canvas) => {
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
      pdf.save('invoice.pdf');
    })
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
