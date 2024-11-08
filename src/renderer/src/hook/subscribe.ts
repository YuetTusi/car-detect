import { IpcRendererEvent } from 'electron';
import { useEffect } from 'react';
import { IpcRenderer } from '@electron-toolkit/preload';

const { ipcRenderer } = window.electron;

/**
 * 订阅Ipc事件
 * @param channel 频道名
 * @param handle 回调
 */
export const useSubscribe = (
  channel: string,
  handle: (event: IpcRendererEvent, args: any) => void,
): void => {
  useEffect((): (() => void) => {
    ipcRenderer.on(channel, handle);
    return (): IpcRenderer => {
      return ipcRenderer.removeListener(channel, handle);
    };
  }, []);
};
