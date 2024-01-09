import { getPostsMeta, getPostByName } from "@/lib/posts"
import { notFound } from "next/navigation"
import Link from "next/link"
import 'highlight.js/styles/github-dark.css'
import "@/app/components/rehype-code.css"
import RelatedTags from "./components/RelatedTags"
import TimeReview from "./components/TimeView"

export const revalidate = 86400

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
    return {
        title: post? post.meta.title: 'Post Not Found',
    }
}



export default async function Post({ params: { postId } }: Props) {
    const post = await getPostByName(`${postId}.mdx`) //deduped!

    if (!post) notFound()
    const { meta, content } = post
    const pubDate = meta.date
    
    return (
        <>
            <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
            <TimeReview postId={postId} pubDate={pubDate} />
            <article>
                {content}
            </article>
            <section>
                <RelatedTags tags={meta.tags}/>
            </section>
            <p className="mb-10">
                <Link href="/" className="not-prose link">Back to home</Link>
            </p>
        </>
    )
}