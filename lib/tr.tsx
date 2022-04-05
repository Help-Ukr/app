import { getMetadataStorage, ValidationError } from 'class-validator';
import i18next, { i18n, Resource } from 'i18next';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next';
import { StrKey } from './types';

type TrFunc<T> = (key: StrKey<T>, opts?: object) => string;
type UseTr<T> = <N extends StrKey<T>>(ns: N) => [TrFunc<T[N]>, i18n, boolean];

export function TrFactory<R extends Resource, L extends StrKey<R>>(resources: R, fallbackLng: L) {
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

    return { useTr: useTranslation as UseTr<R[L]>, TrProvider };
}

export function validationTr(tr: TrFunc<any>, error?: ValidationError) {
    if (!error?.constraints) return '';
    const errContstraint = Object.entries(error.constraints)[0];

    const storage = getMetadataStorage();
    const metas = storage.getTargetValidationMetadatas(error.target!.constructor, '', true, false);
    for (const meta of metas) {
        const constraints = storage.getTargetValidatorConstraints(meta.constraintCls);
        const constraint = constraints.find(c => c.name === errContstraint[0]);
        if (!constraint) continue;
        return tr('validations.' + constraint.name, { [constraint.name]: meta.constraints?.[0] });
    }
    return '';
}
