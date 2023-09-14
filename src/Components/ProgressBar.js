import React from "react";
import style from "../estilo/css/ProgressBar.module.css";





const ProgressBar = ({ porcentagem, item }) => {

const quantidadeVendida = ((porcentagem/100)*item.quantMeta)



  function bateuMeta(porcentagem) {
    if (porcentagem < 50) {
      return "red";
    } else if (porcentagem > 50) {
      return "yellow";
    } else if (porcentagem >= 100){
      return 'green'
    }
  }

  return (
    <section className={style.container}>
      <p className={style.descricao}>
        {item.produto} - {item.descricao} -{" "}
        <span style={{ color: bateuMeta(porcentagem)}}>
          {porcentagem}%
        </span>
      </p>
      <div
        className={`progress ${style.bar}`}
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="progress-bar"
          style={{
            width: porcentagem ? porcentagem.replace(",", ".") + "%" : null, 
          }}
        > {Math.ceil(quantidadeVendida)} / {item.quantMeta} pçs </div>
      </div>
    </section>
  );
};

export default ProgressBar;
