'use client'


import {ReactNode, useEffect} from "react";
import getFormattedDate from "@/lib/getFormattedDate";
import { useRouter } from 'next/router';

export default function DateHandler({children: children}: { children: ReactNode }) {
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = () => {
            const collectionOf = document.getElementsByClassName("formatDate");
            if (collectionOf.length > 0) {
              for (let i = 0; i < collectionOf.length; i++) {
                const time = collectionOf[i].getAttribute("data-time");
                if (time) {
                  getFormattedDate(time).then((str) => (collectionOf[i].textContent = str));
                }
              }
            }
          };
      
          router.events.on('routeChangeComplete', handleRouteChange);
      
          return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
          };
    }, [router.events]);

    return <>
        {children}
    </>
}

