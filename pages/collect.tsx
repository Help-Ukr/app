import type { NextPage } from 'next';
import { AuthLayout } from '~/view/auth/auth.layout';
import { PageLayout } from '~/view/pagelayout';
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
