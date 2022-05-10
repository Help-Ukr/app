import * as l1 from '../texts/de';
import * as l0 from '../texts/en';
import * as l2 from '../texts/uk';

function print(tab: string, str: string) {
    console.log(tab + str);
}

function processObject(fromObj: any, toObj: any | undefined, tab = '') {
    for (const [key, value] of Object.entries(fromObj)) {
        if (typeof value === 'string') {
            const val = toObj?.[key] ?? '----- ' + value;
            const quote = val.includes('\n') || val.includes("'") ? '`' : "'";
            const keyStr = key.toString().includes('/') ? `'${key}'` : key;
            print(tab, `${keyStr}: ${quote}${val}${quote},`);
        } else {
            print(tab, `${key}: {`);
            processObject(value, toObj?.[key], tab + '    ');
            print(tab, `},`);
        }
    }
}

const langsObj = Object.assign(l0, l1, l2);
const LANG = process.env.LANG;
const lang = LANG && Object.keys(langsObj).includes(LANG) ? (LANG as keyof typeof langsObj) : undefined;

if (lang) {
    print('', `export const ${lang} = {`);
    processObject(langsObj.en, langsObj[lang], '    ');
    print('', '};');
}
