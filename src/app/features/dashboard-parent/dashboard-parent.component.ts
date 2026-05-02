import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-parent',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="layout">
      <header class="topbar">
        <span class="brand">Koalio</span>
        <span class="account">Jawad</span>
      </header>

      <main class="main">
        <section class="hero">
          <p class="eyebrow">Lundi 5 mai</p>
          <h1>Bonjour Jawad</h1>
          <p class="sub">Voici l'activité de <strong>Léa</strong>, P3.</p>
        </section>

        <section class="stats">
          <div class="stat">
            <span class="stat-num">12</span>
            <span class="stat-label">Fiches ce mois</span>
          </div>
          <div class="stat">
            <span class="stat-num">78%</span>
            <span class="stat-label">Réussite</span>
          </div>
          <div class="stat">
            <span class="stat-num">4 j</span>
            <span class="stat-label">Série active</span>
          </div>
        </section>

        <a routerLink="/generate" class="cta">Créer une fiche pour Léa</a>
      </main>
    </div>
  `,
  styleUrl: './dashboard-parent.component.scss',
})
export class DashboardParentComponent {}
