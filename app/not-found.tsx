import type { Metadata } from "next";
import NotFoundClient from "./not-found.client";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description: "Sorry, the page you are looking for does not exist.",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub logo",
      },
    ],
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}