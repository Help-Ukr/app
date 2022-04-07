import { Card, CardContent, CardMedia, SxProps, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { DonationPoint } from '~/model/donationpoint.model';
import { app } from '~/services/app';
import { AppUIService } from '~/services/appui.service';
import { DontationPointsService } from '~/services/donationpoints.service';

type Props = {
    pt: DonationPoint;
};

const sxCard: SxProps = {
    flex: '1 0 auto',
    padding: { xs: 1, md: 2 },
    pointerEvents: 'none',
    ':last-child': { paddingBottom: { xs: 1, md: 2 } },
};

export const DonationPointCard = observer(({ pt }: Props) => {
    const ptsvc = app.get(DontationPointsService);
    const ref = useRef<HTMLDivElement>(null);
    const appUi = app.get(AppUIService);

    useEffect(() => {
        if (ptsvc.selected === pt) {
            console.log('scroll', !!ref.current);

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
                sx={{ width: { xs: 80, md: 120 }, objectFit: 'scale-down' }}
                image={pt.image}
                alt={`Donations from ${pt.name}`}
            />
            <CardContent sx={sxCard}>
                <Typography variant="subtitle1">{pt.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {pt.location.address}
                </Typography>
                <Typography sx={{ mt: 1 }} variant="subtitle2">
                    {pt.needed_items.map(item => item.item_category_icon)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {pt.distanceStr}
                </Typography>
            </CardContent>
        </Card>
    );
});
