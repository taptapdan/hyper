import { useEffect, useRef } from 'react';

export const useEffectOnce = (fn: Function) => {
  const haveRun = useRef(false);
  useEffect(() => {
    if (!haveRun.current) fn();
    haveRun.current = true;
  }, []);
};
