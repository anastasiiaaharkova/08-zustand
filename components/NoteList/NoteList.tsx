import css from './NoteList.module.css'
import type { Note } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';

export interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {

    const queryClient = useQueryClient();

const deleteMutation = useMutation({
  mutationFn: deleteNote,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['notes'],
    });
  },
});
    return (
    

        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.listItem}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                <div className={css.footer}>
                  <span className={css.tag}>{note.tag}</span>
                  <Link className={css.link} href={`/notes/${note.id}`}>
                    View details
                  </Link>
                        <button
  className={css.button}
  onClick={() => deleteMutation.mutate(note.id)}
  disabled={deleteMutation.isPending}
>
  Delete
</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}


 