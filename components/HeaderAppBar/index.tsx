import { SxProps } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import Link from 'next/link';
import { app } from '~/services/app';
import { AppUIService } from '~/services/appui.service';
import { useTr } from '~/texts';
import LangMenu from './LangMenu';
import NavMenu from './NavMenu';
import UserMenu from './UserMenu';
import logoImg from '/images/logo.png';

const Logo = (props: { sx: SxProps }) => {
    return (
        <Box sx={props.sx}>
            <Image src={logoImg} width={40} height={40} alt="logoImg" />
        </Box>
    );
};

const HeaderAppBar = () => {
    const [tr] = useTr('routes');
    const appUi = app.get(AppUIService);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Logo sx={{ display: { xs: 'none', md: 'block' } }} />
                <NavMenu />
                {/* <Logo sx={{ display: { xs: 'flex', md: 'none', flexGrow: '1' } }} /> */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {appUi.pages.map(page => (
                        <Link key={page.href} href={page.href} passHref>
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
export default HeaderAppBar;
