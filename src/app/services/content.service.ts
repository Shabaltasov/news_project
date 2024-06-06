import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ContentService {
  private id!: string;

  private storageKey = 'articleId';

  public setContent(id: string) {
    this.id = id;
    localStorage.setItem(this.storageKey, id);
  }

  public getContent(): string {
    if (!this.id) {
      this.id = localStorage.getItem(this.storageKey) || '';
    }
    return this.id;
  }
}
