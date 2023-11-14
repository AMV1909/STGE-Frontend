

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import "./ToastAgregarWorker.css";
import { setWorker } from '../../../API/Workers';
import "./ToastAgregarWorker.css";

export function ToastAgregarWorker(t) {

    const [newWorker, setNewWorker] = useState({

   
        name: "",
        email: "",
        picture: "",
    });

    const handleInputChange = (e) => {
        setNewWorker({
            ...newWorker,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log(newWorker)
        setWorker(newWorker)
            .then((response) => {
                toast.success("Trabajador agregado correctamente", { duration: 5000 });
                setNewWorker({
           
                    name: "",
                    email: "",
                    picture: "",
                });
                setWorker(response);
            })
            .catch((err) => {
                toast.error("Error al agregar trabajador", { duration: 5000 });
                toast.error(err.message, { duration: 5000 });
                console.log(err)
            });
         
    }

    return (
        <div>
            <form className='formAddWorker' onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="name" value={newWorker.name} onChange={handleInputChange} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" value={newWorker.email} onChange={handleInputChange} />
                </label>
                <label className='form'  >
                    Imagen:
                    <input type="text" name="picture" value={newWorker.picture} onChange={handleInputChange} />


                </label>
                <div className='btnAgregarWorker'>
                <button type="submit" className='ToastCancelar'>Agregar trabajador</button>
                <button type='button' className='EliminarWorker' onClick={() => toast.dismiss(t.id)}>
                    Cancelar
                </button>
                </div>
               
            </form>

        </div>
    );
}

