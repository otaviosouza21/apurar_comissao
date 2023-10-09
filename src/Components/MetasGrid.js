import React, { useEffect } from "react";
import style from "../estilo/css/MetasGrid.module.css";
import edit from "../estilo/img/edit.svg";
import trash from "../estilo/img/trash.svg";
import { GlobalContext } from "../Helps/GlobalContext";
import CadastraMeta from "./CadastraMeta";

const MetasGrid = ({ cadastroMeta, setCadastroMeta }) => {
  const {
    form,
    setForm,
    setAtualizaMeta,
    atuaisMetas,
    setAtuaisMetas,
    fetchData,
  } = React.useContext(GlobalContext);

  function converteParaReal(numero) {
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:3001/api/metas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        fetchData();
      } else {
        console.error("Erro ao excluir registro:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir registro:", error);
    }
  }

  function handleUpdate(
    codigo,
    descricao,
    meta_valor,
    meta_quant,
    valor_unitario
  ) {
    setCadastroMeta(true);
    setAtualizaMeta(codigo);
    setForm({ codigo, descricao, meta_valor, meta_quant, valor_unitario });
  }

  return (
    <div>
      <h4>Metas Atualizadas - Setembro</h4>
      <table className={`table table-hover ${style.grid}`}>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Descrição</th>
            <th>Meta em R$</th>
            <th>Meta em quantidade</th>
            <th>Valor Unitario</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {atuaisMetas &&
          atuaisMetas.map((item, index) => {
            return (
              <tbody key={index} className={style.tbody}>
                <tr>
                  <td>{item.codigo}</td>
                  <td>{item.descricao}</td>
                  <td>{converteParaReal(item.meta_valor)}</td>
                  <td>{item.meta_quant} pçs</td>
                  <td>{converteParaReal(item.valor_unitario)}</td>
                  <td>
                    <img
                      onClick={() =>
                        handleUpdate(
                          item.codigo,
                          item.descricao,
                          item.meta_valor,
                          item.meta_quant,
                          item.valor_unitario
                        )
                      }
                      src={edit}
                    />
                  </td>
                  <td>
                    <img
                      onClick={() => handleDelete(item.codigo)}
                      src={trash}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
};

export default MetasGrid;
