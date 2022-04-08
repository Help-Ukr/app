import { Tr } from '~/lib/tr';
import { de } from './de';
import { en } from './en';
import { uk } from './uk';

export const { useTr, TrProvider, useTrAny } = Tr({ en, uk, de }, 'en');
export const languages = [
    { key: 'en', title: 'English' },
    { key: 'de', title: 'Deutsch' },
    { key: 'uk', title: 'Українська' },
];
