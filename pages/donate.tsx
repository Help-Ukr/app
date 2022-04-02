import type { NextPage } from 'next';
import MapWithLocations from '../components/MapWithLocations';
import PageLayout from '../components/PageLayout';

const Donate: NextPage = () => {
    return (
        <PageLayout>
            <MapWithLocations />
        </PageLayout>
    );
};

export default Donate;
