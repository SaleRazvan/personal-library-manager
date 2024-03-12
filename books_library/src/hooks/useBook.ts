import useSWR, { mutate } from "swr";
import axios from "axios";
import { Book, BookBody } from "../types/Book";

export type UseBookResponse = {
  books: Book[];
  isLoading: boolean;
  isError: Error | null;
  addBook: (newBook: Book) => Promise<void>;
  editBook: (bookToUpdate: Book) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
};

const getFetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useBook() {
  const { data, error, isLoading } = useSWR(
    `http://localhost:3001/books`,
    getFetcher
  );

  const addBook = async (newBook: BookBody) => {
    const response = await axios.post(`http://localhost:3001/books`, newBook);
    const createdBook = response.data;
    mutate(`http://localhost:3001/books`, [...data, createdBook], false);
    mutate(`http://localhost:3001/books`);
  };

  const editBook = async (bookToUpdate: Book) => {
    mutate(
      `http://localhost:3001/books`,
      data.map(
        (book: Book) => (book.id === bookToUpdate.id ? bookToUpdate : book),
        false
      )
    );
    await axios.put(
      `http://localhost:3001/books/${bookToUpdate.id}`,
      bookToUpdate
    );
    mutate(`http://localhost:3001/books`);
  };

  const deleteBook = async (id: string) => {
    mutate(
      `http://localhost:3001/books`,
      data.filter((book: Book) => book.id !== id),
      false
    );
    await axios.delete(`http://localhost:3001/books/${id}`);
    mutate(`http://localhost:3001/books`);
  };

  return {
    books: data,
    isLoading,
    isError: error,
    addBook,
    editBook,
    deleteBook,
  };
}
