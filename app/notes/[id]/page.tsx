import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface NoteProps {
    params: Promise<{
    id: string;
  }>;
}


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