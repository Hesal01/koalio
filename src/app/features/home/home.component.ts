import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Navbar -->
    <nav class="navbar">
      <a routerLink="/home" class="nav-logo">
        <span class="nav-logo-icon">🐨</span>
        <span class="nav-logo-text">Koalio</span>
      </a>
      <div class="nav-links">
        <a routerLink="/home" fragment="features">Fonctionnalités</a>
        <a routerLink="/home" fragment="how">Comment ça marche</a>
        <a routerLink="/home" fragment="pricing">Tarifs</a>
      </div>
      <a routerLink="/login" class="nav-cta">Se connecter</a>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">🇧🇪 Aligné sur le programme belge P1–P6</div>
        <h1>Des exercices <span class="highlight">personnalisés</span> pour votre enfant</h1>
        <p class="hero-sub">
          Koalio génère des fiches d'exercices en maths et français,
          adaptées au niveau de votre enfant — avec son prénom dans les énoncés.
          Prêtes à imprimer en PDF.
        </p>
        <div class="hero-actions">
          <a routerLink="/login" class="btn btn-primary btn-lg">Essayer gratuitement</a>
          <a routerLink="/home" fragment="how" class="btn btn-secondary btn-lg">Voir comment ça marche</a>
        </div>
        <p class="hero-note">3 fiches gratuites par mois — aucune carte requise</p>
      </div>
      <div class="hero-visual">
        <div class="hero-sheet">
          <div class="sheet-mini-header">
            <span class="mini-logo">🐨 Koalio</span>
            <span class="mini-title">Fiche d'Emma</span>
          </div>
          <div class="sheet-mini-divider"></div>
          <div class="sheet-mini-exercise">
            <span class="mini-ex-num">Exercice 1</span>
            <span class="mini-ex-title">Calcule les additions.</span>
          </div>
          <div class="sheet-mini-questions">
            <div class="mini-q">1. 24 + 13 = <span class="mini-blank">______</span></div>
            <div class="mini-q">2. 56 + 32 = <span class="mini-blank">______</span></div>
            <div class="mini-q">3. Emma a 12 billes, on lui en donne 8. <span class="mini-blank">______</span></div>
          </div>
          <div class="sheet-mini-exercise">
            <span class="mini-ex-num">Exercice 2</span>
            <span class="mini-ex-title">Complète les additions à trous.</span>
          </div>
          <div class="sheet-mini-questions">
            <div class="mini-q">1. ___ + 15 = 42 <span class="mini-blank">______</span></div>
            <div class="mini-q">2. 63 + ___ = 91 <span class="mini-blank">______</span></div>
          </div>
          <div class="sheet-mini-footer">
            <span>koalio.be</span>
            <span>PDF</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features" id="features">
      <div class="section-container">
        <h2 class="section-title">Pourquoi les parents adorent Koalio</h2>
        <p class="section-sub">Tout ce qu'il faut pour aider votre enfant à progresser</p>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3>Programme belge</h3>
            <p>Exercices alignés sur le tronc commun de la Fédération Wallonie-Bruxelles, de P1 à P6.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👤</div>
            <h3>Personnalisé</h3>
            <p>Le prénom de votre enfant apparaît dans les énoncés. C'est SA fiche, pas une fiche générique.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🤖</div>
            <h3>Généré par l'IA</h3>
            <p>Chaque fiche est unique. Des exercices variés et progressifs, jamais deux fois les mêmes.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🖨️</div>
            <h3>PDF imprimable</h3>
            <p>Format A4 propre et soigné. Téléchargez, imprimez, c'est prêt. Corrigé inclus.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📐</div>
            <h3>Maths & Français</h3>
            <p>Additions, soustractions, multiplications, problèmes, conjugaison, orthographe, grammaire.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📈</div>
            <h3>Difficulté progressive</h3>
            <p>Chaque fiche commence facile et monte en difficulté. L'enfant progresse à son rythme.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="how" id="how">
      <div class="section-container">
        <h2 class="section-title">En 3 clics, c'est prêt</h2>
        <p class="section-sub">Moins d'une minute entre l'idée et la fiche imprimée</p>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Choisissez</h3>
              <p>Le prénom, le niveau (P1–P6), la matière et le thème.</p>
            </div>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Koalio génère</h3>
              <p>L'IA crée une fiche unique avec des exercices adaptés et le prénom intégré.</p>
            </div>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Imprimez</h3>
              <p>Téléchargez le PDF, imprimez-le et votre enfant peut commencer.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="pricing" id="pricing">
      <div class="section-container">
        <h2 class="section-title">Simple et transparent</h2>
        <p class="section-sub">Commencez gratuitement, passez Premium quand vous voulez</p>
        <div class="pricing-grid">
          <div class="pricing-card">
            <div class="pricing-header">
              <h3>Gratuit</h3>
              <div class="pricing-price">0€</div>
              <p class="pricing-period">pour toujours</p>
            </div>
            <ul class="pricing-features">
              <li>3 fiches par mois</li>
              <li>Maths & Français</li>
              <li>PDF téléchargeable</li>
              <li>Corrigé inclus</li>
            </ul>
            <a routerLink="/login" class="btn btn-secondary btn-lg pricing-btn">Commencer</a>
          </div>
          <div class="pricing-card popular">
            <div class="popular-badge">Le plus populaire</div>
            <div class="pricing-header">
              <h3>Premium</h3>
              <div class="pricing-price">4,99€<span>/mois</span></div>
              <p class="pricing-period">ou 39€/an (économisez 35%)</p>
            </div>
            <ul class="pricing-features">
              <li>Fiches illimitées</li>
              <li>Tous les thèmes</li>
              <li>PDF téléchargeable</li>
              <li>Corrigé inclus</li>
              <li>Nouvelles matières en avant-première</li>
            </ul>
            <a routerLink="/login" class="btn btn-primary btn-lg pricing-btn">Essayer gratuitement</a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="cta-final">
      <div class="section-container">
        <span class="cta-mascot">🐨</span>
        <h2>Prêt à aider votre enfant ?</h2>
        <p>Créez votre première fiche en moins d'une minute.</p>
        <a routerLink="/login" class="btn btn-primary btn-lg">Essayer gratuitement</a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="section-container footer-content">
        <div class="footer-brand">
          <span class="footer-logo">🐨 Koalio</span>
          <p>Des exercices personnalisés pour le primaire belge.</p>
        </div>
        <div class="footer-links">
          <a routerLink="/home" fragment="features">Fonctionnalités</a>
          <a routerLink="/home" fragment="how">Comment ça marche</a>
          <a routerLink="/home" fragment="pricing">Tarifs</a>
        </div>
        <div class="footer-copy">
          © 2026 Koalio. Fait avec ❤️ en Belgique.
        </div>
      </div>
    </footer>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
