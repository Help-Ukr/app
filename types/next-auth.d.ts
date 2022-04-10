import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth/jwt' {
    interface JWT {
        token?: string;
    }
}

declare module 'next-auth' {
    interface Session {
        token?: string;
    }
}
