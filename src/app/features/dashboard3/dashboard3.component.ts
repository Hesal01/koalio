import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard3',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sb-logo">
          <span class="sb-logo-icon">🐨</span>
          <span class="sb-logo-text">Koalio</span>
        </div>

        <nav class="sb-nav">
          <a routerLink="/dashboard3" class="sb-link active">
            <svg class="sb-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Accueil
          </a>
          <a routerLink="/generate" class="sb-link">
            <svg class="sb-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Nouvelle fiche
          </a>
          <a routerLink="/history" class="sb-link">
            <svg class="sb-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Mes fiches
          </a>
          <a class="sb-link">
            <svg class="sb-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            Badges
          </a>
          <a class="sb-link">
            <svg class="sb-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            Progression
          </a>
        </nav>

        <div class="sb-footer">
          <div class="sb-profile">
            <div class="sb-avatar">E</div>
            <div class="sb-profile-info">
              <span class="sb-name">Emma</span>
              <span class="sb-level">P2 — 2e primaire</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main -->
      <main class="main">
        <!-- Welcome row -->
        <section class="welcome-row">
          <div class="welcome-card">
            <div class="wc-bg">
              <div class="wc-blob wc-blob-1"></div>
              <div class="wc-blob wc-blob-2"></div>
            </div>
            <div class="wc-content">
              <h1>Salut Emma !</h1>
              <p>Qu'est-ce qu'on apprend aujourd'hui ?</p>
              <a routerLink="/generate" class="wc-cta">
                Créer une fiche
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
            <div class="wc-mascot">
              <div class="wc-koala">🐨</div>
              <div class="wc-sparkles">
                <span class="sp sp-1">&#10022;</span>
                <span class="sp sp-2">&#10022;</span>
                <span class="sp sp-3">&#10022;</span>
              </div>
            </div>
          </div>

          <!-- Stats column -->
          <div class="stats-col">
            <div class="stat-card sc-sheets">
              <span class="sc-icon">📝</span>
              <span class="sc-num">12</span>
              <span class="sc-label">Fiches créées</span>
            </div>
            <div class="stat-card sc-streak">
              <span class="sc-icon">🔥</span>
              <span class="sc-num">3</span>
              <span class="sc-label">Jours d'affilée</span>
            </div>
            <div class="stat-card sc-badges">
              <span class="sc-icon">⭐</span>
              <span class="sc-num">5</span>
              <span class="sc-label">Badges gagnés</span>
            </div>
          </div>
        </section>

        <!-- Two-column content -->
        <div class="content-grid">
          <!-- Left Column -->
          <div class="col-left">
            <!-- Subjects -->
            <section class="panel">
              <h2 class="panel-title">Matières</h2>
              <div class="subject-cards">
                <a routerLink="/generate" class="subj-card subj-maths">
                  <div class="subj-visual">
                    <div class="subj-icon-circle">🔢</div>
                    <div class="subj-decos">
                      <span class="sd sd-1">+</span>
                      <span class="sd sd-2">×</span>
                      <span class="sd sd-3">=</span>
                    </div>
                  </div>
                  <div class="subj-body">
                    <h3>Mathématiques</h3>
                    <p>Calcul, problèmes, géométrie</p>
                    <div class="subj-prog">
                      <div class="subj-prog-bar"><div class="subj-prog-fill" style="width:65%"></div></div>
                      <span>8 fiches</span>
                    </div>
                  </div>
                </a>
                <a routerLink="/generate" class="subj-card subj-french">
                  <div class="subj-visual">
                    <div class="subj-icon-circle">📖</div>
                    <div class="subj-decos">
                      <span class="sd sd-1">A</span>
                      <span class="sd sd-2">é</span>
                      <span class="sd sd-3">!</span>
                    </div>
                  </div>
                  <div class="subj-body">
                    <h3>Français</h3>
                    <p>Conjugaison, orthographe, grammaire</p>
                    <div class="subj-prog">
                      <div class="subj-prog-bar"><div class="subj-prog-fill" style="width:40%"></div></div>
                      <span>4 fiches</span>
                    </div>
                  </div>
                </a>
              </div>
            </section>

            <!-- Quick Actions -->
            <section class="panel">
              <h2 class="panel-title">Actions rapides</h2>
              <div class="action-row">
                <a routerLink="/generate" class="act-card act-new">
                  <span class="act-emoji">✨</span>
                  <span class="act-label">Nouvelle fiche</span>
                </a>
                <a class="act-card act-surprise">
                  <span class="act-emoji">🎲</span>
                  <span class="act-label">Fiche surprise</span>
                </a>
                <a class="act-card act-revision">
                  <span class="act-emoji">🧠</span>
                  <span class="act-label">Révision</span>
                </a>
              </div>
            </section>

            <!-- Themes -->
            <section class="panel">
              <h2 class="panel-title">Thèmes</h2>
              <div class="theme-grid">
                <button class="th-card th-dino"><span class="th-emoji">🦕</span><span class="th-name">Dinosaures</span></button>
                <button class="th-card th-pirate"><span class="th-emoji">🏴‍☠️</span><span class="th-name">Pirates</span></button>
                <button class="th-card th-space"><span class="th-emoji">🚀</span><span class="th-name">Espace</span></button>
                <button class="th-card th-nature"><span class="th-emoji">🌿</span><span class="th-name">Nature</span></button>
                <button class="th-card th-animals"><span class="th-emoji">🐾</span><span class="th-name">Animaux</span></button>
                <button class="th-card th-magic"><span class="th-emoji">🧙</span><span class="th-name">Magie</span></button>
              </div>
            </section>
          </div>

          <!-- Right Column -->
          <div class="col-right">
            <!-- Level -->
            <section class="panel">
              <h2 class="panel-title">Niveau</h2>
              <div class="lvl-grid">
                <button class="lvl lv-1"><span class="lv-n">P1</span></button>
                <button class="lvl lv-2 active"><span class="lv-n">P2</span></button>
                <button class="lvl lv-3"><span class="lv-n">P3</span></button>
                <button class="lvl lv-4"><span class="lv-n">P4</span></button>
                <button class="lvl lv-5"><span class="lv-n">P5</span></button>
                <button class="lvl lv-6"><span class="lv-n">P6</span></button>
              </div>
            </section>

            <!-- Recent -->
            <section class="panel">
              <div class="panel-header">
                <h2 class="panel-title">Fiches récentes</h2>
                <a routerLink="/history" class="panel-link">Tout voir</a>
              </div>
              <div class="recent-list">
                <a class="rec-item">
                  <div class="rec-thumb rec-maths"><span>🔢</span></div>
                  <div class="rec-info">
                    <span class="rec-title">Additions & soustractions</span>
                    <span class="rec-meta">Maths · Dinosaures · Hier</span>
                  </div>
                </a>
                <a class="rec-item">
                  <div class="rec-thumb rec-french"><span>📖</span></div>
                  <div class="rec-info">
                    <span class="rec-title">Conjugaison — présent</span>
                    <span class="rec-meta">Français · Pirates · Il y a 2j</span>
                  </div>
                </a>
                <a class="rec-item">
                  <div class="rec-thumb rec-maths"><span>🧩</span></div>
                  <div class="rec-info">
                    <span class="rec-title">Problèmes de calcul</span>
                    <span class="rec-meta">Maths · Espace · Il y a 3j</span>
                  </div>
                </a>
              </div>
            </section>

            <!-- Badges -->
            <section class="panel">
              <h2 class="panel-title">Badges</h2>
              <div class="bdg-grid">
                <div class="bdg earned"><span class="bdg-i">⭐</span><span class="bdg-l">Première fiche</span></div>
                <div class="bdg earned"><span class="bdg-i">🔥</span><span class="bdg-l">3 jours !</span></div>
                <div class="bdg earned"><span class="bdg-i">🧮</span><span class="bdg-l">Roi du calcul</span></div>
                <div class="bdg earned"><span class="bdg-i">📐</span><span class="bdg-l">5 maths</span></div>
                <div class="bdg earned"><span class="bdg-i">✍️</span><span class="bdg-l">Conjugaison</span></div>
                <div class="bdg locked"><span class="bdg-i">🏅</span><span class="bdg-l">10 fiches</span></div>
                <div class="bdg locked"><span class="bdg-i">🌟</span><span class="bdg-l">7 jours</span></div>
                <div class="bdg locked"><span class="bdg-i">🎯</span><span class="bdg-l">Sans erreur</span></div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  `,
  styleUrl: './dashboard3.component.scss',
})
export class Dashboard3Component {}
