import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SiZhihu } from "react-icons/si";
import { SiZenn } from "react-icons/si";
export default async function ExtendICO(){
    return <>
           <Link
          className="btn btn-ghost"
          aria-hidden="true"
          href={"https://github.com/ishiko732"}
          target="_blank"
        >
          <FaGithub size={30} />
        </Link>
        <Link
          className="btn btn-ghost"
          aria-hidden="true"
          href={"https://zenn.dev/ishiko"}
          target="_blank"
        >
          <SiZenn size={30} color="#5ba8f8"/>
        </Link>
        <Link
          className="btn btn-ghost"
          aria-hidden="true"
          href={"https://www.zhihu.com/people/soneston"}
          target="_blank"
        >
          <SiZhihu color="#3175ee" size={30} />
        </Link>
    </>
}