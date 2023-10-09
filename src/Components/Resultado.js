import React from "react";
import style from "../estilo/css/Resultado.module.css";
import Metas from "./Metas";
import ProgressBar from "./ProgressBar";
import { GlobalContext } from "../Helps/GlobalContext";
import Alerta from "./Alerta";
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
  pedidosSinteticos
}) => {
  const [modal, setModal] = React.useState("");
  const { atuaisMetas, setAlerta, alerta } = React.useContext(GlobalContext);

  function converteParaReal(numero) {
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function handleCLick(modal) {
    setModal(modal);
  }

  return (
    <section className={style.resultado}>
     { modal == "sintetico" && <Sintetico setModal={setModal} pedidosSinteticos={pedidosSinteticos} />}
      <div className={style.head}>
        <h3 className={style.vendedora}>
          Vendedor(a) <span>{vendedora}</span>{" "}
        </h3>
      </div>
      <div className={style.head} onClick={()=>{handleCLick("sintetico")}}>
        <p className={style.valorTotal}>
          <div>
            Valor total já Vendido{" "}
            <span>
              {converteParaReal(valVendidoComum + valVendidoExclusivo)}{" "}
            </span>{" "}
          </div>
          <div>
            Valor total da Comissão: <span>{converteParaReal(valorTotal)}</span>{" "}
          </div>
        </p>
      </div>

      <div className={style.tabelaContainer}>
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
      <div className={style.tabelaContainer}>
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
          <button onClick={()=>{handleCLick("metas")}} className="btn btn-secondary btn-sm">
            Metas Atualizadas
          </button>
        </div>

        <div className={style.porcentagem}>
          {atuaisMetas
            ? atuaisMetas.map((item, index) => {
                return (
                  <div key={index}>
                    <ProgressBar
                      key={item.codigo}
                      item={item}
                      porcentagem={porcVendido["porc_" + item.codigo]}
                    />
                  </div>
                );
              })
            : alerta && <Alerta setAlerta={setAlerta} alerta={alerta} />}
        </div>

        {modal == "metas" && (
          <Metas
            metas={atuaisMetas}
            valVendido={valVendido}
            porcVendido={porcVendido}
            modal={modal}
            setModal={setModal}
          />
        )}
      </div>
    </section>
  );
};

export default Resultado;
