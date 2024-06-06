import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../responses/api.response';
import { StorageResponse } from '../../../responses/storage.response';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../../services/product.service';
import { Comment } from '../../../models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  comments: Comment[] | undefined;
  itemsPerPage: number = 6;
  currentPage: number = 1;

  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.getAllComments();
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
