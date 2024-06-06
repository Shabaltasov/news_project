import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetApiService } from "../../services/get-api.service";
import { Subscription } from "rxjs";

export interface Article {
  id: string;
  published_at: string;
  title: string;
  summary: string;
  image_url: string;
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public articles: Article[] = [];
  public filteredArticles: Article[] = [];

  public searchKeywords: string[] = [];
  public searchActive = false;

  private articleSubscription!: Subscription;

  constructor(
    private getApiService: GetApiService,
  ) { }

  public ngOnInit() {
    this.articleSubscription = this.getApiService.getArticles().subscribe((data: ApiResponse) => {
      this.articles = data.results.map((article: Article) => ({
        id: article.id,
        published_at: article.published_at,
        title: article.title,
        summary: article.summary,
        image_url: article.image_url
      }));
      this.filteredArticles = [...this.articles];
    });
  }

  public filterArticles(value: string) {
    this.searchKeywords = value.toLowerCase().split(' ');
    if (value.length > 0) {
      this.searchActive = true;
      this.filteredArticles = this.articles.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(value.toLowerCase());
        const summaryMatch = article.summary.toLowerCase().includes(value.toLowerCase());
        return titleMatch || (summaryMatch && !titleMatch);
      });
    } else {
      this.searchActive = false;
      this.filteredArticles = [...this.articles];
    }
  }

  public ngOnDestroy() {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }
}
