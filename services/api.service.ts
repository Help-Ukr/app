/// <reference path="../generated/api.d.ts" />
/// <reference path="../generated/api.override.d.ts" />

import { Service } from 'typedi';
import { HttpService } from '~/lib/http';
import { EnvService } from './env.service';

@Service()
export class ApiService extends HttpService<API.paths> {
    constructor(env: EnvService) {
        super({ backendUrl: env.NEXT_PUBLIC_BACKEND_URL, token: env.NEXT_PUBLIC_DEV_TOKEN });
    }
}
