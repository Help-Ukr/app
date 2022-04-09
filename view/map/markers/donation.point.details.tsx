import IconPhone from '@mui/icons-material/Call';
import IconCopy from '@mui/icons-material/ContentCopy';
import IconInstagram from '@mui/icons-material/Instagram';
import IconNavigate from '@mui/icons-material/Navigation';
import IconShare from '@mui/icons-material/Share';
import IconTelegram from '@mui/icons-material/Telegram';
import { Box, Card, CardActions, CardContent, CardHeader, Fab, IconButton, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { DonationPoint } from '~/model/donationpoint.model';
import { useTr } from '~/texts';

export const DonationPointDetails: FC<{ pt: DonationPoint }> = ({ pt }) => {
    const [tr] = useTr('pointDetails');
    console.log(pt.image);

    return (
        <Card sx={{ backgroundColor: 'transparent', p: 0, m: 0, minWidth: 256, width: 256 }} elevation={0}>
            <CardHeader
                subheader={
                    <Typography variant="body2" color="text.secondary">
                        {pt.location.address}
                    </Typography>
                }
                title={<Typography variant="body1">{pt.name}</Typography>}
            />
            <CardContent sx={{ py: 0 }}>
                <Box minHeight="10vh" maxHeight="20vh" overflow="auto" mb={1}>
                    {pt.needed_items.map(item => (
                        <div key={item.item_category_id}>
                            <Typography display="inline">{item.item_category_icon}</Typography>
                            <Typography display="inline" variant="subtitle2" sx={{ ml: 2 }}>
                                {item.item_category_name}
                            </Typography>
                        </div>
                    ))}
                </Box>
                <Typography sx={{ m: 0 }} variant="body2" color="text.secondary">
                    {tr('distance', { dist: pt.distanceStr })}
                </Typography>
            </CardContent>
            <Fab
                id="123"
                sx={{
                    position: 'absolute',
                    right: 14,
                    bottom: 58,
                    width: '20%',
                    height: 'unset',
                    backgroundImage: `url(${pt.image})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    boxShadow:
                        '0px 2px 3px -1px rgb(0 0 0 / 10%), 0px 3px 5px 0px rgb(0 0 0 / 7%), 0px 1px 9px 0px rgb(0 0 0 / 6%)',
                    ':after': {
                        content: '""',
                        display: 'block',
                        paddingBottom: '100%',
                    },
                }}
                onClick={e => {
                    (e.target as any).classList.add('expand-fab');
                }}
            ></Fab>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Tooltip title={tr('call', { phone: pt.phone })}>
                    <IconButton disabled={!pt.phone} href={pt.phoneLink}>
                        <IconPhone />
                    </IconButton>
                </Tooltip>
                <Tooltip title={tr('telegram', { tg: pt.telegram })}>
                    <IconButton disabled={!pt.telegram} href={pt.telegramLink} target="_blank">
                        <IconTelegram />
                    </IconButton>
                </Tooltip>
                <Tooltip title={tr('instagram', { insta: pt.instagram })}>
                    <IconButton disabled={!pt.instagram} href={pt.instagramLink} target="_blank">
                        <IconInstagram />
                    </IconButton>
                </Tooltip>
                <Tooltip title={tr('navigate', { addr: pt.location.address })}>
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
