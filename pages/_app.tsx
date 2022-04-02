import { ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '~/styles/globals.css';
import { themeOptions } from '~/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={themeOptions}>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ThemeProvider>
    );
}

export default MyApp;
