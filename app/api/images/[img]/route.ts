import {NextRequest} from "next/server";

type Props = {
    params: {
        img: string
    }
}

export async function GET(request: NextRequest, {params: {img}}: Props) {
    return await fetch(`https://raw.githubusercontent.com/ishiko732/pv-raw-blogs/master/images/${img}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        },
        next:{
            revalidate:86400
        }
    })
}