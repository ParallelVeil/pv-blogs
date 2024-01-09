import {compileMDX} from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib'
import rehypeSlug from 'rehype-slug'
import Video from '@/app/components/Video'
import CustomImage from '@/app/components/CustomImage'
import {checkAST} from "@/lib/rehypeExtend/rehype-check";
import rehypeCodeTitles from "rehype-code-titles";
import {Note} from "@/app/components/Note";
import rehypeBlockquote from "@/lib/rehypeExtend/rehype-blockquote-meta";
import {postProcess, preProcess} from "@/lib/rehypeExtend/rehype-pre-raw";
import {Pre} from "@/app/components/Pre";
import rehypePrism from 'rehype-prism-plus'
import rehypeBlockquoteSRS from "@/lib/rehypeExtend/rehype-blockquote-srs";

type Filetree = {
    "tree": [
        {
            "path": string,
        }
    ]
}

export async function getPostByName(fileName: string): Promise<BlogPost | undefined> {
    const res = await fetch(process.env.POST?`${process.env.POST}/${fileName}`:`https://raw.githubusercontent.com/ishiko732/pv-raw-blogs/master/${fileName}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })

    if (!res.ok) return undefined

    const rawMDX = await res.text()

    if (rawMDX === '404: Not Found') return undefined
    const {frontmatter, content} = await compileMDX<{ title: string, date: string, tags: string[] }>({
        source: rawMDX,
        components: {
            Video,
            CustomImage,
            blockquote: Note as React.ComponentType<React.ComponentProps<'blockquote'>>,
            pre: Pre as React.ComponentType<React.ComponentProps<'pre'>>,
            img: CustomImage as React.ComponentType<React.ComponentProps<'img'>>,
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    preProcess,
                    rehypeCodeTitles,
                    rehypePrism,
                    rehypeBlockquote,
                    rehypeBlockquoteSRS,
                    rehypeSlug,
                    [rehypeAutolinkHeadings, {
                        behavior: 'prepend',
                        build: {
                            type: 'element',
                            tagName: 'span',
                            properties: {className: ['icon', 'icon-link']},
                            children: [],
                        }
                    }],
                    postProcess,
                    // checkAST
                ],
            },
        }
    })

    const id = fileName.replace(/\.mdx$/, '')

    const blogPostObj: BlogPost = {
        meta: {id, title: frontmatter.title, date: frontmatter.date, tags: frontmatter.tags},
        content
    }

    return blogPostObj
}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
    const res = await fetch(process.env.POST || 'https://api.github.com/repos/ishiko732/pv-raw-blogs/git/trees/master?recursive=1', {
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
            const {meta} = post
            posts.push(meta)
        }
    }

    return posts.sort((a, b) => a.date < b.date ? 1 : -1)
}


export async function getPostTags():Promise<string[]> {
    const posts = await getPostsMeta() 
    if (!posts) return []
    const tags = new Set(posts.map(post => post.tags).flat())
    return Array.from(tags)
}