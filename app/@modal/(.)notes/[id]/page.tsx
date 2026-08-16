import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import NotePreviewClient from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";

interface NotesProps {
  params: Promise<{ id: string }>
}

const NotePreview = async ({ params }: NotesProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  })

          return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
    
};

export default NotePreview;