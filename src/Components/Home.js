import React from "react";
import SubirArquivo from "./SubirArquivo";
import { GlobalContext, GlobalStorage } from "../Helps/GlobalContext";
import Apuracao from "./Apuracao";
import style from '../estilo/css/Home.module.css';



const Home = () =>{
const {data} = React.useContext(GlobalContext)


    return(
    <main className={style.main}>
        <h1>Apuração de Comissões</h1>
    
        <SubirArquivo />
         {data && <Apuracao />} 
    </main>
    )
}

export default Home