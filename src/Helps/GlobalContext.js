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

  const [atualizaMeta, setAtualizaMeta] = React.useState(false);

  return (
    <GlobalContext.Provider
      value={{
        data,
        setData,
        form,
        setForm,
        atualizaMeta,
        setAtualizaMeta,
        formAtualizado,
        setFormAtualizado,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
