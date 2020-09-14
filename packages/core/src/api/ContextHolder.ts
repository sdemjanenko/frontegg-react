import { ContextOptions } from '../interfaces';
import { RedirectOptions } from '../FronteggProvider';

export class ContextHolder {
  private static instance: ContextHolder;
  private context: ContextOptions | null = null;
  private accessToken: string | null = null;
  private onRedirectTo: (path: string, opts?: RedirectOptions) => void = (path) => (window.location.href = path);

  private constructor() {}

  static getInstance(): ContextHolder {
    if (!ContextHolder.instance) {
      ContextHolder.instance = new ContextHolder();
    }

    return ContextHolder.instance;
  }

  public static setContext(context: ContextOptions) {
    ContextHolder.getInstance().context = context;
  }

  public static setOnRedirectTo(onRedirectTo: (path: string, opts?: RedirectOptions) => void) {
    ContextHolder.getInstance().onRedirectTo = onRedirectTo;
  }

  public static getContext(): ContextOptions {
    return (
      ContextHolder.getInstance().context ?? {
        baseUrl: window.location.href,
        tokenResolver: () => 'my-authentication-token',
      }
    );
  }

  public static setAccessToken(accessToken: string | null) {
    ContextHolder.getInstance().accessToken = accessToken;
  }

  public static getAccessToken(): string | null {
    return ContextHolder.getInstance().accessToken;
  }

  public static onRedirectTo(path: string, opts?: RedirectOptions) {
    return ContextHolder.getInstance().onRedirectTo(path, opts);
  }
}
