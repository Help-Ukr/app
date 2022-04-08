import { Tr } from '~/lib/tr';

export const en = {
    home: {
        title: 'Managing all material donations in one place',
        subtitle: 'Take part and help the Ukraine now!',
        iWantTo: 'I want to...',
        collect: 'Collect donations',
        donate: 'Donate goods',
        transport: 'Transport goods',
    },
    app: {},
    routes: {
        '/': 'Home',
        '/collect': 'Collect',
        '/donate': 'Donate',
        '/transport': 'Transport',
        '/signin': 'SignIn',
    },
    collect: {
        tabGeneral: 'General',
        tabItems: 'Needed items',
    },
    CollectinPointDto: {
        location: 'Address',
        orgName: 'Point name',
        phone: 'Phone number',
        telegram: 'Telegram link',
    },
    form: {
        infoLatLng: '(Latitude: {{lat}}, Longitude: {{lng}})' as Tr<{ lat: number; lng: number }>,
        noOptions: 'No options',
        save: 'Save',
    },
    validations: {
        isInt: 'Enter an integer',
        isPhoneNumber: 'Enter phone number in international format ({{arg1}})',
        isLength: 'Minimum field length {{arg1}}, maximum - {{arg2}}',
        min: 'Number must be greater than or equal to {{arg1}}',
        max: 'Number must be less than or equal to {{arg1}}',
        minLength: 'Minimum field length {{arg1}}',
        maxLength: 'Maximum field length {{arg1}}',
    },
    map: {
        itsyou: 'You are here',
        distance: '~{{dist}} from you' as Tr<{ dist: string }>,
    },
};
