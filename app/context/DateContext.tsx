'use client'


import {ReactNode, useEffect} from "react";
import getFormattedDate from "@/lib/getFormattedDate";
import { usePathname, useSearchParams } from 'next/navigation'

export default function DateHandler({children: children}: { children: ReactNode }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    useEffect(() => {
        const handleRouteChange = async () => {
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
        handleRouteChange();
    }, [pathname, searchParams]);

    return <>
        {children}
    </>
}

