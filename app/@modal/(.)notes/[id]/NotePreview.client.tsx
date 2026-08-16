"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";

function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={() => router.back()}>
      <h2>{note.title}</h2>
      <p>{note.tag}</p>
      <p>{note.content}</p>
      <p>{new Date(note.createdAt).toLocaleDateString()}</p>
    </Modal>
  );
}

export default NotePreviewClient;