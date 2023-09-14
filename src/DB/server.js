const express = require("express");
const { client, connect } = require("./connectDB.js");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

const cors = require("cors"); // Importe o pacote cors

app.use(cors());

connect(); // Chamada para estabelecer a conexão ao iniciar o aplicativo

app.use(bodyParser.json());

app.post("/api/insert", async (req, res) => {
  const { codigo, descricao, meta_valor, meta_quant } = req.body;

  try {
    await client.query(
      "INSERT INTO meta (codigo,descricao,meta_valor,meta_quant) VALUES ($1,$2,$3,$4)",
      [codigo, descricao, meta_valor, meta_quant]
    );
    res.json({ message: "Dados inseridos com sucesso" });
  } catch (error) {
    console.error("Erro ao inserir dados ", error);
    res.status(500).json({ error: "Erro ao inserir dados" });
  }
});


app.get("/api/metas", async (req, res) => {
  try {
    const result = await client.query("select * from meta");
    res.json(result.rows);
  } catch (error) {
    console.log("Erro ao buscar metas", error);
    res.status(500).json({ error: "Erro ao buscar metas" });
  }
});


app.delete("/api/metas/:id", async (req, res) => {
  const metaID = req.params.id;

  try {
    // Execute a consulta SQL para excluir o registro com o ID especificado
    await client.query("DELETE FROM meta WHERE codigo = $1", [metaID]);
    res.json({ message: "Registro excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir registro:", error);
    res.status(500).json({ error: "Erro ao excluir registro" });
  }
});


app.put("/api/metas/:id", async (req, res) => {
  const metaID = req.params.id; // Obtém o ID do parâmetro da URL
  const { codigo, descricao, meta_valor, meta_quant } = req.body; // Obtém os novos dados do corpo da solicitação

  try {
    // Execute a consulta SQL para atualizar o registro com o ID especificado
    await client.query(
      "UPDATE meta SET codigo = $1, descricao = $2, meta_valor = $3, meta_quant = $4 WHERE codigo = $5",
      [codigo, descricao, meta_valor, meta_quant, metaID]
    );
    res.json({ message: "Registro atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar registro:", error);
    res.status(500).json({ error: "Erro ao atualizar registro" });
  }
});



app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
