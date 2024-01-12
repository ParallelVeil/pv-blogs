
import DateItem from "@/app/components/DateComponent";
import { increment } from "@/lib/increment"
import { cache } from "react"
import { FaReadme } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
const incrementViews = cache(increment);

export default async function TimeReview({ postId, pubDate,readTime }: { postId: string, pubDate: string, readTime: number }) {
    const view = incrementViews(postId);
    return <>
        <p className="mt-0 text-sm flex pt-1">
            <CiCalendar size={20} className={'mx-2'} />
            <DateItem date={pubDate} />
            <FaReadme size={20} className={'mx-2'} />
            <span >{(await view).count}</span>
            <IoTimeOutline size={20} className={'mx-2'} />
            <span>{readTime+' min'}</span>
        </p>
    </>
}