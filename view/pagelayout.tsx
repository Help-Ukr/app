import { Paper } from '@mui/material';
import Head from 'next/head';
import { FC } from 'react';
import { useTr } from '~/texts';
import { HeaderAppBar } from '~/view/header/headre.appbar';
import { Notifications } from '~/view/notifications';

export const PageLayout: FC = ({ children }) => {
    const [tr] = useTr('meta');
    return (
        <Paper sx={{ minHeight: '100vh', borderRadius: 0 }} elevation={0}>
            <Head>
                <title>{tr('title')}</title>
                <meta name="description" content={tr('description')} />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <HeaderAppBar />
            {children}
            <Notifications />
        </Paper>
    );
};
