import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
import { AnalyticsService } from '../../../services/analytics.service';
import { Obj } from '@popperjs/core';
import { StorageResponse } from '../../../responses/storage.response';
import { ApiResponse } from '../../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  selectedYear: number = new Date().getFullYear();
  currentYear: number = new Date().getFullYear();
  years: number[] = Array.from({ length: this.currentYear - 2020 + 1 }, (_, i) => 2020 + i);
  // Column Chart Configuration
  public columnChartOptions: ChartOptions = {
    responsive: true,
  };
  public columnChartLabels: string[] = [];
  public columnChartType: ChartType = 'bar';
  public columnChartLegend = true;
  public columnChartPlugins = [];

  public columnChartData: ChartDataset[] = [];

  // Pie Chart Configuration
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: string[] = [];
  public pieChartData: ChartDataset[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  totalArticles: { totalArticles?: number, up?: number, down?: number };
  totalOrders: { totalOrders?: number, up?: number, down?: number };
  totalUsers: { totalUsers?: number, up?: number, down?: number }
  outcome: { outcome?: number, up?: number, down?: number }
  constructor(private analyticsService: AnalyticsService) {
    this.totalArticles = { totalArticles: 0, up: 0, down: 0 };
    this.totalOrders = { totalOrders: 0, up: 0, down: 0 };
    this.totalUsers = { totalUsers: 0, up: 0, down: 0 };
    this.outcome = { outcome: 0, up: 0, down: 0 };
  }
  ngOnInit(): void {
    this.getDataForPieChart();
    this.getDataForColumnChart(this.selectedYear);
    this.getAnalytics(this.selectedYear);
  }
  loadDataForYear(selectedYear: number) {
    this.getDataForColumnChart(this.selectedYear);
    this.getDataForPieChart();
    this.getAnalytics(selectedYear);
  }
  getDataForPieChart() {
    this.analyticsService.getAnalyticsProduct().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Object>>) => {
        const reuslt: Object = apiResponse.data.result!;
        this.pieChartLabels = Object.keys(reuslt);
        this.pieChartData = [{ data: Object.values(reuslt) }];
        console.log(Object.keys(reuslt), Object.values(reuslt))

        console.log(apiResponse.data);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }

  getDataForColumnChart(selectedYear: number) {
    this.analyticsService.getOutComeByMonth(selectedYear).subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Object>>) => {
        const reuslt: Object = apiResponse.data.result!;
        this.columnChartLabels = Object.keys(reuslt);
        this.columnChartData = [{ data: Object.values(reuslt), label: "Tổng doanh thu" }]
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    });
  }
  getAnalytics(selectedYear: number) {
    this.analyticsService.getAnalytics(selectedYear).subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Object>>) => {
        console.log(apiResponse.data.totalArticles);
        this.totalArticles = apiResponse.data.totalArticles!
        this.totalOrders = apiResponse.data.totalOrders!
        this.totalUsers = apiResponse.data.totalUsers!
        this.outcome = apiResponse.data.outcome!
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
}
