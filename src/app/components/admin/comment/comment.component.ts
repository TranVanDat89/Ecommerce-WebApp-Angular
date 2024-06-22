import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../responses/api.response';
import { StorageResponse } from '../../../responses/storage.response';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../../services/product.service';
import { Comment } from '../../../models/comment';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  comments: Comment[] | undefined;
  itemsPerPage: number = 6;
  currentPage: number = 1;
  selectedYear: number = new Date().getFullYear();
  currentYear: number = new Date().getFullYear();
  years: number[] = Array.from({ length: this.currentYear - 2020 + 1 }, (_, i) => 2020 + i);
  // Pie Chart Configuration
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
  public pieChartData: ChartDataset[] = [{
    label: 'My First Dataset',
    data: [20, 50, 100, 452, 1520],
    hoverOffset: 4
  }];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  loadDataForYear(selectedYear: number) {

  }

  constructor(private productService: ProductService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getAllComments();
  }
  deleteComment(commentId: string) {
    this.productService.deleteComment(commentId).subscribe({
      next: (apiResponse: ApiResponse<any>) => {
        this.toastr.success("Xóa bình luận thành công", "Thành công");
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error("Xóa bình luận thất bại", "Thất bại");
        console.error(error?.error?.message ?? '');
      }
    })
  }
  getAllComments() {
    this.productService.getAllCommentsForAdmin().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Comment[]>>) => {
        this.comments = apiResponse.data.comments;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  getStarsArray(star: number): any[] {
    return new Array(star);
  }
}
