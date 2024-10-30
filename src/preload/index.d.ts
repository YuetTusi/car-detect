import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: unknown;
    test: any;
    [others: string]: any;
  }
}
