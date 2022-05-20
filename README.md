# Rest API application

## Stack

#### __Frontend__: React.js, Typescript

#### __Backend__: Node.js, Express.js, PostgreSQL, Typescript

<br>

## Запуск проекта
1. __Скачиваем проект и установливаем зависимости__ <br>
  1.1. _git clone https://github.com/JUNKYASS/rest-auth-ts-express-react.git_<br>
  1.2. Перейти в дирректорию проекта<br>
  1.3. перейти в папку с бекенд частью: _cd server_<br>
  1.4. npm i<br>
  1.5. Перейти в папку с клиентской частью: _cd ../client_<br>
  1.6. npm i<br>
  1.7. Установить PostgreSQL на свою ОС<br>

2. __Подключение к базе данных__<br>
  2.1. В корне проекта взять файл restAuthDbBackup и перенести в папку bin, которая находится в папке PostgreSQL, обычно она устанавливаем по этому пути: C:\Program Files\PostgreSQL\14\bin<br>
  2.2. Запустить терминал, перейти в папку bin: _cd C:\Program Files\PostgreSQL\14\bin_
  2.3. Создать базу данных с названием rest-auth-db (используя стандартную программу pgAdmin, которая устанавливается вместе с PostgreSQL, либо через терминал)<br>
  2.4. Выполнить команду, которая сделает восстановление БД из бекап файла: _psql -U postgres -d rest-auth-db < restAuthDbBackup_<br>
  2.5. Добавить файл _.env_ с настройками проекта в корневую директорию бекенд части (/server), для получения файла писать мне в ТГ: @drinkforlove<br>
  2.6. Добавить нового пользователя, либо использовать суперюзера, который создается в postgres по умолчанию (не забыть подставить корректные данные для подключения к БД в файл .env)<br>

3. __Запустить проект__<br>
  3.1. Перейти в бекенд часть: _cd server_<br>
  3.2. Запустить бекенд: _npm start_<br>
  3.3. Перейти в клиентскую часть: _cd ../client_<br>
  3.4. Запустить клиент: _npm start_<br>

<br>

## Администратор

### __Регистрация администратора__

Перейдите в директорию /server и запустите скрипт регистрации аккаунта админа командой:

> node regAdmin.js --login your_login --email your_email --password your_password


Например:<br>
> node regAdmin.js --login admin --email admin1@gmail.com --password admin123


### __Авторизация администратора__
Для авторизации администратора предусмотрена отдельная страница, доступная по адресу "/admin", например: http://localhost:3000/admin

