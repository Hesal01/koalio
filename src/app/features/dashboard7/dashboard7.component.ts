import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard7',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="glass-layout">
      <!-- Decorative Blobs -->
      <div class="bg-blobs">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
      </div>

      <!-- Header -->
      <header class="glass-header">
        <div class="header-left">
          <p class="date-label">Dimanche, 6 avril</p>
          <h1>Bonjour Emma</h1>
        </div>
        <div class="header-right">
          <div class="streak-chip">
            <span class="fire">🔥</span>
            <span>3j</span>
          </div>
          <div class="avatar-glass">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=c0aede" alt="Emma" />
          </div>
        </div>
      </header>

      <!-- Main CTA -->
      <a routerLink="/generate" class="glass-cta">
        <div class="cta-inner">
          <div class="cta-text">
            <span class="cta-eyebrow">FICHE DU JOUR</span>
            <h2>Les fractions<br/>avec les pirates 🏴‍☠️</h2>
            <span class="cta-sub">Maths · P2 · ~10 min</span>
          </div>
          <div class="cta-arrow">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
        <div class="shimmer"></div>
      </a>

      <!-- Quick Actions -->
      <section class="quick-actions">
        <a routerLink="/generate" class="action-chip">
          <span class="chip-icon">🎲</span>
          <span>Fiche surprise</span>
        </a>
        <a routerLink="/generate" class="action-chip">
          <span class="chip-icon">📝</span>
          <span>Révision</span>
        </a>
        <a routerLink="/history" class="action-chip">
          <span class="chip-icon">📂</span>
          <span>Historique</span>
        </a>
      </section>

      <!-- Stats Row -->
      <section class="stats-row">
        <div class="glass-stat">
          <div class="stat-header">
            <span class="stat-emoji">📊</span>
            <span class="stat-trend up">+12%</span>
          </div>
          <div class="stat-number">24</div>
          <div class="stat-desc">Fiches terminées</div>
        </div>
        <div class="glass-stat">
          <div class="stat-header">
            <span class="stat-emoji">🎯</span>
            <span class="stat-trend up">+5%</span>
          </div>
          <div class="stat-number">82%</div>
          <div class="stat-desc">Taux de réussite</div>
        </div>
      </section>

      <!-- Subjects -->
      <section class="subjects-section">
        <div class="section-head">
          <h2>Matières</h2>
          <button class="link-btn">Tout voir</button>
        </div>
        <div class="subject-cards">
          <a routerLink="/generate" class="subject-glass">
            <div class="subj-top">
              <span class="subj-emoji">➗</span>
              <div class="mini-chart">
                <div class="chart-bar" style="height: 30%"></div>
                <div class="chart-bar" style="height: 60%"></div>
                <div class="chart-bar" style="height: 45%"></div>
                <div class="chart-bar active" style="height: 80%"></div>
              </div>
            </div>
            <h3>Maths</h3>
            <p>8 fiches cette semaine</p>
          </a>
          <a routerLink="/generate" class="subject-glass">
            <div class="subj-top">
              <span class="subj-emoji">📖</span>
              <div class="mini-chart">
                <div class="chart-bar" style="height: 50%"></div>
                <div class="chart-bar" style="height: 30%"></div>
                <div class="chart-bar" style="height: 70%"></div>
                <div class="chart-bar active" style="height: 55%"></div>
              </div>
            </div>
            <h3>Français</h3>
            <p>4 fiches cette semaine</p>
          </a>
        </div>
      </section>

      <!-- Recent Activity -->
      <section class="recent-section">
        <div class="section-head">
          <h2>Récent</h2>
        </div>
        <div class="recent-list">
          <div class="recent-glass-item">
            <div class="recent-icon">🦕</div>
            <div class="recent-info">
              <h4>Additions — Dinos</h4>
              <span>Maths · Hier · 9/10</span>
            </div>
            <div class="score-badge good">90%</div>
          </div>
          <div class="recent-glass-item">
            <div class="recent-icon">🏴‍☠️</div>
            <div class="recent-info">
              <h4>Conjugaison — Pirates</h4>
              <span>Français · Il y a 2 jours · 7/10</span>
            </div>
            <div class="score-badge ok">70%</div>
          </div>
        </div>
      </section>

      <!-- Bottom Nav -->
      <nav class="glass-bottom-nav">
        <a routerLink="/dashboard7" class="g-nav active">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Accueil</span>
        </a>
        <a routerLink="/history" class="g-nav">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <span>Fiches</span>
        </a>
        <a routerLink="/generate" class="g-nav fab-nav">
          <div class="fab-glass">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
        </a>
        <a class="g-nav">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          <span>Stats</span>
        </a>
        <a class="g-nav">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          <span>Réglages</span>
        </a>
      </nav>
    </div>
  `,
  styleUrl: './dashboard7.component.scss',
})
export class Dashboard7Component {}
