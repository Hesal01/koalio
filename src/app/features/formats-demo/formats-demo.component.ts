import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formats-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <header class="page-header">
        <p class="eyebrow">Catalogue interne · P1</p>
        <h1>Démo des formats d'exercices</h1>
        <p class="lede">
          7 formats Koalio P1 avec leurs variants principaux. Aperçu visuel de ce que la
          génération produira sur les fiches imprimables. Les illustrations sont des
          placeholders (emojis) — seront remplacées par les illustrations Midjourney.
        </p>
      </header>

      <!-- ═══ TEXT-BLANK ═══════════════════════════════════════ -->
      <section class="format-section">
        <header class="format-header">
          <span class="stars">⭐⭐⭐</span>
          <h2>text-blank</h2>
          <p>Texte avec un ou plusieurs <code>___</code> à compléter. Format universel et le plus rapide (~10 s/ligne).</p>
        </header>

        <div class="variants">
          <article class="variant">
            <h3>Compute — calcul direct</h3>
            <div class="exo">
              <p class="instr">Calcule.</p>
              <ol class="qlist">
                <li>3 + 4 = <span class="blank">_____</span></li>
                <li>5 + 5 = <span class="blank">_____</span></li>
                <li>8 + 2 = <span class="blank">_____</span></li>
                <li>6 + 3 = <span class="blank">_____</span></li>
                <li>9 − 4 = <span class="blank">_____</span></li>
                <li>10 − 7 = <span class="blank">_____</span></li>
              </ol>
            </div>
          </article>

          <article class="variant">
            <h3>Reverse — opérande manquant</h3>
            <div class="exo">
              <p class="instr">Complète.</p>
              <ol class="qlist">
                <li>7 + <span class="blank">_____</span> = 10</li>
                <li><span class="blank">_____</span> + 5 = 9</li>
                <li>4 + <span class="blank">_____</span> = 10</li>
                <li>12 − <span class="blank">_____</span> = 8</li>
              </ol>
            </div>
          </article>

          <article class="variant">
            <h3>Decompose — dizaines + unités</h3>
            <div class="exo">
              <p class="instr">Décompose.</p>
              <ol class="qlist">
                <li>17 = <span class="blank-sm">___</span> D + <span class="blank-sm">___</span> U</li>
                <li>13 = <span class="blank-sm">___</span> D + <span class="blank-sm">___</span> U</li>
                <li>9 = <span class="blank-sm">___</span> D + <span class="blank-sm">___</span> U</li>
              </ol>
            </div>
          </article>

          <article class="variant">
            <h3>Sequence — suite à compléter</h3>
            <div class="exo">
              <p class="instr">Continue la suite.</p>
              <ol class="qlist">
                <li>2, 4, <span class="blank">_____</span>, 8, <span class="blank">_____</span></li>
                <li>5, 10, <span class="blank">_____</span>, <span class="blank">_____</span>, 25</li>
                <li>1, 3, 5, <span class="blank">_____</span>, 9</li>
              </ol>
            </div>
          </article>

          <article class="variant">
            <h3>Compare — comparer deux nombres</h3>
            <div class="exo">
              <p class="instr">Complète avec <code>&lt;</code>, <code>&gt;</code> ou <code>=</code>.</p>
              <ol class="qlist">
                <li>5 <span class="blank-sm">___</span> 8</li>
                <li>12 <span class="blank-sm">___</span> 12</li>
                <li>15 <span class="blank-sm">___</span> 9</li>
              </ol>
            </div>
          </article>

          <article class="variant">
            <h3>Word problem — problème personnalisé</h3>
            <div class="exo">
              <p class="instr">Lis et résous.</p>
              <ol class="qlist">
                <li>Léa a trouvé 6 œufs de dinosaure le matin. L'après-midi, elle en trouve 4 de plus. Combien d'œufs a-t-elle en tout ? <span class="blank">_____</span></li>
              </ol>
            </div>
          </article>

          <article class="variant variant-wide">
            <h3>Notation visuelle — opérandes en dés</h3>
            <p class="variant-note">Mêmes opérations qu'en mode "Reverse", mais les opérandes connus sont rendus comme dés. L'enfant écrit le chiffre dans la case vide (ou dessine les points).</p>
            <div class="exo">
              <p class="instr">Complète les opérations en dessinant les points sur les dés vides.</p>
              <div class="dice-grid">
                <div class="dice-row">
                  <div class="dice" data-value="2"><span class="dot"></span><span class="dot"></span></div>
                  <span class="op">+</span>
                  <div class="dice" data-value="0"></div>
                  <span class="op">=</span>
                  <span class="num">3</span>
                </div>
                <div class="dice-row">
                  <div class="dice" data-value="5"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
                  <span class="op">+</span>
                  <div class="dice" data-value="0"></div>
                  <span class="op">=</span>
                  <span class="num">10</span>
                </div>
                <div class="dice-row">
                  <div class="dice" data-value="0"></div>
                  <span class="op">+</span>
                  <div class="dice" data-value="3"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
                  <span class="op">=</span>
                  <span class="num">5</span>
                </div>
                <div class="dice-row">
                  <div class="dice" data-value="0"></div>
                  <span class="op">+</span>
                  <div class="dice" data-value="6"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
                  <span class="op">=</span>
                  <span class="num">8</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ═══ COUNT-ITEMS ═════════════════════════════════════ -->
      <section class="format-section">
        <header class="format-header">
          <span class="stars">⭐⭐⭐</span>
          <h2>count-items</h2>
          <p>Compter une collection d'items et écrire le nombre. Le funTheme prend tout son sens visuellement (~30 s/set).</p>
        </header>

        <div class="variants">
          <article class="variant">
            <h3>Simple count — items en rangée</h3>
            <div class="exo">
              <p class="instr">Compte les œufs et écris le nombre.</p>
              <div class="items-row">
                <span class="item">🥚</span><span class="item">🥚</span><span class="item">🥚</span>
                <span class="item">🥚</span><span class="item">🥚</span><span class="item">🥚</span>
                <span class="item">🥚</span>
              </div>
              <p class="qrow"><span class="item-arrow">→</span> <span class="blank">_____</span></p>
            </div>
          </article>

          <article class="variant">
            <h3>Mixed groups — deux types d'items</h3>
            <div class="exo">
              <p class="instr">Compte combien il y a d'œufs et de fossiles.</p>
              <div class="items-row">
                <span class="item">🥚</span><span class="item">🦴</span><span class="item">🥚</span>
                <span class="item">🥚</span><span class="item">🦴</span><span class="item">🥚</span>
                <span class="item">🦴</span><span class="item">🥚</span>
              </div>
              <p class="qrow"><span class="blank-sm">___</span> œufs &nbsp;·&nbsp; <span class="blank-sm">___</span> fossiles</p>
            </div>
          </article>

          <article class="variant">
            <h3>Pre-grouped — items en groupes de 5</h3>
            <p class="variant-note">Pédagogie de la base 10 : visualiser que 2 groupes de 5 = 10.</p>
            <div class="exo">
              <p class="instr">Compte les œufs.</p>
              <div class="grouped">
                <div class="group-of-5">
                  <span class="item">🥚</span><span class="item">🥚</span><span class="item">🥚</span><span class="item">🥚</span><span class="item">🥚</span>
                </div>
                <div class="group-of-5">
                  <span class="item">🥚</span><span class="item">🥚</span><span class="item">🥚</span>
                </div>
              </div>
              <p class="qrow">Total : <span class="blank">_____</span> œufs</p>
            </div>
          </article>

          <article class="variant">
            <h3>Compare — deux sets, lequel est le plus grand ?</h3>
            <div class="exo">
              <p class="instr">Compte chaque set, puis entoure le plus grand.</p>
              <div class="compare">
                <div class="set">
                  <div class="items-row">
                    <span class="item">🥚</span><span class="item">🥚</span><span class="item">🥚</span><span class="item">🥚</span>
                  </div>
                  <span class="blank-sm">___</span>
                </div>
                <span class="vs">vs</span>
                <div class="set">
                  <div class="items-row">
                    <span class="item">🦴</span><span class="item">🦴</span><span class="item">🦴</span>
                    <span class="item">🦴</span><span class="item">🦴</span><span class="item">🦴</span>
                  </div>
                  <span class="blank-sm">___</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ═══ CIRCLE ══════════════════════════════════════════ -->
      <section class="format-section">
        <header class="format-header">
          <span class="stars">⭐⭐⭐</span>
          <h2>circle (entourer)</h2>
          <p>Sélectionner par discrimination dans un set d'items, sans écriture. Format dominant du français P1 (~5 s/item).</p>
        </header>

        <div class="variants">
          <article class="variant">
            <h3>Par attribut — entoure les disques</h3>
            <div class="exo">
              <p class="instr">Entoure tous les disques.</p>
              <div class="shapes-row">
                <span class="shape circle-mark">●</span>
                <span class="shape">▲</span>
                <span class="shape circle-mark">●</span>
                <span class="shape">■</span>
                <span class="shape circle-mark">●</span>
                <span class="shape">▲</span>
                <span class="shape circle-mark">●</span>
              </div>
              <p class="hint">Démo : 4 disques entourés (réponse correcte affichée en pointillé).</p>
            </div>
          </article>

          <article class="variant">
            <h3>Par valeur — nombres ≤ 10</h3>
            <div class="exo">
              <p class="instr">Entoure tous les nombres ≤ 10.</p>
              <div class="num-row">
                <span class="num-item circle-mark">3</span>
                <span class="num-item">14</span>
                <span class="num-item circle-mark">7</span>
                <span class="num-item">19</span>
                <span class="num-item circle-mark">10</span>
                <span class="num-item">15</span>
                <span class="num-item circle-mark">2</span>
              </div>
            </div>
          </article>

          <article class="variant">
            <h3>Par opération — additions qui font 10</h3>
            <div class="exo">
              <p class="instr">Entoure les additions qui font 10.</p>
              <div class="ops-row">
                <span class="op-item circle-mark">3+7</span>
                <span class="op-item">4+5</span>
                <span class="op-item circle-mark">6+4</span>
                <span class="op-item">8+1</span>
                <span class="op-item circle-mark">2+8</span>
                <span class="op-item">5+4</span>
              </div>
            </div>
          </article>

          <article class="variant">
            <h3>Par son — phonologie français</h3>
            <div class="exo">
              <p class="instr">Entoure les mots qui contiennent le son <strong>/a/</strong>.</p>
              <div class="words-row">
                <span class="word circle-mark">chat</span>
                <span class="word">lit</span>
                <span class="word circle-mark">bateau</span>
                <span class="word">bol</span>
                <span class="word circle-mark">papa</span>
                <span class="word">vélo</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ═══ MATCH ═══════════════════════════════════════════ -->
      <section class="format-section">
        <header class="format-header">
          <span class="stars">⭐⭐</span>
          <h2>match (relier)</h2>
          <p>Tracer un trait entre items d'une colonne gauche et items d'une colonne droite. Format pivot du décodage français P1 (~10 s/paire).</p>
        </header>

        <div class="variants">
          <article class="variant">
            <h3>Chiffre ↔ écriture en lettres</h3>
            <div class="exo">
              <p class="instr">Relie chaque chiffre à son nom.</p>
              <div class="match-pairs">
                <div class="match-col match-left">
                  <span class="match-item">3</span>
                  <span class="match-item">5</span>
                  <span class="match-item">7</span>
                  <span class="match-item">10</span>
                </div>
                <svg class="match-lines" viewBox="0 0 200 200" preserveAspectRatio="none">
                  <line x1="21" y1="25" x2="179" y2="75" />
                  <line x1="21" y1="75" x2="179" y2="175" />
                  <line x1="21" y1="125" x2="179" y2="125" />
                  <line x1="21" y1="175" x2="179" y2="25" />
                </svg>
                <div class="match-col match-right">
                  <span class="match-item">dix</span>
                  <span class="match-item">trois</span>
                  <span class="match-item">sept</span>
                  <span class="match-item">cinq</span>
                </div>
              </div>
            </div>
          </article>

          <article class="variant">
            <h3>Quantité ↔ chiffre</h3>
            <div class="exo">
              <p class="instr">Relie chaque set d'œufs à son nombre.</p>
              <div class="match-pairs">
                <div class="match-col match-left">
                  <span class="match-item">🥚🥚🥚</span>
                  <span class="match-item">🥚🥚🥚🥚🥚🥚</span>
                  <span class="match-item">🥚🥚🥚🥚</span>
                </div>
                <svg class="match-lines" viewBox="0 0 200 200" preserveAspectRatio="none">
                  <line x1="21" y1="33" x2="179" y2="100" />
                  <line x1="21" y1="100" x2="179" y2="167" />
                  <line x1="21" y1="167" x2="179" y2="33" />
                </svg>
                <div class="match-col match-right">
                  <span class="match-item">4</span>
                  <span class="match-item">3</span>
                  <span class="match-item">6</span>
                </div>
              </div>
            </div>
          </article>

          <article class="variant">
            <h3>Image ↔ mot — décodage français</h3>
            <p class="variant-note">Exo pivot du français P1.</p>
            <div class="exo">
              <p class="instr">Relie chaque image au bon mot.</p>
              <div class="match-pairs">
                <div class="match-col match-left">
                  <span class="match-item">🐱</span>
                  <span class="match-item">🐶</span>
                  <span class="match-item">🐰</span>
                  <span class="match-item">🐦</span>
                </div>
                <svg class="match-lines" viewBox="0 0 200 200" preserveAspectRatio="none">
                  <line x1="21" y1="25" x2="179" y2="125" />
                  <line x1="21" y1="75" x2="179" y2="25" />
                  <line x1="21" y1="125" x2="179" y2="175" />
                  <line x1="21" y1="175" x2="179" y2="75" />
                </svg>
                <div class="match-col match-right">
                  <span class="match-item">chien</span>
                  <span class="match-item">oiseau</span>
                  <span class="match-item">chat</span>
                  <span class="match-item">lapin</span>
                </div>
              </div>
            </div>
          </article>

          <article class="variant">
            <h3>Majuscule ↔ minuscule</h3>
            <div class="exo">
              <p class="instr">Relie chaque majuscule à sa minuscule.</p>
              <div class="match-pairs">
                <div class="match-col match-left">
                  <span class="match-item">A</span>
                  <span class="match-item">M</span>
                  <span class="match-item">B</span>
                  <span class="match-item">P</span>
                </div>
                <svg class="match-lines" viewBox="0 0 200 200" preserveAspectRatio="none">
                  <line x1="21" y1="25" x2="179" y2="75" />
                  <line x1="21" y1="75" x2="179" y2="175" />
                  <line x1="21" y1="125" x2="179" y2="125" />
                  <line x1="21" y1="175" x2="179" y2="25" />
                </svg>
                <div class="match-col match-right">
                  <span class="match-item">p</span>
                  <span class="match-item">a</span>
                  <span class="match-item">b</span>
                  <span class="match-item">m</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ═══ MULTIPLE-CHOICE ═════════════════════════════════ -->
      <section class="format-section">
        <header class="format-header">
          <span class="stars">⭐⭐</span>
          <h2>multiple-choice (QCM)</h2>
          <p>Question + 3 options, l'enfant en choisit une. Bon pour discrimination fine avec distracteurs pédagogiques (~15 s/Q).</p>
        </header>

        <div class="variants">
          <article class="variant">
            <h3>Reconnaître une figure</h3>
            <div class="exo">
              <p class="instr">Quelle figure est un triangle ?</p>
              <div class="mcq-options">
                <label class="mcq-opt"><span class="mcq-box">☐</span><span class="mcq-shape">●</span></label>
                <label class="mcq-opt mcq-correct"><span class="mcq-box">☑</span><span class="mcq-shape">▲</span></label>
                <label class="mcq-opt"><span class="mcq-box">☐</span><span class="mcq-shape">■</span></label>
              </div>
            </div>
          </article>

          <article class="variant">
            <h3>Identifier un résultat</h3>
            <div class="exo">
              <p class="instr">3 + 4 = ?</p>
              <div class="mcq-options">
                <label class="mcq-opt"><span class="mcq-box">☐</span><span>6</span></label>
                <label class="mcq-opt mcq-correct"><span class="mcq-box">☑</span><span>7</span></label>
                <label class="mcq-opt"><span class="mcq-box">☐</span><span>8</span></label>
              </div>
            </div>
          </article>

          <article class="variant">
            <h3>Phonème initial — options en images</h3>
            <p class="variant-note">P1 trim 1-2 : options en images obligatoires (l'enfant ne sait pas encore lire).</p>
            <div class="exo">
              <p class="instr">Quel mot commence par le son <strong>/b/</strong> ?</p>
              <div class="mcq-options">
                <label class="mcq-opt mcq-correct"><span class="mcq-box">☑</span><span class="mcq-emoji">🚌</span></label>
                <label class="mcq-opt"><span class="mcq-box">☐</span><span class="mcq-emoji">🐱</span></label>
                <label class="mcq-opt"><span class="mcq-box">☐</span><span class="mcq-emoji">🍎</span></label>
              </div>
            </div>
          </article>

          <article class="variant">
            <h3>Reconnaître une lettre — distracteurs miroir</h3>
            <p class="variant-note">Distracteurs pédagogiques : <code>p</code> et <code>d</code> sont les confusions classiques avec <code>b</code>.</p>
            <div class="exo">
              <p class="instr">Lequel est la lettre <strong>"b"</strong> ?</p>
              <div class="mcq-options">
                <label class="mcq-opt"><span class="mcq-box">☐</span><span class="mcq-letter">d</span></label>
                <label class="mcq-opt mcq-correct"><span class="mcq-box">☑</span><span class="mcq-letter">b</span></label>
                <label class="mcq-opt"><span class="mcq-box">☐</span><span class="mcq-letter">p</span></label>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ═══ ORDER ═══════════════════════════════════════════ -->
      <section class="format-section">
        <header class="format-header">
          <span class="stars">⭐</span>
          <h2>order (ranger)</h2>
          <p>Items en désordre à arranger en séquence (~1 min/set). Format à valeur pédagogique haute, 1 bloc max par fiche.</p>
        </header>

        <div class="variants">
          <article class="variant">
            <h3>Nombres croissant</h3>
            <div class="exo">
              <p class="instr">Numérote ces nombres du plus petit (1) au plus grand (5).</p>
              <div class="order-row">
                <div class="order-item">
                  <span class="order-val">7</span>
                  <span class="order-num">3</span>
                </div>
                <div class="order-item">
                  <span class="order-val">3</span>
                  <span class="order-num">1</span>
                </div>
                <div class="order-item">
                  <span class="order-val">9</span>
                  <span class="order-num">4</span>
                </div>
                <div class="order-item">
                  <span class="order-val">1</span>
                  <span class="order-num">2</span>
                </div>
                <div class="order-item">
                  <span class="order-val">5</span>
                  <span class="order-num">3</span>
                </div>
              </div>
            </div>
          </article>

          <article class="variant variant-wide">
            <h3>Ordre d'une histoire</h3>
            <p class="variant-note">Format pivot du français P1 — compréhension par séquençage.</p>
            <div class="exo">
              <p class="instr">Numérote les images dans l'ordre de l'histoire.</p>
              <div class="order-row order-stories">
                <div class="order-item story-frame">
                  <span class="story-emoji">🥚</span>
                  <span class="order-num">1</span>
                  <span class="story-caption">L'œuf est posé</span>
                </div>
                <div class="order-item story-frame">
                  <span class="story-emoji">🐣</span>
                  <span class="order-num">2</span>
                  <span class="story-caption">Le bébé sort</span>
                </div>
                <div class="order-item story-frame">
                  <span class="story-emoji">🦖</span>
                  <span class="order-num">3</span>
                  <span class="story-caption">Le dino grandit</span>
                </div>
                <div class="order-item story-frame">
                  <span class="story-emoji">🦕</span>
                  <span class="order-num">4</span>
                  <span class="story-caption">Le dino adulte</span>
                </div>
              </div>
            </div>
          </article>

          <article class="variant">
            <h3>Tailles / longueurs</h3>
            <div class="exo">
              <p class="instr">Range ces dinos du plus petit au plus grand.</p>
              <div class="order-row order-sizes">
                <div class="order-item">
                  <span class="dino" style="font-size: 1.6rem">🦕</span>
                  <span class="order-num">3</span>
                </div>
                <div class="order-item">
                  <span class="dino" style="font-size: 1rem">🦕</span>
                  <span class="order-num">1</span>
                </div>
                <div class="order-item">
                  <span class="dino" style="font-size: 2.4rem">🦕</span>
                  <span class="order-num">4</span>
                </div>
                <div class="order-item">
                  <span class="dino" style="font-size: 1.3rem">🦕</span>
                  <span class="order-num">2</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ═══ DRAW-ITEMS ══════════════════════════════════════ -->
      <section class="format-section">
        <header class="format-header">
          <span class="stars">⭐</span>
          <h2>draw-items (zones de dessin)</h2>
          <p>Zone vide bordée pointillée où l'enfant dessine. Le format <strong>le plus chronophage</strong> (2-5 min/bloc), à doser.</p>
        </header>

        <div class="variants">
          <article class="variant">
            <h3>Dessiner N items</h3>
            <div class="exo">
              <p class="instr">Dessine 5 cœurs dans le cadre.</p>
              <div class="draw-zone draw-zone-md">
                <span class="draw-hint">✏️ dessine ici</span>
              </div>
            </div>
          </article>

          <article class="variant">
            <h3>Dessiner pour compléter — addition visuelle</h3>
            <p class="variant-note">L'enfant voit 6 œufs déjà placés et doit en dessiner 4 de plus pour atteindre 10.</p>
            <div class="exo">
              <p class="instr">Maman dinosaure veut 10 œufs dans son nid. Dessine ceux qui manquent.</p>
              <div class="draw-existing">
                <span class="draw-label">Déjà placés :</span>
                <div class="items-row">
                  <span class="item">🥚</span><span class="item">🥚</span><span class="item">🥚</span>
                  <span class="item">🥚</span><span class="item">🥚</span><span class="item">🥚</span>
                </div>
              </div>
              <div class="draw-existing">
                <span class="draw-label">À dessiner :</span>
                <div class="draw-zone draw-zone-sm">
                  <span class="ghost-item">🥚</span>
                  <span class="ghost-item">🥚</span>
                  <span class="ghost-item">🥚</span>
                  <span class="ghost-item">🥚</span>
                </div>
              </div>
            </div>
          </article>

          <article class="variant">
            <h3>Dessiner pour partager — division</h3>
            <p class="variant-note">10 œufs, 2 nids — l'enfant dessine la répartition équitable.</p>
            <div class="exo">
              <p class="instr">Le Diplodocus a 10 œufs à partager dans 2 nids. Dessine-les.</p>
              <div class="items-row" style="margin-bottom: 16px;">
                <span class="item">🥚</span><span class="item">🥚</span><span class="item">🥚</span>
                <span class="item">🥚</span><span class="item">🥚</span><span class="item">🥚</span>
                <span class="item">🥚</span><span class="item">🥚</span><span class="item">🥚</span>
                <span class="item">🥚</span>
              </div>
              <div class="containers-row">
                <div class="container">
                  <span class="container-label">Nid 1</span>
                  <div class="draw-zone draw-zone-sm"></div>
                </div>
                <div class="container">
                  <span class="container-label">Nid 2</span>
                  <div class="draw-zone draw-zone-sm"></div>
                </div>
              </div>
            </div>
          </article>

          <article class="variant">
            <h3>Tracer une figure géométrique</h3>
            <div class="exo">
              <p class="instr">Trace un triangle à la latte.</p>
              <div class="draw-zone draw-zone-md">
                <span class="draw-hint">✏️ trace ici</span>
              </div>
            </div>
          </article>

          <article class="variant">
            <h3>Dessiner selon une consigne spatiale</h3>
            <p class="variant-note">Travaille le vocabulaire de l'espace (sous, sur, à côté, entre).</p>
            <div class="exo">
              <p class="instr">Dessine un chien <strong>sous</strong> l'arbre et un oiseau <strong>sur</strong> l'arbre.</p>
              <div class="draw-zone draw-zone-lg">
                <span class="draw-hint draw-hint-tree">🌳</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <footer class="page-footer">
        <p>Source : <code>docs/formats-exercices.md</code></p>
      </footer>
    </div>
  `,
  styleUrl: './formats-demo.component.scss',
})
export class FormatsDemoComponent {}
