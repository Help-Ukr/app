import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';
import { DonationPoint } from '~/model/donationpoint.model';

export const DonationPointDetails: FC<{ pt: DonationPoint }> = ({ pt }) => {
    return (
        <Card sx={{ backgroundColor: 'transparent', p: 0, m: 0, minWidth: 200, width: 200 }} elevation={0}>
            <CardHeader title={pt.name} subheader={pt.location.address} />
            <CardMedia
                component="img"
                sx={{ height: { xs: 80, md: 120 }, objectFit: 'scale-down' }}
                image={pt.image}
                alt={`Donations from ${pt.name}`}
            />
            <CardContent>
                <Typography sx={{ mt: 1 }} variant="subtitle2">
                    {pt.needed_items.map(item => item.item_category_icon)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {pt.distanceStr}
                </Typography>
            </CardContent>
        </Card>
    );
};
