export const de = {
    meta: {
        title: '----- Stand with Ukraine',
        description: '----- Centralized Donations Management',
    },
    home: {
        title: 'Verwaltung aller Sachspenden an einem Ort',
        subtitle: 'Machen Sie mit und helfen Sie jetzt der Ukraine!',
        iWantTo: 'Ich möchte...',
        collect: 'Sammelpunkt bekanntgeben',
        donate: 'Waren spenden',
        transport: 'Güter transportieren',
    },
    auth: {
        logout: '----- Logout',
        login: '----- Login',
        title: '----- Sign in to create a collection point',
        action: '----- Sign in with {{provider}}',
        userMenu: '----- Open the user menu',
    },
    app: {
        reload: '----- Reload page',
    },
    errors: {
        ERR_NOT_AUTHORIZED: '----- Unauthorized',
        ERR_HTTP_401: '----- Unauthorized',
        ERR_HTTP_404: '----- Not found',
        ERR_HTTP_500: '----- Something went wrong',
    },
    routes: {
        '/': 'Help-Ukraine',
        '/collect': 'Sammelpunkt',
        '/donate': 'Spende',
        '/transport': 'Transporte',
        '/signin': '----- SignIn',
    },
    collect: {
        tabGeneral: '----- General',
        tabItems: '----- Needed items',
        creatingPoint: '----- Creating a new collection point',
        defaultBgImageUrl:
            '----- https://unsplash.com/photos/pNIgH0y3upM/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ2NDY3OTkw&force=true&w=1920',
    },
    CollectinPointDto: {
        enabled: '----- Enable',
        location: '----- Address',
        name: '----- Point name',
        description: '----- Short description',
        phone: '----- Phone number',
        telegram: '----- Telegram link',
        instagram: '----- Instagram link',
    },
    form: {
        infoLatLng: '----- (Latitude: {{latitude}}, Longitude: {{longitude}})',
        noOptions: '----- No options',
        save: '----- Save',
        isInt: '----- Enter an integer',
        isDefined: '----- The field cannot be empty',
        isPhoneNumber: '----- Enter phone number in international format ({{arg1}})',
        isLength: '----- Minimum field length {{arg1}}, maximum - {{arg2}}',
        min: '----- Number must be greater than or equal to {{arg1}}',
        max: '----- Number must be less than or equal to {{arg1}}',
        minLength: '----- Minimum field length {{arg1}}',
        maxLength: '----- Maximum field length {{arg1}}',
    },
    map: {
        itsyou: '----- You are here',
    },
    pointDetails: {
        distance: '----- ~{{dist}} from you',
        copy: '----- Copy to clipboard',
        telegram: '----- Contact through Telegram {{tg}}',
        instagram: '----- Contact through Instagram {{insta}}',
        share: '----- Share this point',
        navigate: '----- Navigate to "{{addr}}" using Google Maps',
        call: '----- Make a phone call to {{phone}}',
        shareContent: `----- Donation point "{{name}}"

{{addr}}

URL: {{url}}

Phone: {{phone}}

Telegram: {{tg}}

Instagram: {{insta}}`,
        copied: '----- Copied',
    },
    donate: {
        filterPlaceholder: '----- Find donation point',
    },
    notify: {
        copied: '----- Copied',
    },
};
