import PageLayout from '@cmts/PageLayout';
import type { NextPage } from 'next';
import { AuthLayout } from '~/view/auth/auth.layout';
import { PointManage } from '~/view/point/point.manage';

const CollectPage: NextPage = () => {
    return (
        <PageLayout>
            <AuthLayout>
                <PointManage />
            </AuthLayout>
        </PageLayout>
    );
};

export default CollectPage;
