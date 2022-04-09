import LogoutIcon from '@mui/icons-material/Logout';
import { ListItemIcon, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { MouseEvent, useCallback, useState } from 'react';
import { useTr } from '~/texts';

export const UserMenu = () => {
    const [tr] = useTr('auth');
    const router = useRouter();
    const { data: session, status } = useSession();
    const isLoggedIn = status === 'authenticated';
    const user = session?.user;
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const logOut = useCallback(async () => {
        handleCloseUserMenu();
        await signOut({ redirect: false });
        router.push('/signin');
    }, [router]);

    return (
        <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="User avatar" src={user?.image || undefined} />
                    </IconButton>
                </Tooltip>
            ) : (
                <Button color="secondary" variant="text" onClick={() => signIn()}>
                    {tr('login')}
                </Button>
            )}
            <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={logOut}>
                    <ListItemIcon>
                        <LogoutIcon color="secondary" />
                    </ListItemIcon>
                    <Typography color="secondary" variant="button">
                        {tr('logout')}
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};
