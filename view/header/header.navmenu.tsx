import MenuIcon from '@mui/icons-material/Menu';
import { ListItemIcon, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { FC, MouseEvent, useState } from 'react';
import { app } from '~/services/app';
import { AppUIService } from '~/services/appui.service';
import { useTr } from '~/texts';

export const NavMenu: FC = () => {
    const router = useRouter();
    const [tr] = useTr('routes');
    const appUi = app.get(AppUIService);

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (page?: { href: string; url?: string }) => {
        if (page) {
            if (page.url) {
                window.open(page.url);
            } else {
                router.push(page.href);
            }
        }
        setAnchorElNav(null);
    };
    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="secondary"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu()}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
                {appUi.pages.map(page => (
                    <MenuItem key={page.href} onClick={() => handleCloseNavMenu(page)}>
                        <ListItemIcon>
                            <page.Icon color="secondary" />
                        </ListItemIcon>
                        <Typography color="secondary" variant="button">
                            {tr(page.href)}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
            <Typography variant="button">{tr(router.pathname as any)}</Typography>
        </Box>
    );
};
