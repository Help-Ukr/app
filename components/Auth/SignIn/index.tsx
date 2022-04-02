import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button, Grid, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import { FC } from 'react';

const AuthSignIn: FC<{ providers: ClientSafeProvider[] }> = ({ providers }) => {
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(/images/hero.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 16,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h6" textAlign="center">
                        Sign in to create a collection point
                    </Typography>
                    <Box sx={{ mt: 8 }}>
                        {Object.values(providers).map(provider => (
                            <Box key={provider.id}>
                                <Button variant="outlined" color="secondary" onClick={() => signIn(provider.id)}>
                                    Sign in with {provider.name}
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </Box>{' '}
            </Grid>
        </Grid>
    );
};

export default AuthSignIn;
