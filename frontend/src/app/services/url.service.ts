import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface URLResponse {
  id: number;
  original_url: string;
  short_code: string;
  clicks: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  shortenUrl(originalUrl: string): Observable<URLResponse> {
    return this.http.post<URLResponse>(`${this.apiUrl}/shorten`, {
      original_url: originalUrl
    });
  }

  getStats(shortCode: string): Observable<URLResponse> {
    return this.http.get<URLResponse>(`${this.apiUrl}/stats/${shortCode}`);
  }
}