export const uk = {
    home: {
        title: 'Управління всіма матеріальними пожертвуваннями в одному місці',
        subtitle: 'Бери участь та допоможи Україні зараз!',
        iWantTo: 'Я хочу...',
        collect: 'Збирати пожертвування',
        donate: 'Пожертвувати товари',
        transport: 'Перевозити вантажі',
    },
    routes: {
        '/': 'Головна',
        '/collect': 'Збирати',
        '/donate': 'Пожертвувати',
        '/transport': 'Перевізникам',
    },
    collect: {
        tabGeneral: 'Інформація',
        tabItems: 'Речі',
    },
    dto: {
        CollectinPointDto: {
            location: 'Адреса',
            orgName: 'Назва точки',
            phone: 'Номер телефону',
            telegram: 'Посилання на телеграму',
        },

        infoLatLng: '(широта: {{lat}}, довгота: {{lon}})',
        noOptions: 'Немає параметрів',

        validations: {
            isPhoneNumber: 'Введіть номер телефону у міжнародному форматі ({{isPhoneNumber}})',
            isInt: 'Введіть ціле число',
            min: 'Число повинно бути більше або дорівнювати {{min}}',
            max: 'Число повинно бути менше або дорівнювати {{max}}',
            minLength: 'Мінімальна довжина поля {{minLength}}',
            maxLength: 'Максимальна довжина поля {{maxLength}}',
        },
    },
};
