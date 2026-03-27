import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    @if (showHeader) {
      <app-header />
    }
    <main [class.with-header]="showHeader">
      <router-outlet />
    </main>
  `,
  styles: [`
    main {
      min-height: 100vh;
    }
    main.with-header {
      padding-top: 72px;
    }
  `],
})
export class AppComponent {
  showHeader = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.urlAfterRedirects),
    ).subscribe(url => {
      this.showHeader = !['/home', '/login'].includes(url);
    });
  }
}
