import React from "react";
import style from "../estilo/css/Metas.module.css";
import close from "../estilo/img/close-circle-svgrepo-com.svg";
import MetasGrid from "./MetasGrid.js";
import CadastraMeta from "./CadastraMeta";
import { GlobalContext } from "../Helps/GlobalContext";

const Metas = ({ metas, modal, setModal }) => {
  const [cadastroMeta, setCadastroMeta] = React.useState(false);
  const {setAtualizaMeta,setForm} = React.useContext(GlobalContext)

  const ref = React.useRef();

  function handleClick(e) {
    if (e.target === ref.current) setModal(false);
  }

  function handleCadastroMetas() {
    setCadastroMeta(true);
    setAtualizaMeta(false)
    setForm({ codigo: "", descricao: "", meta_valor: "", meta_quant: "" })
  }

  const columnDefs = [
    { headerName: "COD", field: "codigo" },
    { headerName: "Quantidade Meta", field: "quantidade meta" },
    { headerName: "Valor Meta", field: "valor meta" },
  ];

  return (
    <div ref={ref} onClick={handleClick} className={style.metas}>
      <div className={`${style.container} left`}>
        <div onClick={() => setModal(false)} className={style.img}>
          {" "}
          <img src={close} />
        </div>
        {cadastroMeta !== true ? (
          <button onClick={handleCadastroMetas} className="btn btn-primary ">
            {" "}
            + Nova Meta
          </button>
        ) : null}
        {cadastroMeta !== true ? <MetasGrid metas={metas} cadastroMeta={cadastroMeta} setCadastroMeta={setCadastroMeta} /> : null}
        {cadastroMeta && <CadastraMeta setCadastroMeta={setCadastroMeta} />}
      </div>
    </div>
  );
};

export default Metas;
