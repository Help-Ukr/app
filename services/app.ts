import 'reflect-metadata';
import Container, { Constructable, Token } from 'typedi';
import { AbstractConstructable } from 'typedi/types/types/abstract-constructable.type';

type Services = {};

export const app: Omit<typeof Container, 'get'> & {
    get<T>(type: Constructable<T>): Readonly<T>;
    get<T>(type: AbstractConstructable<T>): Readonly<T>;
    get<K extends keyof Services>(id: K): Readonly<Services[K]>;
    get<T>(id: Token<T>): Readonly<T>;
} = Container;

app.reset();
