const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "admin",
  port: 5432,
});

const connect = async () => {
  try {
    await client.connect();
    console.log("Conexão bem sucedida com o Postgres");
  } catch (error) {
    console.error("Erro ao conectar", error);
  }
};

module.exports = {
  client, // Exportar o cliente PostgreSQL
  connect, // Exportar a função de conexão
};
