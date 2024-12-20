export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData?: string;
        initDataUnsafe?: any;
        close?: () => void;
        expand?: () => void;
        isExpanded?: boolean;
        onEvent?: (eventType: string, callback: () => void) => void;
        offEvent?: (eventType: string, callback: () => void) => void;
        sendData?: (data: string) => void;
      };
    };
  }
}
