import { Component } from '@angular/core';
import { ShortenComponent } from './components/shorten/shorten.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShortenComponent],
  template: `<app-shorten />`
})
export class AppComponent {}