import React from "react";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [form, setForm] = React.useState({
    codigo: "",
    descricao: "",
    meta_valor: "",
    meta_quant: "",
  });
  const [formAtualizado, setFormAtualizado] = React.useState({
    codigo: "",
    descricao: "",
    meta_valor: "",
    meta_quant: "",
  });

  const [alerta, setAlerta] = React.useState(true);

  return (
    <GlobalContext.Provider
      value={{
        data,
        setData,
        form,
        setForm,
        formAtualizado,
        setFormAtualizado,
        alerta,
        setAlerta,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
