import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { ApiResponse } from '../../responses/api.response';
import { StorageResponse } from '../../responses/storage.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
  articles?: Article[];
  articleCategories?: { id: string, name: string }[];
  constructor(private articleService: ArticleService) { }
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
}
