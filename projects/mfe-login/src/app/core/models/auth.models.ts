/*
 * ================================
 * Optim Portal (Sibylle project)
 *      └── MFE Login
 * 
 * @purpose: Modele de données d'échange avec la gateway
 * ================================
 */

/**
 * Enveloppe de l'API
 */
export interface ApiEnvelope<T> {
  data: T;
  message?: string;
}

/**
 * DTO de login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login response token
 */
export interface LoginResponseData {
  accessToken: string;
}

/**
 * SSO Login exchange token
 */
export interface SsoExchangeRequest {
  code: string;
}

/**
 * SSO Login, response to exchange (idem Local DB auth)
 */
export interface SsoExchangeResponseData {
  accessToken: string;
}
