import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import Link from 'next/link';
import { app } from '~/services/app';
import { AppUIService } from '~/services/appui.service';
import { useTr } from '~/texts';
import { LangMenu } from './header.langmenu';
import { NavMenu } from './header.navmenu';
import { UserMenu } from './header.usermenu';

export const HeaderAppBar = () => {
    const [tr] = useTr('routes');
    const appUi = app.get(AppUIService);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Image src={'/images/logo.png'} width={40} height={40} alt="logoImg" />
                </Box>
                <NavMenu />
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {appUi.pages.map(page => (
                        <Link key={page.href} href={'url' in page ? page.url : page.href} passHref>
                            <Button color="secondary">{tr(page.href)}</Button>
                        </Link>
                    ))}
                </Box>
                <LangMenu />
                <UserMenu />
            </Toolbar>
        </AppBar>
    );
};
