import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  private apiUrl = 'https://api.spaceflightnewsapi.net/v4/articles';

  constructor(
    private http: HttpClient
  ) { }

  public getArticles(limit: number = 30): Observable<any> {
    const url = `${this.apiUrl}?limit=${limit}`;
    return this.http.get<any>(url);
  }

  public getArticleById(id: string): Observable<any> {
    return this.http.get(`https://api.spaceflightnewsapi.net/v4/articles/${id}`);
  }
}
