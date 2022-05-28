import postgres from 'postgres';

const protocol = 'postgres://';
const user = 'postgres';
const password = 'postgres';
const server = 'localhost';
const port = '5432';
const database = 'zoologico_db';

const stringConexao = protocol + user + ':' + password + '@' + server + ':' + port + '/' + database;

const sql = postgres(stringConexao);

export const createTables = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS especies (
      id SERIAL PRIMARY KEY,
      nome_cientifico VARCHAR NOT NULL,
      nome_popular VARCHAR NOT NULL,
      habitat VARCHAR NOT NULL,
      familia VARCHAR NOT NULL,
      ordem VARCHAR NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS jaulas (
      id SERIAL PRIMARY KEY,
      codigo INTEGER NOT NULL,
      area FLOAT NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS especimes (
      id SERIAL PRIMARY KEY,
      numero_serie INTEGER NOT NULL,
      apelido VARCHAR,
      especie_id INTEGER REFERENCES especies (id),
      jaula_id INTEGER REFERENCES jaulas (id)
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS zeladores (
      id SERIAL PRIMARY KEY,
      matricula VARCHAR NOT NULL,
      nome VARCHAR NOT NULL,
      data_nascimento DATE NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS zeladores_jaulas (
      zelador_id INTEGER,
      jaula_id INTEGER,
      PRIMARY KEY (zelador_id, jaula_id),
      FOREIGN KEY (zelador_id) REFERENCES zeladores (id),
      FOREIGN KEY (jaula_id) REFERENCES jaulas (id)
    );
  `;

  await sql`
    TRUNCATE especies, jaulas, especimes, zeladores, zeladores_jaulas;
  `;
}

export const endConnection = async () => {
  await sql.end();
  console.log('⚡ Malfeito feito');
}

export default sql;