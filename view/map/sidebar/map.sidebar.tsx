import { Paper, SwipeableDrawer, SxProps } from '@mui/material';
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
    const ptsvc = app.get(DontationPointsService);
    const appUi = app.get(AppUIService);
    const isMobile = appUi.useIsMobile();

    return (
        <>
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
