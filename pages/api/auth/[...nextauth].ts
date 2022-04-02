import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    secret: process.env.AUTH_SECRET || '',
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
