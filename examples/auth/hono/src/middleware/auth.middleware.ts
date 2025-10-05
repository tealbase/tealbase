import { createServerClient, parseCookieHeader } from '@tealbase/ssr';
import { TealbaseClient } from '@tealbase/tealbase-js';
import type { Context, MiddlewareHandler } from 'hono';
import { env } from 'hono/adapter';
import { setCookie } from 'hono/cookie';

declare module 'hono' {
  interface ContextVariableMap {
    tealbase: TealbaseClient;
  }
}

export const getTealbase = (c: Context) => {
  return c.get('tealbase');
};

type TealbaseEnv = {
  VITE_TEALBASE_URL: string;
  VITE_TEALBASE_ANON_KEY: string;
};

export const tealbaseMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    const tealbaseEnv = env<TealbaseEnv>(c);
    const tealbaseUrl =
      tealbaseEnv.VITE_TEALBASE_URL ?? import.meta.env.VITE_TEALBASE_URL;
    const tealbaseAnonKey =
      tealbaseEnv.VITE_TEALBASE_ANON_KEY ??
      import.meta.env.VITE_TEALBASE_ANON_KEY;

    if (!tealbaseUrl) {
      throw new Error('TEALBASE_URL missing!');
    }

    if (!tealbaseAnonKey) {
      throw new Error('TEALBASE_ANON_KEY missing!');
    }

    const tealbase = createServerClient(tealbaseUrl, tealbaseAnonKey, {
      cookies: {
        getAll() {
          return parseCookieHeader(c.req.header('Cookie') ?? '');
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            setCookie(c, name, value, options)
          );
        },
      },
    });

    c.set('tealbase', tealbase);

    await next();
  };
};
