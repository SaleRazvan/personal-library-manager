import Button from "@mui/material/Button";
import { Box, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useBook } from "../hooks/useBook";

export default function AddBooks() {
  const { addBook } = useBook();

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      genre: "",
      description: "",
    },
    onSubmit: (values, { resetForm }) => {
      addBook(values);
      resetForm();
    },
  });
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        gap="8px"
        sx={{ mt: "16px" }}
      >
        <TextField
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          inputProps={{ maxLength: 15 }}
          error={formik.values.title.trim() === ""}
          helperText={
            formik.values.title.trim() === ""
              ? "Please fill the field"
              : "Field OK"
          }
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <TextField
          id="author"
          name="author"
          label="Author"
          variant="outlined"
          inputProps={{ maxLength: 15 }}
          error={formik.values.author.trim() === ""}
          helperText={
            formik.values.author.trim() === ""
              ? "Please fill the field"
              : "Field OK"
          }
          value={formik.values.author}
          onChange={formik.handleChange}
        />
        <TextField
          id="genre"
          name="genre"
          label="Genre"
          variant="outlined"
          inputProps={{ maxLength: 15 }}
          error={formik.values.genre.trim() === ""}
          helperText={
            formik.values.genre.trim() === ""
              ? "Please fill the field"
              : "Field OK"
          }
          value={formik.values.genre}
          onChange={formik.handleChange}
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          inputProps={{ maxLength: 15 }}
          error={formik.values.description.trim() === ""}
          helperText={
            formik.values.description.trim() === ""
              ? "Please fill the field"
              : "Field OK"
          }
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </Stack>
      <Stack flexDirection="row" justifyContent="center">
        <Button
          disabled={Object.values(formik.values).some(
            (value) => value.trim() === ""
          )}
          variant="contained"
          type="submit"
          sx={{ my: "16px" }}
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
}
