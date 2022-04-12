import { Box, Paper, Typography } from '@mui/material';
import { useTr } from '~/texts';

type Props = {
    title?: string;
    bgImg?: string;
};

const PointHeader = ({ title, bgImg }: Props) => {
    const [tr] = useTr('collect');
    const text = title || tr('creatingPoint');
    const url = bgImg || tr('defaultBgImageUrl');

    return (
        <Paper
            sx={{
                position: 'relative',
                color: '#fff',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${url})`,
                borderRadius: '0px',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.5)',
                    height: '100%',
                    width: '100%',
                }}
            />
            <Box
                sx={{
                    position: 'relative',
                    px: { xs: 3, md: 6 },
                    pr: { md: 0 },
                    textAlign: 'center',
                    margin: '0 auto',
                    py: '5rem',
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 'bold' }} color="inherit">
                    {text}
                </Typography>
            </Box>
        </Paper>
    );
};

export default PointHeader;
