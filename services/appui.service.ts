/* eslint-disable react-hooks/rules-of-hooks */
import CollectIcon from '@mui/icons-material/CategoryOutlined';
import TransportIcon from '@mui/icons-material/DirectionsBusFilled';
import HomeIcon from '@mui/icons-material/Home';
import DonateIcon from '@mui/icons-material/VolunteerActivism';
import { useMediaQuery, useTheme } from '@mui/material';
import { action, makeObservable, observable } from 'mobx';
import { Service } from 'typedi';

@Service()
export class AppUIService {
    @observable
    donationsSidebarOpen = false;

    pages = [
        { href: '/', Icon: HomeIcon },
        { href: '/donate', Icon: DonateIcon },
        { href: '/collect', Icon: CollectIcon },
        { href: '/transport', Icon: TransportIcon },
    ] as const;

    constructor() {
        makeObservable(this);
    }

    @action
    openDonationSidebar = () => (this.donationsSidebarOpen = true);

    @action
    closeDonationSidebar = () => (this.donationsSidebarOpen = false);

    useIsMobile() {
        return useMediaQuery(useTheme().breakpoints.down('md'), { noSsr: true });
    }
}
