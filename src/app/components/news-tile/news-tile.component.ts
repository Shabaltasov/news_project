import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from "@angular/router";
import { ContentService } from "../../services/content.service";
import { Article } from "../../pages/main-page/main-page.component";

@Component({
  selector: 'app-news-tile',
  templateUrl: './news-tile.component.html',
  styleUrls: ['./news-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsTileComponent implements OnInit, OnChanges {
  @Input() keywords: string[] = [];
  @Input() article!: Article;

  public truncatedTitle: string = '';
  public truncatedSummary: string = '';
  public highlightedTitle: string = '';
  public highlightedSummary: string = '';

  constructor(
    private router: Router,
    private contentService: ContentService
  ) { }

  public ngOnInit(){
    this.truncateSummary();
    this.truncateTitle();
    this.highlightText();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['title'] || changes['summary'] || changes['keywords']) {
      this.truncateSummary();
      this.highlightText();
    }
  }

  public async redirectToDetailPage() {
    this.contentService.setContent(this.article.id)

    await this.router.navigate(['/detail-page']);
  }

  private truncateSummary() {
    if (this.article.summary.length > 100) {
      this.truncatedSummary = this.article.summary.substring(0, 100) + '...';
    } else {
      this.truncatedSummary = this.article.summary;
    }
  }

  private highlightText() {
    this.highlightedTitle = this.highlightKeywords(this.truncatedTitle, this.keywords);
    this.highlightedSummary = this.highlightKeywords(this.truncatedSummary, this.keywords);
  }

  private highlightKeywords(text: string, keywords: string[]): string {
    if (!keywords || keywords.length === 0) {
      return text;
    }

    const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
    return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
  }

  private truncateTitle() {
    const maxCharsPerLine = 20;
    const maxLines = 2;
    const maxLength = maxCharsPerLine * maxLines;

    this.truncatedTitle = this.article.title.length > maxLength ? this.article.title.substring(0, maxLength) + '...' : this.article.title;
  }
}
