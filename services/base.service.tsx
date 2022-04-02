import { action, computed, CreateObservableOptions, IObservableArray, makeObservable, observable } from 'mobx';
import React from 'react';
import { O } from 'ts-toolbelt';

const singlestones = new Set<Function>();
const SymCtx = Symbol();

function getContext(ctor: any) {
    return ctor[SymCtx] ? ctor[SymCtx] : (ctor[SymCtx] = React.createContext(undefined));
}

export abstract class BaseService {
    constructor() {
        const ctor = this.constructor;
        if (singlestones.has(ctor)) throw new Error('Duplicate service created: ' + ctor.name);
        singlestones.add(ctor);
    }

    static useState<T extends { new (...args: any[]): BaseService }>(this: T): Readonly<InstanceType<T>> {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [model] = React.useState(() => new this());
        return model as InstanceType<T>;
    }

    static useContext<T extends { new (...args: any[]): BaseService }>(this: T): InstanceType<T> {
        const ctx = getContext(this);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const model = React.useContext<InstanceType<T>>(ctx);
        if (!model) {
            throw new Error(`${this.name}.useContext must be used inside of tree of ${this.name}.Provider component`);
        }
        return model;
    }

    readonly Provider = (props: React.PropsWithChildren<any>) => {
        const ctx = getContext(this.constructor);
        return <ctx.Provider value={this} {...props} />;
    };
}

export abstract class AsyncService extends BaseService {
    @computed
    get loading() {
        return this.asyncState === 'loading';
    }

    @observable
    readonly asyncState: 'idle' | 'loading' | 'error' | 'done' = 'idle';

    @observable
    readonly error?: Error = undefined;

    constructor() {
        super();
        makeObservable(this);
    }

    @action
    resetError = () => (this.self.error = undefined);

    protected get self(): O.Writable<this> {
        return this as any;
    }

    protected async(req: () => Promise<any>) {
        this.setAsyncState('loading');
        return req().then(
            resp => {
                this.setAsyncState('done');
                return resp;
            },
            err => this.setAsyncState(err),
        );
    }

    protected useAsync(req: () => Promise<any>) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
            if (this.asyncState === 'idle') {
                this.async(req);
            }
        }, []);
        return this;
    }

    @action
    protected setAsyncState(state: 'loading' | 'done' | Error) {
        if (typeof state === 'string') {
            this.self.asyncState = state;
        }
        if (state instanceof Error) {
            this.self.error = state;
            this.self.asyncState = 'error';
            console.error(state);
        } else {
            this.self.error = undefined;
        }
    }
}

export type ReadonlyObservableArray<T> = Omit<IObservableArray<T>, keyof Array<any>> & ReadonlyArray<T>;

export function observableArray<T>(initial: T[], opts?: CreateObservableOptions): ReadonlyObservableArray<T>;
export function observableArray<T = undefined>(
    initial?: T[] | undefined,
    opts?: CreateObservableOptions,
): undefined | ReadonlyObservableArray<T>;
export function observableArray<T>(initial?: T[], opts?: CreateObservableOptions): ReadonlyObservableArray<T> {
    return observable.array(initial, { deep: false, ...opts });
}
