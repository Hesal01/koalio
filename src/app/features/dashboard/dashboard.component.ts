import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="dash">
      <!-- Hero Welcome -->
      <section class="hero-welcome">
        <div class="hero-bg">
          <div class="hero-blob blob-1"></div>
          <div class="hero-blob blob-2"></div>
          <div class="hero-blob blob-3"></div>
        </div>
        <div class="hero-inner">
          <div class="hero-left">
            <div class="greeting-badge">
              <span class="badge-dot"></span>
              P2 — 2e primaire
            </div>
            <h1>Salut Emma !</h1>
            <p class="hero-sub">Qu'est-ce qu'on apprend aujourd'hui ?</p>
            <a routerLink="/generate" class="hero-cta">
              <span>Nouvelle fiche</span>
              <span class="cta-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </a>
          </div>
          <div class="hero-right">
            <div class="mascot-card">
              <div class="mascot-scene">
                <div class="mascot-koala">🐨</div>
                <div class="mascot-books">
                  <div class="book book-1"></div>
                  <div class="book book-2"></div>
                  <div class="book book-3"></div>
                </div>
                <div class="mascot-stars">
                  <span class="star s1">&#10022;</span>
                  <span class="star s2">&#10022;</span>
                  <span class="star s3">&#10022;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Stats strip -->
        <div class="stats-strip">
          <div class="stat-bubble">
            <span class="stat-icon">📝</span>
            <div class="stat-text">
              <span class="stat-num">12</span>
              <span class="stat-lab">fiches</span>
            </div>
          </div>
          <div class="stat-bubble">
            <span class="stat-icon">🔥</span>
            <div class="stat-text">
              <span class="stat-num">3</span>
              <span class="stat-lab">jours d'affilée</span>
            </div>
          </div>
          <div class="stat-bubble">
            <span class="stat-icon">⭐</span>
            <div class="stat-text">
              <span class="stat-num">5</span>
              <span class="stat-lab">badges</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Cards -->
      <section class="section">
        <div class="quick-row">
          <a routerLink="/generate" class="quick-card qc-new">
            <div class="qc-illustration">
              <span class="qc-emoji">✨</span>
            </div>
            <div class="qc-body">
              <h3>Nouvelle fiche</h3>
              <p>Choisis ta matière et ton thème</p>
            </div>
          </a>
          <a class="quick-card qc-surprise">
            <div class="qc-illustration">
              <span class="qc-emoji">🎲</span>
            </div>
            <div class="qc-body">
              <h3>Fiche surprise</h3>
              <p>Exercice aléatoire du jour !</p>
            </div>
          </a>
          <a class="quick-card qc-revision">
            <div class="qc-illustration">
              <span class="qc-emoji">🧠</span>
            </div>
            <div class="qc-body">
              <h3>Mode révision</h3>
              <p>Prépare ton contrôle</p>
            </div>
          </a>
        </div>
      </section>

      <!-- Subjects -->
      <section class="section">
        <h2 class="section-title">Choisis ta matière</h2>
        <div class="subject-row">
          <a routerLink="/generate" class="subject-card sc-maths">
            <div class="sc-visual">
              <div class="sc-icon-bg">
                <span>🔢</span>
              </div>
              <div class="sc-deco sc-deco-1">+</div>
              <div class="sc-deco sc-deco-2">÷</div>
              <div class="sc-deco sc-deco-3">=</div>
            </div>
            <div class="sc-info">
              <h3>Maths</h3>
              <p>Calcul, problèmes, géométrie</p>
              <div class="sc-progress">
                <div class="sc-progress-bar"><div class="sc-progress-fill" style="width:65%"></div></div>
                <span>8 fiches</span>
              </div>
            </div>
          </a>
          <a routerLink="/generate" class="subject-card sc-french">
            <div class="sc-visual">
              <div class="sc-icon-bg">
                <span>📖</span>
              </div>
              <div class="sc-deco sc-deco-1">A</div>
              <div class="sc-deco sc-deco-2">é</div>
              <div class="sc-deco sc-deco-3">!</div>
            </div>
            <div class="sc-info">
              <h3>Français</h3>
              <p>Conjugaison, orthographe, grammaire</p>
              <div class="sc-progress">
                <div class="sc-progress-bar"><div class="sc-progress-fill" style="width:40%"></div></div>
                <span>4 fiches</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      <!-- Level Picker -->
      <section class="section">
        <h2 class="section-title">Ton niveau</h2>
        <div class="level-row">
          <button class="level-pill lp-1"><span class="lp-num">P1</span><span class="lp-label">1re</span></button>
          <button class="level-pill lp-2 active"><span class="lp-num">P2</span><span class="lp-label">2e</span></button>
          <button class="level-pill lp-3"><span class="lp-num">P3</span><span class="lp-label">3e</span></button>
          <button class="level-pill lp-4"><span class="lp-num">P4</span><span class="lp-label">4e</span></button>
          <button class="level-pill lp-5"><span class="lp-num">P5</span><span class="lp-label">5e</span></button>
          <button class="level-pill lp-6"><span class="lp-num">P6</span><span class="lp-label">6e</span></button>
        </div>
      </section>

      <!-- Themes -->
      <section class="section">
        <h2 class="section-title">Thèmes populaires</h2>
        <div class="theme-row">
          <button class="theme-card tc-dino">
            <span class="tc-emoji">🦕</span>
            <span class="tc-name">Dinosaures</span>
          </button>
          <button class="theme-card tc-pirate">
            <span class="tc-emoji">🏴‍☠️</span>
            <span class="tc-name">Pirates</span>
          </button>
          <button class="theme-card tc-space">
            <span class="tc-emoji">🚀</span>
            <span class="tc-name">Espace</span>
          </button>
          <button class="theme-card tc-nature">
            <span class="tc-emoji">🌿</span>
            <span class="tc-name">Nature</span>
          </button>
          <button class="theme-card tc-animals">
            <span class="tc-emoji">🐾</span>
            <span class="tc-name">Animaux</span>
          </button>
          <button class="theme-card tc-magic">
            <span class="tc-emoji">🧙</span>
            <span class="tc-name">Magie</span>
          </button>
        </div>
      </section>

      <!-- Recent -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Fiches récentes</h2>
          <a routerLink="/history" class="link-more">Voir tout</a>
        </div>
        <div class="recent-list">
          <a class="recent-item">
            <div class="ri-thumb ri-maths">
              <span>🔢</span>
            </div>
            <div class="ri-content">
              <span class="ri-title">Additions & soustractions</span>
              <span class="ri-meta">Maths · Dinosaures · Hier</span>
            </div>
            <div class="ri-badge">PDF</div>
          </a>
          <a class="recent-item">
            <div class="ri-thumb ri-french">
              <span>📖</span>
            </div>
            <div class="ri-content">
              <span class="ri-title">Conjugaison — présent</span>
              <span class="ri-meta">Français · Pirates · Il y a 2j</span>
            </div>
            <div class="ri-badge">PDF</div>
          </a>
          <a class="recent-item">
            <div class="ri-thumb ri-maths">
              <span>🧩</span>
            </div>
            <div class="ri-content">
              <span class="ri-title">Problèmes de calcul</span>
              <span class="ri-meta">Maths · Espace · Il y a 3j</span>
            </div>
            <div class="ri-badge">PDF</div>
          </a>
        </div>
      </section>

      <!-- Badges -->
      <section class="section">
        <h2 class="section-title">Tes badges</h2>
        <div class="badge-row">
          <div class="badge-circle earned">
            <span class="bc-icon">⭐</span>
            <span class="bc-label">Première fiche</span>
          </div>
          <div class="badge-circle earned">
            <span class="bc-icon">🔥</span>
            <span class="bc-label">3 jours !</span>
          </div>
          <div class="badge-circle earned">
            <span class="bc-icon">🧮</span>
            <span class="bc-label">Roi du calcul</span>
          </div>
          <div class="badge-circle earned">
            <span class="bc-icon">📐</span>
            <span class="bc-label">5 fiches maths</span>
          </div>
          <div class="badge-circle earned">
            <span class="bc-icon">✍️</span>
            <span class="bc-label">Conjugaison</span>
          </div>
          <div class="badge-circle locked">
            <span class="bc-icon">🏅</span>
            <span class="bc-label">10 fiches</span>
          </div>
          <div class="badge-circle locked">
            <span class="bc-icon">🌟</span>
            <span class="bc-label">7 jours</span>
          </div>
          <div class="badge-circle locked">
            <span class="bc-icon">🎯</span>
            <span class="bc-label">Sans erreur</span>
          </div>
        </div>
      </section>

      <!-- Bottom Nav (mobile-first, like the inspo apps) -->
      <nav class="bottom-nav">
        <a routerLink="/dashboard" class="bn-item active">
          <span class="bn-icon">🏠</span>
          <span class="bn-label">Accueil</span>
        </a>
        <a routerLink="/generate" class="bn-item">
          <span class="bn-icon">✨</span>
          <span class="bn-label">Créer</span>
        </a>
        <a routerLink="/history" class="bn-item">
          <span class="bn-icon">📋</span>
          <span class="bn-label">Fiches</span>
        </a>
        <a class="bn-item">
          <span class="bn-icon">🏆</span>
          <span class="bn-label">Badges</span>
        </a>
        <a class="bn-item">
          <span class="bn-icon">👤</span>
          <span class="bn-label">Profil</span>
        </a>
      </nav>
    </div>
  `,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
