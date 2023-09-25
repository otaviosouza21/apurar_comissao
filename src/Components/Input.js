import React from "react"
import style from '../estilo/css/Input.module.css'
import { GlobalContext } from "../Helps/GlobalContext"


const Input =({label,type,text})=>{

  const {form,setForm} = React.useContext(GlobalContext)

   function handleChange(e){
   setForm({...form,[label]: e.target.value})
  } 


    function grid(label){
        if(label === "descricao"){
            return true
        }
    }


    return (
        <div className={`input-group mb-3 ${grid(label) ? style.grid : null}`}>
        <label htmlFor={label} className="input-group-text">
          {text}
        </label>
        <input
          type={type}
          name={label}
          className="form-control"
          id={label}
          onChange={handleChange}
          value={form[label]}
        />
      </div>
    )
}

export default Input