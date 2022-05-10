import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { ApiService } from '~/services/api.service';
import { app } from '~/services/app';
import { EnvService } from '~/services/env.service';

const env = app.get(EnvService);
const api = app.get(ApiService);

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
        jwt: async ({ token, account }) => {
            if (account?.provider && account?.access_token) {
                const resp = await api.post('/api-v1/login', {
                    body: { name: account.provider, token: account.access_token },
                });
                if (resp.token) {
                    token.token = 'Bearer ' + resp.token;
                }
            }
            return token;
        },
        redirect: () => {
            return '/collect';
        },
        session: async ({ session, token }) => {
            session.token = token.token;
            return session;
        },
    },
    pages: {
        signIn: '/signin',
    },
});
