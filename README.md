# Чат-бот NUCKles
[![Maintainability](https://api.codeclimate.com/v1/badges/a8d381c585f7027a8a21/maintainability)](https://codeclimate.com/github/blurtech/bot-backend/maintainability) [![GitHub issues](https://img.shields.io/github/issues/blurtech/bot-backend.svg)](https://github.com/blurtech/bot-backend/issues)  [![HitCount](http://hits.dwyl.io/blurtech/bot-backend.svg)](http://hits.dwyl.io/blurtech/bot-backend)  

Который умеет принимать и отправлять сообщения и распознавать их с помощью [алгоритма Левенштейна](https://dzone.com/articles/the-levenshtein-algorithm-1).  

[Список изменений](CHANGELOG.md)  
[Документация по коду](https://blur.tech/bot-backend/)  
[Бот на Heroku](https://nuckles.herokuapp.com/)  

## Как завести конягу
Перед запуском любой из команд кроме последней нужно выполнить `npm install`.  
`npm start` - запустит сервер Express  
`npm run dev` - запустит Express демоном  
`npm run lint` - запуск линтера, если запустить командой `npm run lint-fix`, то примет исправления автоматически (`lint-fix` разрешено использовать только тем у кого не растёт борода)  
`npm run doc` - генерирует JSDoc документацию  
`npm run test` - запустит тесты  
`docker-compose up` - запуск целиком приложения с базой данных
