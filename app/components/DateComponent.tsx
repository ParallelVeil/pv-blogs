'use client'
import getFormattedDate from "@/lib/getFormattedDate";
import { useEffect, useState } from "react";


export default function DateItem({ date, ...props }: React.ComponentProps<'span'> & { date: string }) {
    const [datei18, setDatei18] = useState<string>("")
    useEffect(() => {
        getFormattedDate(date).then((str) => setDatei18(str))
    }, [date])
    return <span {...props}>{!datei18 ? new Date(date).toLocaleString() : datei18}</span>
}