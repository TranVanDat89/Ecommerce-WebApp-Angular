import { Component } from '@angular/core';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrl: './order-admin.component.css'
})
export class OrderAdminComponent {
  selectedYear: number = new Date().getFullYear();
  currentYear: number = new Date().getFullYear();
  years: number[] = Array.from({ length: this.currentYear - 2020 + 1 }, (_, i) => 2020 + i);

  loadDataForYear(selectedYear: number) {

  }
}
