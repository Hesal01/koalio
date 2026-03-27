import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <a routerLink="/generate" class="logo">
        <span class="logo-icon">🐨</span>
        <span class="logo-text">Koalio</span>
      </a>
      <nav class="nav">
        <a routerLink="/generate" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">✨</span>
          Nouvelle fiche
        </a>
        <a routerLink="/history" routerLinkActive="active" class="nav-link">
          <span class="nav-icon">📋</span>
          Historique
        </a>
      </nav>
      <div class="user-menu">
        <div class="avatar">E</div>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
