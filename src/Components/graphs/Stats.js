import { LineChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";

const Stats = ({ total }) => {
  const [valoresTotais, setValoresTotais] = useState([]);
  const [pedidosTotais, setPedidosTotais] = useState([]);

  useEffect(() => {
    const formattedTotais = total.map((tot) => +tot.total.toFixed(2));
    const formattedPedidos = total.map((tot) => tot.pedido);
    setValoresTotais(formattedTotais);
    setPedidosTotais(formattedPedidos);
  }, [total]);

  return (
    valoresTotais.length > 0 &&
    pedidosTotais.length > 0 && (
      <LineChart
        width={1000}
        height={300}
        series={[{ data: valoresTotais, label: "Valor do Pedido" }]}
        xAxis={[{ scaleType: "point", data: pedidosTotais }]}
      />
    )
  );
};

export default Stats;
