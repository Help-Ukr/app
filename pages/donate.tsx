import PageLayout from '@cmts/PageLayout';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import MapSidebar from '~/components/Map/MapSidebar';

const MapDynamic = dynamic(() => import('~/components/Map'), {
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
