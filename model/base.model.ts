import { C } from 'ts-toolbelt';

export class BaseModel<T> {
    constructor(data: T) {
        Object.assign(this, data);
    }

    static factory<T extends object>(): C.Class<[T], BaseModel<T> & Readonly<T>> {
        return BaseModel as any;
    }
}
