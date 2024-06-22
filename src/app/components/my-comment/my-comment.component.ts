import { Comment } from '../../models/comment';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ApiResponse } from '../../responses/api.response';
import { StorageResponse } from '../../responses/storage.response';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  commentForm: FormGroup;
  currentCommentId: string = '';

  constructor(private router: ActivatedRoute, private productService: ProductService, private fb: FormBuilder, private modalService: NgbModal) {
    this.commentForm = this.fb.group({
      rating: [0, [Validators.required]],
      content: ['', [Validators.required]]
    })
  }
  onDelete(commentId: string, modal: any) {
    this.currentCommentId = commentId;
    this.modalService.open(modal);
  }
  deleteComment(commentId: string) {
    console.log(commentId);
  }
  updateComment(commentId: string) {

  }
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
