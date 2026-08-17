import css from './NoteForm.module.css';
import type { NoteTag } from '../../types/note';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { createNote } from '@/lib/api';

export interface NoteFormValues {
    title: string;
    content: string;
    tag: NoteTag;
}

interface NoteFormProps {
    onCancel: () => void;
}


export default function NoteForm({
  onCancel,
}: NoteFormProps) {

  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const queryClient = useQueryClient();

    const createMutation = useMutation({
  mutationFn: createNote,
  onSuccess: () => {
    clearDraft();

  queryClient.invalidateQueries({
    queryKey: ['notes'],
  });

  router.push('/notes/filter/all');
},

    });

    
  
  const formAction = (formData: FormData) => {
  const values: NoteFormValues = {
    title: String(formData.get("title")),
    content: String(formData.get("content")),
    tag: formData.get("tag") as NoteTag,
  };

  createMutation.mutate(values);
};


    return (
      
      <form className={css.form} action={formAction}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>

            <input
              id="title"
              type="text"
            name="title"
            required
        minLength={3}
        maxLength={50}
            className={css.input}
            defaultValue={draft.title}
  onChange={(event) => setDraft({ title: event.target.value })}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>

            <textarea
              id="content"
              name="content"
             rows={8}
        className={css.textarea}
            maxLength={500}
            defaultValue={draft.content}
  onChange={(event) => setDraft({ content: event.target.value })}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>

            <select
              id="tag"
            name="tag"
            defaultValue={draft.tag}
            className={css.select}
            required
            onChange={(event) =>
    setDraft({ tag: event.target.value as NoteTag })
  }
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
  type="submit"
  className={css.submitButton}
  disabled={createMutation.isPending}
>
  Create note
</button>
          </div>
        </form>
      )};