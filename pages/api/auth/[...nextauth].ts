import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { app } from '~/services/app';
import { EnvService } from '~/services/env.service';

const env = app.get(EnvService);

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_ID,
            clientSecret: env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    secret: env.AUTH_SECRET,
    callbacks: {
        jwt: ({ token, account }) => {
            if (account?.access_token) {
                token.accessToken = account.accessToken;
            }
            console.log('NextAuth::GoogleProvider', { account });
            return token;
        },
        redirect: () => {
            return '/collect';
        },
    },
    pages: {
        signIn: '/signin',
    },
});
