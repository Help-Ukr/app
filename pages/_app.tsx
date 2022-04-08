import { ThemeProvider } from '@mui/material';
import { configure } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '~/styles/globals.css';
import { themeOptions } from '~/styles/theme';
import { TrProvider } from '~/texts';

enableStaticRendering(typeof window === 'undefined');

configure({
    enforceActions: 'always',
    useProxies: 'never',
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <TrProvider>
            <ThemeProvider theme={themeOptions}>
                <SessionProvider session={pageProps.session}>
                    <Component {...pageProps} />
                </SessionProvider>
            </ThemeProvider>
        </TrProvider>
    );
}

export default MyApp;
