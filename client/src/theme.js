import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: Array(20).fill("none"), //["none"] | 2,
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
