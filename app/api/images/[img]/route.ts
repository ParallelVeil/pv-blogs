import {NextRequest} from "next/server";

type Props = {
    params: {
        img: string
    }
}

export async function GET(request: NextRequest, {params: {img}}: Props) {
    return await getImgFetch(img)
}


async function getImgFetch(fileName:string){
    if (process.env.NODE_ENV === 'production') {
        return fetch(`https://raw.githubusercontent.com/ishiko732/pv-raw-blogs/master/images/${fileName}`, {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
            next:{
                revalidate:86400
            }
        })
    } else {
        return fetch(`${process.env.POST||'http://localhost:4521/watch'}/images/${fileName}`,{
            next:{
                revalidate:0
            }
        })
    }
}