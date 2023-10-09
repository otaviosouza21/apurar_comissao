import React from "react";

const RowComponent = ({ cor, sint, converteParaReal, calculaPorcentagem }) => {
  return (
    <tr>
      <td style={{ backgroundColor: cor }}>{sint.pedido}</td>
      <td style={{ backgroundColor: cor }}>{sint.cliente}</td>
      <td style={{ backgroundColor: cor }}>{sint.vendedor}</td>
      <td style={{ backgroundColor: cor }}>{converteParaReal(sint.total)}</td>
      <td style={{ backgroundColor: cor }}>
        {calculaPorcentagem(sint.comissao, sint.total) + "%"}
      </td>
      <td style={{ backgroundColor: cor }}>
        {converteParaReal(sint.comissao)}
      </td>
      <td style={{ backgroundColor: cor }}>{sint.apuracao}</td>
    </tr>
  );
};

export default RowComponent;
