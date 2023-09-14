import React from "react";
import style from "../estilo/css/Resultado.module.css";
import Metas from "./Metas";
import ProgressBar from "./ProgressBar";

const Resultado = ({
  vendedora,
  valorComum,
  valorExclusivo,
  valorTotal,
  metas,
  valVendido,
  porcVendido,
}) => {
  const [modal, setModal] = React.useState(false);

  function handleCLick() {
    setModal(true);
  }

  return (
    <section className={style.resultado}>
      <div className={style.head}>
        <h3 className={style.vendedora}>
          Vendedora: <span>{vendedora}</span>{" "}
        </h3>
        <p className={style.valorTotal}>
          Valor total da Comissão: <span>R$ {valorTotal.replace(".",',')}</span>{" "}
        </p>
      </div>

      <div className={style.tabelas}>
        <div className={style.tabelaComum}>
          <h3>Comissão Comum</h3>
          <h2>R$ {valorComum.replace(".",',')}</h2>
        </div>
        <div className={style.tabelaExclusivo}>
          <div className={style.atualizadas}>
            <h3>Comissão Exclusiva</h3>
            <button onClick={handleCLick} className="btn btn-secondary btn-sm">
              Metas Atualizadas
            </button>
          </div>
          <h2>R$ {valorExclusivo.toFixed(2).replace(".",",")}</h2>
          <div className={style.porcentagem}>
            {metas.map((item,index) => {
              return (
                <div key={index}>
                  <ProgressBar
                    key={item.produto}
                    item={item}
                    porcentagem={porcVendido["porc_" + item.produto]}
                  />
                </div>
              );
            })}
          </div>

          {modal && (
            <Metas
              metas={metas}
              valVendido={valVendido}
              porcVendido={porcVendido}
              modal={modal}
              setModal={setModal}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Resultado;
