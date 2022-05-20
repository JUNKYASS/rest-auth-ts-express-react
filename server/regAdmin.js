import logger from 'jet-logger';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
import pg from 'pg';

dotenv.config();

const main = async () => {
  const args = process.argv;

  if (args.length === 2) {
    console.error('Expected at least one argument!');

    process.exit(1);
  }

  const { Client } = pg;
  const db = new Client(process.env.DB_CONN_STRING);

  db.connect((err) => {
    if (err) {
      console.error(err);

      process.exit(1);
    }
  });

  // Checks for --custom and if it has a value
  const loginIndex = process.argv.indexOf('--login');
  const emailIndex = process.argv.indexOf('--email');
  const passwordIndex = process.argv.indexOf('--password');

  const loginValue = loginIndex > -1 ? args[loginIndex + 1] : undefined;
  const emailValue = emailIndex > -1 ? args[emailIndex + 1] : undefined;
  const passwordValue = passwordIndex > -1 ? args[passwordIndex + 1] : undefined;

  if (!(loginValue && emailValue && passwordValue)) {
    console.error('You must specify all the values: --login, --email, --password');

    process.exit(1);
  }

  const candidate = await db.query('SELECT * FROM users WHERE login = $1 OR email = $2', [loginValue, emailValue ? loginValue : emailValue]);
  if (candidate.rowCount) {
    console.error('User with such login or email already exists');

    process.exit(1);
  }

  const hashedPass = await bcrypt.hash(passwordValue, 3);
  const activation_id = uuid();
  const user = await db.query('INSERT INTO users (login, password, email, is_admin, is_actiivated, activation_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [loginValue, hashedPass, emailValue, true, true, activation_id])
  // const user = await db.addUser({ login: loginValue, password: hashedPass.toString(), email: emailValue, is_admin: true, activation_id });

  if (user) {
    console.log('Registration successful: User have been added');

    process.exit(1);
  }
}

main();