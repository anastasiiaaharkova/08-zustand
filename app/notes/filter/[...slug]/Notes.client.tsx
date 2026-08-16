"use client";

import css from "./Notes.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";

function NotesClient({ tag }: { tag?: string }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", search, page, tag],
    queryFn: () => fetchNotes(search, page, 12, tag),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}

      {isError && <p>Something went wrong.</p>}

      {!isLoading && !isError && notes.length > 0 && (
        <NoteList notes={notes} />
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;