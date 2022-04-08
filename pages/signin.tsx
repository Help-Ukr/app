import PageLayout from '@cmts/PageLayout';
import type { NextPage } from 'next';
import { ClientSafeProvider, getProviders } from 'next-auth/react';
import { AuthLayout } from '~/view/auth/auth.layout';
import { AuthSignIn } from '~/view/auth/auth.sigin';

type SignInProps = { providers: ClientSafeProvider[] };

const SignIn: NextPage<SignInProps> = ({ providers }) => {
    return (
        <PageLayout>
            <AuthLayout>
                <AuthSignIn providers={providers} />
            </AuthLayout>
        </PageLayout>
    );
};

export default SignIn;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: { providers },
    };
}
