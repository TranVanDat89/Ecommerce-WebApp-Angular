import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
  }
  public columnChartOptions: ChartOptions = {
    responsive: true,
  };
  public columnChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public columnChartType: ChartType = 'bar';
  public columnChartLegend = true;
  public columnChartPlugins = [];

  public columnChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // Pie Chart Configuration
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public pieChartData: ChartDataset[] = [{
    data: [300, 500, 100]
  }];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
}
