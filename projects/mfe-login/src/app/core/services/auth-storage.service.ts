import { Injectable } from '@angular/core';
import { ACCESS_TOKEN_STORAGE_KEY } from '../constants/auth.constants';

/*
 * ================================
 * Optim Portal (Sibylle project)
 *      └── MFE Login
 * 
 * @purpose: Gestion du stockage du bearer token
 * ================================
 */

@Injectable({ providedIn: 'root' })
export class AuthStorageService {
  getToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  }

  clearToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
}
