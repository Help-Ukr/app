import AuthLayout from '@cmts/Auth/Layout';
import ManagePoint from '@cmts/ManageCollectionPoint';
import PageLayout from '@cmts/PageLayout';
import type { NextPage } from 'next';
import { app } from '~/services/app';
import { CollectItemsService } from '~/services/collectitems.service';

const CollectPage: NextPage = () => {
    const cisvc = app.get(CollectItemsService);
    // cisvc.use();
    return (
        <PageLayout>
            <AuthLayout>
                <ManagePoint />
            </AuthLayout>
        </PageLayout>
    );
};

export default CollectPage;
