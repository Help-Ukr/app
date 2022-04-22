import { Card, CardActionArea, CardContent, CardMedia, SxProps, Tooltip, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { DonationPoint } from '~/model/donationpoint.model';
import { app } from '~/services/app';
import { AppUIService } from '~/services/appui.service';
import { DontationPointsService } from '~/services/donationpoints.service';
import { useTr } from '~/texts';

const sxCardContent: SxProps = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    px: { xs: 1, md: 2 },
    py: 1,
};

export const DonationPointCard = observer<{ pt: DonationPoint }>(({ pt }) => {
    const ptsvc = app.get(DontationPointsService);
    const ref = useRef<HTMLDivElement>(null);
    const appUi = app.get(AppUIService);
    const [tr] = useTr('pointDetails');

    useEffect(() => {
        if (ptsvc.selected === pt) {
            ref.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [ptsvc.selected, pt, appUi.donationsSidebarOpen]);

    return (
        <Card
            sx={{ maxHeight: 135 }}
            ref={ref}
            elevation={ptsvc.selected === pt ? 17 : 3}
            onClick={() => ptsvc.setSelected(pt)}
        >
            <CardActionArea sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 135, height: 135, objectFit: 'cover', display: { xs: 'none', md: 'flex' } }}
                    image={pt.img}
                    alt={`Donations from ${pt.name}`}
                />
                <CardContent sx={sxCardContent}>
                    <Typography variant="subtitle1" overflow="hidden" height={28}>
                        {pt.name}
                    </Typography>
                    <Typography sx={{ mt: 1 }} variant="subtitle2" overflow="hidden" height={22}>
                        {pt.needed_items.map(item => (
                            <Tooltip key={item.item_category_id} title={item.item_category_name || ''}>
                                <span>{item.item_category_icon}</span>
                            </Tooltip>
                        ))}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" overflow="hidden" height={40}>
                        {pt.location.address}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {tr('distance', { dist: pt.distanceStr })}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
});
