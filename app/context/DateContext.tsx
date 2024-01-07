'use client'


import {ReactNode, useEffect} from "react";
import getFormattedDate from "@/lib/getFormattedDate";

export default function DateHandler({children: children}: { children: ReactNode }) {
    useEffect(() => {
        const collectionOf = document.getElementsByClassName("formatDate");
        if (collectionOf.length > 0) {
            for (let i = 0; i < collectionOf.length; i++) {
                const time = collectionOf[i].getAttribute("data-time")
                if (time) {
                    getFormattedDate(time).then((str) => collectionOf[i].textContent = str)
                }
            }
        }
    }, []);

    return <>
        {children}
    </>
}

