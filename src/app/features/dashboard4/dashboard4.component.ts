import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard4',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="adventure-layout">
      <!-- Header -->
      <header class="top-nav">
        <div class="user-pill">
          <div class="avatar">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=ffdfbf" alt="Emma" />
          </div>
          <div class="user-info">
            <span class="name">Emma</span>
            <span class="level">Niveau P2</span>
          </div>
        </div>
        <div class="nav-actions">
          <div class="currency-pill">
            <span class="star-icon">⭐</span>
            <span class="amount">124</span>
          </div>
          <button class="menu-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </button>
        </div>
      </header>

      <!-- Main Quest Hero -->
      <section class="quest-hero">
        <div class="quest-content">
          <div class="badge-new">QUÊTE DU JOUR</div>
          <h1>Prête pour l'aventure ?</h1>
          <p>Découvre les fractions avec les pirates !</p>
          <a routerLink="/generate" class="play-btn">
            <span class="play-icon">▶</span>
            Jouer maintenant
          </a>
        </div>
        <div class="quest-illustration">
          <div class="floating-island">
            <span class="emoji pirate">🏴‍☠️</span>
            <span class="emoji chest">💎</span>
            <span class="emoji math">➗</span>
          </div>
        </div>
      </section>

      <!-- Path / Subjects -->
      <section class="learning-path">
        <h2>Ton parcours d'exploration</h2>
        <div class="path-scroller">
          <a routerLink="/generate" class="path-node current">
            <div class="node-icon math-bg">🔢</div>
            <span class="node-label">Maths</span>
            <div class="pulse"></div>
          </a>
          <div class="path-line active"></div>
          <a routerLink="/generate" class="path-node">
            <div class="node-icon french-bg">📖</div>
            <span class="node-label">Français</span>
          </a>
          <div class="path-line"></div>
          <a routerLink="/generate" class="path-node locked">
            <div class="node-icon locked-bg">🔒</div>
            <span class="node-label">Sciences</span>
          </a>
          <div class="path-line"></div>
          <a routerLink="/generate" class="path-node locked">
            <div class="node-icon locked-bg">🔒</div>
            <span class="node-label">Histoire</span>
          </a>
        </div>
      </section>

      <!-- Companions (Themes) -->
      <section class="companions">
        <div class="section-header">
          <h2>Choisis ton compagnon</h2>
          <button class="see-all">Tout voir</button>
        </div>
        <div class="companion-grid">
          <div class="companion-card">
            <div class="comp-bg bg-dino">🦕</div>
            <span class="comp-name">Dino</span>
          </div>
          <div class="companion-card active">
            <div class="comp-bg bg-space">🚀</div>
            <span class="comp-name">Cosmo</span>
            <div class="active-badge">✓</div>
          </div>
          <div class="companion-card">
            <div class="comp-bg bg-magic">🧙</div>
            <span class="comp-name">Merlin</span>
          </div>
          <div class="companion-card">
            <div class="comp-bg bg-nature">🌿</div>
            <span class="comp-name">Flora</span>
          </div>
        </div>
      </section>

      <!-- Bottom Nav -->
      <nav class="bottom-tab-nav">
        <a routerLink="/dashboard4" class="tab active">
          <span class="icon">🗺️</span>
          <span class="label">Carte</span>
        </a>
        <a routerLink="/history" class="tab">
          <span class="icon">📜</span>
          <span class="label">Fiches</span>
        </a>
        <a routerLink="/generate" class="tab fab">
          <span class="fab-icon">➕</span>
        </a>
        <a class="tab">
          <span class="icon">🏆</span>
          <span class="label">Trophées</span>
        </a>
        <a class="tab">
          <span class="icon">👤</span>
          <span class="label">Profil</span>
        </a>
      </nav>
    </div>
  `,
  styleUrl: './dashboard4.component.scss',
})
export class Dashboard4Component {}
