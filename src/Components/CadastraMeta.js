import React from "react";
import style from "../estilo/css/CadastraMeta.module.css";
import Input from "./Input";
import { GlobalContext } from "../Helps/GlobalContext";

const CadastraMeta = ({ setCadastroMeta }) => {
  const { form, setForm, atualizaMeta, formAtualizado, setFormAtualizado } =
    React.useContext(GlobalContext);

  function handleUpdate(e) {
    e.preventDefault();
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3001/api/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setForm({ codigo: "", descricao: "", meta_valor: "", meta_quant: "" });
        return console.log(result.message);
      })
      .catch((error) => {
        console.error("Erro ao inserir dados:", error);
      });
  }

  return (
    <form className={style.form}>
      <a onClick={() => setCadastroMeta(false)} className={style.voltar}>
        Voltar
      </a>
      <h4 className={style.title}>
        {" "}
        {atualizaMeta ? "Atualizar Meta" : "Cadastrar nova Meta"}
      </h4>
      <Input label="codigo" type="number" text="Codigo" />
      <Input label="descricao" type="text" text="Descrição" />
      <Input label="meta_valor" type="number" text="Meta em R$" />
      <Input label="meta_quant" type="number" text="Meta em Quantidade" />

      {atualizaMeta ? (
        <button
          onClick={handleUpdate}
          className={`btn btn-primary ${style.button}`}
        >
          Atualizar
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className={`btn btn-primary ${style.button}`}
        >
          Gravar
        </button>
      )}
    </form>
  );
};

export default CadastraMeta;
