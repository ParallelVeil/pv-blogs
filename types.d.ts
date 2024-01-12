
type Meta = {
    id: string,
    title: string,
    date: string,
    tags: string[],
    read: number
}

type BlogPost = {
    meta: Meta,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GITHUB_TOKEN:string
        MY_SECRET_TOKEN:string,
        HOST:string
        POST:string
        DisabledImg:number
        DATABASE_URL:string
      }
    }
  }