/// <reference path="../generated/api.d.ts" />
/// <reference path="../generated/api.override.d.ts" />

import { Service } from 'typedi';
import { HttpService } from '~/lib/http';
import { ReloadButton } from '~/view/reloadbutton';
import { EnvService } from './env.service';
import { NotificationService } from './notification.service';

@Service()
export class ApiService extends HttpService<API.paths> {
    constructor(env: EnvService, private notification: NotificationService) {
        super({ backendUrl: env.NEXT_PUBLIC_BACKEND_URL, token: env.NEXT_PUBLIC_DEV_TOKEN });
    }

    protected override onError(err: Error) {
        this.notification.notify({
            message: err.message,
            severity: 'error',
            button: ReloadButton,
        });
    }
}
