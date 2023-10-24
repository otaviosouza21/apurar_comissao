import React from "react";
import { GlobalContext, GlobalStorage } from "../Helps/GlobalContext";
import style from "../estilo/css/Apuracao.module.css";
import Resultado from "./Resultado";

const Apuracao = () => {
  const { data, atuaisMetas } = React.useContext(GlobalContext);

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
    return a + b["Valor Bruto Comissão"];
  }, 0);
  const valVendidoExclusivo = valorVendidoEX;

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

  const valorVendidoCom = tabela_comum.reduce((a, b) => {
    return a + b["Valor Bruto Comissão"];
  }, 0);
  const valVendidoComum = valorVendidoCom;

  //calcula comissao total
  const comissao_total = comissao_comum + comissao_exclusiva;

  //Metas de Vendas//

  //valor vendido por produto
  const valorVendidoProduto = {
    prod_3530: tabela_exclusiva
      .filter((prod) => prod.Produto === 3530)
      .reduce((a, b) => a + b["Valor Bruto Comissão"], 0),
    prod_3531: tabela_exclusiva
      .filter((prod) => prod.Produto === 3531)
      .reduce((a, b) => a + b["Valor Bruto Comissão"], 0),
    prod_3532: tabela_exclusiva
      .filter((prod) => prod.Produto === 3532)
      .reduce((a, b) => a + b["Valor Bruto Comissão"], 0),
    prod_3537: tabela_exclusiva
      .filter((prod) => prod.Produto === 3537)
      .reduce((a, b) => a + b["Valor Bruto Comissão"], 0),
    prod_3538: tabela_exclusiva
      .filter((prod) => prod.Produto === 3538)
      .reduce((a, b) => a + b["Valor Bruto Comissão"], 0),
    prod_3539: tabela_exclusiva
      .filter((prod) => prod.Produto === 3539)
      .reduce((a, b) => a + b["Valor Bruto Comissão"], 0),
    prod_3540: tabela_exclusiva
      .filter((prod) => prod.Produto === 3540)
      .reduce((a, b) => a + b["Valor Bruto Comissão"], 0),
    prod_3541: tabela_exclusiva
      .filter((prod) => prod.Produto === 3541)
      .reduce((a, b) => a + b["Valor Bruto Comissão"], 0),
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

  // calcula as porcentagens que já foram vendidas e coloca no objeto
  // porcentagemVendida
  atuaisMetas &&
    atuaisMetas.forEach((item) => {
      porcentagemVendida["porc_" + item.codigo] = (
        (valorVendidoProduto["prod_" + item.codigo] / item.meta_valor) *
        100
      ).toFixed(2);
    });

  //APURAÇÃO DE PEDIDOS SINTETICOSVVVVV

  const sinteticos = {};

  for (const obj of data) {
    const pedido = obj["Pedido"];

    if (!sinteticos[pedido]) {
      sinteticos[pedido] = [];
    }

    sinteticos[pedido].push(obj);
  }

  const pedidosSinteticos = [];

  //Inserie as informações direcionadas para o objeto pedidosSinteticos{}
  for (const obj in sinteticos) {
    pedidosSinteticos[obj] = {
      pedido: sinteticos[obj][0]["Pedido"],
      vendedor: sinteticos[obj][0]["Apelido"],
      total: sinteticos[obj].reduce((a, b) => {
        return a + b["Valor Bruto Comissão"];
      }, 0),
      cliente: sinteticos[obj][0]["Cliente"],
      apuracao: sinteticos[obj][0]["Data Apuração"],
      comissao: sinteticos[obj].reduce((a, b) => {
        return a + b["Valor da Comissão"];
      }, 0),
    };
  }

  // Filtro tudo que é undefined nos pedidos sinteticos
  const filtroPedidosSinteticos = pedidosSinteticos.filter((filt) => {
    return filt !== undefined;
  });

  return (
    <section className={style.apuracao}>
      <Resultado // componente renderizado com todas as informações abaixo como parametro
        vendedora={vendedora}
        valorComum={comissao_comum}
        valorExclusivo={comissao_exclusiva}
        valorTotal={comissao_total}
        metas={atuaisMetas}
        porcVendido={porcentagemVendida}
        valVendido={valorVendidoProduto}
        valVendidoExclusivo={valVendidoExclusivo}
        valVendidoComum={valVendidoComum}
        pedidosSinteticos={filtroPedidosSinteticos}
      />
    </section>
  );
};

export default Apuracao;
