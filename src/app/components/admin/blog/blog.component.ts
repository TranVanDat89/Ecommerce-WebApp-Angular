import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Article } from '../../../models/article';
import { ApiResponse } from '../../../responses/api.response';
import { ArticleDTO } from '../../../dtos/article/article.dto';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  blogForm: FormGroup;
  imageFile?: File;
  height: string = '270px';
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
  // editorConfig: AngularEditorConfig = {
  //   editable: true,
  //   spellcheck: true,
  //   height: '270px',
  //   minHeight: '0',
  //   maxHeight: 'auto',
  //   width: 'auto',
  //   minWidth: '0',
  //   translate: 'yes',
  //   enableToolbar: true,
  //   showToolbar: true,
  //   placeholder: 'Enter text here...',
  //   defaultParagraphSeparator: '',
  //   defaultFontName: '',
  //   defaultFontSize: '',
  //   fonts: [
  //     { class: 'arial', name: 'Arial' },
  //     { class: 'times-new-roman', name: 'Times New Roman' },
  //     { class: 'calibri', name: 'Calibri' },
  //     { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  //   ],
  //   customClasses: [
  //     {
  //       name: 'quote',
  //       class: 'quote',
  //     },
  //     {
  //       name: 'redText',
  //       class: 'redText'
  //     },
  //     {
  //       name: 'titleText',
  //       class: 'titleText',
  //       tag: 'h1',
  //     },
  //   ],
  //   uploadUrl: 'v1/image'
  // };
}
