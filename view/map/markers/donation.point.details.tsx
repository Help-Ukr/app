import IconPhone from '@mui/icons-material/Call';
import IconCopy from '@mui/icons-material/ContentCopy';
import IconInstagram from '@mui/icons-material/Instagram';
import IconNavigate from '@mui/icons-material/Navigation';
import IconShare from '@mui/icons-material/Share';
import IconTelegram from '@mui/icons-material/Telegram';
import { Card, CardActions, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { DonationPoint } from '~/model/donationpoint.model';
import { useTr } from '~/texts';

export const DonationPointDetails: FC<{ pt: DonationPoint }> = ({ pt }) => {
    const [tr] = useTr('pointDetails');

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
                <Tooltip title={tr('call')}>
                    <IconButton disabled={!pt.phone} href={pt.phoneLink}>
                        <IconPhone />
                    </IconButton>
                </Tooltip>
                <Tooltip title={tr('telegram')}>
                    <IconButton disabled={!pt.telegram} href={pt.telegramLink} target="_blank">
                        <IconTelegram />
                    </IconButton>
                </Tooltip>
                <Tooltip title={tr('instagram')}>
                    <IconButton disabled={!pt.instagram} href={pt.instagramLink} target="_blank">
                        <IconInstagram />
                    </IconButton>
                </Tooltip>
                <Tooltip title={tr('navigate')}>
                    <IconButton href={pt.navigateLink} target="_blank">
                        <IconNavigate />
                    </IconButton>
                </Tooltip>
                <Tooltip title={pt.canShare ? tr('share') : tr('copy')}>
                    <IconButton onClick={pt.share}>{pt.canShare ? <IconShare /> : <IconCopy />}</IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};
