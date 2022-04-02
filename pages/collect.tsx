import AuthLayout from '@cmts/Auth/Layout';
import ManagePoint from '@cmts/ManageCollectionPoint';
import PageLayout from '@cmts/PageLayout';
import type { NextPage } from 'next';

const CollectPage: NextPage = () => {
    return (
        <PageLayout>
            <AuthLayout>
                <ManagePoint />
            </AuthLayout>
        </PageLayout>
    );
};

export default CollectPage;
