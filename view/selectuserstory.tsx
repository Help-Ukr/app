import CollectIcon from '@mui/icons-material/CategoryOutlined';
import TransportIcon from '@mui/icons-material/DirectionsBusFilled';
import DonateIcon from '@mui/icons-material/VolunteerActivism';
import { Box, Button, Container, SxProps, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useTr } from '~/texts';

const sxBox: SxProps = {
    display: 'flex',
    pt: 4,
    pb: 8,
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: { xs: 'column', md: 'row' },
    a: {
        width: { xs: '80%', md: 'unset' },
        textDecoration: 'none',
    },
};

export const SelectUserStory = () => {
    const [tr] = useTr('home');
    return (
        <Container>
            <Typography sx={{ textAlign: 'center' }} component="h3" variant="h3">
                {tr('iWantTo')}
            </Typography>
            <Box sx={sxBox}>
                <Link href={'/collect'} passHref>
                    <Button color="secondary" variant="contained" startIcon={<CollectIcon />}>
                        {tr('collect')}
                    </Button>
                </Link>
                <Link href={'/donate'} passHref>
                    <Button color="primary" variant="contained" startIcon={<DonateIcon />}>
                        {tr('donate')}
                    </Button>
                </Link>
                <Link href={'/transport'} passHref>
                    <Button color="secondary" variant="contained" startIcon={<TransportIcon />}>
                        {tr('transport')}
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};
