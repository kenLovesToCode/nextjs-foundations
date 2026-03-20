// Demonstrates notFound() routing to the nearest not-found.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

// Simulated posts database
const posts: Record<string, { title: string; content: string }> = {
  "hello-world": {
    title: "Hello World",
    content: "This is the first post. Welcome to the blog!",
  },
  "nextjs-tips": {
    title: "Next.js Tips",
    content: "Here are some tips for building with Next.js...",
  },
};

// In Next.js 16, params is a Promise that must be awaited
export default function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <Link
        href="/posts"
        className="mb-4 inline-block text-blue-600 hover:underline"
      >
        ← Back to posts
      </Link>
      <Suspense fallback={<PostSkeleton />}>
        <PostContent params={props.params} />
      </Suspense>
    </main>
  );
}

async function PostContent(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = posts[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <>
      <h1 className="mb-4 font-bold text-3xl">{post.title}</h1>
      <p className="text-gray-600">{post.content}</p>
    </>
  );
}

function PostSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-10 w-56 rounded bg-gray-200" />
      <div className="h-5 w-full rounded bg-gray-100" />
      <div className="h-5 w-3/4 rounded bg-gray-100" />
    </div>
  );
}
