import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  ApiEnvelope,
  LoginRequest,
  LoginResponseData,
  SsoExchangeRequest,
  SsoExchangeResponseData,
} from '../models/auth.models';
import { DEFAULT_API_BASE_URL } from '../constants/auth.constants';

/*
 * ================================
 * Optim Portal (Sibylle project)
 *      └── MFE Login
 * 
 * @purpose: Service se liant au microservice identity-ms via la gateway pour gerer le login
 * ================================
 */

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = DEFAULT_API_BASE_URL;

  /**
   * Local DB Login
   * @param payload 
   * @returns 
   */
  login(payload: LoginRequest): Observable<string> {
    return this.http
      .post<ApiEnvelope<LoginResponseData>>(`${this.apiBaseUrl}/auth/login`, payload)
      .pipe(map((response) => response.data.accessToken));
  }

  /**
   * Step 3 de l'authn openid, echange de token, envoi une request POSt vers le point d'échange
   * et récupere un bearer token en retour
   * @param authorizationToken 
   * @returns 
   */
  exchangeAuthorizationToken(authorizationToken: string): Observable<string> {
    const body: SsoExchangeRequest = { code: authorizationToken };

    return this.http
      .post<ApiEnvelope<SsoExchangeResponseData>>(
        `${this.apiBaseUrl}/auth/sso/exchange`,
        body,
      )
      .pipe(map((response) => response.data.accessToken));
  }

  /**
   * Lien vers la redirection SSo sur la gateway
   * @returns 
   */
  getSsoRedirectUrl(): string {
    return `${this.apiBaseUrl}/internal/auth/start`;
  }
}
