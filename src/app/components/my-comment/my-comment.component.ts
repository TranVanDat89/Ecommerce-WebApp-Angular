import { Comment } from '../../models/comment';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ApiResponse } from '../../responses/api.response';
import { StorageResponse } from '../../responses/storage.response';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommentDTO } from '../../dtos/comment.dto';

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

  constructor(private router: ActivatedRoute, private toastr: ToastrService, private productService: ProductService, private fb: FormBuilder, private modalService: NgbModal) {
    this.commentForm = this.fb.group({
      rating: [0, [Validators.required]],
      content: ['', [Validators.required]]
    })
  }
  onUpdate(commentId: string, modal: any, content: string, star: number) {
    this.currentCommentId = commentId;
    this.modalService.open(modal);
    this.commentForm.get('rating')?.setValue(star);
    this.commentForm.get('content')?.setValue(content);
    console.log(this.currentCommentId);
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
  updateComment() {
    if (this.commentForm.valid) {
      let commentDTO: CommentDTO = {
        star: this.commentForm.get('rating')?.value,
        content: this.commentForm.get('content')?.value,
        productId: '',
        userId: '',
        orderId: ''
      }
      console.log(commentDTO);
      this.productService.updateComment(this.currentCommentId, commentDTO).subscribe({
        next: (apiResponse: ApiResponse<any>) => {
          this.modalService.dismissAll();
          this.toastr.success("Cập nhật đánh giá thành công", "Thành công");
          window.location.reload();
        },
        error: (error: HttpErrorResponse) => {
          this.modalService.dismissAll();
          console.error(error?.error?.message ?? '');
          this.toastr.success("Cập nhật đánh giá thất bại", "Thất bại");
        }
      })
    }
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
