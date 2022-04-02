import CollectIcon from '@mui/icons-material/CategoryOutlined';
import TransportIcon from '@mui/icons-material/DirectionsBusFilled';
import HomeIcon from '@mui/icons-material/Home';
import DonateIcon from '@mui/icons-material/VolunteerActivism';
import { SxProps } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import LangMenu from './LangMenu';
import NavMenu from './NavMenu';
import UserMenu from './UserMenu';
import logoImg from '/images/logo.png';

export interface PageLink {
    href: string;
    displayName: string;
    Icon: React.ElementType;
}

const pages: PageLink[] = [
    {
        href: '/',
        displayName: 'Home',
        Icon: HomeIcon,
    },
    {
        href: '/donate',
        displayName: 'Donate',
        Icon: DonateIcon,
    },
    {
        href: '/collect',
        displayName: 'Collect',
        Icon: CollectIcon,
    },
    {
        href: '/transport',
        displayName: 'Transport',
        Icon: TransportIcon,
    },
];

const Logo = (props: { sx: SxProps }) => {
    return (
        <Box sx={props.sx}>
            <Image src={logoImg} width={40} height={40} alt="logoImg" />
        </Box>
    );
};

const HeaderAppBar = () => {
    const router = useRouter();

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo sx={{ display: { xs: 'none', md: 'block' } }} />
                    <NavMenu pages={pages} />
                    <Logo sx={{ display: { xs: 'flex', md: 'none', flexGrow: '1' } }} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map(page => (
                            <Button key={page.href} color="secondary" onClick={() => router.push(page.href)}>
                                {page.displayName}
                            </Button>
                        ))}
                    </Box>

                    <UserMenu />
                    <LangMenu />
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default HeaderAppBar;
