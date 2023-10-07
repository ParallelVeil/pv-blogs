import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib'
import rehypeHighlight from 'rehype-highlight/lib'
import rehypeSlug from 'rehype-slug'
import Video from '@/app/components/Video'
import CustomImage from '@/app/components/CustomImage'
import {checkAST} from "@/lib/rehypeExtend/rehype-check";
import rehypeCodeTitles from "rehype-code-titles";
import {Note} from "@/app/components/Note";
import rehypeBlockquote from "@/lib/rehypeExtend/rehype-blockquote-meta";
import {postProcess, preProcess} from "@/lib/rehypeExtend/rehype-pre-raw";
import {Pre} from "@/app/components/Pre";

type Filetree = {
    "tree": [
        {
            "path": string,
        }
    ]
}

export async function getPostByName(fileName: string): Promise<BlogPost | undefined> {
    const res = await fetch(`https://raw.githubusercontent.com/ishiko732/pv-raw-blogs/master/${fileName}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })

    if (!res.ok) return undefined

    const rawMDX = await res.text()

    if (rawMDX === '404: Not Found') return undefined

    const { frontmatter, content } = await compileMDX<{ title: string, date: string, tags: string[] }>({
        source: rawMDX,
        components: {
            Video,
            CustomImage,
            blockquote:Note,
            pre:Pre
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    preProcess,
                    rehypeCodeTitles,
                    rehypeHighlight,
                    rehypeBlockquote,
                    rehypeSlug,
                    [rehypeAutolinkHeadings, {
                        behavior: 'wrap'
                    }],
                    postProcess,
                    checkAST
                ],
            },
        }
    })

    const id = fileName.replace(/\.mdx$/, '')

    const blogPostObj: BlogPost = { meta: { id, title: frontmatter.title, date: frontmatter.date, tags: frontmatter.tags }, content }

    return blogPostObj
}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
    const res = await fetch('https://api.github.com/repos/ishiko732/pv-raw-blogs/git/trees/master?recursive=1', {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })

    if (!res.ok) return undefined

    const repoFiletree: Filetree = await res.json()

    const filesArray = repoFiletree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))

    const posts: Meta[] = []

    for (const file of filesArray) {
        const post = await getPostByName(file)
        if (post) {
            const { meta } = post
            posts.push(meta)
        }
    }

    return posts.sort((a, b) => a.date < b.date ? 1 : -1)
}