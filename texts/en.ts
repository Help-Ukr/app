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
    form: {
        CollectinPointDto: {
            location: 'Address',
            orgName: 'Point name',
            phone: 'Phone number',
            telegram: 'Telegram link',
        },

        infoLatLng: '(Latitude: {{lat}}, Longitude: {{lon}})',
        noOptions: 'No options',

        validations: {
            isInt: 'Enter an integer',
            isPhoneNumber: 'Enter phone number in international format ({{arg1}})',
            isLength: 'Minimum field length {{arg1}}, maximum - {{arg2}}',
            min: 'Number must be greater than or equal to {{arg1}}',
            max: 'Number must be less than or equal to {{arg1}}',
            minLength: 'Minimum field length {{arg1}}',
            maxLength: 'Maximum field length {{arg1}}',
        },
    },
};
