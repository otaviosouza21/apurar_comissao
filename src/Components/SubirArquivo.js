import React from "react";
import style from "../estilo/css/SubirArquivo.module.css";
import ExcelConverter from "../Helps/ExcelConverter";

const SubirArquivo = () => {
  const [mandaFile, setMandaFile] = React.useState(null);

  function handleChange(event) {
    const file = event.target.files[0];
    setMandaFile(file);
  }

  return (
    <div className={`${style.container} input-group mb-1`}>
      <label htmlFor="fileInput" className="form-control">
        Busque a planilha de comissão Detalhada
      </label>
      <input
        onChange={handleChange}
        id="fileInput"
        type="file"
        accept=".xlsx, .xls, .csv"
        className="input-group-text"
      />
      {mandaFile && <ExcelConverter file={mandaFile} />}
    </div>
  );
};

export default SubirArquivo;
