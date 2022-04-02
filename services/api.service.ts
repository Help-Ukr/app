/// <reference path="../generated/api.d.ts" />

import { Service } from 'typedi';
import { HttpService } from '~/lib/http';
import { EnvService } from './env.service';

@Service()
export class ApiService extends HttpService<API.paths> {
    constructor(env: EnvService) {
        super({ backendUrl: env.BACKEND_URL });
    }
}
