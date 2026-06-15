import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
 private readonly key = 'optim-ui.authenticated';
  private authenticatedSig = signal(sessionStorage.getItem('optim-ui.authenticated') === 'true');

  isAuthenticated(): boolean {
    return this.authenticatedSig();
  }

  login(): void {
    sessionStorage.setItem(this.key, 'true');
    this.authenticatedSig.set(true);
  }

  logout(): void {
    sessionStorage.removeItem(this.key);
    this.authenticatedSig.set(false);
  }

}