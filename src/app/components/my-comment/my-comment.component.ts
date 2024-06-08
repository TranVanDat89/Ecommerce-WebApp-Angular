import { Component, OnInit } from '@angular/core';
import { Comment } from '../../models/comment';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ApiResponse } from '../../responses/api.response';
import { StorageResponse } from '../../responses/storage.response';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-my-comment',
  templateUrl: './my-comment.component.html',
  styleUrl: './my-comment.component.css'
})
export class MyCommentComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 5;
  comments: Comment[] | undefined;
  userId: string = '';


  constructor(private router: ActivatedRoute, private productService: ProductService) { }
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.userId = params.get('userId') ?? '';
    });
    this.getAllComments();
  }
  getStarsArray(star: number): any[] {
    return new Array(star);
  }
  getAllComments() {
    this.productService.getCommentsByUserId(this.userId).subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Comment[]>>) => {
        this.comments = apiResponse.data.comments;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
}
