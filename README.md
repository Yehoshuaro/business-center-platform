# Business Center — Frontend Template

Универсальный фронтенд-шаблон сайта для бизнес-центра.
Публичная витрина + админ-панель, без backend, всё работает локально через `localStorage`.

A universal frontend template for a business centre website. Public storefront +
admin panel, no backend required — all data persists in `localStorage`.

---

## Стек / Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** (CSS variables for themes)
- **React Router v6** (HashRouter — safe on any static host)
- **Zustand** (state + persistence)
- **lucide-react** (icons, used sparingly)

---

## Возможности / Features

### Publuc site
- Главная (hero, преимущества, о бизнес-центре, превью офисов, конференц-залов, арендаторов, контакты)
- Список офисов с фильтрами (площадь, этаж, статус, тип) и детальной страницей
- Список конференц-залов с детальной страницей
- Каталог арендаторов
- Страница контактов с формой заявки

### Admin panel (`/admin`)
- Dashboard с метриками и последними заявками
- CRUD: офисы, конференц-залы, арендаторы, лиды, пользователи
- Управление лидами: смена статуса, комментарии менеджеров
- Настройки сайта: название, контакты, тема, язык, hero/about тексты для каждого языка

### Темы (4)
`Blue`, `Brown`, `Black` (полная тёмная тема), `Silver`.
Меняются через переключатель в шапке или в `/admin/settings`.

### Языки (3)
Қазақша, Русский, English. Все строки UI вынесены в словари (`src/features/i18n/dictionaries.ts`).

---

## Запуск / Getting started

```bash
npm install
npm run dev
```

Откройте http://localhost:5173

### Production build

```bash
npm run build
npm run preview
```

---

## Demo login

```
Email:    admin@business.kz
Password: admin123
```

После входа доступна админка по адресу `/#/admin`.
Сессия хранится в `localStorage` под ключом `bc.session`.
Выход — кнопка `Sign out` в сайдбаре админки.

---

## Локальные данные / Local data

Всё хранится в `localStorage` браузера. Ключи:

| Key                 | Содержимое              |
|---------------------|-------------------------|
| `bc.theme`          | Текущая тема            |
| `bc.language`       | Текущий язык            |
| `bc.session`        | Сессия пользователя     |
| `bc.offices`        | Офисы                   |
| `bc.conferenceRooms`| Конференц-залы          |
| `bc.tenants`        | Арендаторы              |
| `bc.leads`          | Лиды                    |
| `bc.users`          | Пользователи            |
| `bc.settings`       | Настройки сайта         |

Чтобы сбросить всё к seed-данным — очистите `localStorage` (DevTools → Application → Storage → Clear).

---

## Как поменять название бизнес-центра

**Вариант 1 (рекомендуется):** Войдите в админку → `/admin/settings` → поле **«Название бизнес-центра»** → Save.

**Вариант 2:** Отредактируйте `src/data/seed.ts`, поле `businessCenterName` в `seedSettings`, и очистите `localStorage` ключа `bc.settings`.

---

## Как поменять тему

- Через переключатель темы в шапке сайта (доступен и публично, и в админке).
- Или в `/admin/settings` → блок **Appearance** → выберите тему → Save.

Чтобы изменить палитру самой темы — отредактируйте CSS-переменные в `src/index.css` (блоки `[data-theme='blue']`, `[data-theme='brown']`, `[data-theme='black']`, `[data-theme='silver']`).

---

## Деплой на GitHub Pages

В репозитории уже есть workflow `.github/workflows/deploy.yml`.

1. Запушьте проект в репозиторий на GitHub.
2. В настройках репозитория: **Settings → Pages → Source = GitHub Actions**.
3. Любой push в `main` автоматически билдит и публикует `dist/` на Pages.

Роутер уже использует `HashRouter`, поэтому refresh на любом адресе (`/#/admin/offices`) работает корректно — никаких `404.html` обходов и серверной конфигурации не требуется.

---

## Деплой на любой static hosting (Netlify, Vercel, Cloudflare Pages, S3, nginx)

```bash
npm run build
```

Залейте содержимое папки `dist/` на хостинг. Никаких environment-переменных и backend не нужно.

---

## Структура проекта

```
src/
  app/                      — корневой компонент и роутер
    App.tsx
    router.tsx
  shared/
    components/
      layout/               — Navbar, Footer, Layouts, Switchers
      ui/                   — PageHeader, MetricCard, Badges, ConfirmDialog, ...
      forms/                — LeadForm
    types/                  — все TypeScript-типы домена
    utils/                  — cn, uid, formatPrice, persist, ...
  features/
    theme/                  — store темы + applier
    i18n/                   — словари + store языка + хук useT()
    auth/                   — demo-авторизация, ProtectedRoute
    offices/                — store офисов
    conferenceRooms/        — store конференц-залов
    tenants/                — store арендаторов
    leads/                  — store лидов
    users/                  — store пользователей
    settings/               — store настроек сайта
  pages/
    public/                 — публичные страницы
    admin/                  — страницы админки
  data/
    seed.ts                 — начальные данные
  index.css                 — Tailwind + темы + компонентные классы
  main.tsx                  — entry
```

---

## Маршруты / Routes

Публичные:
- `/` — главная
- `/offices`, `/offices/:id`
- `/conference-rooms`, `/conference-rooms/:id`
- `/tenants`
- `/contacts`
- `/login`

Админка (требует входа, иначе редирект на `/login`):
- `/admin` — dashboard
- `/admin/offices`
- `/admin/conference-rooms`
- `/admin/tenants`
- `/admin/leads`
- `/admin/users`
- `/admin/settings`

Внутри собранного приложения роутер использует hash-режим: реальные адреса вида `https://example.com/#/admin/offices`.

---

## Backend / API

Backend не предусмотрен. Если в дальнейшем потребуется реальный API:

1. Замените содержимое stores в `src/features/*/store.ts` — `readPersisted` / `writePersisted` подменяются на fetch к API.
2. Демо-авторизацию в `src/features/auth/store.ts` замените на реальный endpoint.
3. Форма заявки в `src/shared/components/forms/LeadForm.tsx` сейчас вызывает `useLeadsStore.create` — замените на POST в CRM.

Архитектура stores уже изолирована от UI, поэтому миграция на API локальная и предсказуемая.

---

## Лицензия

Используйте как шаблон для своих проектов.
