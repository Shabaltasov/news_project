import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ContentService } from "../../services/content.service";
import { GetApiService } from "../../services/get-api.service";
import { Article } from "../main-page/main-page.component";
import { loremIpsum } from "lorem-ipsum";

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  public article!: Article;
  public articleId!: string;
  public loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private getApiService: GetApiService
  ) { }

  public async ngOnInit() {
    this.articleId = this.contentService.getContent();
    if (this.articleId) {
      this.loadArticle(this.articleId);
    } else {
      await this.redirectToMainPage();
    }
  }

  public async redirectToMainPage() {
    await this.router.navigate(['/main-page']);
  }

  private loadArticle(id: string) {
    this.getApiService.getArticleById(id).subscribe((data: any) => {
      console.log('data', data);
      this.article = {
        id: data.id,
        published_at: data.published_at,
        title: data.title,
        summary: this.generateFullSummary(data.summary),
        image_url: data.image_url
      };
      this.loading = false;
    });
  }

  private generateFullSummary(summary: string): string {
    const paragraphs: string[] = [];
    const numberOfParagraphs = Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < numberOfParagraphs; i++) {
      const numberOfSentences = Math.floor(Math.random() * 20) + 1;
      const loremText = loremIpsum({
        count: numberOfSentences,
        units: 'sentences'
      });
      paragraphs.push(loremText);
    }

    return summary + ' ' + paragraphs.map(paragraph => `${paragraph}`).join('');
  }
}
