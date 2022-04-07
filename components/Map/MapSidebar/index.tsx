import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import { IconButton, Paper, SwipeableDrawer, SxProps, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { app } from '~/services/app';
import { DontationPointsService } from '~/services/donationpoints.service';
import CollectionPointCard from './CollectionPointCard';
import CollectionSearch from './CollectionSearch';

const MapSidebar = observer(() => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const ptsvc = app.get(DontationPointsService);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const paperSxProps: SxProps = isMobile
        ? { top: 56, width: '80%' }
        : { top: 64, width: 400, backgroundColor: 'unset' };

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
                    onClick={() => setOpen(true)}
                >
                    <ShareLocationIcon color="secondary" />
                </IconButton>
            </Box>
            <SwipeableDrawer
                anchor="left"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                variant={isMobile ? 'temporary' : 'permanent'}
                PaperProps={{ sx: paperSxProps }}
            >
                <Paper sx={{ m: 1 }}>
                    <CollectionSearch />
                </Paper>
                <Box sx={{ px: 1, overflowY: 'auto', height: 'calc(100vh - 135px)' }}>
                    {ptsvc.filtered.map(pt => (
                        <Box sx={{ mt: 1 }} key={pt.id}>
                            <CollectionPointCard pt={pt} />
                        </Box>
                    ))}
                </Box>
            </SwipeableDrawer>
        </>
    );
});

export default MapSidebar;
