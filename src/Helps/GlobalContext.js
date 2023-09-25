import React from "react";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [atuaisMetas, setAtuaisMetas] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/metas");
        if (!response.ok) {
          // Verifica se a resposta HTTP não está OK
          throw new Error("Erro ao buscar dados das metas");
        }
        const json = await response.json();

        setAtuaisMetas(json);
      } catch (error) {
        console.error("Erro ao buscar metas", error);
        // Lide com o erro aqui, por exemplo, exibindo uma mensagem
        // de erro para o usuário ou registrando-o para depuração.
      }
    };
fetchData()
  }, [atuaisMetas]);

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

  const [atualizaMeta, setAtualizaMeta] = React.useState(null);

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
        atuaisMetas,
        setAtuaisMetas,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
