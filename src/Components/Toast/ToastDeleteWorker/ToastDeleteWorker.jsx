
import React from 'react';
import { toast } from 'react-hot-toast';
import "./ToastDeleteWorker.css";
import { deleteWorker,getWorkers } from '../../../API/Workers';
import { useWorkersActions } from '../../../Hooks/useWorkerActions';


export function ToastDeleteWorker({ t, name, id }) {
    const { setWorkers } = useWorkersActions();

    const handleDelete = () => {
        toast.success("Trabajador eliminado correctamente", { duration: 5000 });
        console.log(id)
        deleteWorker(id)
            .then((response) => {
                toast.success("Trabajador eliminado correctamente", { duration: 5000 });
                getWorkers()
                    .then((response) => {
                        setWorkers(response);
                    })
                    toast.dismiss(t.id)
                    
            })
            .catch((err) => {
                toast.error("Error al eliminar trabajador", { duration: 5000 });
                toast.error(err.message, { duration: 5000 });
            });
    };
    return (


        <div className="toastDeleteWorker">
            <div className="toastDeleteWorker__text">
                <p>¿Estás seguro que quieres eliminar a {name}?</p>
            </div>
            <div className="toastDeleteWorker__buttons">
                <button className="ToastCancelar" onClick={() => toast.dismiss(t.id)}>
                    Cancelar
                </button>
                <button className="EliminarWorker" onClick={handleDelete}>
                    Eliminar
                </button>
            </div>
        </div>

    )
}