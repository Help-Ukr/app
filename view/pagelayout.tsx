import { Paper } from '@mui/material';
import Head from 'next/head';
import { FC } from 'react';
import { useTr } from '~/texts';
import { HeaderAppBar } from '~/view/header/header.appbar';
import { Notifications } from '~/view/notifications';

export const PageLayout: FC = ({ children }) => {
    const [tr] = useTr('meta');
    return (
        <Paper sx={{ minHeight: '100vh', borderRadius: 0 }} elevation={0}>
            <Head>
                <title>{tr('title')}</title>
                <meta name="description" content={tr('description')} />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <HeaderAppBar />
            {children}
            <Notifications />
        </Paper>
    );
};
