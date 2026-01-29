## Описание проекта

Приложение состоит из двух частей:
- **Backend**: REST API на Node.js/Express с PostgreSQL
- **Frontend**: SPA на React с Vite

### Основные возможности

- Регистрация и аутентификация пользователей (JWT)
- Управление задачами (создание, редактирование, удаление)
- Просмотр списка пользователей
- Личный профиль пользователя
- Защищенные маршруты

## Технологический стек

### Backend
- **Node.js** + **Express** - серверный фреймворк
- **PostgreSQL** - база данных
- **Sequelize** - ORM для работы с БД
- **JWT** - токены аутентификации
- **bcrypt** - хеширование паролей
- **CORS** - кросс-доменные запросы

### Frontend
- **React 19** - UI библиотека
- **Vite** - сборщик проекта
- **React Router 7** - маршрутизация
- **Lucide React** - иконки
- **CSS Modules** - стилизация

## Структура проекта

```
bv-411-app/
├── backend/
│   ├── src/
│   │   ├── config/          # Конфигурация (БД)
│   │   ├── constants/       # Константы приложения
│   │   ├── controllers/     # Контроллеры (auth, task, user)
│   │   ├── errors/          # Обработка ошибок
│   │   ├── middlewares/     # Middleware (auth, error)
│   │   ├── models/          # Модели Sequelize (User, Task)
│   │   ├── routes/          # Маршруты API
│   │   ├── services/        # Бизнес-логика
│   │   └── index.js         # Точка входа
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React компоненты
│   │   ├── context/         # Context API (AuthContext)
│   │   ├── layouts/         # Layouts (MainLayout)
│   │   ├── pages/           # Страницы приложения
│   │   ├── services/        # API сервисы
│   │   ├── shared/          # Общие утилиты и константы
│   │   ├── styles/          # Глобальные стили
│   │   └── main.jsx         # Точка входа
│   └── package.json
│
└── README.md
```

## Установка и запуск

### Предварительные требования

- Node.js (v18 или выше)
- PostgreSQL (v12 или выше)
- npm или yarn

### 1. Клонирование репозитория

```bash
git clone https://github.com/isHardCoded/bv-411-app.git
cd bv-411-app
```

### 2. Настройка Backend

#### 2.1. Установка зависимостей

```bash
cd backend
npm install
```

#### 2.2. Настройка переменных окружения

Создайте файл `.env` в папке `backend/` со следующими переменными:

```env
# Порт сервера
PORT=3000

# Настройки PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bv411_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT секретный ключ
JWT_SECRET=your_secret_key_here
```

#### 2.3. Создание базы данных

```bash
# Подключитесь к PostgreSQL и создайте базу данных
psql -U postgres
CREATE DATABASE bv411_db;
\q
```

База данных будет автоматически синхронизирована при первом запуске приложения благодаря `sequelize.sync({ alter: true })`.

### 3. Настройка Frontend

#### 3.1. Установка зависимостей

```bash
cd frontend
npm install
```

#### 3.2. Настройка API URL

По умолчанию frontend подключается к `http://localhost:3000/api`. Если нужно изменить, отредактируйте файл [frontend/src/shared/constants.js](frontend/src/shared/constants.js):

```javascript
export const BASE_URL = 'http://localhost:3000/api';
```

## Запуск приложения

### Режим разработки

#### Запуск Backend

```bash
cd backend
npm run dev
```

Сервер запустится на `http://localhost:3000` с автоматической перезагрузкой при изменении файлов (nodemon).

#### Запуск Frontend

```bash
cd frontend
npm run dev
```

Приложение будет доступно по адресу, указанному в консоли (обычно `http://localhost:5173`).

## Доступные скрипты

### Backend Scripts

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск в режиме разработки с nodemon |
| `npm test` | Запуск тестов (не настроено) |

### Frontend Scripts

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера Vite |
| `npm run build` | Production сборка |
| `npm run preview` | Предпросмотр production-сборки |
| `npm run lint` | Проверка кода с помощью ESLint |

## API Endpoints

Backend предоставляет следующие API маршруты:

### Аутентификация (`/api/auth`)
- `POST /api/auth/register` - Регистрация нового пользователя
- `POST /api/auth/login` - Вход в систему

### Пользователи (`/api/users`)
- `GET /api/users` - Получить список всех пользователей
- `GET /api/users/:id` - Получить информацию о пользователе

### Задачи (`/api/tasks`)
- `GET /api/tasks` - Получить список всех задач
- `GET /api/tasks/:id` - Получить информацию о задаче
- `POST /api/tasks` - Создать новую задачу
- `PUT /api/tasks/:id` - Обновить задачу
- `DELETE /api/tasks/:id` - Удалить задачу

## Модели данных

### User (Пользователь)
- `id` - Уникальный идентификатор
- `username` - Имя пользователя
- `email` - Email адрес
- `password` - Хешированный пароль

### Task (Задача)
- `id` - Уникальный идентификатор
- `title` - Название задачи
- `description` - Описание задачи
- `status` - Статус задачи
- `userId` - ID пользователя-автора

## Решение проблем

### Backend не запускается

1. Проверьте, что PostgreSQL запущен
2. Убедитесь, что все переменные окружения в `.env` настроены правильно
3. Проверьте, что база данных создана
4. Убедитесь, что порт 3000 свободен

### Frontend не подключается к Backend

1. Убедитесь, что Backend запущен на `http://localhost:3000`
2. Проверьте настройки CORS в Backend
3. Проверьте `BASE_URL` в [frontend/src/shared/constants.js](frontend/src/shared/constants.js)

### Ошибки при установке зависимостей

```bash
# Очистка кеша и переустановка
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```