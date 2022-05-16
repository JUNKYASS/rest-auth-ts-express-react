require('dotenv').config();
const path = require('path');

module.exports = {
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBNAME,
  },
  schemas: [
    {
      name: 'public',
      modelFolder: path.join(__dirname, 'src', 'models'),
    },
  ],
};