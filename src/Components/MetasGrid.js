import React, { useEffect } from "react";
import style from "../estilo/css/MetasGrid.module.css";
import edit from "../estilo/img/edit.svg";
import trash from "../estilo/img/trash.svg";
import { GlobalContext } from "../Helps/GlobalContext";

const MetasGrid = ({cadastroMeta,setCadastroMeta}) => {
  const [atuaisMetas, setAtuaisMetas] = React.useState(null);
  const { form, setForm,setAtualizaMeta } = React.useContext(GlobalContext);



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

    fetchData(); // Chama a função para buscar os dados.
 

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:3001/api/metas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        fetchData(); 
      } else {
        console.error("Erro ao excluir registro:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir registro:", error);
    }
  }

  async function handleUpdate(codigo,descricao,meta_valor,meta_quant){
    setCadastroMeta(true)
    setAtualizaMeta(true)
    setForm({codigo,descricao,meta_valor,meta_quant})

    if(cadastroMeta){
      
    
    }
  }




  return (
    <div>
      <h4>Metas Atualizadas - Setembro</h4>
      <table className={`table table-hover ${style.grid}`}>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Meta em R$</th>
            <th>Meta em quantidade</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {atuaisMetas &&
          atuaisMetas.map((item, index) => {
            return (
              <tbody key={index} className={style.tbody}>
                <tr>
                  <td>{item.codigo}</td>
                  <td>R$ {item.meta_valor},00</td>
                  <td>{item.meta_quant} pçs</td>
                  <td>
                    <img 
                    onClick={()=>handleUpdate(item.codigo,item.descricao,item.meta_valor,item.meta_quant)}
                    
                    src={edit} />
                  </td>
                  <td>
                    <img
                      onClick={() => handleDelete(item.codigo)}
                      src={trash}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
};

export default MetasGrid;
