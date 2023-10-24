import React from "react";
import style from "../estilo/css/Resultado.module.css";
import { GlobalContext } from "../Helps/GlobalContext";
import Resumo from "./Resumo";
import Sintetico from "./Sintetico";

const Resultado = ({
  vendedora,
  valorComum,
  valorExclusivo,
  valorTotal,
  valVendido,
  porcVendido,
  valVendidoExclusivo,
  valVendidoComum,
  pedidosSinteticos,
}) => {
  const [modal, setModal] = React.useState("");
  const [visualizar, setvisualizar] = React.useState(false);

  function converteParaReal(numero) {
    // faz a conversão para R$ XX.XX
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function handleCLick(modal) {
    setModal(modal);
  }

  // Renderiza todos os resultados na tela
  return (
    <section className={style.resultado}>
      {modal == "sintetico" && (
        <Sintetico setModal={setModal} pedidosSinteticos={pedidosSinteticos} /> // Modal SINTETICo
      )}
      <div className={`${style.head} shadow-sm  bg-body `}>
        <h3 className={style.vendedora}>
          Vendedor(a) <span>{vendedora}</span>{" "}
        </h3>
      </div>
      <div
        className={`${style.head} shadow-sm  bg-body `}
        onClick={() => {
          handleCLick("sintetico");
        }}
        onMouseOver={() => setvisualizar(false)}
      >
        {visualizar && (
          <div
            onMouseLeave={() => setvisualizar(!visualizar)}
            className={style.visualizar}
          >
            <p>Clique para visualizar os pedidos</p>
          </div>
        )}
        {visualizar === false && (
          <p className={style.valorTotal}>
            <div>
              Valor total já Vendido{" "}
              <span>
                {converteParaReal(valVendidoComum + valVendidoExclusivo)}{" "}
              </span>{" "}
            </div>
            <div>
              Valor total da Comissão:{" "}
              <span>{converteParaReal(valorTotal)}</span>{" "}
            </div>
          </p>
        )}
      </div>

      <div className={`${style.tabelaContainer} shadow-sm  bg-body`}>
        <h1>Venda Comum</h1>
        <div className={style.atualizadas}>
          <div className={style.apuracao}>
            <h4>Total Vendido</h4>
            <p>{converteParaReal(valVendidoComum)}</p>
          </div>
          <div className={style.apuracao}>
            <h4>Total Comissão</h4>
            <p>{converteParaReal(valorComum)}</p>
          </div>
        </div>
      </div>
      <div className={`${style.tabelaContainer} shadow-sm  bg-body`}>
        <h1>Promoção Exclusiva</h1>
        <div className={style.atualizadas}>
          <div className={style.apuracao}>
            <h4>Total Vendido</h4>
            <p>{converteParaReal(valVendidoExclusivo)}</p>
          </div>
          <div className={style.apuracao}>
            <h4>Total Comissão</h4>
            <p>{converteParaReal(valorExclusivo)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resultado;
