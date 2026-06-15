export interface FrontendManifest {
  user: ManifestUser | null;
  layout: LayoutConfig;
  modules: FrontendModule[];
}

export interface ManifestUser {
  id: string;
  username: string;
  displayName: string;
  roles: string[];
  permissions: string[];
}

export interface LayoutConfig {
  appName: string;
  theme?: 'light' | 'dark' | 'system';
  homeRoute?: string;
}

export interface FrontendModule {
  key: string;
  remoteName: string;
  remoteEntry: string;
  exposedModule: string;
  routePath: string;
  displayName: string;
  public?: boolean;
  permissions?: string[];
  navOrder?: number;
}