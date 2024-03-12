import Button from "@mui/material/Button";
import { Box, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Book } from "../types/Book";

type EditBooksProps = {
  book: Book;
  onEdit: (values: Book) => void;
};

export default function EditBooks({ book, onEdit }: EditBooksProps) {
  const formik = useFormik({
    initialValues: {
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
    },
    onSubmit: (values) => {
      onEdit(values);
    },
  });
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Stack gap="8px">
        <TextField
          id="title"
          name="title"
          label="Title"
          inputProps={{ maxLength: 15 }}
          error={formik.values.title.trim() === ""}
          helperText={
            formik.values.title.trim() === "" ? "Please fill the field" : ""
          }
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <TextField
          id="author"
          name="author"
          label="Author"
          inputProps={{ maxLength: 15 }}
          error={formik.values.author.trim() === ""}
          helperText={
            formik.values.author.trim() === "" ? "Please fill the field" : ""
          }
          value={formik.values.author}
          onChange={formik.handleChange}
        />
        <TextField
          id="genre"
          name="genre"
          label="Genre"
          inputProps={{ maxLength: 15 }}
          error={formik.values.genre.trim() === ""}
          helperText={
            formik.values.genre.trim() === "" ? "Please fill the field" : ""
          }
          value={formik.values.genre}
          onChange={formik.handleChange}
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          inputProps={{ maxLength: 15 }}
          error={formik.values.description.trim() === ""}
          helperText={
            formik.values.description.trim() === ""
              ? "Please fill the field"
              : ""
          }
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </Stack>
      <Button
        disabled={Object.values(formik.values).some(
          (value) => value.toString().trim() === ""
        )}
        variant="contained"
        type="submit"
        sx={{ mt: 2 }}
      >
        Save
      </Button>
    </Box>
  );
}
