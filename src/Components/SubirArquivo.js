import React from "react";
import style from "../estilo/css/SubirArquivo.module.css";
import ExcelConverter from "../Helps/ExcelConverter";
import { Button, FilledInput } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import styled from "@emotion/styled";
const SubirArquivo = () => {
  const [mandaFile, setMandaFile] = React.useState(null);

  function handleChange(event) {
    const file = event.target.files[0];
    setMandaFile(file);
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div className={`${style.container} input-group mb-1`}>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Busque o relatorio de comissão Detalhada
        <VisuallyHiddenInput
          onChange={handleChange}
          id="fileInput"
          type="file"
          accept=".xlsx, .xls, .csv"
        />
      </Button>

      {mandaFile && <ExcelConverter file={mandaFile} />}
    </div>
  );
};

export default SubirArquivo;
