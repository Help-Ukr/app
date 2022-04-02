import CollectIcon from '@mui/icons-material/CategoryOutlined';
import TransportIcon from '@mui/icons-material/DirectionsBusFilled';
import DonateIcon from '@mui/icons-material/VolunteerActivism';
import { Box, Button, Container, SxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const sxBox: SxProps = {
    display: 'flex',
    my: 4,
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: { xs: 'column', md: 'row' },
    a: {
        width: { xs: '80%', md: 'unset' },
        textDecoration: 'none',
    },
};

const SelectUserStory = () => {
    const router = useRouter();
    return (
        <Container>
            <Typography sx={{ textAlign: 'center' }} component="h3" variant="h3">
                I want to...
            </Typography>
            <Box sx={sxBox}>
                <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<CollectIcon />}
                    onClick={() => router.push('/collect')}
                >
                    Collect donations
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<DonateIcon />}
                    onClick={() => router.push('/donate')}
                >
                    Donate goods
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<TransportIcon />}
                    onClick={() => router.push('/transport')}
                >
                    Transport goods
                </Button>
            </Box>
        </Container>
    );
};

export default SelectUserStory;
