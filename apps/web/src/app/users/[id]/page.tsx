// import { fetchPosts, fetchUser, fetchUserStats } from "@/lib/data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: PageProps) {
  //   // Include params in Promise.all for optimal performance
  //   const [{ id }, user, posts, stats] = await Promise.all([
  //     params, // Await params alongside data fetches
  //     fetchUser(), // These run in parallel with params resolution
  //     fetchPosts(),
  //     fetchUserStats(),
  //   ]);

  // Now use id for any dependent fetches
  // (Better: restructure so all independent fetches are in Promise.all)

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1>USER</h1>
      {/* <h1 className="mb-4 font-bold text-2xl">User {id}</h1>
      <p>{user.name}</p> */}
      {/* ... */}
    </main>
  );
}
