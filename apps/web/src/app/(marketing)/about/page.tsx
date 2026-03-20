import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about our mission and team",
};

// Simulate slow data fetch
async function getAboutData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { founded: 2026, team: "Distributed" };
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 font-bold text-3xl">About Us</h1>
      <p className="mb-4 text-gray-600">
        This page uses the marketing layout. Notice the header and footer are
        defined once in the layout and wrap this content automatically.
      </p>
      <Suspense fallback={<div className="h-5 w-48 animate-pulse rounded bg-gray-100" />}>
        <AboutDetails />
      </Suspense>
    </div>
  );
}

async function AboutDetails() {
  const data = await getAboutData();

  return (
    <p className="text-gray-500 text-sm">
      Founded: {data.founded} · Team: {data.team}
    </p>
  );
}
