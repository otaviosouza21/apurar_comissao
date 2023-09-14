import React from "react";
import { GlobalContext, GlobalStorage } from "../Helps/GlobalContext";
import style from "../estilo/css/Apuracao.module.css";
import Resultado from "./Resultado";

const metas = [
  {
    produto: 3530,
    descricao: "CAMARA 26 BUTIL KENDA",
    valorMeta: 6500,
    quantMeta: 1000,
    preco: 6.5,
  },
  {
    produto: 3531,
    descricao: "PNEU 26X1.95 LEVORIN PRAIEIRO",
    valorMeta: 8250,
    quantMeta: 300,
    preco: 27.5,
  },

  {
    produto: 3532,
    descricao: "PNEU 26X1.95 LEVORIN EXCESS EX",
    valorMeta: 5500,
    quantMeta: 200,
    preco: 27.5,
  },
  {
    produto: 3537,
    descricao: "KIT CAMBIO SHIMANO TRAZ TZ31 / DIANT TZ500 ",
    valorMeta: 9980,
    quantMeta: 200,
    preco: 49.9,
  },
  {
    produto: 3538,
    descricao: "PNEU 26X1.50 JAZZ SLICK PTO (T.KENDA)",
    valorMeta: 2277,
    quantMeta: 100,
    preco: 22.77,
  },
  {
    produto: 3539,
    descricao: "PNEU 26X1.1/2X2 SERVISS CONV FUSION",
    valorMeta: 2645,
    quantMeta: 100,
    preco: 26.45,
  },
  {
    produto: 3540,
    descricao: "MOV CENTRAL 34.7/122MM ABSOLUTE C/ ROL SEL",
    valorMeta: 5350,
    quantMeta: 500,
    preco: 10.7,
  },
  {
    produto: 3541,
    descricao: "PNEU 26X1.95 SERVISS DH PTO NITRO XP ",
    valorMeta: 2794,
    quantMeta: 100,
    preco: 27.94,
  },
];

const Apuracao = () => {
  const { data } = React.useContext(GlobalContext);

  const vendedora = data[0]["Apelido"];

  //filtra apenas comissoes exclusivas
  const tabela_exclusiva = data.filter((exc) => {
    return exc["% Comissão"] === 1;
  });

  //filtra valor da comissao exclusiva
  const comissao_exclusiva = tabela_exclusiva.reduce((a, b) => {
    return a + b["Valor da Comissão"];
  }, 0);

  //filtra valor vendido exclusiva
  const valorVendidoEX = tabela_exclusiva.reduce((a, b) => {
    return a + b["Valor Unitário"];
  }, 0);

  //filtra comissoes comuns
  const tabela_comum = data
    .filter((comum) => {
      return comum["% Comissão"] !== 1;
    })
    .slice(0, -1);

  //filtra valor da comissao comum
  const comissao_comum = tabela_comum.reduce((a, b) => {
    return a + b["Valor da Comissão"];
  }, 0);

  //calcula comissao total
  const comissao_total = (comissao_comum + comissao_exclusiva).toFixed(2);

  //Metas de Vendas//

  //valor vendido por produto
  const valorVendidoProduto = {
    prod_3530: tabela_exclusiva
      .filter((prod) => prod.Produto === 3530)
      .reduce((a, b) => a + b["Valor Mercadoria"], 0),
    prod_3531: tabela_exclusiva
      .filter((prod) => prod.Produto === 3531)
      .reduce((a, b) => a + b["Valor Mercadoria"], 0),
    prod_3532: tabela_exclusiva
      .filter((prod) => prod.Produto === 3532)
      .reduce((a, b) => a + b["Valor Mercadoria"], 0),
    prod_3537: tabela_exclusiva
      .filter((prod) => prod.Produto === 3537)
      .reduce((a, b) => a + b["Valor Mercadoria"], 0),
    prod_3538: tabela_exclusiva
      .filter((prod) => prod.Produto === 3538)
      .reduce((a, b) => a + b["Valor Mercadoria"], 0),
    prod_3539: tabela_exclusiva
      .filter((prod) => prod.Produto === 3539)
      .reduce((a, b) => a + b["Valor Mercadoria"], 0),
    prod_3540: tabela_exclusiva
      .filter((prod) => prod.Produto === 3540)
      .reduce((a, b) => a + b["Valor Mercadoria"], 0),
    prod_3541: tabela_exclusiva
      .filter((prod) => prod.Produto === 3541)
      .reduce((a, b) => a + b["Valor Mercadoria"], 0),
  };



  //porcentagem vendida por produto
  const porcentagemVendida = {
    porc_3530: 0,
    porc_3531: 0,
    porc_3532: 0,
    porc_3537: 0,
    porc_3538: 0,
    porc_3539: 0,
    porc_3540: 0,
    porc_3541: 0,
  };

  metas.forEach((item) => {
    porcentagemVendida["porc_" + item.produto] = (
      (valorVendidoProduto["prod_" + item.produto] / item.valorMeta) *
      100
    ).toFixed(2);
  });

  return (
    <section className={style.apuracao}>
      <Resultado
        vendedora={vendedora}
        valorComum={comissao_comum.toFixed(2)}
        valorExclusivo={comissao_exclusiva}
        valorTotal={comissao_total}
        metas={metas}
        porcVendido={porcentagemVendida}
        valVendido={valorVendidoProduto}
      />
    </section>
  );
};

export default Apuracao;
