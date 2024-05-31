import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Article } from '../../../models/article';
import { ApiResponse } from '../../../responses/api.response';
import { ArticleDTO } from '../../../dtos/article/article.dto';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  blogForm: FormGroup;
  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageFile: [File],
      category: ['', Validators.required],
    })
  }
  ngOnInit(): void {
  }
  createAtricle() {
    if (this.blogForm.valid) {
      // const articleDTO: ArticleDTO = {
      //   title: this.blogForm.get('title')?.value,
      //   content: this.blogForm.get('content')?.value,
      //   imageFile: this.blogForm.get('imageFile')?.value,
      //   category: this.blogForm.get('category')?.value
      // }
      debugger
      const formData = new FormData();
      formData.append('title', this.blogForm.get('title')?.value);
      formData.append('category', this.blogForm.get('category')?.value);
      formData.append('imageFile', this.blogForm.get('imageFile')?.value);
      formData.append('content', this.blogForm.get('content')?.value);
      this.articleService.createArticle(formData).subscribe({
        next: (apiResponse: ApiResponse<Article>) => {
          console.log(apiResponse);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error?.error?.message ?? '');
        }
      })
    }
  }
}
