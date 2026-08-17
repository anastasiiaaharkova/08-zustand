import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CreateNoteRequest }  from '../api';

const initialDraft: CreateNoteRequest = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteDraftStore = {
  draft: CreateNoteRequest;
  setDraft: (note: Partial<CreateNoteRequest>) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>()(
    persist(
        (set) => ({
  draft: initialDraft,
    setDraft: (note) => set((state) => ({
        draft: {
            ...state.draft,
            ...note,
        } })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
        }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    },));



