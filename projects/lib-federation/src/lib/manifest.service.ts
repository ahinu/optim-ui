import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FrontendManifest } from '@optim-ui/lib-contracts';

@Injectable({ providedIn: 'root' })
export class ManifestService {
  private http = inject(HttpClient);

  getManifest(isAuthenticated: boolean): Observable<FrontendManifest> {
    const url = isAuthenticated
      ? '/assets/mock-backend/manifest-authenticated.json'
      : '/assets/mock-backend/manifest-public.json';

    return this.http.get<FrontendManifest>(url);
  }
}