export type Book = {
  id: string;
} & BookBody;

export type BookBody = {
  title: string;
  author: string;
  genre: string;
  description: string;
};
