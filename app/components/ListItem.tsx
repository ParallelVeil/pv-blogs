import Link from "next/link"
import DateItem from "./DateComponent"

type Props = {
    post: Meta
}

export default function ListItem({ post }: Props) {
    const { id, title, date, tags } = post

    return (
        <li className="mt-4 text-2xl dark:text-white/90">
            <Link className="underline hover:text-black/70 dark:hover:text-white" 
                href={`/posts/${id}`}>{title}</Link>
            {tags.length > 0 ? 
                tags.map(tag=><span className="badge badge-md" key={`listItem-${tag}`}>{tag}</span>):null}
            <p className="text-sm">
                <DateItem date={date} />
            </p>
        </li>
    )
}