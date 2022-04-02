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
        delete?: {
            responses: any;
        };
    }
>;

export type HttpMiddleware<T> = (req: Request, originPath: keyof T) => Promise<any>;

export class HttpService<T extends ApiDescription<T>> {
    readonly middlewares = new Set<HttpMiddleware<T>>();

    constructor(private opts: { backendUrl: string }) {}

    async post<U extends O.SelectKeys<T, { post: any }>, TPost extends T[U]['post'] = T[U]['post']>(
        path: U,
        args: ConvertArgs<TPost>,
    ): Promise<ConvertResponse<Exclude<TPost, undefined>['responses']>> {
        console.log('POST', { path, args });
        const arg = args as any;
        const req = new Request(this.getBackendUrl(path, args), {
            body: arg.body ? JSON.stringify(arg.body) : undefined,
            method: 'POST',
            headers: arg.body ? new Headers({ 'content-type': 'application/json' }) : undefined,
            credentials: 'include',
        });
        return await this.call(req, path);
    }

    async put<U extends O.SelectKeys<T, { put: any }>, TPost extends T[U]['put'] = T[U]['put']>(
        path: U,
        args: ConvertArgs<TPost>,
    ): Promise<ConvertResponse<Exclude<TPost, undefined>['responses']>> {
        console.log('PUT', { path, args });
        const arg = args as any;
        const req = new Request(this.getBackendUrl(path, args), {
            body: arg.body ? JSON.stringify(arg.body) : undefined,
            method: 'PUT',
            headers: arg.body ? new Headers({ 'content-type': 'application/json' }) : undefined,
            credentials: 'include',
        });
        return await this.call(req, path);
    }

    async get<U extends O.SelectKeys<T, { get: any }>, TGet extends T[U]['get'] = T[U]['get']>(
        path: U,
        args: ConvertArgs<TGet>,
    ): Promise<ConvertResponse<Exclude<TGet, undefined>['responses']>> {
        console.log('GET', { path });
        const req = new Request(this.getBackendUrl(path, args), {
            method: 'GET',
            credentials: 'include',
        });
        return await this.call(req, path);
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
        for (const m of this.middlewares) {
            await m(req, originPath);
        }
        const resp = await fetch(req);
        const contType = resp.headers.get('content-type') ?? '*/*';
        let rv;
        const isJson = contType === 'application/json';
        if (isJson) {
            rv = await resp.json();
        } else {
            rv = await resp.text();
        }
        if (resp.status >= 400) {
            throw new HttpError(resp.status, rv);
        } else {
            const value = isJson ? rv : { [contType]: rv };
            return resp.status === 200 ? value : { [resp.status]: value };
        }
    }
}

export class HttpError extends Error {
    constructor(readonly status: number, readonly extra: any) {
        super('ERR_HTTP_' + status);
    }
}

type ConvertArgs<T> = (T extends { requestBody: { content: { 'application/json': any } } }
    ? { body: T['requestBody']['content']['application/json'] }
    : {}) &
    (T extends { parameters: { path: any } } ? { params: T['parameters']['path'] } : {}) &
    (T extends { parameters: { query: any } } ? { query: T['parameters']['query'] } : {});

type ConvertResponse<T> = 200 extends keyof T
    ? T extends { 200: any }
        ? ConvertContent<T[200]>
        : never
    : { [P in keyof T]: ConvertContent<T[P]> };
type ConvertContent<T> = T extends { content: any } ? ConvertContentType<T['content']> : never;
type ConvertContentType<T> = keyof T extends 'application/json'
    ? T extends { 'application/json': any }
        ? T['application/json']
        : never
    : T;
