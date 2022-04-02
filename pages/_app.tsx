import { createTheme, ThemeProvider } from '@mui/material';
import { configure } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import type { AppProps } from 'next/app';
import 'reflect-metadata';
import { TrProvider } from '~/texts';
import '../styles/globals.css';

export const themeOptions = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#393939',
        },
        secondary: {
            main: '#FFD500',
        },
    },
});

enableStaticRendering(typeof window === 'undefined');

configure({
    enforceActions: 'always',
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <TrProvider>
            <ThemeProvider theme={themeOptions}>
                <Component {...pageProps} />
            </ThemeProvider>
        </TrProvider>
    );
}

export default MyApp;
