import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

const AuthLayout: FC = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const isLoggedIn = !!session;

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/signin');
        }
    }, [router, status]);

    return <Box>{isLoggedIn ? children : null}</Box>;
};

export default AuthLayout;
