import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from 'next';

interface NotesProps {
  params: Promise<{ slug: string[] }>
}

type Props = {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tag = slug[0];
   const title =
    tag === "all" ? "All notes | NoteHub" : `Notes tagged ${tag} | NoteHub`;

  const description =
    tag === "all"
      ? "Browse all notes in NoteHub."
      : `Browse notes tagged ${tag} in NoteHub.`;

  return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: 'https://notehub.com/',
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'NoteHub logo',
                },
            ],
        }
    }
};

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes("", 1, 12, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

