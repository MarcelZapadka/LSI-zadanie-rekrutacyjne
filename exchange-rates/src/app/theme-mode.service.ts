import { Injectable } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeModeService {

  constructor(
    private renderer: Renderer2
  ){}

  get isDarkMode(): boolean {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  switchTheme(theme: string): void {
    if (theme === "dark") {
      this.renderer.addClass(document.body, "dark-mode");
    } else {
      this.renderer.removeClass(document.body, "dark-mode");    
    }
  }
}