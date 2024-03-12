import AddBooks from "./components/AddBooks";
import Books from "./components/Books";
import "./App.css";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <Box className="title">
        <Box component="h1">Personal library management</Box>
      </Box>
      <AddBooks />
      <Books />
    </>
  );
}

export default App;
