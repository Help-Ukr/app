import i18next, { i18n, Resource } from 'i18next';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next';
import { StrKey } from './types';

type TrFunc<T> = (key: StrKey<T>) => string;
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
