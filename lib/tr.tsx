import { getMetadataStorage, ValidationError } from 'class-validator';
import i18next, { i18n } from 'i18next';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next';
import { O } from 'ts-toolbelt';
import { StrKey } from './types';

export type Tr<T extends Tr.Args> = string & { [Tr.Sym]: T };

export function Tr<R extends Record<string, Tr.NS>, L extends StrKey<R>>(resources: R, fallbackLng: L) {
    const TrProvider: FC = ({ children }) => {
        const { locale } = useRouter();
        const i18n = useMemo(() => {
            const inst = i18next.createInstance();

            inst.use(initReactI18next).init({
                fallbackLng,
                lng: locale,
                resources,

                interpolation: {
                    escapeValue: false,
                },
            });
            return inst;
            // No deps, i18n constructed only once
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
    };

    return { useTr: useTranslation as Tr.UseTr<R[L]>, TrProvider, useTrAny: useTranslation };
}

export namespace Tr {
    export const Sym = Symbol();
    export type Sym = typeof Sym;

    export interface Func<T extends Texts, R = string> {
        <K extends Exclude<keyof T, WithArgs<T>>>(key: K): R;
        <K extends WithArgs<T>>(key: K, arg: T[K] extends { [Sym]: infer A } ? A : never): R;
    }

    export type NS = Record<string, Texts>;
    export type Texts = Record<string, Text>;
    export type Text = string | TextWithArg;
    export type TextWithArg = string & { [Sym]: Args };

    export type UseTr<T extends NS> = <N extends StrKey<T>>(ns: N) => [Func<T[N]>, i18n, boolean];

    export type WithArgs<T extends Texts> = O.SelectKeys<T, TextWithArg>;
    export type Arg = string | Date | boolean | number;
    export type Args = Record<string, Arg>;

    export function validationTr(tr: Func<any>, error?: ValidationError) {
        if (!error?.constraints) return '';
        const errContstraint = Object.entries(error.constraints)[0];

        const storage = getMetadataStorage();
        const metas = storage.getTargetValidationMetadatas(error.target!.constructor, '', true, false);
        for (const meta of metas) {
            const constraints = storage.getTargetValidatorConstraints(meta.constraintCls);
            const constraint = constraints.find(c => c.name === errContstraint[0]);
            if (!constraint) continue;
            const args: { [key: string]: any } = {};
            meta.constraints.forEach((arg, i) => {
                args[`arg${i + 1}`] = arg;
            });
            return tr('validations.' + constraint.name, args);
        }
        return '';
    }
}
