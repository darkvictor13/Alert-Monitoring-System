//import '../styles/globals.css'
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";

const theme = createTheme({ palette: { mode: "dark" } });
const cache = createCache({ key: "css", prepend: true });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
