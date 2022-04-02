import PageLayout from '@cmts/PageLayout';
import type { NextPage } from 'next';
import { ClientSafeProvider, getProviders } from 'next-auth/react';
import AuthSignIn from '~/components/Auth/SignIn';

type SignInProps = { providers: ClientSafeProvider[] };

const SignIn: NextPage<SignInProps> = ({ providers }) => {
    return (
        <PageLayout>
            <AuthSignIn providers={providers} />
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
