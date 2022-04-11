import { Card, CardContent, CardMedia, SxProps, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { DonationPoint } from '~/model/donationpoint.model';
import { app } from '~/services/app';
import { AppUIService } from '~/services/appui.service';
import { DontationPointsService } from '~/services/donationpoints.service';

const sxCardContent: SxProps = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    px: { xs: 1, md: 2 },
    py: 1,
    pointerEvents: 'none',
};

export const DonationPointCard = observer<{ pt: DonationPoint }>(({ pt }) => {
    const ptsvc = app.get(DontationPointsService);
    const ref = useRef<HTMLDivElement>(null);
    const appUi = app.get(AppUIService);

    useEffect(() => {
        if (ptsvc.selected === pt) {
            ref.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [ptsvc.selected, pt, appUi.donationsSidebarOpen]);

    return (
        <Card
            ref={ref}
            sx={{ display: 'flex', width: '100%' }}
            elevation={ptsvc.selected === pt ? 17 : 3}
            onClick={() => ptsvc.setSelected(pt)}
        >
            <CardMedia
                component="img"
                sx={{ width: { xs: 80, md: 120 }, objectFit: 'cover', display: { xs: 'none', md: 'block' } }}
                image={pt.img}
                alt={`Donations from ${pt.name}`}
            />
            <CardContent sx={sxCardContent}>
                <Typography sx={{ whiteSpace: { xs: 'nowrap' } }} variant="subtitle1">
                    {pt.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {pt.location.address}
                </Typography>
                <Typography sx={{ mt: 1 }} variant="subtitle2">
                    {pt.needed_items.map(item => (
                        <span key={item.item_category_id} title={item.item_category_name ?? ''}>
                            {item.item_category_icon}
                        </span>
                    ))}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {pt.distanceStr}
                </Typography>
            </CardContent>
        </Card>
    );
});
