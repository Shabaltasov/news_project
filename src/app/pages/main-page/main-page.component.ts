import { Component } from '@angular/core';
import { GetApiService } from "../../services/get-api.service";

export interface Article {
  id: string;
  published_at: string;
  title: string;
  summary: string;
  image_url: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  public articles: Article[] = [];
  public filteredArticles: Article[] = [];

  public searchKeywords: string[] = [];
  public searchActive = false;

  constructor(
    private getApiService: GetApiService,
  ) { }

  public ngOnInit() {
    this.getApiService.getArticles().subscribe((data: any) => {
      this.articles = data.results.map((article: any) => ({
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
}
