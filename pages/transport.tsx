import PageLayout from '@cmts/PageLayout';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const MapDynamic = dynamic(() => import('~/components/Map'), {
    ssr: false,
});

const Transport: NextPage = () => {
    return (
        <PageLayout>
            <MapDynamic />
        </PageLayout>
    );
};

export default Transport;
