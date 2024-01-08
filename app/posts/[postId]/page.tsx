import { getPostsMeta, getPostByName } from "@/lib/posts"
import { notFound } from "next/navigation"
import Link from "next/link"
import 'highlight.js/styles/github-dark.css'
import "@/app/components/rehype-code.css"
import DateHandler from "@/app/context/DateContext"
import { increment } from "@/lib/increment"
import { cache } from "react"
import { FaReadme } from "react-icons/fa";

export const revalidate = 10

type Props = {
    params: {
        postId: string
    }
}

export async function generateStaticParams() {
    const posts = await getPostsMeta() //deduped!

    if (!posts) return []

    return posts.map((post) => ({
        postId: post.id
    }))
}

export async function generateMetadata({ params: { postId } }: Props) {

    const post = await getPostByName(`${postId}.mdx`) //deduped!

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.meta.title,
    }
}


const incrementViews = cache(increment);

export default async function Post({ params: { postId } }: Props) {

    const post = await getPostByName(`${postId}.mdx`) //deduped!

    if (!post) notFound()
    const view = incrementViews(postId);
    const { meta, content } = post

    const pubDate = meta.date

    const tags = meta.tags.map((tag, i) => (
        <Link key={i} href={`/tags/${tag}`}>{tag}</Link>
    ))

    return (
        <DateHandler>
            <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
            <p className="mt-0 text-sm flex">
                <span className={"formatDate"} data-time={pubDate}>{pubDate}</span>
                <FaReadme size={20} className={'ml-2'}/>
                <span className="ml-2">{(await view).count}</span>
            </p>
            <article>
                {content}
            </article>
            <section>
                <h3>Related:</h3>
                <div className="flex flex-row gap-4">
                    {tags}
                </div>
            </section>
            <p className="mb-10">
                <Link href="/">← Back to home</Link>
            </p>
        </DateHandler>
    )
}