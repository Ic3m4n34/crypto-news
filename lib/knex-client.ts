import 'dotenv/config';
import knex from 'knex';

const config = {
  client: 'pg',
  connection: `postgres://postgres:${process.env.DATABASE_PW}@${process.env.DATABASE_URL}:5432/postgres`,
};

const knexInstance = knex(config);

export default knexInstance;
