'use client'
import { useEffect } from 'react';

export default function useWatchTimeout(watch: unknown, ms: number, callback: () => void) {
  useEffect(() => {
    let timeOut: NodeJS.Timeout;

    if (watch) {
      timeOut = setTimeout(callback, ms);
    }

    return () => {
      timeOut && clearInterval(timeOut);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);
}