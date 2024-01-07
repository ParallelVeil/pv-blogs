import { getPostsMeta } from "@/lib/posts";
import ListItem from "./ListItem";
import Link from "next/link";

export const revalidate = 86400;

export default async function Posts({ limit }: { limit?: number }) {
  const posts = await getPostsMeta();

  if (!posts) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }
  if (limit) posts.splice(limit);

  return (
    <section className="mt-6 mx-auto max-w-2xl">
      <h2 className="text-4xl font-bold dark:text-white/90">Blogs</h2>
      <ul className="w-full list-none p-0">
        {posts.map((post) => (
          <ListItem key={post.id} post={post} />
        ))}
      </ul>
      {limit && posts.length === limit ? (
        <p className="mt-6">
          <Link href="/posts">Read More</Link>
        </p>
      ) : null}
    </section>
  );
}
