import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard8',
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
          <a routerLink="/dashboard8" class="sb-link active">
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
        <!-- Welcome Hero -->
        <section class="welcome-row">
          <div class="welcome-card">
            <div class="wc-deco">
              <div class="wc-circle wc-c1"></div>
              <div class="wc-circle wc-c2"></div>
              <div class="wc-leaf wc-leaf1">🌿</div>
              <div class="wc-leaf wc-leaf2">🍃</div>
            </div>
            <div class="wc-content">
              <span class="wc-badge">✨ Bienvenue</span>
              <h1>Salut Emma !</h1>
              <p>Prête à explorer et apprendre en t'amusant ?</p>
              <a routerLink="/generate" class="wc-cta">
                Créer une fiche
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
            <div class="wc-mascot">
              <div class="wc-koala">🐨</div>
              <div class="wc-books">📚</div>
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
            <!-- Categories (Story/Video/Music style) -->
            <section class="panel">
              <h2 class="panel-title">Matières</h2>
              <div class="category-row">
                <a routerLink="/generate" class="cat-card cat-maths">
                  <div class="cat-icon-wrap">
                    <span class="cat-icon">🔢</span>
                  </div>
                  <span class="cat-name">Maths</span>
                </a>
                <a routerLink="/generate" class="cat-card cat-french">
                  <div class="cat-icon-wrap">
                    <span class="cat-icon">📖</span>
                  </div>
                  <span class="cat-name">Français</span>
                </a>
                <a routerLink="/generate" class="cat-card cat-science">
                  <div class="cat-icon-wrap">
                    <span class="cat-icon">🔬</span>
                  </div>
                  <span class="cat-name">Éveil</span>
                </a>
              </div>
            </section>

            <!-- Subject detail cards -->
            <section class="panel">
              <div class="panel-header">
                <h2 class="panel-title">Parcours</h2>
                <a routerLink="/generate" class="panel-link">Voir plus</a>
              </div>
              <div class="subject-cards">
                <a routerLink="/generate" class="subj-card subj-maths">
                  <div class="subj-hero">
                    <div class="subj-hero-bg"></div>
                    <div class="subj-hero-content">
                      <span class="subj-emoji">🧮</span>
                      <div>
                        <h3>Calcul & Nombres</h3>
                        <p>Additions, soustractions, tables</p>
                      </div>
                    </div>
                  </div>
                  <div class="subj-footer">
                    <div class="subj-prog">
                      <div class="subj-prog-bar"><div class="subj-prog-fill" style="width:65%"></div></div>
                    </div>
                    <span class="subj-count">8 fiches</span>
                  </div>
                </a>
                <a routerLink="/generate" class="subj-card subj-french">
                  <div class="subj-hero">
                    <div class="subj-hero-bg"></div>
                    <div class="subj-hero-content">
                      <span class="subj-emoji">✏️</span>
                      <div>
                        <h3>Conjugaison</h3>
                        <p>Présent, passé, futur</p>
                      </div>
                    </div>
                  </div>
                  <div class="subj-footer">
                    <div class="subj-prog">
                      <div class="subj-prog-bar"><div class="subj-prog-fill" style="width:40%"></div></div>
                    </div>
                    <span class="subj-count">4 fiches</span>
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
                <button class="th-card"><span class="th-emoji">🦕</span><span class="th-name">Dinosaures</span></button>
                <button class="th-card"><span class="th-emoji">🏴‍☠️</span><span class="th-name">Pirates</span></button>
                <button class="th-card"><span class="th-emoji">🚀</span><span class="th-name">Espace</span></button>
                <button class="th-card"><span class="th-emoji">🌿</span><span class="th-name">Nature</span></button>
                <button class="th-card"><span class="th-emoji">🐾</span><span class="th-name">Animaux</span></button>
                <button class="th-card"><span class="th-emoji">🧙</span><span class="th-name">Magie</span></button>
              </div>
            </section>
          </div>

          <!-- Right Column -->
          <div class="col-right">
            <!-- Level -->
            <section class="panel">
              <h2 class="panel-title">Niveau</h2>
              <div class="lvl-grid">
                <button class="lvl"><span class="lv-n">P1</span></button>
                <button class="lvl active"><span class="lv-n">P2</span></button>
                <button class="lvl"><span class="lv-n">P3</span></button>
                <button class="lvl"><span class="lv-n">P4</span></button>
                <button class="lvl"><span class="lv-n">P5</span></button>
                <button class="lvl"><span class="lv-n">P6</span></button>
              </div>
            </section>

            <!-- Recommandé -->
            <section class="panel">
              <div class="panel-header">
                <h2 class="panel-title">Recommandé</h2>
                <a class="panel-link">Plus</a>
              </div>
              <div class="reco-list">
                <a routerLink="/generate" class="reco-item">
                  <div class="reco-thumb">🦕</div>
                  <div class="reco-info">
                    <span class="reco-title">Additions & Dinos</span>
                    <span class="reco-meta">30 élèves ont participé</span>
                  </div>
                  <button class="reco-btn">Jouer</button>
                </a>
                <a routerLink="/generate" class="reco-item">
                  <div class="reco-thumb">🏴‍☠️</div>
                  <div class="reco-info">
                    <span class="reco-title">Conjugaison Pirates</span>
                    <span class="reco-meta">18 élèves ont participé</span>
                  </div>
                  <button class="reco-btn">Jouer</button>
                </a>
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
                  <div class="rec-thumb"><span>🔢</span></div>
                  <div class="rec-info">
                    <span class="rec-title">Additions & soustractions</span>
                    <span class="rec-meta">Maths · Dinosaures · Hier</span>
                  </div>
                </a>
                <a class="rec-item">
                  <div class="rec-thumb"><span>📖</span></div>
                  <div class="rec-info">
                    <span class="rec-title">Conjugaison — présent</span>
                    <span class="rec-meta">Français · Pirates · Il y a 2j</span>
                  </div>
                </a>
                <a class="rec-item">
                  <div class="rec-thumb"><span>🧩</span></div>
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
  styleUrl: './dashboard8.component.scss',
})
export class Dashboard8Component {}
