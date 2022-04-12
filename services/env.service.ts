import 'reflect-metadata';
import { Service } from 'typedi';

@Service()
export class EnvService {
    NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
    NEXT_PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN!;
    NEXT_PUBLIC_DEV_TOKEN = process.env.NEXT_PUBLIC_DEV_TOKEN ?? null;
    GOOGLE_ID = process.env.GOOGLE_ID!;
    GOOGLE_SECRET = process.env.GOOGLE_SECRET!;
    AUTH_SECRET = process.env.AUTH_SECRET!;

    constructor() {
        if (typeof window === 'undefined') {
            Object.entries(this).forEach(([key, val]) => {
                if (val === undefined) throw new Error(`Env var ${key} is not defined`);
            });
            console.log('Environment check success');
        }
    }
}
