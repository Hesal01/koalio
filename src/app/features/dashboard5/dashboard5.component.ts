import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard5',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bento-layout">
      <!-- Header -->
      <header class="header">
        <div>
          <h1 class="greeting">Bonjour, Emma ! 👋</h1>
          <p class="subtitle">Prête à apprendre en t'amusant ?</p>
        </div>
        <div class="profile-pic">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=e2e8f0" alt="Emma" />
        </div>
      </header>

      <!-- Bento Grid -->
      <main class="bento-grid">
        
        <!-- Large Action Card -->
        <a routerLink="/generate" class="bento-card hero-card">
          <div class="card-bg blob-bg"></div>
          <div class="card-content">
            <span class="pill-tag">À TOI DE JOUER</span>
            <h2>Créer une <br/>nouvelle fiche</h2>
            <div class="circle-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
          <img class="hero-img" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Star-Struck.png" alt="Star" />
        </a>

        <!-- Stats Mini Cards -->
        <div class="bento-card stat-card blue">
          <div class="stat-icon">🔥</div>
          <div class="stat-value">3</div>
          <div class="stat-label">Jours d'affilée</div>
        </div>

        <div class="bento-card stat-card purple">
          <div class="stat-icon">⭐</div>
          <div class="stat-value">12</div>
          <div class="stat-label">Badges gagnés</div>
        </div>

        <!-- Subjects Card -->
        <div class="bento-card wide-card subjects-card">
          <div class="card-header">
            <h3>Tes matières</h3>
            <span class="more-icon">⋯</span>
          </div>
          <div class="subjects-list">
            <div class="subj-item">
              <div class="subj-icon math">➗</div>
              <div class="subj-info">
                <span class="subj-name">Mathématiques</span>
                <span class="subj-prog">8 fiches terminées</span>
              </div>
              <div class="progress-ring">
                <svg viewBox="0 0 36 36">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle" stroke-dasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span class="pct">75%</span>
              </div>
            </div>
            <div class="subj-item">
              <div class="subj-icon french">📝</div>
              <div class="subj-info">
                <span class="subj-name">Français</span>
                <span class="subj-prog">4 fiches terminées</span>
              </div>
              <div class="progress-ring">
                <svg viewBox="0 0 36 36">
                  <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="circle" stroke-dasharray="40, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span class="pct">40%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Sheets -->
        <div class="bento-card recent-card">
          <div class="card-header">
            <h3>Fiche récente</h3>
          </div>
          <div class="recent-content">
            <div class="recent-icon">🦕</div>
            <div class="recent-text">
              <h4>Additions & Dinos</h4>
              <p>Maths · Hier</p>
            </div>
            <button class="dl-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </button>
          </div>
        </div>

        <!-- Surprise Me -->
        <a class="bento-card surprise-card">
          <div class="surprise-content">
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png" alt="Party" />
            <h3>Fiche Surprise</h3>
          </div>
        </a>

      </main>

      <!-- Bottom Nav -->
      <nav class="ios-bottom-nav">
        <a routerLink="/dashboard5" class="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Accueil</span>
        </a>
        <a routerLink="/history" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>Fiches</span>
        </a>
        <a routerLink="/generate" class="nav-item create-btn">
          <div class="plus-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
        </a>
        <a class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
          <span>Badges</span>
        </a>
        <a class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Profil</span>
        </a>
      </nav>
    </div>
  `,
  styleUrl: './dashboard5.component.scss',
})
export class Dashboard5Component {}
