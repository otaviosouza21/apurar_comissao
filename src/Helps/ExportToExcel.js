import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";
import { TableChart } from "@mui/icons-material";

const ExportToExcel = ({ row, colum }) => {

  const exportToExcel = async () => {
    // Crie uma nova instância do ExcelJS
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Dados de exemplo
    const data = [colum, ...row];

    // Preencha os dados na planilha
    data.forEach((row) => {
      worksheet.addRow(row);
    });

    // Gere o arquivo Excel
    const buffer = await workbook.xlsx.writeBuffer();

    // Crie um Blob a partir do buffer
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Use a função saveAs do FileSaver para fazer o download do arquivo
    saveAs(blob, "dados.xlsx");
  };

  return (
    <Button startIcon={<TableChart />} onClick={exportToExcel}>
      Exportar para Excel
    </Button>
  );
};

export default ExportToExcel;
