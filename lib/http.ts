import Log from '@uk/log';
import * as queryString from 'query-string';
import { O } from 'ts-toolbelt';

type ApiDescription<T> = Record<
    keyof T,
    {
        post?: {
            responses: any;
        };
        get?: {
            responses: any;
        };
        put?: {
            responses: any;
        };
        patch?: {
            responses: any;
        };
        delete?: {
            responses: any;
        };
    }
>;

export type HttpMiddleware<T> = (req: Request, originPath: keyof T) => Promise<any>;

export class HttpService<T extends ApiDescription<T>> {
    readonly middlewares = new Set<HttpMiddleware<T>>();
    token?: string | null;

    constructor(private opts: { backendUrl: string; credentials?: RequestCredentials; token?: string | null }) {
        this.token = opts.token;
    }

    async post<U extends O.SelectKeys<T, { post: any }>, TPost extends T[U]['post'] = T[U]['post']>(
        path: U,
        args: ConvertArgs<TPost>,
    ): Promise<ConvertResponse<Exclude<TPost, undefined>['responses']>> {
        return await this.call(this.makeRequest(path, args, { method: 'POST' }), path);
    }

    async put<U extends O.SelectKeys<T, { put: any }>, TPost extends T[U]['put'] = T[U]['put']>(
        path: U,
        args: ConvertArgs<TPost>,
    ): Promise<ConvertResponse<Exclude<TPost, undefined>['responses']>> {
        return await this.call(this.makeRequest(path, args, { method: 'PUT' }), path);
    }

    async patch<U extends O.SelectKeys<T, { patch: any }>, TPost extends T[U]['patch'] = T[U]['patch']>(
        path: U,
        args: ConvertArgs<TPost>,
    ): Promise<ConvertResponse<Exclude<TPost, undefined>['responses']>> {
        return await this.call(this.makeRequest(path, args, { method: 'PATCH' }), path);
    }

    async get<U extends O.SelectKeys<T, { get: any }>, TGet extends T[U]['get'] = T[U]['get']>(
        path: U,
        args: ConvertArgs<TGet>,
    ): Promise<ConvertResponse<Exclude<TGet, undefined>['responses']>> {
        return await this.call(this.makeRequest(path, args, { method: 'GET' }), path);
    }

    protected makeRequest(path: string, args: any, init: RequestInit) {
        const headers = new Headers(init.headers);
        if (this.token) headers.set('authorization', this.token);
        headers.set('accept', 'application/json');
        if (typeof args.body === 'object') {
            headers.set('content-type', 'application/json');
        }
        return new Request(this.getBackendUrl(path, args), {
            body: args.body ? JSON.stringify(args.body) : args.formData,
            credentials: this.opts.credentials,
            ...init,
            headers,
        });
    }

    protected getBackendUrl(path: string, args: { query?: any; params?: any }) {
        const url = new URL(this.opts.backendUrl);
        if (args.params) {
            for (const n in args.params) {
                const v = args.params[n];
                if (v === null || v === undefined) {
                    console.warn(`Empty URL parameter: ${n} = ${v} for ${path}`);
                }
                const subst = `{${n}}`;
                if (!path.includes(subst)) {
                    console.warn(`Missing URL parameter: ${n} = ${v} for ${path}`);
                    continue;
                }
                path = path.replace(subst, encodeURIComponent(v.toString()));
            }
        }
        if (path.endsWith('/')) {
            path = path.slice(0, -1);
        }
        url.pathname = path;
        if (args.query) {
            url.search = queryString.stringify(args.query);
        }
        return url.toString();
    }

    protected async call(req: Request, originPath: keyof T) {
        return await this.log
            .try(req.method, async p => {
                p.finally({ url: req.url, body: req.body });
                for (const m of this.middlewares) {
                    await m(req, originPath);
                }
                let init: RequestInit;
                const { method } = req;
                if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
                    const reqClone = req.clone();
                    const body = (await reqClone.blob()) || (await reqClone.text());
                    const { cache, credentials, headers, integrity, mode, redirect, referrer } = req;
                    init = { body, cache, credentials, headers, integrity, mode, redirect, referrer, method };
                } else {
                    init = req;
                }
                const resp = await fetch(req, init);
                const contType = resp.headers.get('content-type') ?? '*/*';
                let rv;
                const isJson = contType === 'application/json';
                if (isJson) {
                    rv = await resp.json();
                } else {
                    rv = await resp.text();
                }
                p.finally({ rv });
                if (resp.status >= 400) {
                    throw new HttpError(resp.status, rv);
                } else {
                    const value = isJson ? rv : { [contType]: rv };
                    const ret = resp.status === 200 ? value : { [resp.status]: value };
                    p.finally({ rv: ret });
                    return ret;
                }
            })
            .catch(err => {
                this.onError(err);
                throw err;
            });
    }

    protected onError(err: Error) {}

    private log = new Log('HTTP');
}

export class HttpError extends Error {
    constructor(readonly status: number, readonly extra?: any) {
        super(extra?.message ?? 'ERR_HTTP_' + status);
    }
}

type ConvertArgs<T> = (T extends { requestBody: { content: { 'application/json': any } } }
    ? { body: T['requestBody']['content']['application/json'] }
    : {}) &
    (T extends { parameters: { path: any } } ? { params: T['parameters']['path'] } : {}) &
    (T extends { parameters: { query: any } } ? { query: T['parameters']['query'] } : {}) &
    (T extends { requestBody: { content: { 'multipart/form-data': any } } } ? { formData: FormData } : {});

type ConvertResponse<T> = Extract<keyof T, HttpSuccess> extends 200
    ? Get200<T>
    : Extract<keyof T, HttpSuccess> extends HttpSuccess
    ? Get200<T> | { [P in Exclude<Extract<keyof T, HttpSuccess>, 200>]: ConvertContent<T[P]> }
    : 'NO_FATE';
type Get200<T> = T extends { 200: any } ? ConvertContent<T[200]> : never;
type ConvertContent<T> = T extends { content: any } ? ConvertContentType<T['content']> : never;
type ConvertContentType<T> = keyof T extends 'application/json'
    ? T extends { 'application/json': any }
        ? T['application/json']
        : never
    : T;

type HttpSuccess = 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226;
