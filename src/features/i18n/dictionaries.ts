import type { LanguageCode } from '@/shared/types';

// Lightweight dictionary-based i18n. Each key resolves to one string per language.
// Use dot.notation. Missing keys fall back to the key itself in development.
export type Dict = Record<string, Record<LanguageCode, string>>;

export const LANGUAGES: { code: LanguageCode; label: string; short: string }[] = [
  { code: 'kk', label: 'Қазақша', short: 'KZ' },
  { code: 'ru', label: 'Русский', short: 'RU' },
  { code: 'en', label: 'English', short: 'EN' },
];

export const dict: Dict = {
  // ===== NAV =====
  'nav.home': { kk: 'Басты бет', ru: 'Главная', en: 'Home' },
  'nav.offices': { kk: 'Кеңселер', ru: 'Офисы', en: 'Offices' },
  'nav.conferenceRooms': { kk: 'Конференц-залдар', ru: 'Конференц-залы', en: 'Conference halls' },
  'nav.tenants': { kk: 'Жалдаушылар', ru: 'Арендаторы', en: 'Tenants' },
  'nav.contacts': { kk: 'Байланыс', ru: 'Контакты', en: 'Contacts' },
  'nav.news': { kk: 'Новости', ru: 'Новости', en: 'Новости' },
  'nav.login': { kk: 'Кіру', ru: 'Войти', en: 'Sign in' },
  'nav.admin': { kk: 'Әкімші', ru: 'Админка', en: 'Admin' },

  // ===== COMMON =====
  'common.requestCallback': { kk: 'Өтінім қалдыру', ru: 'Оставить заявку', en: 'Request a callback' },
  'common.viewOffices': { kk: 'Кеңселерді көру', ru: 'Смотреть офисы', en: 'View offices' },
  'common.details': { kk: 'Толығырақ', ru: 'Подробнее', en: 'Details' },
  'common.from': { kk: 'кем дегенде', ru: 'от', en: 'from' },
  'common.to': { kk: 'дейін', ru: 'до', en: 'to' },
  'common.search': { kk: 'Іздеу', ru: 'Поиск', en: 'Search' },
  'common.filter': { kk: 'Сүзгі', ru: 'Фильтр', en: 'Filter' },
  'common.reset': { kk: 'Қайтару', ru: 'Сбросить', en: 'Reset' },
  'common.save': { kk: 'Сақтау', ru: 'Сохранить', en: 'Save' },
  'common.cancel': { kk: 'Бас тарту', ru: 'Отмена', en: 'Cancel' },
  'common.create': { kk: 'Қосу', ru: 'Создать', en: 'Create' },
  'common.edit': { kk: 'Өңдеу', ru: 'Редактировать', en: 'Edit' },
  'common.delete': { kk: 'Жою', ru: 'Удалить', en: 'Delete' },
  'common.confirm': { kk: 'Растау', ru: 'Подтвердить', en: 'Confirm' },
  'common.back': { kk: 'Артқа', ru: 'Назад', en: 'Back' },
  'common.status': { kk: 'Күй', ru: 'Статус', en: 'Status' },
  'common.actions': { kk: 'Әрекеттер', ru: 'Действия', en: 'Actions' },
  'common.all': { kk: 'Барлығы', ru: 'Все', en: 'All' },
  'common.empty': { kk: 'Деректер жоқ', ru: 'Нет данных', en: 'No data' },
  'common.area': { kk: 'Ауданы', ru: 'Площадь', en: 'Area' },
  'common.floor': { kk: 'Қабат', ru: 'Этаж', en: 'Floor' },
  'common.price': { kk: 'Бағасы', ru: 'Цена', en: 'Price' },
  'common.priceOnRequest': { kk: 'Сұраныс бойынша', ru: 'По запросу', en: 'On request' },
  'common.type': { kk: 'Түрі', ru: 'Тип', en: 'Type' },
  'common.capacity': { kk: 'Сыйымдылық', ru: 'Вместимость', en: 'Capacity' },
  'common.equipment': { kk: 'Жабдық', ru: 'Оборудование', en: 'Equipment' },
  'common.features': { kk: 'Артықшылықтар', ru: 'Особенности', en: 'Features' },
  'common.description': { kk: 'Сипаттама', ru: 'Описание', en: 'Description' },
  'common.published': { kk: 'Жарияланған', ru: 'Опубликовано', en: 'Published' },
  'common.unpublished': { kk: 'Жасырын', ru: 'Скрыто', en: 'Hidden' },
  'common.theme': { kk: 'Тақырып', ru: 'Тема', en: 'Theme' },
  'common.language': { kk: 'Тіл', ru: 'Язык', en: 'Language' },
  'common.logout': { kk: 'Шығу', ru: 'Выйти', en: 'Sign out' },
  'common.yes': { kk: 'Иә', ru: 'Да', en: 'Yes' },
  'common.no': { kk: 'Жоқ', ru: 'Нет', en: 'No' },
  'common.optional': { kk: 'міндетті емес', ru: 'необязательно', en: 'optional' },
  'common.required': { kk: 'міндетті', ru: 'обязательно', en: 'required' },

  // ===== OFFICE TYPES =====
  'officeType.openSpace': { kk: 'Open space', ru: 'Open space', en: 'Open space' },
  'officeType.cabinet': { kk: 'Кабинет', ru: 'Кабинет', en: 'Cabinet' },
  'officeType.block': { kk: 'Блок', ru: 'Блок', en: 'Block' },
  'officeType.mixed': { kk: 'Аралас', ru: 'Смешанный', en: 'Mixed' },

  // ===== STATUSES =====
  'status.available': { kk: 'Бос', ru: 'Свободен', en: 'Available' },
  'status.reserved': { kk: 'Брондалған', ru: 'Забронирован', en: 'Reserved' },
  'status.occupied': { kk: 'Бос емес', ru: 'Занят', en: 'Occupied' },

  // Lead statuses
  'leadStatus.new': { kk: 'Жаңа', ru: 'Новая', en: 'New' },
  'leadStatus.contacted': { kk: 'Хабарласты', ru: 'Связались', en: 'Contacted' },
  'leadStatus.inProgress': { kk: 'Жұмыста', ru: 'В работе', en: 'In progress' },
  'leadStatus.closed': { kk: 'Жабылған', ru: 'Закрыта', en: 'Closed' },

  // Interest type
  'interest.office': { kk: 'Кеңсе', ru: 'Офис', en: 'Office' },
  'interest.conference': { kk: 'Конференц-зал', ru: 'Конференц-зал', en: 'Conference hall' },
  'interest.general': { kk: 'Жалпы сұрақ', ru: 'Общий вопрос', en: 'General inquiry' },

  // User roles & status
  'role.admin': { kk: 'Әкімші', ru: 'Администратор', en: 'Administrator' },
  'role.manager': { kk: 'Менеджер', ru: 'Менеджер', en: 'Manager' },
  'role.viewer': { kk: 'Қарап шығушы', ru: 'Наблюдатель', en: 'Viewer' },
  'userStatus.active': { kk: 'Белсенді', ru: 'Активен', en: 'Active' },
  'userStatus.disabled': { kk: 'Өшірілген', ru: 'Отключён', en: 'Disabled' },

  // ===== HERO =====
  'hero.title': {
    kk: 'Қала орталығындағы бизнес үшін заманауи кеңістік',
    ru: 'Современное пространство для бизнеса в центре города',
    en: 'A modern environment for business in the city centre',
  },
  'hero.subtitle': {
    kk: 'Әртүрлі форматтағы кеңселер, конференц-залдар, дамыған инфрақұрылым және жалдаушылар үшін кәсіби қызмет.',
    ru: 'Офисы разных форматов, конференц-залы, развитая инфраструктура и профессиональный сервис для арендаторов.',
    en: 'Offices of varied formats, conference halls, developed infrastructure and professional service for tenants.',
  },

  // ===== BENEFITS =====
  'benefits.title': { kk: 'Бизнес-орталықтың артықшылықтары', ru: 'Преимущества бизнес-центра', en: 'What this business centre offers' },
  'benefits.location.title': { kk: 'Ыңғайлы орналасуы', ru: 'Удобная локация', en: 'Convenient location' },
  'benefits.location.desc': {
    kk: 'Қаланың іскерлік аймағында, негізгі көлік қозғалысы мен метроға жақын.',
    ru: 'В деловой части города, рядом с основными транспортными узлами и метро.',
    en: 'Within the city’s business district, close to main transport links and metro.',
  },
  'benefits.formats.title': { kk: 'Әртүрлі форматтағы кеңселер', ru: 'Офисы разных форматов', en: 'Offices of varied formats' },
  'benefits.formats.desc': {
    kk: 'Шағын кабинеттерден қабат деңгейіндегі блоктарға дейін, open space шешімдерімен.',
    ru: 'От компактных кабинетов до блоков на этаж, включая open space решения.',
    en: 'From compact cabinets to full-floor blocks, including open space configurations.',
  },
  'benefits.conference.title': { kk: 'Конференц-залдар', ru: 'Конференц-залы', en: 'Conference halls' },
  'benefits.conference.desc': {
    kk: 'Кездесулерге, презентацияларға және іс-шараларға арналған жабдықталған залдар.',
    ru: 'Оборудованные залы для встреч, презентаций и корпоративных мероприятий.',
    en: 'Equipped halls for meetings, presentations and corporate events.',
  },
  'benefits.parking.title': { kk: 'Паркинг', ru: 'Паркинг', en: 'Parking' },
  'benefits.parking.desc': {
    kk: 'Жер асты және жер үсті орындары, жалдаушылар мен қонақтарға.',
    ru: 'Подземные и наземные места для арендаторов и их гостей.',
    en: 'Underground and ground-level spaces for tenants and their guests.',
  },
  'benefits.security.title': { kk: 'Қауіпсіздік 24/7', ru: 'Безопасность 24/7', en: 'Security 24/7' },
  'benefits.security.desc': {
    kk: 'Қол жеткізуді бақылау, бейне қадағалау және күзет қызметі.',
    ru: 'Контроль доступа, видеонаблюдение и круглосуточная охрана.',
    en: 'Access control, video surveillance and round-the-clock security.',
  },
  'benefits.infra.title': { kk: 'Инфрақұрылым', ru: 'Инфраструктура', en: 'Tenant infrastructure' },
  'benefits.infra.desc': {
    kk: 'Кофейхана, мейрамхана, банк, фитнес — бірінші және цоколь қабаттарда.',
    ru: 'Кофейня, ресторан, банк, фитнес — на первом и цокольном этажах.',
    en: 'Coffee shop, restaurant, bank, fitness — on the ground and lower floors.',
  },

  // ===== ABOUT =====
  'about.eyebrow': { kk: 'Біз туралы', ru: 'О бизнес-центре', en: 'About' },
  'about.title': {
    kk: 'A класты бизнес ортасы',
    ru: 'Деловая среда класса A',
    en: 'Class A business environment',
  },
  'about.text': {
    kk: 'Бизнес-орталық жалдаушылар үшін ыңғайлы инфрақұрылымды, заманауи инженерлік шешімдерді және 24/7 қызметті біріктіреді. Біз компанияларға өсуге және клиенттермен жұмыс істеуге жайлы ортаны қамтамасыз етеміз.',
    ru: 'Бизнес-центр объединяет удобную инфраструктуру для арендаторов, современные инженерные решения и сервис 24/7. Мы создаём среду, в которой компаниям комфортно расти и принимать клиентов.',
    en: 'The business centre combines tenant-focused infrastructure, modern engineering and 24/7 service. We provide a setting in which companies can grow and host their clients with confidence.',
  },
  'about.stat.floors': { kk: 'Қабаттар', ru: 'Этажей', en: 'Floors' },
  'about.stat.area': { kk: 'Жалпы ауданы, м²', ru: 'Общая площадь, м²', en: 'Total area, m²' },
  'about.stat.tenants': { kk: 'Жалдаушылар', ru: 'Арендаторов', en: 'Tenants' },
  'about.stat.parking': { kk: 'Паркинг орындары', ru: 'Парковочных мест', en: 'Parking spaces' },

  // ===== OFFICES PAGE =====
  'offices.title': { kk: 'Қолжетімді кеңселер', ru: 'Доступные офисы', en: 'Available offices' },
  'offices.subtitle': {
    kk: 'Командаңыздың ауқымына сай форматты таңдаңыз.',
    ru: 'Подберите формат под масштаб вашей команды.',
    en: 'Choose a format matching the scale of your team.',
  },
  'offices.filter.areaFrom': { kk: 'Аудан, м² бастап', ru: 'Площадь от, м²', en: 'Area from, m²' },
  'offices.filter.areaTo': { kk: 'Аудан, м² дейін', ru: 'Площадь до, м²', en: 'Area to, m²' },
  'offices.filter.floor': { kk: 'Қабат', ru: 'Этаж', en: 'Floor' },
  'offices.filter.status': { kk: 'Күйі', ru: 'Статус', en: 'Status' },
  'offices.filter.type': { kk: 'Түрі', ru: 'Тип', en: 'Type' },
  'offices.empty': { kk: 'Параметрлерге сәйкес кеңсе табылмады.', ru: 'По выбранным параметрам ничего не найдено.', en: 'No offices match the selected filters.' },

  // ===== ROOMS PAGE =====
  'rooms.title': { kk: 'Конференц-залдар', ru: 'Конференц-залы', en: 'Conference halls' },
  'rooms.subtitle': {
    kk: 'Кездесулер, тренингтер және презентациялар үшін.',
    ru: 'Для встреч, тренингов и презентаций.',
    en: 'For meetings, trainings and presentations.',
  },
  'rooms.hourly': { kk: 'Сағатына', ru: 'В час', en: 'Per hour' },

  // ===== TENANTS PAGE =====
  'tenants.title': { kk: 'Жалдаушылар', ru: 'Арендаторы', en: 'Tenants' },
  'tenants.subtitle': {
    kk: 'Бізді өздерінің кеңсесі ретінде таңдаған компаниялар.',
    ru: 'Компании, выбравшие нас своим рабочим адресом.',
    en: 'Companies that have chosen us as their address.',
  },
  'tenants.website': { kk: 'Сайт', ru: 'Сайт', en: 'Website' },
  'tenants.category': { kk: 'Санат', ru: 'Категория', en: 'Category' },
  'tenants.office': { kk: 'Кеңсе нөмірі', ru: 'Номер офиса', en: 'Office no.' },

  // ===== CONTACTS =====
  'contacts.title': { kk: 'Байланыс', ru: 'Контакты', en: 'Contacts' },
  'contacts.subtitle': {
    kk: 'Кеңсе таңдау немесе экскурсияға жазылу үшін бізбен байланысыңыз.',
    ru: 'Свяжитесь с нами, чтобы подобрать офис или записаться на экскурсию.',
    en: 'Get in touch to choose an office or arrange a viewing.',
  },
  'contacts.address': { kk: 'Мекенжай', ru: 'Адрес', en: 'Address' },
  'contacts.phone': { kk: 'Телефон', ru: 'Телефон', en: 'Phone' },
  'contacts.email': { kk: 'Email', ru: 'Email', en: 'Email' },
  'contacts.hours': { kk: 'Жұмыс уақыты', ru: 'Часы работы', en: 'Working hours' },
  'contacts.mapPlaceholder': { kk: 'Карта көрсетіледі', ru: 'Здесь будет карта', en: 'Map will appear here' },
  'contacts.info': { kk: 'Жалпы ақпарат және байланыс деректері', ru: 'Общая информация и контактные данные', en: 'General information and contact details' },

  // ===== FORM =====
  'form.name': { kk: 'Аты-жөні', ru: 'Имя', en: 'Name' },
  'form.phone': { kk: 'Телефон', ru: 'Телефон', en: 'Phone' },
  'form.email': { kk: 'Email', ru: 'Email', en: 'Email' },
  'form.interest': { kk: 'Қызығушылық', ru: 'Интересует', en: 'Interest' },
  'form.message': { kk: 'Хабарлама', ru: 'Сообщение', en: 'Message' },
  'form.submit': { kk: 'Жіберу', ru: 'Отправить', en: 'Submit' },
  'form.success': {
    kk: 'Өтінім қабылданды. Жақын арада сізбен хабарласамыз.',
    ru: 'Заявка принята. Мы свяжемся с вами в ближайшее время.',
    en: 'Your request has been received. We will be in touch shortly.',
  },
  'form.errorRequired': { kk: 'Міндетті өріс', ru: 'Обязательное поле', en: 'Required field' },

  // ===== LOGIN =====
  'login.title': { kk: 'Әкімші панеліне кіру', ru: 'Вход в админ-панель', en: 'Sign in to admin' },
  'login.subtitle': {
    kk: 'Демо аккаунты: admin@business.kz / admin123',
    ru: 'Демо аккаунт: admin@business.kz / admin123',
    en: 'Demo account: admin@business.kz / admin123',
  },
  'login.password': { kk: 'Құпиясөз', ru: 'Пароль', en: 'Password' },
  'login.submit': { kk: 'Кіру', ru: 'Войти', en: 'Sign in' },
  'login.invalid': { kk: 'Қате email немесе құпиясөз', ru: 'Неверный email или пароль', en: 'Invalid email or password' },

  // ===== ADMIN =====
  'admin.dashboard': { kk: 'Басты тақта', ru: 'Сводка', en: 'Dashboard' },
  'admin.offices': { kk: 'Кеңселер', ru: 'Офисы', en: 'Offices' },
  'admin.conferenceRooms': { kk: 'Конференц-залдар', ru: 'Конференц-залы', en: 'Conference halls' },
  'admin.tenants': { kk: 'Жалдаушылар', ru: 'Арендаторы', en: 'Tenants' },
  'admin.leads': { kk: 'Өтінімдер', ru: 'Лиды', en: 'Leads' },
  'admin.users': { kk: 'Пайдаланушылар', ru: 'Пользователи', en: 'Users' },
  'admin.gallery': { kk: 'Галерея', ru: 'Галерея', en: 'Gallery' },
  'admin.gallery.subtitle': {
    kk: 'Басты беттегі карусельдің суреттерін басқарыңыз.',
    ru: 'Управляйте слайдами карусели на главной странице.',
    en: 'Manage the slides of the homepage carousel.',
  },
  'admin.gallery.image': { kk: 'Сурет', ru: 'Изображение', en: 'Image' },
  'admin.gallery.title': { kk: 'Тақырып', ru: 'Заголовок', en: 'Title' },
  'admin.gallery.caption': { kk: 'Қысқа сипаттама', ru: 'Подпись', en: 'Caption' },
  'admin.gallery.order': { kk: 'Реті', ru: 'Порядок', en: 'Order' },
  'admin.news': { kk: 'Жаңалықтар', ru: 'Новости', en: 'News' },
  'admin.news.subtitle': {
    kk: 'Жаңалықтарды жариялаңыз, тегтерді және мұқабаларды басқарыңыз.',
    ru: 'Публикуйте новости, управляйте тегами и обложками.',
    en: 'Publish news, manage tags and covers.',
  },
  'admin.news.cover': { kk: 'Мұқаба', ru: 'Обложка', en: 'Cover' },
  'admin.news.tag': { kk: 'Тег', ru: 'Тег', en: 'Tag' },
  'admin.news.title': { kk: 'Тақырып', ru: 'Заголовок', en: 'Title' },
  'admin.news.slug': { kk: 'Қысқа сілтеме', ru: 'Slug', en: 'Slug' },
  'admin.news.excerpt': { kk: 'Қысқаша', ru: 'Краткое описание', en: 'Excerpt' },
  'admin.news.body': { kk: 'Мәтін', ru: 'Текст', en: 'Body' },
  'admin.news.publishedAt': { kk: 'Жариялау күні', ru: 'Дата публикации', en: 'Published at' },
  'admin.settings': { kk: 'Сайт баптаулары', ru: 'Настройки сайта', en: 'Site settings' },
  'admin.metrics.offices': { kk: 'Барлық кеңселер', ru: 'Всего офисов', en: 'Total offices' },
  'admin.metrics.available': { kk: 'Бос кеңселер', ru: 'Свободных офисов', en: 'Available offices' },
  'admin.metrics.leads': { kk: 'Өтінімдер', ru: 'Лидов', en: 'Leads' },
  'admin.metrics.tenants': { kk: 'Жалдаушылар', ru: 'Арендаторов', en: 'Tenants' },
  'admin.metrics.rooms': { kk: 'Конференц-залдар', ru: 'Конференц-залов', en: 'Conference halls' },
  'admin.recentLeads': { kk: 'Соңғы өтінімдер', ru: 'Последние заявки', en: 'Recent requests' },
  'admin.section.list': { kk: 'Тізім', ru: 'Список', en: 'List' },
  'admin.section.create': { kk: 'Жасау', ru: 'Создать', en: 'Create' },
  'admin.section.editing': { kk: 'Өңдеу', ru: 'Редактирование', en: 'Editing' },
  'admin.confirmDelete': { kk: 'Жоюды растайсыз ба?', ru: 'Подтвердить удаление?', en: 'Confirm deletion?' },
  'admin.comments': { kk: 'Пікірлер', ru: 'Комментарии', en: 'Comments' },
  'admin.addComment': { kk: 'Пікір қосу', ru: 'Добавить комментарий', en: 'Add comment' },
  'admin.noComments': { kk: 'Пікірлер жоқ', ru: 'Комментариев пока нет', en: 'No comments yet' },

  // ===== SETTINGS =====
  'settings.general': { kk: 'Жалпы', ru: 'Общие', en: 'General' },
  'settings.appearance': { kk: 'Сыртқы түрі', ru: 'Внешний вид', en: 'Appearance' },
  'settings.content': { kk: 'Контент', ru: 'Контент', en: 'Content' },
  'settings.businessName': { kk: 'Бизнес-орталық атауы', ru: 'Название бизнес-центра', en: 'Business centre name' },
  'settings.heroTitle': { kk: 'Hero тақырыбы', ru: 'Заголовок hero', en: 'Hero title' },
  'settings.heroSubtitle': { kk: 'Hero субтитрі', ru: 'Подзаголовок hero', en: 'Hero subtitle' },
  'settings.aboutText': { kk: 'Біз туралы мәтін', ru: 'Текст «О бизнес-центре»', en: 'About text' },
  'settings.theme.blue': { kk: 'Көк', ru: 'Синяя', en: 'Blue' },
  'settings.theme.brown': { kk: 'Қоңыр', ru: 'Коричневая', en: 'Brown' },
  'settings.theme.black': { kk: 'Қара', ru: 'Тёмная', en: 'Black' },
  'settings.theme.silver': { kk: 'Күміс', ru: 'Серебро', en: 'Silver' },
  'settings.saved': { kk: 'Баптаулар сақталды', ru: 'Настройки сохранены', en: 'Settings saved' },

  // ===== GALLERY =====
  'gallery.title': {
    kk: 'Бизнес-орталықты көру',
    ru: 'Взгляд изнутри',
    en: 'A look inside',
  },
  'gallery.subtitle': {
    kk: 'Холлдан шатыр террасасына дейін — қол қойылған бөлшектер.',
    ru: 'От холла до террасы на крыше — кадры с вниманием к деталям.',
    en: 'From the lobby to the rooftop — frames captured with care for detail.',
  },

  // ===== NEWS =====
  'news.title': {
    kk: 'Жаңалықтар мен оқиғалар',
    ru: 'Новости и события',
    en: 'News & events',
  },
  'news.subtitle': {
    kk: 'Бизнес-орталықтағы өзгерістер, оқиғалар және жалдаушылар.',
    ru: 'Изменения в бизнес-центре, события и жизнь арендаторов.',
    en: 'Changes at the business centre, events and tenant life.',
  },
  'news.all': { kk: 'Барлық жаңалықтар', ru: 'Все новости', en: 'All news' },
  'news.more': { kk: 'Тағы жаңалықтар', ru: 'Ещё новости', en: 'More stories' },

  // ===== CTA =====
  'cta.title': { kk: 'Көрсетілім жоспарлайық', ru: 'Запланируем показ', en: 'Schedule a viewing' },
  'cta.text': {
    kk: 'Кеңсе таңдау, конференц-зал жалдау немесе арендаторлар жайында сұрақтарыңыз болса — біз сізбен бір жұмыс күні ішінде хабарласамыз.',
    ru: 'Если хотите подобрать офис, арендовать конференц-зал или узнать про арендаторов — мы свяжемся с вами в течение рабочего дня.',
    en: 'If you would like to choose an office, hire a conference hall or learn about our tenants — we will respond within one business day.',
  },

  // ===== FOOTER =====
  'footer.rights': { kk: 'Барлық құқықтар қорғалған', ru: 'Все права защищены', en: 'All rights reserved' },
  'footer.legal': { kk: 'Заңды ақпарат', ru: 'Юридическая информация', en: 'Legal information' },
};
