import Link from "next/link";
import ExtendICO from "./ExtendICO";
import { getPostTags } from "@/lib/posts";
import TagList from "./TagList";

export default async function Navbar() {
  const tags = await getPostTags();

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href={"/"} className="btn btn-ghost text-xl">{`blogs`}</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/posts"}>Blogs</Link>
          </li>
          {tags.length > 0 ? (
            <li>
              <details className="dropdown">
                <summary id="tags">Tags</summary>
                <ul>
                  <TagList tags={tags} />
                </ul>
              </details>
            </li>
          ) : null}
          <li>
            <Link href={"/about"}>About</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ExtendICO />
      </div>
    </nav>
  );
}
