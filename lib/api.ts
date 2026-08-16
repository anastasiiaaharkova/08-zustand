//: typisation of request 

import axios from 'axios';
import type { Note } from '@/types/note';
import type { NoteTag } from '@/types/note';


const api = axios.create({
    baseURL: 'https://notehub-public.goit.study/api/',
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        accept: 'application/json',
    },
});

//: interface

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  tag: string;
} 

export interface CreateNoteRequest {
    title: string;
    content: string;
    tag: NoteTag;
}

//: functions

export const fetchNotes = async (search: string, page = 1, perPage = 12, tag = ""): Promise<FetchNotesResponse> => {
    const response = await api.get<FetchNotesResponse>('notes', {
        params: {
            search,
            page,
            perPage,
            ...(tag ? { tag } : {}),
        },
    });

    return response.data;
};


export const createNote = async (note: CreateNoteRequest): Promise<Note> => {
    const response = await api.post<Note>('notes', note);
    return response.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await api.delete<Note>(`notes/${id}`);
    return response.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const { data } = await api.get<Note>(`/notes/${id}`);
    return data;
};