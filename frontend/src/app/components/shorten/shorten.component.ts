import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlService, URLResponse } from '../../services/url.service';

@Component({
  selector: 'app-shorten',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shorten.component.html',
  styleUrl: './shorten.component.scss'
})
export class ShortenComponent {
  originalUrl: string = '';
  result: URLResponse | null = null;
  error: string = '';
  isLoading: boolean = false;

  constructor(private urlService: UrlService) {}

  shorten(): void {
    if (!this.originalUrl) return;
    this.isLoading = true;
    this.error = '';
    this.result = null;

    this.urlService.shortenUrl(this.originalUrl).subscribe({
      next: (response) => {
        this.result = response;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Something went wrong, try again later.';
        this.isLoading = false;
      }
    });
  }

  getShortUrl(): string {
    return `http://localhost:8000/${this.result?.short_code}`;
  }
}