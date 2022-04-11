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
    auth: {
        logout: 'Logout',
        login: 'Login',
        title: 'Sign in to create a collection point',
        action: 'Sign in with {{provider}}' as Tr<{ provider: string }>,
        userMenu: 'Open the user menu',
    },
    app: {
        reload: 'Reload page',
    },
    errors: {
        ERR_NOT_AUTHORIZED: 'Unauthorized',
        ERR_HTTP_401: 'Unauthorized',
        ERR_HTTP_404: 'Not found',
        ERR_HTTP_500: 'Something went wrong',
    },
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
        creatingPoint: 'Creating a new collection point',
        defaultBgImageUrl:
            'https://unsplash.com/photos/pNIgH0y3upM/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ2NDY3OTkw&force=true&w=1920',
    },
    CollectinPointDto: {
        enabled: 'Enable',
        location: 'Address',
        name: 'Point name',
        phone: 'Phone number',
        telegram: 'Telegram link',
        instagram: 'Instagram link',
    },
    form: {
        infoLatLng: '(Latitude: {{latitude}}, Longitude: {{longitude}})' as Tr<{ latitude: number; longitude: number }>,
        noOptions: 'No options',
        save: 'Save',

        isInt: 'Enter an integer',
        isDefined: 'The field cannot be empty',
        isPhoneNumber: 'Enter phone number in international format ({{arg1}})',
        isLength: 'Minimum field length {{arg1}}, maximum - {{arg2}}',
        min: 'Number must be greater than or equal to {{arg1}}',
        max: 'Number must be less than or equal to {{arg1}}',
        minLength: 'Minimum field length {{arg1}}',
        maxLength: 'Maximum field length {{arg1}}',
    },
    map: {
        itsyou: 'You are here',
    },
    pointDetails: {
        distance: '~{{dist}} from you' as Tr<{ dist: string }>,
        copy: 'Copy to clipboard',
        telegram: 'Contact through Telegram {{tg}}' as Tr<{ tg?: string }>,
        instagram: 'Contact through Instagram {{insta}}' as Tr<{ insta?: string }>,
        share: 'Share this point',
        navigate: 'Navigate to "{{addr}}" using Google Maps' as Tr<{ addr: string }>,
        call: 'Make a phone call to {{phone}}' as Tr<{ phone: string }>,
        shareContent:
            'Donation point {{name}}\n\n{{addr}}\n\nPhone: {{phone}}\nTelegram: {{tg}}\nInstagram: {{insta}}\nURL: {{url}}' as Tr<{
                tg: string;
                phone: string;
                insta: string;
                url: string;
                addr: string;
                name: string;
            }>,
    },
    donate: {
        filterPlaceholder: 'Find donation point',
    },
    notify: {
        copied: 'Copied',
    },
};
