import React from "react";
import style from "../estilo/css/CadastraMeta.module.css";
import Input from "./Input";
import { GlobalContext } from "../Helps/GlobalContext";

const CadastraMeta = ({ setCadastroMeta }) => {
  const { form, setForm, atualizaMeta, formAtualizado, setFormAtualizado } =
    React.useContext(GlobalContext);

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const response = await fetch(`/api/atualizar/${atualizaMeta}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        console.log("Item atualizado com sucesso");
      } else {
        console.log("Erro ao atualizar o item");
      }
    } catch (error) {
      console.error(error);
      console.log("Erro ao conectar ao servidor");
    }
  }

  // busca a api INSERT e realiza uma inclusão no banco
  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3001/api/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form), // coloca o objeto form no body e converte em stringFy
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setForm({
          codigo: "",
          descricao: "",
          meta_valor: "",
          meta_quant: "",
          valor_unitario: "",
        }); // apaga os campos do form
        return console.log(result.message);
      })
      .catch((error) => {
        console.error("Erro ao inserir dados:", error);
      });
  }

  //VV Renderiza o formulario de cadastro VV//
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
      <Input label="valor_unitario" type="number" text="Valor Unitario" />
      <Input label="descricao" type="text" text="Descrição" />
      <Input label="meta_valor" type="number" text="Meta em R$" />
      <Input label="meta_quant" type="number" text="Meta em Quantidade" />

      {atualizaMeta ? (
        <button
          onClick={handleUpdate}
          className={`btn btn-primary ${style.button}`} // botao para função de UPDATE
        >
          Atualizar
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className={`btn btn-primary ${style.button}`} // btn para função de CADASTRAR
        >
          Gravar
        </button>
      )}
    </form>
  );
};

export default CadastraMeta;
