import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { PageLayout } from '~/view/pagelayout';

const Map = dynamic(() => import('~/view/map/map'), { ssr: false });
const MapSidebar = dynamic(() => import('~/view/map/sidebar/map.sidebar'), { ssr: false });

const Donate: NextPage = () => {
    return (
        <PageLayout>
            <Map />
            <MapSidebar />
        </PageLayout>
    );
};

export default Donate;
