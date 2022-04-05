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
    },
    collect: {
        tabGeneral: 'General',
        tabItems: 'Needed items',
    },
    dto: {
        CollectinPointDto: {
            location: 'Address',
            orgName: 'Point name',
            phone: 'Phone number',
            telegram: 'Telegram link',
        },

        infoLatLng: '(Latitude: {{lat}}, Longitude: {{lon}})',
        noOptions: 'No options',

        validations: {
            isPhoneNumber: 'Enter phone number in international format ({{isPhoneNumber}})',
            isInt: 'Enter an integer',
            min: 'Number must be greater than or equal to {{min}}',
            max: 'Number must be less than or equal to {{max}}',
            minLength: 'Minimum field length {{minLength}}',
            maxLength: 'Maximum field length {{maxLength}}',
        },
    },
};
