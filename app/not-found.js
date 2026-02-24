"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">Sorry, we couldn’t find the page you’re looking for.</p>
      <Link href="/ask" className="text-blue-500 underline">
        Go Back to chat
      </Link>
    </div>
  );
}