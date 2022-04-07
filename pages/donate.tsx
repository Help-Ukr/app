import PageLayout from '@cmts/PageLayout';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const MapDynamic = dynamic(() => import('~/components/Map'), { ssr: false });
const MapSidebar = dynamic(() => import('~/components/Map/MapSidebar'), { ssr: false });

const Donate: NextPage = () => {
    return (
        <PageLayout>
            <MapDynamic />
            <MapSidebar />
        </PageLayout>
    );
};

export default Donate;
