import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { ActivatedRoute } from '@angular/router';
import { StorageResponse } from '../../responses/storage.response';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit {
  article?: Article;
  articleId?: string;
  articleCategories?: { id: string, name: string }[];
  constructor(private articleService: ArticleService, private router: ActivatedRoute) { }
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.articleId = params.get('articleId') ?? '';
    });
    this.getArticleDetail(this.articleId!);
    this.getAllArticleCategories();
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
  getArticleDetail(articleId: string) {
    this.articleService.getArticleDetail(articleId).subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Article>>) => {
        this.article = apiResponse.data.article;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
}
