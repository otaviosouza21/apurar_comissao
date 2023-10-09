import React from "react";

const data = [
  { nome: "Alice", idade: 30, cidade: "São Paulo" },
  { nome: "Bob", idade: 25, cidade: "Rio de Janeiro" },
  { nome: "Carol", idade: 35, cidade: "Belo Horizonte" },
];

const CsvConverter = () => {
  function convertToCSV(data) {
    const header = Object.keys(data[0]).join(","); // Cria o cabeçalho CSV

    const rows = data
      .map((obj) => {
        return Object.values(obj).join(","); // Cria uma linha CSV para cada objeto
      })
      .join("\n");

    return `${header}\n${rows}`;
  }

  const csv = convertToCSV(data);

  // Agora, você pode usar o conteúdo CSV como desejar, por exemplo, salvá-lo em um arquivo ou enviá-lo para um servidor.
  console.log(csv);

  return;
};

export default CsvConverter;
