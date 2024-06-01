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
  imageFile?: File;
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
      const articleDTO: ArticleDTO = {
        title: this.blogForm.get('title')?.value,
        content: this.blogForm.get('content')?.value,
        imageFile: this.imageFile!,
        category: this.blogForm.get('category')?.value
      }
      console.log(articleDTO);
      debugger
      // const formData = new FormData();
      // formData.append('title', this.blogForm.get('title')?.value);
      // formData.append('category', this.blogForm.get('category')?.value);
      // if (this.imageFile) {
      //   formData.append('imageFile', this.imageFile);
      // }
      // formData.append('content', this.blogForm.get('content')?.value);
      // console.log(formData.get('title'), formData.get('content'), formData.get('imageFile'), formData.get('category'));
      this.articleService.createArticle(articleDTO).subscribe({
        next: (apiResponse: ApiResponse<Article>) => {
          console.log(apiResponse);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error?.error?.message ?? '');
        }
      })
    }
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imageFile = file;
    }
  }
}
