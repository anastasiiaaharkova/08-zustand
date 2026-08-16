"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetailsClient.module.css";

function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>

          <p className={css.tag}>{note.tag}</p>

          <p className={css.content}>{note.content}</p>

          <p className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}

export default NoteDetailsClient;