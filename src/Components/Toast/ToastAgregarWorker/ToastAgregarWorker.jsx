

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import "./ToastAgregarWorker.css";
import { setWorker,getWorkers, updateWorker} from '../../../API/Workers';
import "./ToastAgregarWorker.css";
import { useWorkersActions } from '../../../Hooks/useWorkerActions';


export function ToastAgregarWorker(t) {
const { setWorkers } = useWorkersActions();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [picture, setPicture] = useState("");

const handleNombre = (e) => {
    setName(e.target.value);
}
const handleEmail = (e) => {
    setEmail(e.target.value);
}
const handlePicture = (e) => {
    setPicture(e.target.files[0]);
}

const enviarFormulario = () => {
 

    setWorker(name, email, picture)
        .then((response) => {
            toast.success("Trabajador agregado correctamente", { duration: 5000 });
            window.location.reload();
            setWorkers(response);
            
            getWorkers()  
            .then((response) => {
              setWorkers(response);
            
            })
        })
        .catch((err) => {
            toast.error("Error al agregar trabajador", { duration: 5000 });
            toast.error(err.message, { duration: 5000 });
            console.log(err)
        });

}

    return (
        <div>
            <form className='formAddWorker'>
                <label>
                    Nombre:
                    <input type="text" name="name" value={name}   onChange={handleNombre} />
                    
                </label>
                <label>
                    Email:
                    <input type="text" name="email" value={email} onChange={handleEmail} />
                </label>
                <label htmlFor="imagen"  >
                    Imagen:
                    <input type="file" name="picture"  accept="image/*" onChange={handlePicture} />


                </label>
                <div className='btnAgregarWorker'>
               
               
            
                <button type="submit" className='ToastCancelar' 
                onClick= {
                    e => {e.preventDefault() 
                    enviarFormulario()}} >
                    Añadir Trabajador
                     </button>
                
              


                <button type='button' className='EliminarWorker' onClick={() => toast.dismiss(t.id)}>
                    Cancelar
                </button>
                </div>
               
            </form>

        </div>
    );
}

