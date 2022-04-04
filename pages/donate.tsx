import MapSidebar from '@cmts/Map/MapSidebar';
import PageLayout from '@cmts/PageLayout';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const MapDynamic = dynamic(() => import('@cmts/Map'), {
    ssr: false,
});

const Donate: NextPage = () => {
    return (
        <PageLayout>
            <MapDynamic />
            <MapSidebar />
        </PageLayout>
    );
};

export default Donate;
