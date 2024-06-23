import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { ApiResponse } from '../../../responses/api.response';
import { StorageResponse } from '../../../responses/storage.response';
import { HttpErrorResponse } from '@angular/common/http';
import { Article } from '../../../models/article';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ArticleDTO } from '../../../dtos/article/article.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrl: './update-article.component.css'
})
export class UpdateArticleComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 6;
  articles?: Article[];

  blogForm: FormGroup;
  imageFile?: File;
  height: string = '270px';
  articleCategories?: { id: string, name: string }[];
  constructor(private articleService: ArticleService, private fb: FormBuilder, private toastr: ToastrService) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageFile: [File],
      category: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.getAllArticles();
    this.getAllArticleCategories();
  }

  getAllArticles() {
    this.articleService.getAllArticles().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Article[]>>) => {
        this.articles = apiResponse.data.articles;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  createAtricle() {
    if (this.blogForm.valid) {
      const articleDTO: ArticleDTO = {
        title: this.blogForm.get('title')?.value,
        content: this.blogForm.get('content')?.value,
        imageFile: this.imageFile!,
        articleCategoryId: this.blogForm.get('category')?.value
      }
      this.articleService.createArticle(articleDTO).subscribe({
        next: (apiResponse: ApiResponse<StorageResponse<Article>>) => {
          console.log(apiResponse);
          this.toastr.success("Tạo bài viết thành công", "Thành công!");
          this.blogForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error("Tạo bài viết thất bại", "Thất bại!");
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
  deleteArticle(id: string) {
    this.articleService.deleteArticle(id).subscribe({
      next: (apiResponse: ApiResponse<any>) => {
        this.toastr.success("Xóa bài viết thành công", "Thành công");
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error("Xóa bài viết thất bại", "Thất bại");
        console.error(error?.error?.message ?? '');
      }
    })
  }
  getAllArticleCategories() {
    this.articleService.getAllArticleCategories().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<{ id: string, name: string }[]>>) => {
        this.articleCategories = apiResponse.data.articleCategories;
        console.log(apiResponse.data);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '270px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image'
  };
}
