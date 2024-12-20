// src/global.d.ts
export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData?: string;
      };
    };
    keplr?: any; // Keplr does not have official typings, so we use `any` here
  }
}
