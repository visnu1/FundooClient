import { HttpClient } from '@angular/common/http';
import { Component, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  template: `<span [innerHTML]="svgContent"></span>`,
})
export class SvgIconComponent {

  src = input.required<string>();
  svgContent?: SafeHtml;
  private _http = inject(HttpClient);
  private _domSanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.initSvg();
  }

  initSvg() {
    if (!this.src) return;
    this._http.get(this.src(), { responseType: 'text' }).subscribe({
      next: (svg: string) => this.svgContent = this._domSanitizer.bypassSecurityTrustHtml(svg),
      error: (err) => console.error('Error loading the SVG content', err)
    });
  }
}
