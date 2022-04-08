import IconPhone from '@mui/icons-material/Call';
import IconInstagram from '@mui/icons-material/Instagram';
import IconNavigate from '@mui/icons-material/Navigation';
import IconShare from '@mui/icons-material/Share';
import IconTelegram from '@mui/icons-material/Telegram';
import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { DonationPoint } from '~/model/donationpoint.model';
import { useTr } from '~/texts';

export const DonationPointDetails: FC<{ pt: DonationPoint }> = ({ pt }) => {
    const [tr] = useTr('map');

    return (
        <Card sx={{ backgroundColor: 'transparent', p: 0, m: 0, minWidth: 256, width: 256 }} elevation={0}>
            <CardHeader title={pt.name} subheader={pt.location.address} />
            {/* <CardMedia
                component="img"
                sx={{ height: { xs: 80, md: 120 }, objectFit: 'scale-down' }}
                image={pt.image}
                alt={`Donations from ${pt.name}`}
            /> */}
            <CardContent>
                {pt.needed_items.map(item => (
                    <div key={item.item_category_id}>
                        <Typography display="inline" variant="h6">
                            {item.item_category_icon}
                        </Typography>
                        <Typography display="inline" variant="subtitle2">
                            {item.item_category_name}
                        </Typography>
                    </div>
                ))}
                <Typography variant="body2" color="text.secondary">
                    {tr('distance', { dist: pt.distanceStr })}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <IconButton>
                    <IconPhone />
                </IconButton>
                <IconButton>
                    <IconTelegram />
                </IconButton>
                <IconButton>
                    <IconInstagram />
                </IconButton>
                <IconButton>
                    <IconNavigate />
                </IconButton>
                <IconButton>
                    <IconShare />
                </IconButton>
            </CardActions>
        </Card>
    );
};
