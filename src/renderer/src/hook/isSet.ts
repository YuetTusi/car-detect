import { useEffect, useState } from 'react';

const { ipcRenderer } = window.electron;

export const useIsSet = (): boolean => {
  const [isSet, setIsSet] = useState<boolean>(false);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const isSet = await ipcRenderer.invoke('is-set');
        setIsSet(isSet);
      } catch (error) {
        console.warn(error);
        setIsSet(false);
      }
    })();
  }, []);

  return isSet;
};
