
import { increment } from "@/lib/increment"
import { cache } from "react"
import { FaReadme } from "react-icons/fa";

const incrementViews = cache(increment);

export default async function TimeReview({ postId, pubDate }: { postId: string, pubDate: string }) {
    const view = incrementViews(postId);
    return <>
        <p className="mt-0 text-sm flex pt-1">
            <span className={"formatDate"} data-time={pubDate}>{pubDate}</span>
            <FaReadme size={20} className={'ml-2'} />
            <span className="ml-2">{(await view).count}</span>
        </p>
    </>
}