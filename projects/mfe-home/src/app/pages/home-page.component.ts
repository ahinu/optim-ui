import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h1>Accueil</h1>
      <p>Ce remote est disponible après authentification.</p>
    </section>
  `
})
export class HomePageComponent {}