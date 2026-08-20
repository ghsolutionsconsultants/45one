import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPost,
  renderMarkdown,
  formatPostDate,
} from "@/lib/posts";
import { Button } from "@/components/ui";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);
  const more = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <article className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <Link
          href="/blog"
          className="text-xs uppercase tracking-[0.25em] text-mute hover:text-volt"
        >
          ← All articles
        </Link>

        <p className="mt-10 text-xs uppercase tracking-[0.25em] text-volt">
          {post.category}
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-6 text-sm text-mute">
          {post.author} · {formatPostDate(post.date)} · {post.readingTime} min read
        </p>

        <div
          className="prose-451 mt-12 border-t border-line pt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-16 rounded-2xl border border-line bg-ink-2 p-8 text-center">
          <h2 className="font-display text-2xl tracking-tight md:text-3xl">
            Hear us break this down
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-mute">
            New episode of the 451 podcast every {site.release.day} at {site.release.time}.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/podcast">Watch the podcast</Button>
            <Button href={site.socials.instagram} external variant="ghost">
              Follow on Instagram
            </Button>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
            <p className="text-xs uppercase tracking-[0.25em] text-mute">
              Keep reading
            </p>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {more.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                  <p className="text-xs uppercase tracking-[0.2em] text-volt">
                    {p.category}
                  </p>
                  <h3 className="mt-2 font-display text-xl leading-tight tracking-tight transition group-hover:text-volt">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
