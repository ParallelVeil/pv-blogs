import Link from "next/link"



export default async function RelatedTags({ tags }: { tags: string[]}) {
    const tagsJSX = tags.map((tag, i) => (
        <Link key={tag} href={`/tags/${tag}`}>{tag}</Link>
    ))
    return <>
        <div className="divider">Related Tags</div>
        <div className="flex flex-row gap-4">
            {tagsJSX.map(tag => <div className="badge badge-outline badge-lg">{tag}</div>)}
        </div>
    </>
}