import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface HeroSectionProps {
    title: string;
    subtitle: string;
    imgSrc: string;
}

export default function HeroSection({ title, subtitle, imgSrc }: HeroSectionProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${imgSrc})`,
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
                <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ fontWeight: 'bold' }} color="inherit" paragraph>
                    {title}
                </Typography>
                <Typography variant={isMobile ? 'h6' : 'h4'} color="inherit" paragraph>
                    {subtitle}
                </Typography>
            </Box>
        </Paper>
    );
}
