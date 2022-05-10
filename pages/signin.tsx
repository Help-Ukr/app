import type { NextPage } from 'next';
import { ClientSafeProvider, getProviders, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthSignIn } from '~/view/auth/auth.sigin';
import { PageLayout } from '~/view/pagelayout';

type SignInProps = { providers: ClientSafeProvider[] };

const SignIn: NextPage<SignInProps> = ({ providers }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            router.replace('/collect');
        }
    }, [router, status]);

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
