import React from "react";
import { GlobalContext, GlobalStorage } from "../Helps/GlobalContext";
import style from "../estilo/css/Apuracao.module.css";
import Resultado from "./Resultado";

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
      color: sinteticos[obj][0]['% Comissão Apurado']
    };
  }


 
  // Filtro tudo que é undefined nos pedidos sinteticos
  const filtroPedidosSinteticos = pedidosSinteticos.filter((filt) => {
    return filt !== undefined;
  });

  console.log(filtroPedidosSinteticos);
  return (
    <section className={style.apuracao}>
      <Resultado // componente renderizado com todas as informações abaixo como parametro
        vendedora={vendedora}
        valorComum={comissao_comum}
        valorExclusivo={comissao_exclusiva}
        valorTotal={comissao_total}
        valVendidoExclusivo={valVendidoExclusivo}
        valVendidoComum={valVendidoComum}
        pedidosSinteticos={filtroPedidosSinteticos}
      />
    </section>
  );
};

export default Apuracao;
