/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screens)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screens)'}/quiz/summary` | `/quiz/summary`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screens)'}/quiz/[id]` | `/quiz/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screens)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screens)'}/quiz/summary` | `/quiz/summary`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(screens)'}/quiz/[id]` | `/quiz/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(screens)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(screens)'}/quiz/summary${`?${string}` | `#${string}` | ''}` | `/quiz/summary${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screens)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(screens)'}/quiz/summary` | `/quiz/summary`; params?: Router.UnknownInputParams; } | `${'/(screens)'}/quiz/${Router.SingleRoutePart<T>}${`?${string}` | `#${string}` | ''}` | `/quiz/${Router.SingleRoutePart<T>}${`?${string}` | `#${string}` | ''}` | { pathname: `${'/(screens)'}/quiz/[id]` | `/quiz/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}
