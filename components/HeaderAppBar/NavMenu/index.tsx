import MenuIcon from '@mui/icons-material/Menu';
import { ListItemIcon, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { FC, MouseEvent, useState } from 'react';
import { PageLink } from '..';

const NavMenu: FC<{ pages: PageLink[] }> = ({ pages }) => {
    const router = useRouter();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (href?: string) => {
        if (href) {
            router.push(href);
        }
        setAnchorElNav(null);
    };
    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                {pages.map(page => (
                    <MenuItem key={page.href} onClick={() => handleCloseNavMenu(page.href)}>
                        <ListItemIcon>
                            <page.Icon color="secondary" />
                        </ListItemIcon>
                        <Typography color="secondary" variant="button">
                            {page.displayName}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default NavMenu;
