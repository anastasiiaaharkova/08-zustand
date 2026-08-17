import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from 'next';

interface NoteProps {
    params: Promise<{
    id: string;
  }>;
}

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const note = await fetchNoteById(id)
    return {
        title: `Note: ${note.title}`,
        description: note.content.slice(0, 30),
        openGraph: {
            title: `Note: ${note.title}`,
            description: note.content.slice(0, 30),
            url: `https://notehub.com/notes/${id}`,
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


    async function Note({ params }: NoteProps) {

        const { id } = await params;

        const queryClient = new QueryClient();

        await queryClient.prefetchQuery({
            queryKey: ['note', id],
            queryFn: () => fetchNoteById(id),
        });
        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NoteDetailsClient />
            </HydrationBoundary>
        );
    }

export default Note;