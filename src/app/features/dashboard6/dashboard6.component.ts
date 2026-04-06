import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard6',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="playground-layout">
      <!-- Sky / Header -->
      <header class="sky-header">
        <div class="clouds">
          <div class="cloud c1"></div>
          <div class="cloud c2"></div>
          <div class="cloud c3"></div>
        </div>
        <div class="header-content">
          <div class="avatar-frame">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=ffd5dc" alt="Emma" />
            <div class="xp-ring">
              <svg viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#fff3" stroke-width="3"/>
                <circle cx="20" cy="20" r="18" fill="none" stroke="#FFD700" stroke-width="3" stroke-dasharray="85 113" stroke-linecap="round" transform="rotate(-90 20 20)"/>
              </svg>
            </div>
            <span class="level-badge">12</span>
          </div>
          <div class="header-text">
            <h1>Salut Emma !</h1>
            <p>Explore ton monde d'apprentissage</p>
          </div>
          <div class="coins-display">
            <span class="coin">🪙</span>
            <span class="count">248</span>
          </div>
        </div>
      </header>

      <!-- World Map -->
      <section class="world-map">
        <div class="map-scroll">
          <!-- Island 1 - Maths -->
          <a routerLink="/generate" class="island island-maths">
            <div class="island-ground"></div>
            <div class="island-content">
              <div class="island-emoji">🏝️</div>
              <div class="island-building">🔢</div>
              <div class="island-flag">📐</div>
            </div>
            <span class="island-name">Île des Nombres</span>
            <div class="island-progress">
              <div class="prog-bar"><div class="prog-fill" style="width: 72%"></div></div>
              <span>72%</span>
            </div>
            <div class="ripple"></div>
          </a>

          <!-- Island 2 - Français -->
          <a routerLink="/generate" class="island island-french">
            <div class="island-ground"></div>
            <div class="island-content">
              <div class="island-emoji">🏔️</div>
              <div class="island-building">📖</div>
              <div class="island-flag">✏️</div>
            </div>
            <span class="island-name">Mont des Mots</span>
            <div class="island-progress">
              <div class="prog-bar"><div class="prog-fill" style="width: 45%"></div></div>
              <span>45%</span>
            </div>
          </a>

          <!-- Island 3 - Sciences (locked) -->
          <div class="island island-locked">
            <div class="island-ground"></div>
            <div class="island-content">
              <div class="island-emoji">🌋</div>
              <div class="island-building">🔬</div>
              <div class="lock-overlay">🔒</div>
            </div>
            <span class="island-name">Volcan Curieux</span>
            <div class="island-tag">Bientôt !</div>
          </div>

          <!-- Boat between islands -->
          <div class="boat">⛵</div>
        </div>
      </section>

      <!-- Daily Quest Banner -->
      <section class="daily-quest">
        <div class="quest-glow"></div>
        <div class="quest-left">
          <div class="quest-badge">⚡ QUÊTE DU JOUR</div>
          <h2>Résous 5 additions</h2>
          <p>Récompense : 50 🪙 + badge 🌟</p>
        </div>
        <a routerLink="/generate" class="quest-go">
          <span>GO !</span>
        </a>
      </section>

      <!-- Inventory / Badges -->
      <section class="inventory">
        <div class="section-title">
          <h2>Ton inventaire</h2>
          <span class="badge-count">6 / 20</span>
        </div>
        <div class="badge-scroll">
          <div class="badge-item earned">
            <span class="badge-emoji">🌟</span>
            <span class="badge-label">Premier pas</span>
          </div>
          <div class="badge-item earned">
            <span class="badge-emoji">🔥</span>
            <span class="badge-label">3 jours</span>
          </div>
          <div class="badge-item earned">
            <span class="badge-emoji">🧮</span>
            <span class="badge-label">Calculateur</span>
          </div>
          <div class="badge-item earned">
            <span class="badge-emoji">📚</span>
            <span class="badge-label">Lecteur</span>
          </div>
          <div class="badge-item locked">
            <span class="badge-emoji">🏆</span>
            <span class="badge-label">Champion</span>
          </div>
          <div class="badge-item locked">
            <span class="badge-emoji">💎</span>
            <span class="badge-label">Diamant</span>
          </div>
        </div>
      </section>

      <!-- Bottom Nav -->
      <nav class="game-nav">
        <a routerLink="/dashboard6" class="nav-btn active">
          <span class="nav-icon">🗺️</span>
          <span class="nav-label">Monde</span>
        </a>
        <a routerLink="/history" class="nav-btn">
          <span class="nav-icon">📋</span>
          <span class="nav-label">Fiches</span>
        </a>
        <a routerLink="/generate" class="nav-btn center-btn">
          <div class="center-icon">
            <span>🚀</span>
          </div>
        </a>
        <a class="nav-btn">
          <span class="nav-icon">🎒</span>
          <span class="nav-label">Sac</span>
        </a>
        <a class="nav-btn">
          <span class="nav-icon">⚙️</span>
          <span class="nav-label">Réglages</span>
        </a>
      </nav>
    </div>
  `,
  styleUrl: './dashboard6.component.scss',
})
export class Dashboard6Component {}
