import PageLayout from '@cmts/PageLayout';
import { Box } from '@mui/material';
import type { NextPage } from 'next';
import { ComingSoon } from '~/view/soon';

const Transport: NextPage = () => {
    return (
        <PageLayout>
            <Box sx={{ height: '100vh', width: '100vw', display: 'flex', position: 'absolute', top: 0 }}>
                <ComingSoon />
            </Box>
        </PageLayout>
    );
};

export default Transport;
