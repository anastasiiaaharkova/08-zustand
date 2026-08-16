"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundClient() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}