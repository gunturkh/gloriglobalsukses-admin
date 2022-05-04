// In theme.js
import { defaultTheme } from "react-admin";
import { createTheme } from '@mui/material/styles';
import merge from "lodash/merge";

export const theme = createTheme(
  merge({}, defaultTheme, {
    palette: {
      // Your theme goes here
      // Write the following code to have an orange app bar. We'll explain it later in this article.
      primary: {
        main: "#ff9800",
      },
      secondary: {
        main: "#ba5502", // Not far from orange
      },
    }
  })
);
