import React from "react";
import { GlobalContext } from "../Helps/GlobalContext";

const Resumo = () => {
  const { data } = React.useContext(GlobalContext);
  const [sintetico, setSintetico] = React.useState([]);

  const agrupado = data.reduce((acumulador, atual) => {
    const pedidoExistente = acumulador.find(
      (item) => item["Pedido"] === atual["Pedido"]
    );

    if (pedidoExistente) {
      // Se o pedido já existe, atualize o valor
      pedidoExistente["Valor da Comissão"] += atual["Valor da Comissão"];
    } else {
      // Se o pedido não existe, adicione-o ao acumulador
      acumulador.push({
        pedido: atual["Pedido"],
        valor: atual["Valor da Comissão"],
      });
    }

    return acumulador;
  }, []);

  return;
};

export default Resumo;
