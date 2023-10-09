import React from "react";
import style from "../estilo/css/Alerta.module.css";
import closeImg from "../estilo/img/close-circle-svgrepo-com.svg";

const Alerta = ({alerta,setAlerta}) => {


  return (
    <div className={style.alert}>
      <div onClick={() => setAlerta(false)} className={style.close}>
        <img src={closeImg} />
      </div>
      <p>
        A quantidade de produtos e metas não será exibido porque o sistema não se
        conectou ao banco de dados
      </p>
    </div>
  );
};

export default Alerta;
