import { createTheme } from '@mui/material';

export const themeOptions = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#e9e9e9',
        },
        secondary: {
            main: '#FFD500',
        },
        background: {
            paper: '#262626',
        },
    },
    components: {
        MuiFab: {
            styleOverrides: {
                root: {
                    backgroundColor: '#3a3a3a',
                    ':hover': {
                        backgroundColor: '#6a6a6a',
                    },
                },
            },
        },
    },
});
