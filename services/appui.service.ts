/* eslint-disable react-hooks/rules-of-hooks */
import { useMediaQuery, useTheme } from '@mui/material';
import { action, makeObservable, observable } from 'mobx';
import { Service } from 'typedi';

@Service()
export class AppUIService {
    @observable
    donationsSidebarOpen = false;

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
