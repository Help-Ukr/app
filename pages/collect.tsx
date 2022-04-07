import ManagePoint from '@cmts/ManageCollectionPoint';
import PageLayout from '@cmts/PageLayout';
import type { NextPage } from 'next';
import { AuthLayout } from '~/view/auth/auth.layout';

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
