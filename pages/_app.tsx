import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";

export const themeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#393939",
    },
    secondary: {
      main: "#FFD500",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themeOptions}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
