import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
import Button from "@mui/material/Button";
import EditBooks from "./EditBooks";
import { useState } from "react";
import { UseBookResponse, useBook } from "../hooks/useBook";
import { Book } from "../types/Book";

export default function Books() {
  const [isEditingBookId, setIsEditingBookId] = useState<string | null>(null);
  const { books, isLoading, isError, editBook, deleteBook }: UseBookResponse =
    useBook();

  const editBookHandler = (values: Book) => {
    editBook(values);
    setIsEditingBookId(null);
  };

  const deleteBookHandler = (id: string) => {
    deleteBook(id);
  };

  const editMenuOpenHandler = (id: string) => {
    if (isEditingBookId !== id) {
      setIsEditingBookId(id);
    } else {
      setIsEditingBookId(null);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <CircularProgress />
      </Box>
    );
  } else if (isError) {
    return (
      <Box sx={{ textAlign: "center", mt: 2, color: "#D32F2F" }}>
        {isError.message}
      </Box>
    );
  } else if (books.length === 0) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Box component="h2">No books available, please add some</Box>
      </Box>
    );
  } else
    return (
      <TableContainer
        component={Paper}
        sx={{
          margin: "0 auto",
          border: "1px solid black",
          maxWidth: "1000px",
        }}
      >
        <Table
          aria-label="Table of books"
          sx={{
            "& .MuiTableCell-root": {
              fontSize: { xs: "12px", md: "14px" },
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Author</TableCell>
              <TableCell align="center">Genre</TableCell>
              <TableCell align="center">Desc</TableCell>
              <TableCell align="center">Interact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell align="center">{book.title}</TableCell>
                <TableCell align="center">{book.author}</TableCell>
                <TableCell align="center">{book.genre}</TableCell>
                <TableCell align="center">{book.description}</TableCell>
                <TableCell align="center">
                  <Stack
                    flexDirection={{ xs: "column", md: "row" }}
                    justifyContent="center"
                    alignItems="center"
                    gap="10px"
                  >
                    <Button
                      variant="contained"
                      onClick={() => editMenuOpenHandler(book.id)}
                    >
                      {isEditingBookId === book.id ? "Close" : "Edit"}
                    </Button>
                    {isEditingBookId === book.id && (
                      <EditBooks onEdit={editBookHandler} book={book} />
                    )}
                    <Button
                      onClick={() => deleteBookHandler(book.id)}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
