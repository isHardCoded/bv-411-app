# Backend Express Project

Node.js backend на Express с использованием Sequelize для работы с PostgreSQL

## Установка

1. Клонируйте репозиторий:

```
git clone https://github.com/isHardCoded/node-practice.git
cd node-practice
```

2. Установите зависимости:

```
npm install
```

3. Настройте файл .env

## Запуск проекта

Для запуска в режиме разработки с автоматической перезагрузкой:

```
npm run dev
```

Приложение слушает по адресу по умолчанию (зависит от реализации в `src/index.js`, обычно `http://localhost:3000`).

## Скрипты

- `npm run dev` — запуск проекта с `nodemon`, следит за изменениями в директории `src`.

## Используемые технологии

- Node.js v18+
- Express 5
- Sequelize ORM
- PostgreSQL
- Nodemon для разработки

## Структура проекта (пример)

```
backend/
├── src/
│ ├── index.js # точка входа
│ ├── models/ # модели Sequelize
│ ├── routes/ # роутеры Express
│ └── controllers/ # обработки запросов
├── package.json
└── README.md
```
