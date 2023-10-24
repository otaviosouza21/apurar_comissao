export default function converteParaReal(valor) {
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const brlPrice = {
    type: "number",
    width: 130,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: "font-tabular-nums",
  };

  return brlPrice;
}
