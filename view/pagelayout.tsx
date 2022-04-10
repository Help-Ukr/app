import Head from 'next/head';
import { FC } from 'react';
import { HeaderAppBar } from '~/view/header/headre.appbar';
import { Notifications } from '~/view/notifications';

export const PageLayout: FC = ({ children }) => {
    return (
        <>
            <Head>
                <title>Stand with Ukraine</title>
                <meta name="description" content="Centralized Donations Management" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <HeaderAppBar />
            {children}
            <Notifications />
        </>
    );
};
