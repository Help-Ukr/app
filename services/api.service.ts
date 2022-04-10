/// <reference path="../generated/api.d.ts" />
/// <reference path="../generated/api.override.d.ts" />

import { getSession } from 'next-auth/react';
import { Service } from 'typedi';
import { HttpService } from '~/lib/http';
import { ReloadButton } from '~/view/reloadbutton';
import { EnvService } from './env.service';
import { NotificationService } from './notification.service';
const nonAuthrizedURLs: (keyof API.paths)[] = ['/api/login', '/api/collect-point'];
@Service()
export class ApiService extends HttpService<API.paths> {
    constructor(env: EnvService, private notification: NotificationService) {
        super({ backendUrl: env.NEXT_PUBLIC_BACKEND_URL });
        this.middlewares.add(this.httpMiddleware);
    }

    logout = async () => {
        await this.get('/api/logout', {});
        this.token = null;
    };

    protected httpMiddleware = async (_req: Request, originUrl: keyof API.paths) => {
        if (nonAuthrizedURLs.includes(originUrl)) return;
        if (await this.checkToken(_req)) return;
        throw new Error('ERR_NOT_AUTHORIZED');
    };

    protected async checkToken(_req: Request) {
        if (this.token) return true;
        const session = await getSession();
        if (session && session.token) {
            this.token = session.token;
            _req.headers.set('authorization', this.token);
            return true;
        }
        return false;
    }

    protected override onError(err: Error) {
        this.notification.notify({
            message: err.message,
            severity: 'error',
            button: ReloadButton,
        });
    }
}
