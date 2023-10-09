import React from "react";
import style from "../estilo/css/Metas.module.css";
import grid from "../estilo/css/MetasGrid.module.css";
import close from "../estilo/img/close-circle-svgrepo-com.svg";
import RowComponent from "./RowComponent";

function converteParaReal(numero) {
  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function calculaPorcentagem(comi, total) {
  return ((comi / total) * 100).toFixed(2);
}

const Sintetico = ({ modal, setModal, pedidosSinteticos }) => {
  const [filtroTotal, setFiltroTotal] = React.useState(pedidosSinteticos);
  const [filtroComum, setFiltroComum] = React.useState([]);
  const [filtroExclusivo, setFiltroExclusivo] = React.useState([]);
  const [filtroDevolucao, setFiltroDevolucao] = React.useState([]);
  const [filtroAtual, setFiltroAtual] = React.useState([]);
  const [tituloAtual, setTituloAtual] = React.useState({
    titulo: "",
    quantidade: 0,
  });

  const ref = React.useRef();
  function handleClick(e) {
    if (e.target === ref.current) setModal(false);
  }

  let tabela = {
    exclusiva: 0,
    devolucao: 0,
    comum: 0,
  };

  React.useState(() => {
    setFiltroAtual(filtroTotal);
    setTituloAtual({
      titulo: "Todos",
      quantidade: filtroTotal.length,
    });
    pedidosSinteticos.forEach((filtro) => {
      if (+calculaPorcentagem(filtro.comissao, filtro.total) === 1) {
        filtroExclusivo.push(filtro);
      } else if (+calculaPorcentagem(filtro.comissao, filtro.total) < 0) {
        console.log(filtro);
        filtroDevolucao.push(filtro);
      } else {
        filtroComum.push(filtro);
      }
    });
  }, []);

  function handleDevolucao() {
    setFiltroAtual(null);
    setFiltroAtual(filtroDevolucao);
    setTituloAtual({
      titulo: "Devoluções",
      quantidade: filtroDevolucao.length,
    });
  }

  function handleExclusiva() {
    setFiltroAtual(null);
    setFiltroAtual(filtroExclusivo);
    setTituloAtual({
      titulo: "Tabela Exclusiva",
      quantidade: filtroExclusivo.length,
    });
  }

  function handleComum() {
    setFiltroAtual(null);
    setFiltroAtual(filtroComum);
    setTituloAtual({
      titulo: "Tabela Comum",
      quantidade: filtroComum.length,
    });
  }

  function handleTotal() {
    setFiltroAtual(null);
    setFiltroAtual(filtroTotal);
    setTituloAtual({
      titulo: "Todos",
      quantidade: filtroTotal.length,
    });
  }

  return (
    <div ref={ref} onClick={handleClick} className={style.metas}>
      <div className={`${style.container} left`}>
        <div onClick={() => setModal(false)} className={style.img}>
          {" "}
          <img src={close} />
        </div>
        <div className={grid.legenda}>
          <span onClick={handleDevolucao} className={grid.devolucao}>
            Devolução = {filtroDevolucao.length}
          </span>
          <span onClick={handleExclusiva} className={grid.exclusiva}>
            Tabela Excusiva = {filtroExclusivo.length}
          </span>
          <span onClick={handleComum} className={grid.comum}>
            Venda Comum = {filtroComum.length}
          </span>
          <span onClick={handleTotal} className={grid.total}>
            Total = {filtroTotal.length}
          </span>
        </div>
        <h1>{tituloAtual.titulo + " " + tituloAtual.quantidade}</h1>
        <div className={grid.containerTable}>
          <table className={`table table-hover ${grid.grid}`}>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Vendedor</th>
                <th>Valor Comissionado</th>
                <th>% Comissionado</th>
                <th>Valor da Comissão</th>
                <th>Data de Emissão</th>
              </tr>
            </thead>
            <tbody className={grid.tbody}>
              {filtroAtual &&
                filtroAtual.map((sint, index) => {
                  let cor;

                  function verificaCor() {
                    if (+calculaPorcentagem(sint.comissao, sint.total) === 1) {
                      cor = "springGreen";
                      tabela.exclusiva += 1;
                    } else if (
                      +calculaPorcentagem(sint.comissao, sint.total) < 0
                    ) {
                      cor = "yellow";
                      tabela.devolucao += 1;
                    } else {
                      tabela.comum += 1;
                    }
                  }

                  verificaCor();

                  return (
                    <RowComponent
                      cor={cor}
                      sint={sint}
                      converteParaReal={converteParaReal}
                      calculaPorcentagem={calculaPorcentagem}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sintetico;
