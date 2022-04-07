import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import { IconButton, Paper, SwipeableDrawer, SxProps, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { app } from '~/services/app';
import { AppUIService } from '~/services/appui.service';
import { DontationPointsService } from '~/services/donationpoints.service';
import { DonationPointCard } from './donation.point.card';
import { DonationPointSearch } from './donation.point.filter';

const paperSxProps: SxProps = {
    top: { xs: 56, md: 64 },
    width: { xs: '80%', md: 400 },
    backgroundColor: { md: 'transparent', xs: '#262626f1' },
};

export const MapSidebar = observer(() => {
    const theme = useTheme();
    const ptsvc = app.get(DontationPointsService);
    const appUi = app.get(AppUIService);
    const isMobile = appUi.useIsMobile();

    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 80,
                        right: 20,
                        backgroundColor: theme.palette.primary.main,
                        ':hover': { backgroundColor: theme.palette.primary.main },
                    }}
                    onClick={appUi.openDonationSidebar}
                >
                    <ShareLocationIcon color="secondary" />
                </IconButton>
            </Box>
            <SwipeableDrawer
                anchor="left"
                keepMounted
                open={appUi.donationsSidebarOpen}
                onOpen={appUi.openDonationSidebar}
                onClose={appUi.closeDonationSidebar}
                variant={isMobile ? 'temporary' : 'permanent'}
                PaperProps={{ sx: paperSxProps }}
            >
                <Paper sx={{ m: 1 }}>
                    <DonationPointSearch />
                </Paper>
                <Box sx={{ px: 1, overflowY: 'auto', height: 'calc(100vh - 135px)' }}>
                    {ptsvc.filtered.map(pt => (
                        <Box sx={{ mt: 1 }} key={pt.id}>
                            <DonationPointCard pt={pt} />
                        </Box>
                    ))}
                </Box>
            </SwipeableDrawer>
        </>
    );
});

export default MapSidebar;
