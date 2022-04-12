export const uk = {
    home: {
        title: 'Управління всіма матеріальними пожертвуваннями в одному місці',
        subtitle: 'Бери участь та допоможи Україні зараз!',
        iWantTo: 'Я хочу...',
        collect: 'Збирати пожертвування',
        donate: 'Пожертвувати товари',
        transport: 'Перевозити вантажі',
    },
    auth: {
        logout: 'Вийти',
        login: 'Увійти',
        title: 'Увійдіть, щоб створити пункт збору',
        action: 'Увійти за допомогою {{provider}}',
        userMenu: 'Відкрийте меню користувача',
    },
    app: {
        reload: 'Перезавантажити',
    },
    errors: {
        ERR_NOT_AUTHORIZED: 'Не авторизований',
        ERR_HTTP_401: 'Не авторизований',
        ERR_HTTP_404: 'Не знайдено',
        ERR_HTTP_500: 'Щось пішло не так',
    },
    routes: {
        '/': 'Головна',
        '/collect': 'Збирати',
        '/donate': 'Пожертвувати',
        '/transport': 'Перевізникам',
        '/signin': 'Увійти',
    },
    collect: {
        tabGeneral: 'Інформація',
        tabItems: 'Речі',
        creatingPoint: 'Створення нового пункту збору',
    },
    CollectinPointDto: {
        enabled: 'Увімкнути',
        location: 'Адреса',
        name: 'Назва точки',
        phone: 'Номер телефону',
        telegram: 'Посилання на телеграм',
        instagram: 'Посилання на інстаграм',
    },
    form: {
        infoLatLng: '(широта: {{latitude}}, довгота: {{longitude}})',
        noOptions: 'Немає параметрів',
        save: 'Зберегти',

        isInt: 'Введіть ціле число',
        isDefined: 'Поле не може бути порожнім',
        isPhoneNumber: 'Введіть номер телефону у міжнародному форматі ({{arg1}})',
        isLength: 'Мінімальна довжина поля {{arg1}}, максимальна - {{arg2}}',
        min: 'Число повинно бути більше або дорівнювати {{arg1}}',
        max: 'Число повинно бути менше або дорівнювати {{arg1}}',
        minLength: 'Мінімальна довжина поля {{arg1}}',
        maxLength: 'Максимальна довжина поля {{arg1}}',
    },
    pointDetails: {
        distance: '~{{dist}} від тебе',
        copy: 'Копіювати в буфер обміну',
        telegram: `Зв'язатися через Telegram {{tg}}`,
        instagram: `Зв'язатися через Instagram {{insta}}`,
        share: 'Поділіться цією точкою',
        navigate: 'Прокласти маршрут до "{{addr}}" через Google Maps',
        call: 'Зателефонувати за номером {{phone}}',
        shareContent:
            'Точка збору пожертв "{{name}}"\n\n{{addr}}\n\nЛінк: {{url}}\n\nТелефон: {{phone}}\n\nTelegram: {{tg}}\n\nInstagram: {{insta}}',
        copied: 'Скопійовано',
    },
    donate: {
        filterPlaceholder: 'Знайдіть пункт пожертв',
    },
    notify: {
        copied: 'Скопійовано',
    },
};
